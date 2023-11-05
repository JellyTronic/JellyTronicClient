'use client'

import Button from "@/components/Button";
import { formatPrice } from "@/providers/formatCurrency";
// import <CartItem></CartItem> from "@/types/Cart";
import { perfil } from "@/utils/apiUrl";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartItem from '@/types/Cart';
import CartItems from '@/types/Cart';
import ProductCard from "../../../components/productCard";
import { useRouter } from "next/navigation";

interface ResumoPaymentProps {
  cartId: string;
}

const ResumoPayment = ({ cartId }: ResumoPaymentProps) => {
  const [totalValue, setTotalValue] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [secretToken, setSecretToken] = useState<string>('');
  const [idUserClient, setIdUserClient] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  const getCartUserLogin = async (idUserClient: string) => {
    const response = await fetch(`https://129.148.27.50/api/carrinho/${idUserClient}`);
    const cartUserLogin = await response.json();
    console.log(cartUserLogin);

    const cartItemArray = cartUserLogin.cart_items.map((item: any) => {
      return {
        product_id: item.product_id,
        amount: item.amount
      };
    });

    localStorage.setItem('cart', JSON.stringify(cartItemArray));
    setCartItems(cartUserLogin.cart_items);
  }

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

    getCartUserLogin(idUser!);
  }, []);

  const handleVerifySelectAddress = () => {
    const idAddressLocal = sessionStorage.getItem('idAddress');

    if(!idAddressLocal) {
      alert('Selecione um endereço antes de continuar!');
    } else {
      router.push(`/buy/payments/${cartId}`);
    }
  }



  return (
    <div className="mt-6 lg:mt-0 bg-gray-300 h-auto p-4 rounded-lg mx-4 lg:w-[30%]">
      <h3 className="font-semibold text-xl mb-4">Resumo do pedido</h3>

      <div>
        {cartItems.map(async (cartItem, index) => {
          const response = await fetch(
            `https://api-fatec.onrender.com/api/v1/product/${cartItem.product_id}`
          );
          const data = await response.json();
          const itemValue2 = cartItem.item_total

          return (
            <ProductCard key={index} product={cartItem.product_id} value={itemValue2} valueUnity={data.price} quantity={cartItem.amount} />
          )
        })}
      </div>

      <div className="mt-6  pt-4 border-t-2 border-gray-800">
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
        <Button className="w-[100%] py-2 font-semibold text-xl" onClick={handleVerifySelectAddress}>
          {/* <Link href={`/buy/payments/${cartId}`}> */}
            continuar
          {/* </Link> */}
        </Button>
      </div>
    </div >
  );
}

export default ResumoPayment;
