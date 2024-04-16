package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.ItemPedido;
import br.edu.utfpr.pb.pw25s.server.model.Pedido;
import br.edu.utfpr.pb.pw25s.server.repository.ItemPedidoRepository;
import br.edu.utfpr.pb.pw25s.server.repository.PedidoRepository;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.IItemPedidoService;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.IPedidoService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ItemPedidoServiceImpl extends CrudServiceImpl<ItemPedido, Long>
                                    implements IItemPedidoService {

    private final ItemPedidoRepository itemPedidoRepository;

    public ItemPedidoServiceImpl(ItemPedidoRepository itemPedidoRepository) {
        this.itemPedidoRepository = itemPedidoRepository;
    }

    @Override
    protected JpaRepository<ItemPedido, Long> getRepository() {
        return itemPedidoRepository;
    }

}
