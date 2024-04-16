package br.edu.utfpr.pb.pw25s.server.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "tb_itemPedido")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal preco;

    private int quantidade;

    private long pedidoId;

    private long produtoId;
}



