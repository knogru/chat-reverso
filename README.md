# Chat WebSocket - Aplicação React com TypeScript

Aplicação de chat em tempo real usando React, TypeScript e WebSocket. O frontend se conecta a um servidor WebSocket que retorna as mensagens invertidas.

## Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** (geralmente vem com Node.js)

## Instalação

### 1. Instalar dependências do servidor

Na raiz do projeto:

```bash
npm install
```

Isso instalará a dependência `ws`, necessária para o servidor WebSocket.

### 2. Instalar dependências do frontend

Entre na pasta `frontend` e instale as dependências:

```bash
cd frontend
npm install
```

## Como executar

### Iniciar servidor e frontend 

Na raiz do projeto, execute:

```bash
npm start
```

Isso iniciará automaticamente o servidor WebSocket e o frontend em paralelo.


O frontend estará disponível em `http://localhost:5173` 

## Testes

Para executar os testes unitários do frontend:

```bash
cd frontend
npm test
```

## Tecnologias utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **ws** - Biblioteca WebSocket

### Frontend
- **React 19** - Biblioteca UI
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server
- **Vitest** - Framework de testes
- **React Testing Library** - Testes de componentes

## 📄 Licença

Este projeto foi criado para fins de avaliação técnica.
