# 🧠🎓 PokémonMS

Aplicação web desenvolvida com **Next.js**, **React** e **Material UI** para o gerenciamento de Pokémons, autenticação de usuários e geração de relatórios em PDF.



https://github.com/user-attachments/assets/c60153a8-27ee-4779-ad66-1b6e604ccf66

---

## 📌 Sobre o Projeto

O **PokémonMS** é uma aplicação web criada como parte do **Desafio de Desenvolvimento – App PokémonMS**.

Trata-se de um sistema completo com autenticação, controle de acesso por rotas protegidas e operações CRUD sobre uma base fictícia de Pokémons. A interface é baseada no template oficial [Mantis Free React Admin Dashboard](https://mui.com/store/items/mantis-free-react-admin-dashboard-template/).

---

## 🎯 Funcionalidades

- 🔐 Autenticação de usuários via API.
- 💾 Armazenamento dos dados do usuário autenticado no Local Storage.
- 📋 Listagem, cadastro, edição e exclusão de Pokémons (CRUD completo).
- 🔐 Rota protegida (acesso condicionado ao login).
- 📄 Geração de relatório PDF com os dados dos Pokémons (usando `pdfmake`).
- 📱 Layout responsivo e adaptado para dispositivos móveis.

---

## 🚀 Tecnologias Utilizadas

- ⚙️ [Next.js](https://nextjs.org/)
- ⚛️ [React](https://reactjs.org/)
- 🎨 [Material UI](https://mui.com/)
- ✅ [Zod](https://zod.dev/)
- 📤 [Axios](https://axios-http.com/)
- 🧾 [pdfmake](http://pdfmake.org/)

---

## 🔗 API Externa

> Base URL: `https://6852ca200594059b23cf16ed.mockapi.io/pokemonsms/`

### Endpoints utilizados:
- `/users` — para autenticação de usuários
- `/pokemons` — para listagem, criação, edição e exclusão de pokémons

---

## 🧪 Segurança e Validação

- ✅ Verificação de sessão com Local Storage para rotas protegidas
- ✅ Redirecionamento automático para `/login` se o usuário não estiver autenticado
- ✅ Validação de formulários utilizando **Zod**
- ✅ Mensagens de erro e sucesso com **Snackbars** do Material UI.


---

## 💻 Como Rodar o Projeto Localmente

### 🔧 Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

### 📥 Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/Grazimagalhaes/Pokemons.git
cd Pokemons
