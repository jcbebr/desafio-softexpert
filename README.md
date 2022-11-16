## Requisitos
- Docker
- git

## Instalação

Clone e acesse o repositório
```
git clone https://github.com/jcbebr/desafio-softexpert.git desafio-softexpert
cd desafio-softexpert
```
Suba os containers
```
docker-compose up -d
```
Autualize o composer autoload
```
docker-compose run composer dump-autoload
```
Após finalizar, rode a migração de dados acessando
```
http://localhost:8080/migration/M001InitApp/up
```

## Acessso a aplicação
Para executar a aplicação basta acessar
```
http://localhost:3000
```

## Acessso ao banco
- Usuário: root
- Senha: root
- Database: db

Pode-se acessar diretamente no navegador através do PHPMyAdmin
```
http://localhost:8090
```
Para realizar a conexão através de outro aplicativo deve-se utilizar o endereço

```
localhost:3306
```

## Desenvolvido com
- PHP
- React
- Mysql

## Estrutura de dados
![alt text](https://i.imgur.com/M8KqM18.png)

## Observações
Algumas ações dentro do sistema possuem restrição a usuários. Por exemplo a adição de produtos ao carrinho. Portando deve-se fazer o login no sistema. Isso pode ser feito através da criação de um novo usuário (aba usuários) ou pode-se acessar com um usuário já criado. 
Exemplo: 
- E-mail: "email"
- Senha: "senha"

## Imagens da aplicação
```
https://imgur.com/a/aHhTjo8
```
