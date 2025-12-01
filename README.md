# 🛍️ E-Commerce Ultra Moderno - Próxima Geração 🚀

> Sistema completo de e-commerce com IA, Real-Time, PWA e tecnologias de ponta
> React 18 + TypeScript 5.5 + Node.js 20 + PostgreSQL 15 + Socket.io + AI

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org)

## 🎯 Início Rápido

**🚀 NOVO! Melhorias Ultra Modernas:** [INICIO_RAPIDO_MELHORIAS.md](INICIO_RAPIDO_MELHORIAS.md)

**👉 COMECE AQUI:** Leia [LEIA_PRIMEIRO.md](LEIA_PRIMEIRO.md) para instruções completas!

**📚 Documentação Completa:**

**🆕 Melhorias Ultra Modernas:**
- 🚀 [INICIO_RAPIDO_MELHORIAS.md](INICIO_RAPIDO_MELHORIAS.md) - Início rápido (10 min)
- ✨ [MELHORIAS_ULTRA_MODERNAS.md](MELHORIAS_ULTRA_MODERNAS.md) - Visão completa
- 🎨 [GUIA_VISUAL_MELHORIAS.md](GUIA_VISUAL_MELHORIAS.md) - Guia visual
- 📊 [RESUMO_MELHORIAS.md](RESUMO_MELHORIAS.md) - Resumo técnico
- ⚡ [COMANDOS_INSTALACAO.md](COMANDOS_INSTALACAO.md) - Comandos rápidos
- 🔧 [INSTALACAO_MELHORIAS.md](INSTALACAO_MELHORIAS.md) - Instalação detalhada

**📖 Documentação Original:**
- ⭐ [LEIA_PRIMEIRO.md](LEIA_PRIMEIRO.md) - Guia de navegação
- 📖 [INICIAR_SISTEMA.md](INICIAR_SISTEMA.md) - Instalação passo a passo
- ✅ [CHECKLIST_INSTALACAO.md](CHECKLIST_INSTALACAO.md) - Checklist de verificação
- ⚡ [COMANDOS_RAPIDOS.md](COMANDOS_RAPIDOS.md) - Comandos úteis
- 🧪 [TESTES_MANUAIS.md](TESTES_MANUAIS.md) - Como testar

Ou siga o guia rápido abaixo:

## 🚀 Tecnologias

### Frontend
- React 18 + TypeScript 5.5
- Tailwind CSS 4
- Zustand (gerenciamento de estado)
- React Router
- Axios
- Lucide React (ícones)
- **Socket.io-client** (real-time) 🆕
- **Service Workers** (PWA) 🆕

### Backend
- Node.js 20 + Express + TypeScript 5.5
- PostgreSQL 15+
- Prisma ORM
- JWT Authentication
- Bcrypt
- **Socket.io** (WebSocket) 🆕
- **AI Recommendation Engine** 🆕

## 📦 Funcionalidades

### 🎯 Funcionalidades Básicas
✅ Catálogo de produtos com busca e filtros  
✅ Carrinho de compras  
✅ Sistema de autenticação (login/registro)  
✅ Checkout e processamento de pedidos  
✅ Painel administrativo completo  
✅ Gestão de produtos (CRUD)  
✅ Gestão de pedidos  
✅ Design responsivo e moderno

### 🚀 Funcionalidades Ultra Modernas (NOVO!)
✨ **IA Integrada** - Recomendações personalizadas com machine learning  
⚡ **Real-Time** - WebSocket para atualizações instantâneas  
📱 **PWA Completo** - Instalável e funciona offline  
🎨 **3D Product Viewer** - Visualização 360° interativa  
🎮 **Gamification** - Sistema de pontos, níveis e conquistas  
📊 **Analytics Avançado** - Dashboard com métricas em tempo real  
🔍 **Smart Search** - Busca inteligente com IA  
🔔 **Push Notifications** - Notificações em tempo real  
💾 **Offline-First** - Cache inteligente com Service Workers  
🤖 **AI Chatbot** - Assistente virtual inteligente  

## 🔧 Instalação

### ⚡ Início Rápido

```bash
# 1. Criar banco de dados
psql -U postgres
CREATE DATABASE ecommerce;
\q

# 2. Configurar Backend
cd backend
npm install
# Configure o .env com suas credenciais
npx prisma migrate dev --name init
npx prisma generate
npm run prisma:seed
npm run dev

# 3. Configurar Frontend (novo terminal)
cd frontend
npm install
npm run dev
```

### 📋 Guia Detalhado

Para instruções completas, consulte: **[INICIAR_SISTEMA.md](INICIAR_SISTEMA.md)**

### ✅ Verificar Sistema

```bash
cd backend
npm run check
```

O frontend estará disponível em: http://localhost:3000  
O backend estará disponível em: http://localhost:3001

## 📊 Banco de Dados

Certifique-se de ter o PostgreSQL instalado e rodando. Crie um banco de dados chamado `ecommerce`.

## 👤 Usuários

O seed cria automaticamente usuários de teste:

**Administrador:**
- Email: admin@ecommerce.com
- Senha: admin123

**Usuário:**
- Email: user@ecommerce.com
- Senha: user123

Para criar mais admins manualmente:
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
