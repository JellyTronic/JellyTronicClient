"use client"

import { BsTrash } from 'react-icons/bs';
import Image from "next/image";
// import { useRouter } from 'next/router';
import { formatPrice } from '@/providers/formatCurrency';

import { useEffect, useState } from 'react';
import Produto from '@/types/Product';
import Link from 'next/link';

interface ProductCardProps {
  product: any,
  quantity: number;
  value: number;
  valueUnity: number;
}

const ProductCard = ({ product, value, valueUnity, quantity }: ProductCardProps) => {

  const [quantiti, setQuantity] = useState(quantity);
  const [produto, setProduto] = useState<Produto[] | any>([]);

  useEffect(() => {

    const Products = async () => {
      const response = await fetch(`https://api-fatec.onrender.com/api/v1/product/${product}`);
      const data = await response.json();
      setProduto(data);
    };

    Products();

  }, [product]);

  if (!produto) {
    return null; // Renderizar alguma coisa enquanto os dados estão sendo carregados
  }

  return (
    <div className="flex items-center mt-2 shadow-sm">
      <div className="flex-shrink-0 mr-4 flex items-center">
        <div className="relative h-16 w-16">
          {produto && produto.images && produto.images.length > 0 ? (
            <Image src={produto.images[0].image_path} alt={produto.desc} layout="fill" objectFit="contain" className="w-full" />
          ) : (
            <Image src="/produto-sem-imagem.png" alt="Default Product" layout="fill" objectFit="contain" className="w-full" />
          )}
        </div>
      </div>

      <div className="flex-grow">
        <h2 className="text-sm font-semibold">
          {produto && produto.name && produto.name.length >= 40
            ? `${produto.name.slice(0, 40)}...`
            : produto.name}
        </h2>
        <p className="text-gray-600 text-sm">
          {produto.desc && produto.desc.length > 40
            ? `${produto.desc.slice(0, 40)}...`
            : produto.desc}
        </p>
        <div className='flex items-center justify-between'>
          <p className='text-primaryDarker text-sm font-bold'>{quantiti}x</p>

          <p className="text-primaryDarker text-sm font-bold">
            {value !== undefined ? (
              formatPrice((valueUnity * quantiti))
            ) : (
              formatPrice(0)
            )}
          </p>
        </div>
      </div>
    </div>

  );
}

export default ProductCard;

