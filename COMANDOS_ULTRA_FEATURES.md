# ⚡ Comandos Rápidos - Funcionalidades Ultra Modernas

## 🚀 Instalação Completa (Primeira Vez)

```bash
# 1. Atualizar banco de dados
cd backend
npx prisma migrate dev --name add_ultra_features
npx prisma generate

# 2. Seed com dados de exemplo (opcional)
npm run prisma:seed

# 3. Iniciar backend
npm run dev
```

```bash
# Em outro terminal - Frontend
cd frontend
npm run dev
```

## 🔄 Resetar Banco de Dados (Se necessário)

```bash
cd backend
npx prisma migrate reset
npx prisma migrate dev
npx prisma generate
npm run prisma:seed
```

## 📊 Verificar Sistema

```bash
cd backend
npm run check
```

## 🎯 Acessar Funcionalidades

Após iniciar o sistema, acesse:

- **Dashboard:** http://localhost:3000/dashboard
- **Programa de Fidelidade:** http://localhost:3000/loyalty
- **Loja Metaverso:** http://localhost:3000/metaverse
- **Estilista Pessoal:** http://localhost:3000/stylist
- **Home:** http://localhost:3000/

## 🔐 Usuários de Teste

**Admin:**
- Email: admin@ecommerce.com
- Senha: admin123

**Usuário:**
- Email: user@ecommerce.com
- Senha: user123

## 🛠️ Comandos de Desenvolvimento

### Backend
```bash
cd backend
npm run dev          # Iniciar em modo desenvolvimento
npm run build        # Build para produção
npm start            # Iniciar produção
npm run check        # Verificar sistema
```

### Frontend
```bash
cd frontend
npm run dev          # Iniciar em modo desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview da build
```

## 🗄️ Comandos Prisma

```bash
cd backend

# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Gerar Prisma Client
npx prisma generate

# Abrir Prisma Studio (GUI do banco)
npx prisma studio

# Resetar banco de dados
npx prisma migrate reset

# Aplicar migrations em produção
npx prisma migrate deploy
```

## 🧪 Testar Funcionalidades

### 1. Programa de Fidelidade
```bash
# Fazer login
# Acessar /loyalty
# Verificar pontos e tier
# Testar resgate de recompensas
```

### 2. Metaverso
```bash
# Fazer login
# Acessar /metaverse
# Criar/personalizar avatar
# Explorar loja 3D
# Testar experimentação virtual
```

### 3. Estilista Pessoal
```bash
# Fazer login
# Acessar /stylist
# Criar perfil de estilo
# Ver recomendações
# Gerar looks automáticos
```

## 📝 Adicionar Produtos com Modelo 3D

```sql
-- Conectar ao PostgreSQL
psql -U postgres -d ecommerce

-- Atualizar produto com modelo 3D
UPDATE "Product" 
SET "model3D" = '/models/product.glb', 
    "metaversePrice" = 99.90,
    "colors" = ARRAY['preto', 'branco', 'azul'],
    "sizes" = ARRAY['P', 'M', 'G'],
    "tags" = ARRAY['casual', 'moderno', 'verão']
WHERE id = 'ID_DO_PRODUTO';
```

## 🎨 Personalizar Tiers de Fidelidade

Edite: `backend/src/controllers/loyaltyController.ts`

```typescript
const TIER_THRESHOLDS = {
  BRONZE: 0,
  SILVER: 1000,    // Altere aqui
  GOLD: 5000,      // Altere aqui
  PLATINUM: 15000, // Altere aqui
  DIAMOND: 50000   // Altere aqui
};
```

## 🔧 Troubleshooting

### Erro: "Cannot find module"
```bash
cd backend
npm install
cd ../frontend
npm install
```

### Erro: "Database connection failed"
```bash
# Verificar PostgreSQL está rodando
# Windows:
services.msc
# Procurar por PostgreSQL

# Verificar .env
cd backend
cat .env
# DATABASE_URL deve estar correto
```

### Erro: "Port already in use"
```bash
# Backend (porta 3001)
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Frontend (porta 3000)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Páginas não carregam
```bash
# Limpar cache do navegador
# Ctrl + Shift + Delete

# Verificar console do navegador
# F12 > Console

# Verificar token JWT
# F12 > Application > Local Storage
# Deve ter 'token' e 'user'
```

## 📦 Build para Produção

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
# Arquivos em: frontend/dist
```

## 🚀 Deploy Rápido

### Backend (Heroku exemplo)
```bash
cd backend
heroku create seu-app-backend
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

### Frontend (Vercel exemplo)
```bash
cd frontend
vercel --prod
```

## 📊 Monitoramento

```bash
# Ver logs do backend
cd backend
npm run dev
# Logs aparecem no terminal

# Ver logs do frontend
cd frontend
npm run dev
# Logs aparecem no terminal e console do navegador
```

## 🎯 Próximos Passos

1. ✅ Testar todas as funcionalidades
2. ✅ Personalizar cores e estilos
3. ✅ Adicionar mais produtos
4. ✅ Configurar analytics
5. ✅ Deploy em produção

## 💡 Dicas

- Use `Ctrl + C` para parar servidores
- Mantenha 2 terminais abertos (backend + frontend)
- Verifique logs para debug
- Use Prisma Studio para visualizar dados
- Teste em diferentes navegadores

## 📞 Comandos Úteis

```bash
# Ver versão do Node
node --version

# Ver versão do npm
npm --version

# Limpar cache do npm
npm cache clean --force

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Ver processos rodando
# Windows:
tasklist | findstr node

# Matar todos processos Node
# Windows:
taskkill /F /IM node.exe
```

---

## 🎉 Sistema Pronto!

Agora você tem um e-commerce ultra moderno com:
- ✅ Programa de Fidelidade
- ✅ Loja no Metaverso
- ✅ Estilista Pessoal IA
- ✅ Dashboard Unificado

**Acesse:** http://localhost:3000/dashboard
