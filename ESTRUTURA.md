# 📁 Estrutura do Projeto

```
E-COMMERCE/
│
├── backend/                          # Backend Node.js + Express
│   ├── prisma/
│   │   ├── schema.prisma            # Schema do banco de dados
│   │   └── seed.ts                  # Dados iniciais
│   ├── src/
│   │   ├── controllers/             # Lógica de negócio
│   │   │   ├── authController.ts    # Autenticação
│   │   │   ├── orderController.ts   # Pedidos
│   │   │   └── productController.ts # Produtos
│   │   ├── middleware/
│   │   │   └── auth.ts              # Middleware de autenticação
│   │   ├── routes/                  # Rotas da API
│   │   │   ├── authRoutes.ts
│   │   │   ├── orderRoutes.ts
│   │   │   └── productRoutes.ts
│   │   ├── utils/
│   │   │   └── jwt.ts               # Utilitários JWT
│   │   └── server.ts                # Servidor principal
│   ├── .env.example                 # Exemplo de variáveis de ambiente
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                         # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/              # Componentes reutilizáveis
│   │   │   ├── Navbar.tsx           # Barra de navegação
│   │   │   └── ProductCard.tsx      # Card de produto
│   │   ├── pages/                   # Páginas da aplicação
│   │   │   ├── Admin.tsx            # Painel administrativo
│   │   │   ├── Cart.tsx             # Carrinho de compras
│   │   │   ├── Home.tsx             # Página inicial
│   │   │   ├── Login.tsx            # Login
│   │   │   ├── Orders.tsx           # Pedidos do usuário
│   │   │   └── Register.tsx         # Cadastro
│   │   ├── services/
│   │   │   └── api.ts               # Configuração Axios
│   │   ├── store/
│   │   │   └── useStore.ts          # Store Zustand
│   │   ├── types/
│   │   │   └── index.ts             # Tipos TypeScript
│   │   ├── App.tsx                  # Componente principal
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Estilos globais
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .gitignore
├── README.md                         # Documentação principal
├── QUICK_START.md                    # Guia rápido
└── ESTRUTURA.md                      # Este arquivo

```

## 🎯 Arquitetura

### Backend (MVC Pattern)
- **Models**: Definidos no Prisma Schema
- **Controllers**: Lógica de negócio
- **Routes**: Endpoints da API
- **Middleware**: Autenticação e validação

### Frontend (Component-Based)
- **Components**: Componentes reutilizáveis
- **Pages**: Páginas completas
- **Store**: Estado global (Zustand)
- **Services**: Comunicação com API

## 🔄 Fluxo de Dados

1. **Frontend** → Requisição HTTP (Axios)
2. **Backend** → Middleware de autenticação
3. **Backend** → Controller processa
4. **Backend** → Prisma consulta banco
5. **Backend** → Resposta JSON
6. **Frontend** → Atualiza estado (Zustand)
7. **Frontend** → Re-renderiza componentes

## 🗄️ Banco de Dados

### Tabelas
- **User**: Usuários do sistema
- **Product**: Produtos do catálogo
- **Order**: Pedidos realizados
- **OrderItem**: Itens de cada pedido

### Relacionamentos
- User 1:N Order
- Order 1:N OrderItem
- Product 1:N OrderItem

## 🔐 Autenticação

1. Usuário faz login
2. Backend valida credenciais
3. Backend gera token JWT
4. Frontend armazena token (localStorage)
5. Frontend envia token em cada requisição
6. Backend valida token via middleware

## 🎨 Estilização

- **Tailwind CSS**: Framework utility-first
- **Gradientes**: Purple/Blue theme
- **Responsivo**: Mobile-first approach
- **Ícones**: Lucide React
