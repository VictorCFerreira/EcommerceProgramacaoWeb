export interface IUserSigup {
  displayName: string;
  username: string;
  password: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface ICategory {
  id?: number;
  nome: string;
}

export interface IProduct {
  id?: number;
  nome: string;
  preco: number;
  descricao: string;
  categoria: ICategory;
  imagem: string;
}

export class Carrinho {
  produto: IProduct;
  quantidade: number;
}
