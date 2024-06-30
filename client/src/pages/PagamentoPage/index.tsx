import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Checkbox, Input, Text, Spinner, Flex, useToast } from '@chakra-ui/react';
import { NavBar } from '@/components/NavBar';
import Footer from '@/components/Footer';
import CarrinhoService from '@/services/CarrinhoService';
import { Carrinho, IItemPedido, IPedido } from '@/commons/interfaces';
import ProductCarrinhoCard from '@/components/CardCarrinho';
import PedidoService from '@/services/PedidoService';

const PagamentoPage: React.FC = () => {
  const [carrinho, setCarrinho] = useState<Carrinho[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const toast = useToast()

  useEffect(() => {
    fetchCarrinho();
  }, []);

  const fetchCarrinho = async () => {
    try {
      const data = await CarrinhoService.getCarrinho();
      setCarrinho(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar o carrinho: ', error);
      setLoading(false);
    }
  };

  const onClickConfirmar = async () => {
    const pedido: IPedido = {
      data: new Date(),
      descricao: "Pedido",
      itens: carrinho
    }

    const response = await PedidoService.save(pedido);
    if (response?.status == 201) {
      toast({
        title: 'Sucesso',
        description: "Pedido realizado com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      })
    } else {
      toast({
        title: 'Erro.',
        description: "Ocorreu um erro ao salvar o pedido.",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      })
    }
  };


  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box className="root">
      <NavBar />
      <Box className="content" p={4} display="flex" justifyContent="center" pt="90px">
        {carrinho && carrinho.length > 0 ? (
          <Stack spacing={2} width="4xl">
            {carrinho.map((car) => (
              <ProductCarrinhoCard key={car.produto.id} carrinho={car} />
            ))}
            <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
              <Text fontSize="2xl" mb={4}>Resumo do Pedido</Text>
              <Text mb={2}>Valor Total: R${total.toFixed(2)}</Text>
              <Flex justifyContent="flex-end" mt={4}>
                <Button colorScheme="blue" onClick={onClickConfirmar}>
                  Confirmar pagamento
                </Button>
              </Flex>
            </Box>
          </Stack>
        ) : (
          <Box mt={4} textAlign="center">
            Seu carrinho está vazio.
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default PagamentoPage;
