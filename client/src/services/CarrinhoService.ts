import { IProduct } from "@/commons/interfaces";

interface IProdutoCarrinho {
  produto: IProduct;
  quantidade: number;
}

const addToCarrinho = async (produto: IProduct, qtde: number = 1) => {
  let carrinho: IProdutoCarrinho[] = JSON.parse(
    localStorage.getItem("carrinho") || "[]"
  );

  let encontrado = false;
  carrinho = carrinho.map((item) => {
    if (item.produto.id === produto.id) {
      item.quantidade += qtde;
      encontrado = true;
    }
    return item;
  });

  if (!encontrado) {
    carrinho.push({ produto, quantidade: qtde });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
};

const removerDoCarrinho = async (produtoId: number) => {
  let carrinho: IProdutoCarrinho[] = JSON.parse(
    localStorage.getItem("carrinho") || "[]"
  );
  carrinho = carrinho.filter((item) => item.produto.id !== produtoId);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
};

const getCarrinho = async (): Promise<IProdutoCarrinho[]> => {
  const carrinho: IProdutoCarrinho[] = JSON.parse(
    localStorage.getItem("carrinho") || "[]"
  );
  return carrinho;
};

const CarrinhoService = {
  addToCarrinho,
  removerDoCarrinho,
  getCarrinho,
};

export default CarrinhoService;