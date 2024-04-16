package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.ProdutoDto;
import br.edu.utfpr.pb.pw25s.server.model.Produto;
import br.edu.utfpr.pb.pw25s.server.service.ICrudService;
import br.edu.utfpr.pb.pw25s.server.service.IProdutoService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("produtos")
public class ProdutoController extends CrudController<Produto, ProdutoDto, Long>{

    private final IProdutoService service;
    private final ModelMapper modelMapper;

    public ProdutoController(IProdutoService service, ModelMapper modelMapper) {
        super(Produto.class, ProdutoDto.class);
        this.service = service;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Produto, Long> getService() {
        return service;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }

}
