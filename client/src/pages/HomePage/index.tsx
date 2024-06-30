import { NavBar } from "@/components/NavBar";
import { IProduct, ICategory } from "@/commons/interfaces";
import ProductService from "@/services/ProductService";
import CategoryService from "@/services/CategoryService";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import ProductCard from "@/components/Card";
import { Box, SimpleGrid, useToast, Select, Flex, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";  // Importa o ícone de lupa

export function HomePage() {
  const toast = useToast();
  const [data, setData] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");

  useEffect(() => {
    loadData();
    loadCategories();
  }, []);

  const loadData = async (categoryId: number | "" = "") => {
    const response = categoryId ? await ProductService.findByCategory(categoryId) : await ProductService.findAll();
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
      });
    }
    console.log(response);
  };

  const loadCategories = async () => {
    const response = await CategoryService.findAll();
    if (response?.status === 200) {
      setCategories(response.data);
    } else {
      toast({
        title: 'Erro.',
        description: "Ocorreu um erro ao carregar a lista de categorias.",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
    console.log(response);
  };

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    setSelectedCategory(categoryId);
    loadData(categoryId);
  };

  return (
    <>
      <NavBar />
      <main className="container">
        <Box className="text-center" pt="90px">
          <h1 className="h3 mb-3 fw-normal">Produtos</h1>
        </Box>

        <Flex justifyContent="flex-end" alignItems="center" mb={4}>
          <Select placeholder="Todos" onChange={handleCategoryChange} value={selectedCategory} maxWidth="200px">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nome}
              </option>
            ))}
          </Select>
          <IconButton
            aria-label="Search products"
            icon={<SearchIcon />}
            ml={2}
            isDisabled
            pointerEvents="none"
          />
        </Flex>

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
