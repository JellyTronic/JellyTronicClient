import Button from "@/components/Button";
import { formatPrice } from "@/providers/formatCurrency";
import CartItem from "@/types/Cart";
import { perfil } from "@/utils/apiUrl";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ResumoPaymentProps {
  cartId: string;
}

const ResumoPayment = ({ cartId }: ResumoPaymentProps) => {
  const [totalValue, setTotalValue] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [secretToken, setSecretToken] = useState<string>('');
  const [idUserClient, setIdUserClient] = useState<string>('');
  const [cartItems, setCartItems] = useState();

  // const getUser = async (idUserClient: string, token: string) => {
  //   const response = await fetch(`${perfil.api_online}/${idUserClient}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     }
  //   });
  //   // console.log(response)
  //   const userLogin = await response.json();
  //   // setUserAddresses(userLogin.data.deliveryAddress);
  //   // console.log(userLogin.data.deliveryAddress);

  // }

  const calculateTotal = async (items: CartItem[]) => {
    let valorTotal = 0;
    let quantidadeTotal = 0;

    const promises = items.map(async (cartItem) => {
      const response = await fetch(
        `https://api-fatec.onrender.com/api/v1/product/${cartItem.product_id}`
      );
      const data = await response.json();
      console.log(data)
      const itemValue = (data.price || 0) * cartItem.amount;
      valorTotal += itemValue;
      quantidadeTotal += cartItem.amount;
    });

    await Promise.all(promises);

    setTotalValue(valorTotal);
    setTotalQuantity(quantidadeTotal);
    // setIsLoading(false);
  };

  useEffect(() => {
    const nomeLocalStorage = localStorage.getItem("nome");
    const token = sessionStorage.getItem("secretToken")
    const idUser = sessionStorage.getItem("id")
    const cartItemsFromLocalStorage = localStorage.getItem("cart");

    setSecretToken(token!);
    setIdUserClient(idUser!);

    if (token && idUser) {
      // getCartUserLogin(idUser);
      // getUser(idUser, token);
    }

    // if (nomeLocalStorage) {
    //   setIsCustomerRegistered(true);
    // }

    if (cartItemsFromLocalStorage) {
      const parsedCartItems = JSON.parse(cartItemsFromLocalStorage);
      setCartItems(parsedCartItems);
      calculateTotal(parsedCartItems);
    }
  }, []);



  return (
    <div className="bg-gray-300 h-80 p-4 rounded-lg mx-4 lg:w-[30%]">
      <h3 className="font-semibold text-xl mb-4">Resumo do pedido</h3>

      <div>
        <div className="flex justify-between mb-1">
          <p>{totalQuantity} produtos</p>
          <p>{formatPrice(totalValue)}</p>
        </div>

        <div className="flex justify-between pb-1">
          <p>frete</p>
          <p>R$ 0,00</p>
        </div>

        <div className="flex justify-between border-b border-gray-400 pb-2 mb-2">
          <p>desconto</p>
          <p>R$ 0,00</p>
        </div>

        <div className="flex justify-between border-b border-gray-400 pb-2 mb-6">
          <p className="font-semibold text-lg">total</p>
          <p className="font-semibold text-lg">{formatPrice(totalValue)}</p>
        </div>
      </div>

      <div>
        <Button className="w-[100%] py-2 font-semibold text-xl">
          <Link href={`/buy/payments/${cartId}`}>
            continuar
          </Link>
        </Button>
      </div>
    </div >
  );
}

export default ResumoPayment;
