"use client"

import ProductItem from "./components/ProductItem";
import Carrousel from "./components/carrousel";
import Categories from "./components/categories";

export default function Home() {

  return (
    <div>
      <Categories />
      <Carrousel />
      <ProductItem />
    </div>
  );
}
