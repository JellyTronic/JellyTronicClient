'use client'

import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from "@/providers/formatCurrency";
import ProductItem from "./components/ProductItem";

const ProductsByCategory = ({ params }: { params: { id: string } }) => {

  const [productByCategory, setProductByCategory] = useState<any[]>([]);
  const [name, setName] = useState<string>('');

  const categoryId = params.id;

  const getProductByCategory = async (Id: string) => {
    const response = await fetch(`https://api-fatec.onrender.com/api/v1/product/category/${Id}`);
    const products = await response.json();
    // console.log(products)
    setProductByCategory(products);
    setName(products[0].id_categoria.nome);
  };

  useEffect(() => {
    getProductByCategory(categoryId)
  }, [])


  if (!productByCategory) return null;

  return (
    <>
    <h2 className="pt-10 px-5 font-bold text-3xl">Category: <span className="font-medium text-2xl">{name}</span></h2>
      <ProductItem productByCategory={productByCategory} />
    </>
  );
};

export default ProductsByCategory;
