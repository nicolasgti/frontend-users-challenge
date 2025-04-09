# Frontend Users - Desafio Conecthus

Este projeto é um frontend desenvolvido em **React**, **TypeScript** e **Vite** como parte do **Desafio Conecthus**. Ele implementa funcionalidades de gerenciamento de usuários, incluindo cadastro, edição, exclusão e recuperação de senha.

---

## 🚀 Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de build rápida e moderna.
- **Material-UI (MUI)**: Biblioteca de componentes para estilização.
- **Framer Motion**: Biblioteca para animações.
- **Axios**: Cliente HTTP para comunicação com APIs.
- **React Router**: Gerenciamento de rotas no React.

---

## 📂 Estrutura do Projeto

```plaintext
src/
├── components/       # Componentes reutilizáveis
├── pages/            # Páginas principais da aplicação
├── services/         # Serviços para comunicação com a API
├── types/            # Definições de tipos TypeScript
├── assets/           # Imagens e outros arquivos estáticos
├── App.tsx           # Componente principal da aplicação
├── main.tsx          # Ponto de entrada do React
└── index.css         # Estilos globais
```

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/frontend-users.git
   cd frontend-users
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Acesse a aplicação no navegador:

   ```
   http://localhost:5173
   ```

---

## 🛠️ Funcionalidades

- **Cadastro de Usuários**: Criação de novos usuários com validação de campos.
- **Edição de Usuários**: Atualização de informações de usuários existentes.
- **Exclusão de Usuários**: Remoção de usuários da lista.
- **Recuperação de Senha**: Envio de e-mail para redefinição de senha.
- **Animações**: Transições suaves com Framer Motion.
- **Validações**: Campos obrigatórios e validação de formatos (e.g., e-mail).

---

## 🧪 Testes

### Testes Unitários

Este projeto utiliza **Jest** e **React Testing Library** para testes unitários. Para rodar os testes:

```bash
npm run test
# ou
yarn test
```

---

## 📄 ESLint e Prettier

### Configuração do ESLint

O projeto utiliza o **ESLint** para garantir a qualidade do código. Para habilitar regras mais avançadas, você pode configurar o ESLint com suporte a TypeScript:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

### Formatação com Prettier

O **Prettier** é usado para formatação automática do código. Para formatar o código, execute:

```bash
npm run format
# ou
yarn format
```

---

## 🌐 Rotas da Aplicação

- `/login`: Página de login.
- `/home`: Página inicial (protegida por autenticação).
- `/users`: Lista de usuários.
- `/usuarios/novo`: Cadastro de um novo usuário.
- `/usuarios/editar/:id`: Edição de um usuário existente.
- `/forgot-password`: Recuperação de senha.

---

## 📦 Deploy

### Build para Produção

Para gerar os arquivos otimizados para produção:

```bash
npm run build
# ou
yarn build
```

Os arquivos serão gerados na pasta `dist/`.

---

## 🖼️ Pré-visualização

### Splash Screen
![Splash Screen](./assets/splash-screen.png)

### Página de Login
![Login Page](./assets/login-page.png)

### Lista de Usuários
![Users Page](./assets/users-page.png)

---

## 🤝 Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo `LICENSE` para mais informações.

---

## 📧 Contato

- **Nome**: Nicolas Fernandes
- **GitHub**: [nicolasgti](https://github.com/nicolasgti)
- **E-mail**: nicolasgti@hotmail.com
