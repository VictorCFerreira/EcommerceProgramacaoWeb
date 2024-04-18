insert into tb_categoria (nome) values ('Informática');
insert into tb_categoria (nome) values ('Comida');

--
insert into tb_produto (nome, descricao, preco, categoria_id) values ('Paçoca','Paçoca doce',1.5,2);
insert into tb_produto (nome, descricao, preco, categoria_id) values ('Notebook Arus 15.6','Notebook Arus 15.6 Core I7, 16Gb Ram...',2449.0,1);

INSERT INTO tb_user(display_name, username, password) VALUES ('Administrador', 'admin','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');
INSERT INTO tb_user(display_name, username, password) VALUES ('Teste', 'test','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');