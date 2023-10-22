import Category from "./Category";

interface Produto {
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
