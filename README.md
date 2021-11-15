# Projeto

Criação de uma aplicação chamada DevRadar que permite que desenvolvedores encontrem outros desenvolvedores para se conectarem usando como filtro uma busca pro tecnologias. 
Feito baseado no conteúdo da Semana OmniStack 10.

## Tecnologias

- Node.js para o backend
  * Uso do Express para facilitar a criação das rotas
- ReactJS para o frontend Web 
- React Native para a aplicação mobile
  * Uso do Expo para facilitar a criação do app mobile
- Banco de Dados MongoDB para persistir os dados
  * Dados persistidos de forma gratuita no MongoDB Cloud

## Instalação

Parar começar a utilizar o projeto, deve-se clonar o repositório e entrar na pasta do projeto:

```
git clone https://github.com/pedrovicentesantos/devradar-omnistack
cd devradar-omnistack
```

O segundo passo é entrar em cada uma das subpastas `backend`, `frontend` e `mobile` e instalar as dependências necessárias para o projeto funcionar, usando o seguinte comando:

```
npm install
```

Feito isto, basta rodar o seguinte comando em cada uma das subpastas para iniciar a aplicação:

```
npm start
npm run dev // Para o backend
```

Depois deste comando, a aplicação já estará funcionando e é possível acessá-la pelo servidor local:

```
localhost:3000   // Para acessar a interface web
localhost:3333   // Para se comunicar com o backend
localhost:19002  // Para acessar o Expo
```

Para acessar o aplicativo mobile, é necessário ter o Expo instalado em um celular ou ter um emulador de iOS/Android. 

## Funcionamento

A aplicação Web serve para cadastrar os usuários no Banco de Dados. Após o cadastrado ser realizado, é possível pesquisar por desenvolvedores que trabalham com certa tecnologia, levando em consideração um raio de 10km por default, mas permitindo que o usuário escolha o valor. A API fica responsável por cadastrar e listar os desenvolvedores e enviar os dados para os dois frontends (o site e o app mobile).

Além disso, a aplicação analisa em tempo real o cadastro de novos desenvolvedores e exibe no mapa do aplicativo mobile o novo desenvolvedor, caso ele se encaixe nos filtros (ter a tecnologia pesquisada e estar num raio desejado).

## Funcionalidades

A aplicação Web permite editar o nome, as tecnologias e a descrição de cada um dos desenvolvedores. Além disso, permite excluir qualquer desenvolvedor.

A aplicação mobile dá a opção ao usuário de fazer uma busca exata por uma tecnologia ou fazer uma busca por regex. Por exemplo, na busca exata por `React`, retorna apenas os desenvolvedores que tem `React` como tecnologia cadastrada. Nesse mesmo caso, a busca usando regex retornaria os usuários que têm cadastradas tecnologias como `React`, `React Native`, `ReactJS`, entre outros.