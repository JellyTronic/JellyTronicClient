'use client'

import { AiOutlineArrowLeft } from "react-icons/ai";
import ProductCard from "./components/productCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartItem from "@/types/Cart";
import Button from "@/components/Button";
import { formatPrice } from "@/providers/formatCurrency";
import Loading from "../loading";
import { loadStripe } from "@stripe/stripe-js";
import { nanoid } from 'nanoid';
import { tokenToString } from "typescript";

const Cart = () => {

  const [isCustomerRegistered, setIsCustomerRegistered] = useState(false);
  const [quantidades, setQuantidades] = useState<{ [productId: string]: number }>({}); // Estado para armazenar as quantidades por productId
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemsLogin, setCartItemsLogin] = useState<CartItem[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [itemValue, setItemValue] = useState<number>(0);
  const [secretToken, setSecretToken] = useState<string>('');
  const [idUserClient, setIdUserClient] = useState<string>('');
  // const [customerName, setCustomerName] = useState("");4



  useEffect(() => {
    const nomeLocalStorage = localStorage.getItem("nome");
    const token = sessionStorage.getItem("secretToken")
    const idUser = sessionStorage.getItem("id")
    const cartItemsFromLocalStorage = localStorage.getItem("cart");

    setSecretToken(token!);
    setIdUserClient(idUser!);

    if (token && idUser) {
      getCartUserLogin(idUser);
    }

    if (nomeLocalStorage) {
      setIsCustomerRegistered(true);
    }

    if (cartItemsFromLocalStorage) {
      const parsedCartItems = JSON.parse(cartItemsFromLocalStorage);
      setCartItems(parsedCartItems);
      calculateTotal(parsedCartItems);
    }
  }, []);

  const getCartUserLogin = async (idUserClient: string) => {
    const response = await fetch(`https://129.148.27.50/api/carrinho/${idUserClient}`);
    const cartUserLogin = await response.json();
    console.log(cartUserLogin);

    const cartItemArray = cartUserLogin.cart_items.map((item: any) => {
      return {
        productId: item.product_id,
        quantity: item.amount
      };
    });

    // Define os dados do carrinho no sessionStorage
    localStorage.setItem('cart', JSON.stringify(cartItemArray));
    setCartItemsLogin(cartUserLogin.cart_items);
  }

  const handleRemoveProduct = (productId: string) => {
    const updatedCartItems = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleRemoveProductLogin = async (productId: string) => {
    const response = await fetch(`https://129.148.27.50/api/carrinho/delete/item/${productId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      console.log("item removdio")
      const updatedCartItems = cartItems.filter(item => item.productId !== productId);
      setCartItems(updatedCartItems);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    } else {
      console.error('Erro ao excluir o item');
    }
  };

  // Função de retorno de chamada para atualizar o total de produtos
  const handleQuantityChange = (productId: string, currentQuantity: number, action: "increment" | "decrement") => {

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = existingCart.findIndex(
      (item: { productId: string }) => item.productId === productId
    );

    if (existingItemIndex !== -1) {
      if (action === "increment") {
        existingCart[existingItemIndex].quantity += 1;
      } else if (action === "decrement" && existingCart[existingItemIndex].quantity > 1) {
        existingCart[existingItemIndex].quantity -= 1;
      }
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    calculateTotal(existingCart);
  };

  const handleQuantityChangeLogin = async (productId: string, currentQuantity: number, action: "increment" | "decrement") => {

    const data = {
      product_id: productId,
      amount: currentQuantity,
    };

    const response = await fetch(`https://129.148.27.50/api/carrinho/add/item/${idUserClient}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Dependendo da configuração do seu servidor
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("item adicionado")
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItemIndex = existingCart.findIndex(
        (item: { productId: string }) => item.productId === productId
      );

      if (existingItemIndex !== -1) {
        if (action === "increment") {
          existingCart[existingItemIndex].quantity += 1;
        } else if (action === "decrement" && existingCart[existingItemIndex].quantity > 1) {
          existingCart[existingItemIndex].quantity -= 1;
        }
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));
      // setCart(existingCart);

      calculateTotal(existingCart);
    } else {
      console.error('Erro ao eadicionar o item');
    }

  };

  const calculateTotal = async (items: CartItem[]) => {
    let valorTotal = 0;
    let quantidadeTotal = 0;

    const promises = items.map(async (cartItem) => {
      const response = await fetch(
        `https://api-fatec.onrender.com/api/v1/product/${cartItem.productId}`
      );
      const data = await response.json();
      const itemValue = (data.price || 0) * cartItem.quantity;
      valorTotal += itemValue;
      quantidadeTotal += cartItem.quantity;
    });

    await Promise.all(promises);

    setTotalValue(valorTotal);
    setTotalQuantity(quantidadeTotal);
    setIsLoading(false);
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
          name: data.desc, // Substitua com a propriedade correta que contém o nome do produto
          totalPrice: itemValue, // Substitua com a propriedade correta que contém o preço do produto
          quantity: cartItem.quantity, // Substitua com a propriedade correta que contém a quantidade do produto
          price: data.price,
          images: data.images[0].image_path
        })
      });

      // Aguarde todas as Promises serem resolvidas
      const products = await Promise.all(productPromises);

      const data = {
        products // Substitua pelo valor desejado
      };

      const res = await fetch("http://localhost:3000/api/payment", {
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

    } else {

      const specialToken = nanoid(); // Gera um token aleatório
      console.log(specialToken);
      sessionStorage.setItem("specialToken", specialToken)
      // Redirecione o usuário para a página de checkout com o token especial
      window.location.href = `/checkout/login/${specialToken}`;
      // alert('Você precisa estar logado para continuar.');
      // window.location.href = "/login"

    }
  };


  return (
    <div className='container mx-auto pl-2 mt-8'>

      <div className="flex items-center gap-2">
        <Link href={"/"}>
          <AiOutlineArrowLeft size={25} className="cursor-pointer" />
        </Link>
        <h1 className="font-bold text-xl">My Cart</h1>
      </div>

      <div className="lg:flex lg:justify-between">

        {secretToken ? (
          <div className="lg:m-4">
            {cartItemsLogin.map(async (cartItem, index) => {
              const response = await fetch(
                `https://api-fatec.onrender.com/api/v1/product/${cartItem.product_id}`
              );
              const data = await response.json();
              const itemValue2 = cartItem.item_total

              return (
                <ProductCard key={index} product={cartItem.product_id} value={itemValue2} quantity={cartItem.amount} onRemove={() => handleRemoveProductLogin(cartItem.id)} onQuantityChange={handleQuantityChangeLogin} />
              )
            })}
          </div>
        ) : (
          <div className="lg:m-4">
            {cartItems.map(async (cartItem, index) => {
              // let valorTotal = 0
              const response = await fetch(
                `https://api-fatec.onrender.com/api/v1/product/${cartItem.productId}`
              );
              const data = await response.json();
              // console.log(cartItem.quantity)
              const itemValue2 = data.price * cartItem.quantity;

              // setItemValue(itemValue2)

              return (
                <ProductCard key={index} product={cartItem.productId} value={itemValue2} quantity={cartItem.quantity} onRemove={() => handleRemoveProduct(cartItem.productId)} onQuantityChange={handleQuantityChange} />
              )
            })}
          </div>
        )}


        <div className="mx-6 lg:w-[30%]">
          <h3 className="font-semibold text-xl mb-4">Resumo do pedido</h3>

          <div>
            <div className="flex justify-between mb-1">
              {/* <p>{cartItems.index}</p> */}
              <p>{totalQuantity} produtos</p>
              <p>{formatPrice(totalValue)}</p>
            </div>

            <div className="flex justify-between border-b border-gray-400 pb-2 mb-2">
              <p>frete</p>
              <p>R$ 0,00</p>
            </div>

            <div className="flex justify-between border-b border-gray-400 pb-2 mb-6">
              <p className="font-semibold text-lg">total</p>
              <p className="font-semibold text-lg">{formatPrice(totalValue)}</p>
            </div>
          </div>

          <div>
            <Button className="w-[100%] py-2 font-semibold text-xl" onClick={handleBuyClick}>
              continuar
            </Button>

            <p className="text-center mt-4 underline">
              <Link href="/" className="">Adicionar mais produtos</Link>
            </p>
          </div>
        </div>

      </div>
    </div >
  );
}

export default Cart;
