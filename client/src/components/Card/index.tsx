import React from 'react';
import { IProduct } from '@/commons/interfaces';
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, Button, Image, Divider, CardFooter, ButtonGroup, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface ProductCardAux {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardAux> = ({ product }) => {

  const navigate = useNavigate(); 

  const onClickCard = () => {
    navigate(`/produto/${product.id}`);
  };

  return (
    <Card maxW='sm' cursor="pointer" onClick={onClickCard}>
      <CardBody className='pb-0'>
        <Image
          src={product.imagem}
          alt={product.nome}
          borderRadius='lg'
        />
        <Stack mt='4' spacing='1'>
          <Heading size='md'>{product.nome}</Heading>
          <Text>
            {product.descricao}
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            R$ {product.preco}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='1'>
          <Button variant='solid' colorScheme='blue'>
            Buy now
          </Button>
          <Button variant='ghost' colorScheme='blue'>
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
