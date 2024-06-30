import React from 'react';
import { Card, CardBody, Heading, Stack, Text, Button, Image, CardFooter, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';

const ProductPagamentoCard: React.FC<any> = ({ carrinho }) => {

  const parse = (val) => val.replace(/^\$/, '')

  const [value, setValue] = React.useState(carrinho.quantidade)

  return (
    <>
      <Card overflow='hidden' variant='outline'>
        <Stack direction={{ base: 'column', sm: 'row' }}>
          <Image
            objectFit='cover'
            height="200px"
            src={carrinho.produto.imagem}
            alt={carrinho.produto.nome}
          />

          <Stack>
            <CardBody>
              <Heading size='md'>{carrinho.produto.nome}</Heading>
              <Text py='2'>
                Quantidade: {carrinho.quantidade}
              </Text>
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default ProductPagamentoCard;
