import Button from "@/components/Button";
import { formatPrice } from "@/providers/formatCurrency";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductItem = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Products = async () => {
    const response = await fetch('https://api-fatec.onrender.com/api/v1/product');
    const data = await response.json();
    setProducts(data);
    setIsLoading(false);
  }

  useEffect(() => {

    Products();

  }, []);

  return (
    <div className="container grid grid-cols-2 gap-4 lg:grid-cols-5 lg:mx-10">

      {isLoading && (
        <div className='flex items-center justify-center mt-16'>
          <div className="h-12 w-12 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
        </div>
      )}

      {isLoading && (
        <div className='flex items-center justify-center mt-16'>
          <div className="h-12 w-12 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
        </div>
      )}

      {!isLoading &&
        products.map((product: any) => (
          <Link href={`/product/${product.id}`} key={product.id} className="h-96 lg:h-1/4">
            <div className="bg-gray-50 shadow-md rounded-lg overflow-hidden h-96 hover:shadow-xl transition duration-200">
              <div className="p-4 flex flex-col h-full justify-center">
                <div className="relative h-[200px] w-full lg:h-[200px] mt-3">
                  {product && product.images && product.images.length > 0 ? (
                    <Image src={product.images[0].image_path} alt={product.name} layout="fill" objectFit="contain" />
                  ) : (
                    <Image src="/produto-sem-imagem.png" alt="Default Product" layout="fill" objectFit="contain" />
                  )}

                  {/* {product && product.images && product.images.lenght === 0 && (
                    <Image src="/produto-sem-imagem.png" alt="Default Product" height={100} width={100} className="w-full container" />
                    // <Image src={product.images[0].image_path} alt={product.name} height={100} width={100} className="w-full container" />
                  )} */}
                </div>
                <div className="flex-grow">
                  <p className="text-base font-semibold mb-2">
                    {product && product.name && product.name.length >= 46
                      ? `${product.name.slice(0, 46)}...`
                      : product.name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {product && product.desc && product.desc.length > 40
                      ? `${product.desc.slice(0, 40)}...`
                      : product.desc}
                  </p>
                </div>
                <p className="text-primaryDarker mt-2 font-bold text-xl">{formatPrice(product.price)}</p>
                {/* <Button>Add to cart</Button> */}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ProductItem;
