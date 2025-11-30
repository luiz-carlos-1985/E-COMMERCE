# 🎨 Guia de Customização

## Cores e Tema

### Alterar Cores Principais

Edite `frontend/tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... adicione suas cores
          600: '#0284c7',
          700: '#0369a1',
        }
      }
    }
  }
}
```

### Gradientes

Substitua `from-purple-600 to-blue-600` por suas cores:
- Navbar: `frontend/src/components/Navbar.tsx`
- Botões: Busque por `gradient` nos arquivos

## 🖼️ Imagens e Logo

### Logo da Loja

Em `frontend/src/components/Navbar.tsx`, linha 10:
```tsx
<Link to="/" className="text-2xl font-bold">🛍️ Sua Loja</Link>
```

Substitua por:
```tsx
<Link to="/">
  <img src="/logo.png" alt="Logo" className="h-10" />
</Link>
```

### Imagens de Produtos

Use URLs de serviços como:
- Unsplash: `https://images.unsplash.com/...`
- Cloudinary
- AWS S3
- Seu próprio servidor

## 📧 Configurações de Email

Adicione ao backend para notificações:

```typescript
// backend/src/utils/email.ts
import nodemailer from 'nodemailer';

export const sendOrderConfirmation = async (email: string, orderId: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: 'noreply@sualore.com',
    to: email,
    subject: 'Pedido Confirmado',
    html: `Seu pedido #${orderId} foi confirmado!`
  });
};
```

## 💳 Integração de Pagamento

### Stripe

```bash
npm install stripe
```

```typescript
// backend/src/controllers/paymentController.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createPaymentIntent = async (amount: number) => {
  return await stripe.paymentIntents.create({
    amount: amount * 100, // centavos
    currency: 'brl'
  });
};
```

### Mercado Pago

```bash
npm install mercadopago
```

## 📦 Adicionar Frete

```typescript
// backend/src/utils/shipping.ts
export const calculateShipping = (cep: string, weight: number) => {
  // Integre com Correios, Melhor Envio, etc.
  return {
    price: 15.00,
    days: 5
  };
};
```

## 🔍 SEO

### Meta Tags

Em `frontend/index.html`:
```html
<head>
  <meta name="description" content="Sua descrição">
  <meta property="og:title" content="Sua Loja">
  <meta property="og:image" content="https://...">
  <link rel="icon" href="/favicon.ico">
</head>
```

### React Helmet

```bash
npm install react-helmet-async
```

## 📱 PWA (Progressive Web App)

Adicione `frontend/public/manifest.json`:
```json
{
  "name": "Sua Loja",
  "short_name": "Loja",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#9333ea",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 🌍 Internacionalização

```bash
npm install react-i18next i18next
```

```typescript
// frontend/src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: { welcome: 'Bem-vindo' } },
    en: { translation: { welcome: 'Welcome' } }
  },
  lng: 'pt',
  fallbackLng: 'pt'
});
```

## 📊 Analytics

### Google Analytics

```html
<!-- frontend/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## 🔔 Notificações

### Toast Notifications

```bash
npm install react-hot-toast
```

```tsx
import toast, { Toaster } from 'react-hot-toast';

// Em App.tsx
<Toaster position="top-right" />

// Usar
toast.success('Produto adicionado!');
toast.error('Erro ao processar');
```

## 🎯 Recursos Adicionais

### Avaliações de Produtos
- Adicione campo `rating` no schema
- Crie componente de estrelas
- Permita comentários

### Wishlist (Lista de Desejos)
- Adicione tabela `Wishlist` no Prisma
- Crie endpoints CRUD
- Adicione botão de favoritar

### Cupons de Desconto
- Tabela `Coupon` com código e desconto
- Validação no checkout
- Aplicação do desconto

### Chat de Suporte
- Integre Socket.io
- Crie componente de chat
- Sistema de tickets

## 🚀 Performance

### Lazy Loading

```tsx
import { lazy, Suspense } from 'react';

const Admin = lazy(() => import('./pages/Admin'));

<Suspense fallback={<div>Carregando...</div>}>
  <Admin />
</Suspense>
```

### Image Optimization

```tsx
<img 
  src={product.image} 
  loading="lazy"
  srcSet={`${product.image}?w=400 400w, ${product.image}?w=800 800w`}
/>
```

## 🔒 Segurança Extra

### Rate Limiting

```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

### Helmet

```bash
npm install helmet
```

```typescript
import helmet from 'helmet';
app.use(helmet());
```
