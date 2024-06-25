import { NavBar } from "@/components/NavBar";
import { IProduct } from "@/commons/interfaces";
import ProductService from "@/services/ProductService";
import { useEffect, useState } from "react";

export function HomePage() {

  const [data, setData] = useState<IProduct[]>([]);
  const [apiError, setApiError] = useState("");
  const [apiRemoveSuccess, setApiRemoveSuccess] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await ProductService.findAll();
    if (response?.status === 200) {
      setData(response.data);
    } else {
      setApiError("Falha ao carregar a lista de produtos!");
    }

    console.log(response);
  };

  return (
    <>
      <NavBar />
      <main className="container">
        <div className="text-center">
          <h1 className="h3 mb-3 fw-normal">CORS CORS CORS</h1>
        </div>
      </main>
    </>
  );
}