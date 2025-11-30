# 🚀 Guia de Deploy

## 📋 Checklist Pré-Deploy

### Backend
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados em produção criado
- [ ] Migrações aplicadas
- [ ] Seed executado (opcional)
- [ ] Build gerado (`npm run build`)
- [ ] Testes passando
- [ ] CORS configurado corretamente
- [ ] Rate limiting implementado
- [ ] Logs configurados

### Frontend
- [ ] URL da API atualizada
- [ ] Build gerado (`npm run build`)
- [ ] Assets otimizados
- [ ] Meta tags configuradas
- [ ] Favicon adicionado
- [ ] Analytics configurado
- [ ] PWA configurado (opcional)

## 🌐 Opções de Deploy

### 1. Heroku (Fácil e Gratuito)

#### Backend
```bash
# Instalar Heroku CLI
# Login
heroku login

# Criar app
heroku create seu-ecommerce-api

# Adicionar PostgreSQL
heroku addons:create heroku-postgresql:mini

# Configurar variáveis
heroku config:set JWT_SECRET=sua-secret-key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Rodar migrações
heroku run npx prisma migrate deploy
```

#### Frontend
```bash
# Build
npm run build

# Deploy no Heroku
heroku create seu-ecommerce-front
heroku buildpacks:set heroku/nodejs
git push heroku main
```

### 2. Vercel (Frontend) + Railway (Backend)

#### Frontend (Vercel)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Configurar variável de ambiente
# VITE_API_URL=https://seu-backend.railway.app
```

#### Backend (Railway)
1. Acesse railway.app
2. Conecte seu repositório GitHub
3. Adicione PostgreSQL
4. Configure variáveis de ambiente
5. Deploy automático

### 3. AWS (Profissional)

#### Backend (EC2 + RDS)
```bash
# 1. Criar instância EC2
# 2. Criar banco RDS PostgreSQL
# 3. Conectar via SSH
ssh -i key.pem ubuntu@ip-da-instancia

# 4. Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 5. Clonar repositório
git clone seu-repo
cd backend
npm install
npm run build

# 6. Configurar PM2
npm install -g pm2
pm2 start dist/server.js --name ecommerce-api
pm2 startup
pm2 save

# 7. Configurar Nginx
sudo apt install nginx
# Configurar proxy reverso
```

#### Frontend (S3 + CloudFront)
```bash
# 1. Build
npm run build

# 2. Upload para S3
aws s3 sync dist/ s3://seu-bucket --delete

# 3. Configurar CloudFront
# 4. Configurar domínio
```

### 4. DigitalOcean (Simples)

#### App Platform
1. Conecte repositório GitHub
2. Configure build commands:
   - Backend: `npm run build`
   - Frontend: `npm run build`
3. Configure variáveis de ambiente
4. Deploy automático

### 5. Docker (Qualquer Plataforma)

#### Backend Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ecommerce
      POSTGRES_PASSWORD: senha
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://postgres:senha@postgres:5432/ecommerce
      JWT_SECRET: sua-secret
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

## 🔐 Variáveis de Ambiente

### Backend (.env)
```env
# Produção
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=sua-super-secret-key-muito-segura
NODE_ENV=production
PORT=3001

# Opcional
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha
```

### Frontend (.env)
```env
VITE_API_URL=https://api.seu-dominio.com
```

## 🔧 Configurações de Produção

### Backend

#### CORS
```typescript
// src/server.ts
app.use(cors({
  origin: ['https://seu-dominio.com'],
  credentials: true
}));
```

#### Rate Limiting
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

#### Helmet
```typescript
import helmet from 'helmet';
app.use(helmet());
```

### Frontend

#### Vite Config
```typescript
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  }
});
```

## 📊 Monitoramento

### Logs
```bash
# PM2
pm2 logs

# Docker
docker logs container-name

# Heroku
heroku logs --tail
```

### Métricas
- New Relic
- DataDog
- Sentry (erros)
- Google Analytics (frontend)

## 🔄 CI/CD

### GitHub Actions

#### .github/workflows/deploy.yml
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '20'
      
      - name: Install Backend
        run: cd backend && npm ci
      
      - name: Build Backend
        run: cd backend && npm run build
      
      - name: Install Frontend
        run: cd frontend && npm ci
      
      - name: Build Frontend
        run: cd frontend && npm run build
      
      - name: Deploy
        run: |
          # Seus comandos de deploy
```

## 🌍 Domínio Personalizado

### Configurar DNS
```
A     @     seu-ip-servidor
CNAME www   seu-dominio.com
```

### SSL/HTTPS
```bash
# Let's Encrypt (Gratuito)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com
```

## 📈 Otimizações

### Backend
- [ ] Compressão (gzip)
- [ ] Cache (Redis)
- [ ] CDN para assets
- [ ] Database indexing
- [ ] Connection pooling

### Frontend
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Image optimization
- [ ] CDN para assets
- [ ] Service Worker (PWA)

## 🐛 Troubleshooting

### Erro: "Cannot connect to database"
```bash
# Verificar string de conexão
# Verificar firewall
# Verificar IP whitelist
```

### Erro: "CORS policy"
```typescript
// Adicionar domínio ao CORS
app.use(cors({
  origin: ['https://seu-dominio.com']
}));
```

### Erro: "Module not found"
```bash
# Limpar e reinstalar
rm -rf node_modules
npm ci
```

## ✅ Checklist Pós-Deploy

- [ ] Site acessível via HTTPS
- [ ] API respondendo corretamente
- [ ] Banco de dados conectado
- [ ] Login funcionando
- [ ] Cadastro funcionando
- [ ] Produtos carregando
- [ ] Carrinho funcionando
- [ ] Checkout funcionando
- [ ] Admin acessível
- [ ] Logs configurados
- [ ] Backup configurado
- [ ] Monitoramento ativo
- [ ] SSL válido
- [ ] Performance OK (Lighthouse)

## 🎉 Deploy Completo!

Seu e-commerce está no ar! 🚀

### Próximos Passos
1. Monitorar logs
2. Configurar backups
3. Testar todas funcionalidades
4. Configurar alertas
5. Documentar URLs
6. Treinar usuários

---

**Boa sorte com seu e-commerce! 🛍️**
