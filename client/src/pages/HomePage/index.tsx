import { NavBar } from "@/components/NavBar";
import { IProduct } from "@/commons/interfaces";
import ProductService from "@/services/ProductService";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import ProductCard from "@/components/Card";
import { SimpleGrid } from "@chakra-ui/react";

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
          <h1 className="h3 mb-3 fw-normal">Produtos</h1>
        </div>
        
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={8}>
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>

        {apiError && (
          <div className="alert alert-danger mt-3" role="alert">
            {apiError}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}