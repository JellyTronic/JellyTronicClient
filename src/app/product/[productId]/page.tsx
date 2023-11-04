"use client"

import Button from "@/components/Button";
import { formatPrice } from "@/providers/formatCurrency";
import CartItem from "@/types/Cart";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import Product from "@/types/Product";
import axios from 'axios';
import CartItemCart from "@/types/CartItemCart";

// eslint-disable-next-line @next/next/no-async-client-component
const ProductDetails = ({ params }: { params: { productId: string } }) => {

  const [cart, setCart] = useState<CartItem[]>([]);
  const [secretToken, setSecretToken] = useState<string>("");
  const [product, setProduct] = useState<Product | null>(null);
  const [idClient, setIdClient] = useState<string>("");

  const getProductDetails = async (productId: string) => {
    const response = await fetch(`https://api-fatec.onrender.com/api/v1/product/${productId}`);
    const products = await response.json();
    // return products;
    setProduct(products);
  };


  const handleAddToCart = async (productId: string) => {
    const newItem: CartItemCart = {
      product_id: productId,
      amount: 1
      // id: ""
    }; // Defina a quantidade inicial como 1
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Verifique se o produto já existe no carrinho
    const existingItemIndex = existingCart.findIndex((item: { product_id: string; }) => item.product_id === productId);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].amount += 1; // Se existe, aumente a quantidade
    } else {
      existingCart.push(newItem); // Se não existe, adicione o novo item
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCart(existingCart);

  };

  const handleAddToCartLogin = async (productId: string) => {
    try {
      const token = sessionStorage.getItem("secretToken");
      if (!token) {
        return;
      }

      const data = [{
        product_id: productId,
        amount: 1,
      }];

      const dataCart = {
        product_id: productId,
        amount: 1,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.put(`https://129.148.27.50/api/carrinho/add/item/${idClient}`, data)
        .then((response) => {
          if (response.status === 200) {
            const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

            // Verifique se o produto já existe no carrinho
            const existingItemIndex = existingCart.findIndex((item: { product_id: string; }) => item.product_id === productId);

            if (existingItemIndex !== -1) {
              existingCart[existingItemIndex].amount += 1; // Se existe, aumente a quantidade
            } else {
              existingCart.push(dataCart); // Se não existe, adicione o novo item
            }

            localStorage.setItem("cart", JSON.stringify(existingCart));
            // setCart(existingCart);
            console.log('Item adicionado com sucesso:', response.data);
          } else {
            console.error('Erro ao adicionar o item ao carrinho.');
          }
        })
        .catch((error) => {
          console.error('Erro na solicitação de adição ao carrinho:', error);
        });


    } catch (error) {
      console.error('Erro na solicitação de adição ao carrinho:', error);
    }

  };


  useEffect(() => {
    // getProductByCategory(categoryId)
    const token = sessionStorage.getItem("secretToken")
    const idClientSession = sessionStorage.getItem("id")
    console.log(token)
    console.log(idClientSession)
    setSecretToken(token!);
    setIdClient(idClientSession!);


    getProductDetails(params.productId);
  }, [])


  if (!product) return null;

  return (
    <div className="container mx-auto mt-8 lg:mt-12 lg:px-40">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="flex items-center justify-center">
          <div className="relative h-[300px] w-full lg:h-[400px]">
            {product.images.length != 0 ? (
              <Image src={product.images[0].image_path} alt={product.name} layout="fill" objectFit="contain" />
            ) : (
              <Image src="/produto-sem-imagem.png" alt="Default Product" layout="fill" objectFit="cover" />
            )}
          </div>
        </div>
        <div className="mt-5 mx-1.5 flex flex-col justify-between h-full">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="lg:text-xl lg:text-gray-600 lg:mt-[-50px]">
            {product.desc.length > 100 ? `${product.desc.slice(0, 100)}...` : product.desc}
          </p>
          <p className="text-primaryDarker text-xl font-bold mt-1 lg:mt-[-50px]">{formatPrice(product.price)}</p>
          <p className="mt-2 text-gray-500 lg:mt-[-50px]">Stock: {product.stock}</p>
          <div className="flex items-center justify-between lg:mb-[30px]">
            {secretToken ? (
              <Button variant="outlined" className="w-[48%] mt-2 font-semibold text-lg" onClick={() => handleAddToCartLogin(product.id)}>
                <Link href="/cart">
                  Add to Cart
                </Link>
              </Button>
            ) : (
              <Button variant="outlined" className="w-[48%] mt-2 font-semibold text-lg" onClick={() => handleAddToCart(product.id)}>
                <Link href="/cart">
                  Add to Cart
                </Link>
              </Button>
            )}

            {/* <Button variant="border" className="w-[48%] mt-2 font-semibold text-lg">
              buy now
            </Button> */}
          </div>
        </div>


        <div className="mt-10 mx-1.5 border-y pb-4 pt-6 border-gray-300 lg:mt-0 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {product.desc}
          </p>
        </div>

        <div className="my-10 mx-1.5 border-b pb-1 border-gray-300 lg:mt-0 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
          <table className="w-full border rounded-lg overflow-hidden">
            <tbody>
              <tr className="bg-gray-100">
                <td className="font-semibold px-6 py-3">Brand:</td>
                <td className="px-6 py-3">{product.brand}</td>
              </tr>
              <tr className="bg-white">
                <td className="font-semibold px-6 py-3">Width:</td>
                <td className="px-6 py-3">{product.width} cm</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="font-semibold px-6 py-3">Height:</td>
                <td className="px-6 py-3">{product.height} cm</td>
              </tr>
              <tr className="bg-white">
                <td className="font-semibold px-6 py-3">Weight:</td>
                <td className="px-6 py-3">{product.weight} kg</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
