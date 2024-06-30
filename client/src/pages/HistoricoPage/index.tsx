import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Spinner, Text, useToast } from '@chakra-ui/react';
import { NavBar } from '@/components/NavBar';
import Footer from '@/components/Footer';
import PedidoService from '@/services/PedidoService';
import AuthService from '@/services/AuthService';
import CardPedido from '@/components/CardPedido';
import { useNavigate } from 'react-router-dom';

const HistoricoPage: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      //const userId = AuthService.getUserId(); // Assumindo que você tem um método para obter o ID do usuário logado
      const data = await PedidoService.findByUserId(3);
      setPedidos(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar os pedidos: ', error);
      setLoading(false);
    }
  };


  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box className="root">
      <NavBar />
      <Box className="content" p={4} display="flex" justifyContent="center" pt="90px">
        {pedidos && pedidos.length > 0 ? (
          <Stack spacing={2} width="4xl">
            {pedidos.map((pedido) => (
              <CardPedido key={pedido.id} pedido={pedido} />
            ))}
          </Stack>
        ) : (
          <Box mt={4} textAlign="center">
            Você não tem pedidos.
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default HistoricoPage;
