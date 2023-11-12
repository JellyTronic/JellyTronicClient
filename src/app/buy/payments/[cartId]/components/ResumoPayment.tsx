import ProductCard from "../../../components/productCard";
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [valueDesconto, setValueDesconto] = useState<string>('');
  const [valueFrete, setValueFrete] = useState<string>('');

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

  useEffect(() => {
    const nomeLocalStorage = localStorage.getItem("nome");
    const token = sessionStorage.getItem("secretToken")
    const idUser = sessionStorage.getItem("id")
    const cartItemsFromLocalStorage = localStorage.getItem("cart");
    const valueFrete2 = sessionStorage.getItem("valueEntrega");
    const valueDesconto2 = sessionStorage.getItem("desconto");
    setValueDesconto(valueDesconto2!);
    setValueFrete(valueFrete2!)

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




  return (
    <div className="bg-gray-300 h-auto p-4 rounded-lg lg:w-[30%]">
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

      <div className="mt-2 pt-2">
        <div className="flex justify-between mb-1">
          <p>{totalQuantity} produtos</p>
          <p>{formatPrice(totalValue)}</p>
        </div>

        <div className="flex justify-between pb-1">
          <p>frete</p>
          <p>{formatPrice(Number(valueFrete))}</p>
        </div>

        <div className="flex justify-between border-b border-gray-400 pb-2 mb-2">
          <p>total com desconto</p>
          <p>{formatPrice((totalValue * Number(valueDesconto)))}</p>
        </div>

        <div className="flex justify-between pb-2 mb-2">
          <p className="font-semibold text-lg">total</p>
          {valueDesconto && valueFrete && (
            // Se houver desconto e frete, calcular o preço com desconto e adicionar o frete
            <p className="font-semibold text-lg">
              {formatPrice(totalValue * Number(valueDesconto) + Number(valueFrete))}
            </p>
          )}

          {valueDesconto && !valueFrete && (
            // Se houver desconto, mas sem frete, calcular apenas o preço com desconto
            <p className="font-semibold text-lg">
              {formatPrice(totalValue * Number(valueDesconto))}
            </p>
          )}

          {!valueDesconto && valueFrete && (
            // Se não houver desconto, mas houver frete, calcular o preço total com frete
            <p className="font-semibold text-lg">
              {formatPrice(totalValue + Number(valueFrete))}
            </p>
          )}

          {!valueDesconto && !valueFrete && (
            // Se não houver desconto nem frete, mostrar o preço total
            <p className="font-semibold text-lg">{formatPrice(totalValue)}</p>
          )}
          {/* <p className="font-semibold text-lg">{formatPrice(totalValue)}</p> */}
        </div>
      </div>
    </div >
  );
}

export default ResumoPayment;
