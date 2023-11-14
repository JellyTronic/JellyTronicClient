import Button from "@/components/Button";
import { formatPrice } from "@/providers/formatCurrency";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  productByCategory: any[];
}

const ProductItem = ({ productByCategory }: ProductItemProps) => {

  return (
    <div className="container mx-auto grid grid-cols-2 gap-4 lg:grid-cols-5 pt-6">

      {productByCategory && productByCategory.map((product: any) => (
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
