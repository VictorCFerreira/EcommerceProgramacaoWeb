import React from 'react';
import { Card, CardBody, Heading, Stack, Text, Button, Image, CardFooter, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, AlertDialog, AlertDialogOverlay, AlertDialogContent, useDisclosure, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import CarrinhoService from '@/services/CarrinhoService';
import { useNavigate } from 'react-router-dom';

const ProductCarrinhoCard: React.FC<any> = ({ carrinho, onEvent }) => {

  const parse = (val) => val.replace(/^\$/, '')
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const [value, setValue] = React.useState(carrinho.quantidade)

  const onClickRemover = async () => {
    await CarrinhoService.removerDoCarrinho(carrinho.produto.id);
    onEvent();
    onClose();
  }

  return (
    <>
      <Card overflow='hidden' variant='outline' borderWidth='1px' borderRadius='lg' p={4} boxShadow='md'>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
          <Image
            objectFit='cover'
            height="200px"
            src={carrinho.produto.imagem}
            alt={carrinho.produto.nome}
            borderRadius='md'
          />

          <Stack flex='1' spacing={4}>
            <CardBody p={4}>
              <Heading size='md'>{carrinho.produto.nome}</Heading>
              <Text py='2'>
                Quantidade:
              </Text>
              <NumberInput
                onChange={(valueString) => setValue(parse(valueString))}
                value={value}
                min={0}
                max={50}
                size='md'
                w='100px'
                focusBorderColor='blue.500'
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button mt={4} variant='solid' colorScheme='red' rightIcon={<CloseIcon />} onClick={onOpen}>
                Remover do Carrinho
              </Button>
              <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClickRemover}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Remover Produto
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja remover esse produto do carrinho?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={onClickRemover} ml={3}>
                Remover
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default ProductCarrinhoCard;
