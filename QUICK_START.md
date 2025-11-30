# 🚀 Guia Rápido de Início

## Pré-requisitos
- Node.js 18+ instalado
- PostgreSQL instalado e rodando
- npm ou yarn

## Passo a Passo

### 1️⃣ Configurar Banco de Dados

Crie um banco PostgreSQL:
```sql
CREATE DATABASE ecommerce;
```

### 2️⃣ Configurar Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env`:
```env
DATABASE_URL="postgresql://postgres:senha@localhost:5432/ecommerce?schema=public"
JWT_SECRET="meu-super-secret-jwt-key-123456"
PORT=3001
```

Execute as migrações e seed:
```bash
npx prisma migrate dev --name init
npx prisma generate
npm run prisma:seed
```

Inicie o backend:
```bash
npm run dev
```

### 3️⃣ Configurar Frontend

Abra um novo terminal:
```bash
cd frontend
npm install
npm run dev
```

### 4️⃣ Acessar o Sistema

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### 5️⃣ Login Administrador

Use as credenciais criadas pelo seed:
- Email: `admin@ecommerce.com`
- Senha: `admin123`

## 🎉 Pronto!

Agora você pode:
- Navegar pelos produtos
- Adicionar ao carrinho
- Fazer pedidos
- Acessar o painel admin (com usuário admin)
- Gerenciar produtos e pedidos

## 📝 Criar Novo Usuário

Clique em "Cadastrar" e crie sua conta de cliente.

## 🛠️ Comandos Úteis

### Backend
```bash
npm run dev          # Modo desenvolvimento
npm run build        # Build para produção
npm start            # Rodar produção
npm run prisma:seed  # Popular banco de dados
```

### Frontend
```bash
npm run dev      # Modo desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview da build
```

## 🐛 Problemas Comuns

### Erro de conexão com banco
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no `.env`
- Teste a conexão: `psql -U postgres -d ecommerce`

### Porta já em uso
- Backend: Altere `PORT` no `.env`
- Frontend: Altere `port` no `vite.config.ts`

### Erro ao instalar dependências
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
```
