import Category from "./Category";

interface Produto {
  image_path: any;
  name: any;
  item_total: any;
  product_img: any
  unity_price: any;
  amount: any;
  product_name: any;
  price: string;
  stock: string;
  desc: string;
  images: any;
  id: string;
  nome: string;
  descricao: string;
  brand: string;
  preco: number;
  width: number;
  weight: number;
  height: number;
  id_categoria: Category;
}

export default Produto;
