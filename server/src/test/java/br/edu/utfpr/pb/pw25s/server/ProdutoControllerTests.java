package br.edu.utfpr.pb.pw25s.server;

import br.edu.utfpr.pb.pw25s.server.model.Produto;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.ProdutoRepository;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw25s.server.shared.GenericResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class ProdutoControllerTests {

    private final String API_PRODUTOS = "/produtos";
    private final String API_LOGIN = "/login";
    private String authToken;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void limparBaseDeDados() {
        produtoRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
//        login();
    }

    @Test
    @DisplayName("Ao cadastrar um novo Produto, se o Produto for válido, deve retornar 200 Ok")
    public void cadastrarProduto_quandoProdutoEValido_deveRetornarOk() {
        ResponseEntity<Object> response =
                testRestTemplate.exchange(
                        API_PRODUTOS,
                        HttpMethod.POST,
                        createRequestEntity(criarProdutoValido()),
                        Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @DisplayName("Ao buscar todos os produtos, deve retornar uma lista com todos os produtos cadastrados")
    public void buscarTodosProdutos_deveRetornarListaDeProdutos() {
        // Cria alguns produtos de teste na base de dados
        Produto produto1 = criarProduto("Produto 1", "Descricaoo do Produto 1", BigDecimal.valueOf(100));
        Produto produto2 = criarProduto("Produto 2", "Descricaoo do Produto 2", BigDecimal.valueOf(200));
        produtoRepository.saveAll(List.of(produto1, produto2));

        // Faz a requisição para obter todos os produtos
        ResponseEntity<Produto[]> response =
                testRestTemplate.getForEntity(
                        API_PRODUTOS,
                        Produto[].class);


        // Verifica se a requisição foi bem-sucedida e se a lista de produtos não está vazia
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody()).hasSize(2); // Verifica se a lista possui dois produtos, que foram inseridos acima
    }



    private Produto criarProdutoValido() {
        return Produto.builder()
                .nome("test-produto")
                .descricao("test-description")
                .preco(BigDecimal.TEN)
                .build();
    }

    private Produto criarProduto(String nome, String descricao, BigDecimal preco) {
        return Produto.builder()
                .nome(nome)
                .descricao(descricao)
                .preco(preco)
                .build();
    }

    private User createValidUser() {
        return User.builder()
                .username("test-user")
                .displayName("test-Display")
                .password("P4ssword").build();
    }

    private void login() {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        userRepository.save(createValidUser());

        String requestBody = "{\"username\": \"test-user\", \"password\": \"P4ssword\"}";
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = testRestTemplate.exchange(
                API_LOGIN,
                HttpMethod.POST,
                request,
                String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        this.authToken = response.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
    }

    private HttpEntity<Object> createRequestEntity(Object body) {
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + this.authToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        return new HttpEntity<>(body, headers);
    }


}
