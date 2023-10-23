import Category from "./Category";

interface Produto {
  item_total: any;
  product_img: string | StaticImport;
  unity_price: any;
  amount: ReactNode;
  product_name: ReactNode;
  price: string;
  stock: string;
  desc: string;
  images: any;
  id: string;
  nome: string;
  descricao: string;
  brand: string;
  preco: number;
  // estoque: number;
  width: number;
  // : number;
  weight: number;
  height: number;
  id_categoria: Category;
}

export default Produto;
