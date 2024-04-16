package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.CategoriaDto;
import br.edu.utfpr.pb.pw25s.server.dto.PedidoDto;
import br.edu.utfpr.pb.pw25s.server.model.Categoria;
import br.edu.utfpr.pb.pw25s.server.model.Pedido;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.ICategoriaService;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.ICrudService;
import br.edu.utfpr.pb.pw25s.server.service.interfaces.IPedidoService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("pedidos")
public class PedidoController extends CrudController<Pedido, PedidoDto, Long>{

    private final IPedidoService service;
    private final ModelMapper modelMapper;

    public PedidoController(IPedidoService service, ModelMapper modelMapper) {
        super(Pedido.class, PedidoDto.class);
        this.service = service;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Pedido, Long> getService() {
        return service;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }

}
