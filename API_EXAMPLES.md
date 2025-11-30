# 📡 Exemplos de Uso da API

Base URL: `http://localhost:3001/api`

## 🔐 Autenticação

### Registrar Usuário
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}

# Resposta
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "joao@example.com",
    "name": "João Silva",
    "role": "CUSTOMER"
  }
}
```

### Login
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}

# Resposta (mesma do registro)
```

## 🛍️ Produtos

### Listar Produtos
```bash
GET /products

# Com filtros
GET /products?category=Eletrônicos
GET /products?search=notebook
GET /products?category=Roupas&search=camiseta
```

### Buscar Produto
```bash
GET /products/:id
```

### Criar Produto (Admin)
```bash
POST /products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Produto Novo",
  "description": "Descrição do produto",
  "price": 199.99,
  "image": "https://example.com/image.jpg",
  "category": "Eletrônicos",
  "stock": 50
}
```

### Atualizar Produto (Admin)
```bash
PUT /products/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Produto Atualizado",
  "price": 249.99,
  "stock": 30
}
```

### Deletar Produto (Admin)
```bash
DELETE /products/:id
Authorization: Bearer {token}
```

## 📦 Pedidos

### Criar Pedido
```bash
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    {
      "productId": "uuid-do-produto",
      "quantity": 2,
      "price": 199.99
    },
    {
      "productId": "uuid-do-produto-2",
      "quantity": 1,
      "price": 99.99
    }
  ]
}

# Resposta
{
  "id": "uuid",
  "userId": "uuid",
  "total": 499.97,
  "status": "PENDING",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "orderItems": [...]
}
```

### Listar Pedidos do Usuário
```bash
GET /orders
Authorization: Bearer {token}
```

### Listar Todos Pedidos (Admin)
```bash
GET /orders/all
Authorization: Bearer {token}
```

### Atualizar Status do Pedido (Admin)
```bash
PATCH /orders/:id/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "SHIPPED"
}

# Status possíveis:
# - PENDING
# - PROCESSING
# - SHIPPED
# - DELIVERED
# - CANCELLED
```

## 🔑 Headers Necessários

Para rotas protegidas, sempre inclua:
```
Authorization: Bearer {seu-token-jwt}
Content-Type: application/json
```

## ⚠️ Códigos de Status

- `200` - Sucesso
- `201` - Criado com sucesso
- `204` - Sucesso sem conteúdo
- `400` - Requisição inválida
- `401` - Não autenticado
- `403` - Sem permissão
- `404` - Não encontrado
- `500` - Erro no servidor

## 🧪 Testando com cURL

### Exemplo completo de fluxo:

```bash
# 1. Registrar
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"123456"}'

# 2. Listar produtos
curl http://localhost:3001/api/products

# 3. Criar pedido (substitua {TOKEN})
curl -X POST http://localhost:3001/api/orders \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"items":[{"productId":"uuid","quantity":1,"price":99.99}]}'
```

## 📝 Notas

- Tokens JWT expiram em 7 dias
- Senhas são criptografadas com bcrypt
- Todas as datas estão em formato ISO 8601
- IDs são UUIDs v4
