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
public class Product {

    private BigDecimal price;

    private Int quantidade;

    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    @JoinColumn(name = "produto_id")
    private Produto produto;
}



