package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.model.ItemPedido;
import br.edu.utfpr.pb.pw25s.server.repository.ItemPedidoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemPedidoService {
    private final ItemPedidoRepository itemPedidoRepository;
    public ItemPedidoService(ItemPedidoRepository itemPedidoRepository) {
        this.itemPedidoRepository = itemPedidoRepository;
    }
    public ItemPedido save(ItemPedido itemPedido) {
        return itemPedidoRepository.save(itemPedido);
    }

    public ItemPedido findOne(Long id) {
        return itemPedidoRepository.findById(id).orElse(null);
    }

    public List<ItemPedido> findAll() {
        return itemPedidoRepository.findAll();
    }

    public void delete(Long id) {
        itemPedidoRepository.deleteById(id);
    }
}
