# Projeto

Criação de uma aplicação chamada DevRadar que permite pesquisar Desenvolvedores que trabalham com determinada linguagem. Feito baseado no conteúdo da Semana OmniStack 10.

## Tecnologias

- Node.js para o back-end
  * Uso do Express para facilitar a criação das rotas
- ReactJS para o front-end Web 
- React Native para a aplicação mobile
  * Uso do Expo para facilitar a criação do app mobile
- Banco de Dados MongoDB para persistir os dados

## Funcionamento

A aplicação Web serve para cadastrar os usuários no Banco de Dados. Após o cadastrado ser realizado, é possível pesquisar por Desenvolvedores que trabalham com certa tecnologia, levando em consideração um raio de 10km. A API fica responsável por cadastrar e listar os Desenvolvedores e enviar os dados para os dois front-ends (o site e o app mobile).

Além disso, a aplicação analisa em Real-Time o cadastro de novos Desenvolvedores e exibe no mapa do aplicativo mobile o novo Desenvolvedor, caso ele se encaixe nos filtros (ter a tecnologia pesquisada e estar num raio de 10km).