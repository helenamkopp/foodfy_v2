# Foodfy - versão 3

## Descrição
Desafio refatorado em frontend, proposto pelo programa Launchbase da Rocketseat, desenvolvido utilizando HTML 5, CSS 3 e JavaScript, com as funcionalidades, pastas organizadas, construída a parte administrativa e dados persistidos em banco de dados Postgres.

Nessa versão também foram adicionadas as funcionalidades de pesquisa por receita, paginação, e relacionamento entre receitas e chefs (cada receita "pertence" a um chef)

É utilizada a template engine nunjucks para reaproveitamento de código. 

## Índice
- [Requisitos](#Requisitos)
- [Instalação](#Instalação)
- [Criação do Banco de Dados](#DB)
- [Uso](#Uso)
- [Explicação](#Explicação)
- [Erros](#Erros)


## Requisitos
- Siga os passos de instalação abaixo. 


## Instalação
- Utilizar o comando
  - No terminal, utilizar o comando: 
  ``` 
  npm install 
  ```
Obs: Ele é responsável por instalar todas as dependências de desenvolvimento utilizadas no projeto. Elas serão responsáveis pelo seu funcionamento correto.  

## DB

Nessa versão os dados não são mais persistidos em um arquivo data.json e sim, em um banco de dados Postgres. 

Utilizei o Dbeaver, criei um DB chamado foodfy com duas tabelas: recipes e chefs, adicionei suas colunas e eliminei o data.json do projeto. 


## Uso
Para rodar a aplicação:
- No terminal, utilize o comando:
```
npm start
```
- A aplicação deverá abrir no endereço: 

http://localhost:3000
## Explicação:

Nessa versão o projeto possui duas telas principais, a visualizada pelos clientes e uma parte administrativa, acessada exclusivamente pelas rotas.


Acessos:

Como a página ainda não está pronta, você poderá ver as rotas/ acessos no arquivo routes.js, mas os acessos principais serão nesses links abaixo:

- página administrativa principal, utilize o endereço: http://localhost:3000/admin/recipes
- página administrativa dos chefs, utilize o endereço: http://localhost:3000/admin/chefs
- página de visualizaçao dos clientes, utilize o endereço: http://localhost:3000

Apresentação em vídeo:


<p align="center">
  <img alt="Gif 1" src="databasefood1.gif"/>
</p>

<p align="center">
  <img alt="Gif 2" src="databasefood2.gif"/>
</p>

Imagens: 

Filtro de busca por receitas:

<p align="center">
  <img alt="Gif 1" src="buscaporreceita.png"/>
</p>

Paginação:

<p align="center">
  <img alt="Gif 1" src="paginacao.png"/>
</p>




## Erros
Como a aplicação ainda está em desenvolvimento e terá novas versões, é possível encontrar alguns bugs. 

Caso haja muita lentidão entre as funcionalidades, sugiro que você pare o servidor (ctrl + c) e o inicie novamente com npm start - uma nova aba abrirá.

Caso você não queira reiniciar o servidor, um ctrl + r atualizará a página e pode resolver o problema de lentidão.


