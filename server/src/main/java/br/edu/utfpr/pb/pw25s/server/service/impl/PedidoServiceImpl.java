package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.ItemPedido;
import br.edu.utfpr.pb.pw25s.server.model.Pedido;
import br.edu.utfpr.pb.pw25s.server.model.Produto;
import br.edu.utfpr.pb.pw25s.server.repository.PedidoRepository;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.IPedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PedidoServiceImpl extends CrudServiceImpl<Pedido, Long>
                                    implements IPedidoService {

    private final PedidoRepository pedidoRepository;

    @Autowired
    ProdutoServiceImpl produtoService;

    @Autowired
    ItemPedidoServiceImpl itemPedidoService;

    public PedidoServiceImpl(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    @Override
    protected JpaRepository<Pedido, Long> getRepository() {
        return pedidoRepository;
    }

    @Override
    public Pedido save(Pedido pedido) {
        pedido.setTotalPedido(BigDecimal.valueOf(0));
        for (ItemPedido item : pedido.getItens()) {
            Produto prod = produtoService.findOne(item.getProduto().getId());
            item.setPreco(BigDecimal.valueOf(item.getQuantidade()).multiply(prod.getPreco()));
            item.setPedido(pedido);
            pedido.setTotalPedido(pedido.getTotalPedido().add(item.getPreco()));
        }
        return getRepository().save(pedido);
    }

    @Override
    public void delete(Long id) {
        Pedido pedido = pedidoRepository.findById(id).orElse(null);
        if(pedido != null && !pedido.getItens().isEmpty()) {
            for(ItemPedido item : pedido.getItens()){
                itemPedidoService.delete(item.getId());
            }
        }
        getRepository().deleteById(id);
    }

    @Override
    public List<Pedido> findAllByUsuarioId(Long id) {
        return pedidoRepository.findAllByUsuarioId(id);
    }
}
