import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '@/commons/interfaces';
import ProductService from '@/services/ProductService';
import { Box, Heading, Text, Image, Spinner, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Spacer, ButtonGroup, Button } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { NavBar } from '@/components/NavBar';
import Footer from '@/components/Footer';
import CarrinhoService from '@/services/CarrinhoService';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await ProductService.findById(id as any);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      setLoading(false);
    }
  };

  const addToCarrinho = async () => {
    await CarrinhoService.addToCarrinho(product);
  }

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!product) {
    return <Text>Produto não encontrado</Text>;
  }

  return (
    <>
      <NavBar />
      <Box padding="4" margin="auto" marginLeft="70px" >
        <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink >{product.categoria.nome}</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>{product.nome}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box padding="4" maxWidth="4xl" margin="auto">
        <Flex direction="row" alignItems="center" justifyContent="space-between">
          <Image src={product.imagem} alt={product.nome} borderRadius="lg" height="500px" objectFit="cover" />
          <Flex direction="column" ml="4" flex="1" justifyContent="space-between" height="500px">
            <Box>
              <Heading>{product.nome}</Heading>
              <Text mt="2">{product.descricao}</Text>
            </Box>
            <Box>
              <Text color='blue.600' fontSize='5xl'>
                R$ {product.preco}
              </Text>
              <ButtonGroup w="100%" spacing='2' mt="2">
                <Button variant='outline' colorScheme='blue' onClick={addToCarrinho}>
                  Adicionar ao carrinho
                </Button>
                <Button variant='solid' colorScheme='blue' mr="auto">
                  Comprar agora
                </Button>
              </ButtonGroup>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default ProductPage;
