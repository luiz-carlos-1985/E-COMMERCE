# 🛠️ Comandos Úteis

## 📦 Instalação

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## 🚀 Desenvolvimento

### Iniciar Backend
```bash
cd backend
npm run dev
```
Servidor rodando em: http://localhost:3001

### Iniciar Frontend
```bash
cd frontend
npm run dev
```
Aplicação rodando em: http://localhost:3000

### Iniciar Ambos (Windows)
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

## 🗄️ Banco de Dados

### Criar Migração
```bash
cd backend
npx prisma migrate dev --name nome_da_migracao
```

### Aplicar Migrações
```bash
npx prisma migrate deploy
```

### Gerar Cliente Prisma
```bash
npx prisma generate
```

### Popular Banco (Seed)
```bash
npm run prisma:seed
```

### Abrir Prisma Studio
```bash
npx prisma studio
```
Interface visual em: http://localhost:5555

### Reset do Banco
```bash
npx prisma migrate reset
```
⚠️ Isso apaga todos os dados!

## 🏗️ Build

### Build Backend
```bash
cd backend
npm run build
```
Arquivos gerados em: `dist/`

### Build Frontend
```bash
cd frontend
npm run build
```
Arquivos gerados em: `dist/`

### Preview do Build (Frontend)
```bash
npm run preview
```

## 🧪 Testes

### Testar API com cURL

#### Registrar
```bash
curl -X POST http://localhost:3001/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test\",\"email\":\"test@test.com\",\"password\":\"123456\"}"
```

#### Login
```bash
curl -X POST http://localhost:3001/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@test.com\",\"password\":\"123456\"}"
```

#### Listar Produtos
```bash
curl http://localhost:3001/api/products
```

## 🔍 Debug

### Ver Logs do Backend
```bash
cd backend
npm run dev
# Logs aparecem no terminal
```

### Verificar Conexão com Banco
```bash
cd backend
npx prisma db pull
```

### Verificar Variáveis de Ambiente
```bash
# Windows
echo %DATABASE_URL%

# Ou no Node
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL)"
```

## 🧹 Limpeza

### Limpar node_modules
```bash
# Backend
cd backend
rmdir /s /q node_modules
del package-lock.json

# Frontend
cd frontend
rmdir /s /q node_modules
del package-lock.json
```

### Limpar Build
```bash
# Backend
cd backend
rmdir /s /q dist

# Frontend
cd frontend
rmdir /s /q dist
```

### Reinstalar Tudo
```bash
# Backend
cd backend
rmdir /s /q node_modules
del package-lock.json
npm install

# Frontend
cd frontend
rmdir /s /q node_modules
del package-lock.json
npm install
```

## 📊 Prisma

### Ver Schema Atual
```bash
cd backend
type prisma\schema.prisma
```

### Formatar Schema
```bash
npx prisma format
```

### Validar Schema
```bash
npx prisma validate
```

### Gerar Diagrama ER
```bash
npx prisma generate
# Depois abra o Prisma Studio
npx prisma studio
```

## 🔐 Segurança

### Gerar Nova Secret Key
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Verificar Dependências Vulneráveis
```bash
npm audit
npm audit fix
```

## 📝 Git

### Inicializar Repositório
```bash
git init
git add .
git commit -m "Initial commit: E-commerce completo"
```

### Criar .gitignore
Já criado! Inclui:
- node_modules
- dist
- .env
- *.log

## 🌐 Deploy

### Preparar para Produção

#### Backend
```bash
cd backend
npm run build
# Configurar variáveis de ambiente no servidor
# Executar: npm start
```

#### Frontend
```bash
cd frontend
npm run build
# Fazer upload da pasta dist/ para servidor
```

## 🔄 Atualizar Dependências

### Verificar Atualizações
```bash
npm outdated
```

### Atualizar Todas
```bash
npm update
```

### Atualizar Específica
```bash
npm install package@latest
```

## 💡 Dicas

### Rodar em Portas Diferentes

#### Backend (.env)
```env
PORT=3002
```

#### Frontend (vite.config.ts)
```typescript
server: { port: 3001 }
```

### Modo de Produção Local
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

### Verificar Processos nas Portas
```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Matar processo
taskkill /PID <PID> /F
```

## 🆘 Troubleshooting Rápido

### Erro: "Cannot find module"
```bash
npm install
```

### Erro: "Port already in use"
```bash
# Mude a porta ou mate o processo
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Erro: "Prisma Client not generated"
```bash
cd backend
npx prisma generate
```

### Erro: "Database connection failed"
```bash
# Verifique se PostgreSQL está rodando
# Verifique DATABASE_URL no .env
# Teste conexão:
psql -U postgres -d ecommerce
```

### Frontend não conecta ao Backend
```bash
# Verifique se backend está rodando
# Verifique URL em frontend/src/services/api.ts
# Deve ser: http://localhost:3001/api
```
