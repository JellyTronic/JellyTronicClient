"use client"

import ProductItem from "./components/ProductItem";
import Carrousel from "./components/carrousel";
import Categories from "./components/categories";

export default function Home() {

  return (
    <div className="bg-gray-100 pb-10">
      <Categories />
      <Carrousel />
      <ProductItem />
    </div>
  );
}
