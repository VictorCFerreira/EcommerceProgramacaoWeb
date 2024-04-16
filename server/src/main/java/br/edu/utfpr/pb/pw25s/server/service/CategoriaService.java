package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.model.Categoria;
import br.edu.utfpr.pb.pw25s.server.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;
    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }
    public Categoria save(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public Categoria findOne(Long id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    public void delete(Long id) {
        categoriaRepository.deleteById(id);
    }
}
