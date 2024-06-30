import { NavBar } from "@/components/NavBar";
import { IProduct } from "@/commons/interfaces";
import ProductService from "@/services/ProductService";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import ProductCard from "@/components/Card";
import { Box, SimpleGrid, useToast } from "@chakra-ui/react";

export function HomePage() {

  const toast = useToast()
  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await ProductService.findAll();
    if (response?.status === 200) {
      setData(response.data);
    } else {
      toast({
        title: 'Erro.',
        description: "Ocorreu um erro ao carregar a lista de produtos.",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      })
    }
    console.log(response);
  };

  return (
    <>
      <NavBar />
      <main className="container">
        <Box className="text-center" pt="90px">
          <h1 className="h3 mb-3 fw-normal">Produtos</h1>
        </Box>
        
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={8}>
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>

      </main>
      <Footer />
    </>
  );
}