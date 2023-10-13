import Category from "./Category";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  marca: string;
  preco: number;
  estoque: number;
  largura: number;
  comprimento: number;
  peso: number;
  altura: number;
  id_categoria: Category;
}

export default Produto;
