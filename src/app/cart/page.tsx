'use client'

import { AiOutlineArrowLeft } from "react-icons/ai";
import ProductCard from "./components/productCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartItem from "@/types/Cart";
import Button from "@/components/Button";
import { formatPrice } from "@/providers/formatCurrency";
import { nanoid } from 'nanoid';
import { apiPayment, perfil } from "@/utils/apiUrl";
import Address from "@/types/Address";

const Cart = () => {

  const [isCustomerRegistered, setIsCustomerRegistered] = useState(false);
  const [quantidades, setQuantidades] = useState<{ [productId: string]: number }>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemsLogin, setCartItemsLogin] = useState<CartItem[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [itemValue, setItemValue] = useState<number>(0);
  const [secretToken, setSecretToken] = useState<string>('');
  const [idUserClient, setIdUserClient] = useState<string>('');
  const [userAddresses, setUserAddresses] = useState<Address | undefined | any>([]);
  const [newAddress, setNewAddress] = useState("");
  const [cep, setCep] = useState("*****-***");
  const [editandoCep, setEditandoCep] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const nomeLocalStorage = localStorage.getItem("nome");
    const token = sessionStorage.getItem("secretToken")
    const idUser = sessionStorage.getItem("id")
    const cartItemsFromLocalStorage = localStorage.getItem("cart");

    setSecretToken(token!);
    setIdUserClient(idUser!);

    if (token && idUser) {
      getCartUserLogin(idUser);
      getUser(idUser, token);
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

  const getUser = async (idUserClient: string, token: string) => {
    const response = await fetch(`${perfil.api_online}/${idUserClient}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    // console.log(response)
    const userLogin = await response.json();
    setUserAddresses(userLogin.data.deliveryAddress);
    console.log(userLogin.data.deliveryAddress);

  }

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

    // Define os dados do carrinho no sessionStorage
    localStorage.setItem('cart', JSON.stringify(cartItemArray));
    setCartItemsLogin(cartUserLogin.cart_items);
  }

  const handleRemoveProduct = (productId: string) => {
    const updatedCartItems = cartItems.filter(item => item.product_id !== productId);
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
      (item: { product_id: string }) => item.product_id === productId
    );

    if (existingItemIndex !== -1) {
      if (action === "increment") {
        existingCart[existingItemIndex].amount += 1;
      } else if (action === "decrement" && existingCart[existingItemIndex].amount > 1) {
        existingCart[existingItemIndex].amount -= 1;
      }
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    calculateTotal(existingCart);
  };

  const handleQuantityChangeLogin = async (productId: string, currentQuantity: number, action: "increment" | "decrement") => {

    const data = [{
      product_id: productId,
      amount: currentQuantity,
    }];

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
        (item: { product_id: string }) => item.product_id === productId
      );

      if (existingItemIndex !== -1) {
        if (action === "increment") {
          existingCart[existingItemIndex].amount += 1;
        } else if (action === "decrement" && existingCart[existingItemIndex].amount > 1) {
          existingCart[existingItemIndex].amount -= 1;
        }
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));

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
    setIsLoading(false);
  };

  const handleBuyClick = async () => {

    const isUserLoggedIn = sessionStorage.getItem("secretToken") !== null;

    if (isUserLoggedIn) {

      const response = await fetch(`https://129.148.27.50/api/carrinho/${idUserClient}`);
      const cartUserLogin = await response.json();
      // console.log(cartUserLogin.id);

      const productPromises = cartItems.map(async (cartItem) => {
        const response = await fetch(
          `https://api-fatec.onrender.com/api/v1/product/${cartItem.product_id}`
        );

        const data = await response.json();
        const itemValue = data.price * cartItem.amount;
        return ({
          name: data.desc,
          totalPrice: itemValue,
          quantity: cartItem.amount,
          price: data.price,
          images: data.images[0].image_path
        })
      });

      // Aguarde todas as Promises serem resolvidas
      const products = await Promise.all(productPromises);

      const data = {
        products
      };

      const res = await fetch(`${apiPayment.api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        return console.log("Ocorreu um erro ao realizar a compra");
      }

      window.location.href = `/buy/address/${cartUserLogin.id}`;

    } else {

      const specialToken = nanoid(); // Gera um token aleatório
      console.log(specialToken);
      sessionStorage.setItem("specialToken", specialToken)
      window.location.href = `/checkout/login/${specialToken}`;
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
          <div className="ml-4 lg:m-4">
            {cartItemsLogin.length === 0 ? (
              <div className='flex flex-col items-center'>
                <p className='mb-6'>
                  Você ainda não possui nenhum produto no seu carrinho, clique no botão abaixo e comece a comprar
                </p>
                <Button>
                  <Link href={'/'}>Começar a comprar</Link>
                </Button>
              </div>
            ) : (
              <>
                {cartItemsLogin.map(async (cartItem, index) => {
                  const response = await fetch(
                    `https://api-fatec.onrender.com/api/v1/product/${cartItem.product_id}`
                  );
                  const data = await response.json();
                  const itemValue2 = cartItem.item_total
                  console.log(data);

                  return (
                    <ProductCard key={index} product={cartItem.product_id} value={itemValue2} valueUnity={data.price} quantity={cartItem.amount} onRemove={() => handleRemoveProductLogin(cartItem.id)} onQuantityChange={handleQuantityChangeLogin} />
                  )
                })}
              </>
            )}

          </div>
        ) : (
          <div className="ml-4 lg:m-4">
            {cartItems.length === 0 ? (
              <div className='flex flex-col items-center'>
                <p className='mb-6'>
                  Você ainda não possui nenhum produto no seu carrinho, clique no botão abaixo e comece a comprar
                </p>
                <Button>
                  <Link href={'/'}>Começar a comprar</Link>
                </Button>
              </div>
            ) : (
              <>
                {cartItems.map(async (cartItem, index) => {
                  const response = await fetch(
                    `https://api-fatec.onrender.com/api/v1/product/${cartItem.product_id}`
                  );
                  const data = await response.json();
                  const itemValue2 = data.price * cartItem.amount;
                  console.log(cartItem)
                  // console.log(cartItem * data0)
                  return (
                    <ProductCard key={index} product={cartItem.product_id} value={itemValue2} valueUnity={data.price} quantity={cartItem.amount} onRemove={() => handleRemoveProduct(cartItem.product_id)} onQuantityChange={(productId, currentQuantity, action) => handleQuantityChange(productId, currentQuantity, action)} />
                  )
                })}
              </>
            )}

          </div>
        )}

        <div className="ml-4 w-[86%] mt-10 lg:mx-6 lg:mt-6 bg-gray-300 h-80 rounded-xl p-4 lg:w-[30%]">
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
            <Button className="w-[100%] py-2 font-semibold text-xl" onClick={handleBuyClick}>
              continuar
            </Button>

            <p className="text-center mt-4 underline">
              <Link href="/" className="">Adicionar mais produtos</Link>
            </p>
          </div>
        </div>
      </div>



      {/* <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-4">Seu endereço</h2>
        <div className="rounded-lg p-4 bg-white shadow-md">
          <div className="user-addresses space-y-4">
            <div className="border p-4">
              <p><span className="font-semibold">CEP:</span> {userAddresses.cep}</p>
              <p><span className="font-semibold">Complemento:</span> {userAddresses.complement}</p>
              <p><span className="font-semibold">Número:</span> {userAddresses.number}</p>
              <p><span className="font-semibold">Referência:</span> {userAddresses.reference}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3>Se deseja receber em outro endereço, digite o cep:</h3> */}

      {/* <InputMask
            type="text"
            value={cep}
            className="form-input border rounded py-2 px-4"
            // disabled={!editandoCep}
            onChange={handleChangeCep}
            mask="99999-999"
          /> */}
      {/* <input
            type="number"
            placeholder="Digite o CEP"
            className="w-32 p-2 border rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary-dark"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          /> */}
      {/* <Button
            // onClick={handleAddAddress}
            // onClick={handleEdicaoCep}
            // disabled={isLoading}
            className="mt-2 ml-2"
          >
            Adicionar Endereço
          </Button> */}

      {/* <Link href='https://buscacepinter.correios.com.br/app/endereco/index.php' className="ml-4">não seu meu cep</Link> */}

      {/* </div>
      </div> */}




    </div >
  );
}

export default Cart;
