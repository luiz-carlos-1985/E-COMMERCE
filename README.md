# 🛍️ E-Commerce Ultra Moderno

> Sistema completo de e-commerce com React, TypeScript, Node.js e PostgreSQL

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org)

## 🎯 Início Rápido

**👉 COMECE AQUI:** Leia [START_HERE.md](START_HERE.md) para instruções detalhadas!

Ou siga o guia rápido abaixo:

## 🚀 Tecnologias

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- Zustand (gerenciamento de estado)
- React Router
- Axios
- Lucide React (ícones)

### Backend
- Node.js + Express + TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Bcrypt

## 📦 Funcionalidades

✅ Catálogo de produtos com busca e filtros  
✅ Carrinho de compras  
✅ Sistema de autenticação (login/registro)  
✅ Checkout e processamento de pedidos  
✅ Painel administrativo completo  
✅ Gestão de produtos (CRUD)  
✅ Gestão de pedidos  
✅ Design responsivo e moderno  

## 🔧 Instalação

### 1. Configurar Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` baseado no `.env.example`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this"
PORT=3001
```

Execute as migrações do Prisma:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

Inicie o servidor:
```bash
npm run dev
```

### 2. Configurar Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em: http://localhost:3000  
O backend estará disponível em: http://localhost:3001

## 📊 Banco de Dados

Certifique-se de ter o PostgreSQL instalado e rodando. Crie um banco de dados chamado `ecommerce`.

## 👤 Usuários

Para criar um usuário administrador, registre-se normalmente e depois atualize o role no banco:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'seu-email@example.com';
```

## 🎨 Design

O sistema possui um design moderno com:
- Gradientes purple/blue
- Animações suaves
- Interface responsiva
- Cards com hover effects
- Ícones modernos

## 📱 Páginas

- **Home**: Catálogo de produtos com busca e filtros
- **Login/Registro**: Autenticação de usuários
- **Carrinho**: Gerenciamento do carrinho de compras
- **Pedidos**: Histórico de pedidos do usuário
- **Admin**: Painel administrativo (apenas para admins)

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- Autenticação JWT
- Rotas protegidas
- Validação de dados

## 📝 API Endpoints

### Auth
- POST `/api/auth/register` - Registrar usuário
- POST `/api/auth/login` - Login

### Products
- GET `/api/products` - Listar produtos
- GET `/api/products/:id` - Buscar produto
- POST `/api/products` - Criar produto (admin)
- PUT `/api/products/:id` - Atualizar produto (admin)
- DELETE `/api/products/:id` - Deletar produto (admin)

### Orders
- POST `/api/orders` - Criar pedido
- GET `/api/orders` - Listar pedidos do usuário
- GET `/api/orders/all` - Listar todos pedidos (admin)
- PATCH `/api/orders/:id/status` - Atualizar status (admin)

## 🚀 Deploy

Para produção, configure as variáveis de ambiente adequadamente e execute:

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
```

## 📄 Licença

MIT
