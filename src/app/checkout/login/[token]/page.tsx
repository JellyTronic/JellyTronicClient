"use client";
import { useRouter } from "next/navigation";
import FormLogin from "./components/formLogin";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import IsLogged from "./components/isLogged";
import CartItem from "@/types/Cart";
import { loadStripe } from "@stripe/stripe-js";
import { apiPayment } from "@/utils/apiUrl";

export default function Login({ params }: { params: { token: string } }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const router = useRouter();
  const [tokenParams, setTokenParams] = useState<string>("");
  const [tokenSession, setTokenSession] = useState<string>("");
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleLoginSubmit = (formData: { token: string; id: number }) => {
    sessionStorage.setItem("secretToken", formData.token);
    sessionStorage.setItem("id", formData.id.toString());
    setIsAuthenticated(true);
    sessionStorage.removeItem('specialToken')
    handleBuyClick();

  };

  const handleBuyClick = async () => {

    const isUserLoggedIn = sessionStorage.getItem("secretToken") !== null;

    if (isUserLoggedIn) {

      const productPromises = cartItems.map(async (cartItem) => {
        const response = await fetch(
          `https://api-fatec.onrender.com/api/v1/product/${cartItem.productId}`
        );

        const data = await response.json();
        const itemValue = data.price * cartItem.quantity;
        return ({
          name: data.name, // Substitua com a propriedade correta que contém o nome do produto
          totalPrice: itemValue, // Substitua com a propriedade correta que contém o preço do produto
          quantity: cartItem.quantity, // Substitua com a propriedade correta que contém a quantidade do produto
          price: data.price,
          images: data.images[0].image_path || '26013e08-95ba-4a74-94df-ba83ec5c3516.png'
        })
      });

      // Aguarde todas as Promises serem resolvidas
      const products = await Promise.all(productPromises);

      const data = {
        products // Substitua pelo valor desejado
      };
      console.log(data)

      const res = await fetch(`${apiPayment.api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Defina o tipo de conteúdo como JSON
        },
        body: JSON.stringify(data), // Converte o objeto em uma string JSON
      });

      if (!res.ok) {
        return console.log("Ocorreu um erro ao realizar a compra");
      }

      const { sessionId } = await res.json();

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

      await stripe?.redirectToCheckout({ sessionId })
    }
  }

  useEffect(() => {
    const cartItemsFromLocalStorage = localStorage.getItem("cart");
    const tokenSpecial = sessionStorage.getItem('specialToken');

    if (sessionStorage.getItem("secretToken")) {
      setIsAuthenticated(true);
    }

    if (params.token === tokenSpecial) {
      setIsTokenValid(true)

      if (cartItemsFromLocalStorage) {
        const parsedCartItems = JSON.parse(cartItemsFromLocalStorage);
        setCartItems(parsedCartItems);
        // calculateTotal(parsedCartItems);
      }

    } else {
      // alert("Desculpa, você não precisa acessar essa página e estamos redirecionando você a tela de login!")
      window.location.href = "/login"
      sessionStorage.removeItem('specialToken')
    }

  }, []);


  return (
    <>
      {!isAuthenticated && (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Entre em sua conta
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <FormLogin onSubmit={handleLoginSubmit} />
            <p className="mt-10 text-center text-sm text-gray-500">
              Não está cadastrado?{" "}
              <a
                href="/cadastro"
                className="font-semibold leading-6 text-primary"
              >
                Cadastre-se aqui
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
