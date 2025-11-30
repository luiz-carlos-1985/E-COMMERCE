import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.create({
    data: {
      email: 'admin@ecommerce.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'ADMIN'
    }
  });

  const products = [
    {
      name: 'Notebook Gamer',
      description: 'Notebook de alta performance para jogos e trabalho',
      price: 4999.99,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
      category: 'Eletrônicos',
      stock: 15
    },
    {
      name: 'Smartphone Pro',
      description: 'Smartphone com câmera profissional e 5G',
      price: 2999.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      category: 'Eletrônicos',
      stock: 30
    },
    {
      name: 'Fone Bluetooth',
      description: 'Fone de ouvido sem fio com cancelamento de ruído',
      price: 599.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      category: 'Eletrônicos',
      stock: 50
    },
    {
      name: 'Camiseta Premium',
      description: 'Camiseta de algodão premium com design exclusivo',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      category: 'Roupas',
      stock: 100
    },
    {
      name: 'Tênis Esportivo',
      description: 'Tênis confortável para corrida e academia',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      category: 'Esportes',
      stock: 40
    },
    {
      name: 'Livro Desenvolvimento',
      description: 'Guia completo de programação moderna',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500',
      category: 'Livros',
      stock: 60
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('✅ Seed concluído!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
