import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');
  
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('admin123', 10);
  const hashedUserPassword = await bcrypt.hash('user123', 10);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@ecommerce.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'ADMIN'
    }
  });

  const user = await prisma.user.create({
    data: {
      email: 'user@ecommerce.com',
      password: hashedUserPassword,
      name: 'Usuário Teste',
      role: 'CUSTOMER'
    }
  });

  console.log('✅ Usuários criados');

  const products = [
    {
      name: 'Notebook Gamer RTX 4060',
      description: 'Notebook de alta performance com RTX 4060, 16GB RAM, SSD 512GB',
      price: 4999.99,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
      category: 'Eletrônicos',
      stock: 15
    },
    {
      name: 'iPhone 15 Pro Max',
      description: 'Smartphone com câmera profissional 48MP, chip A17 Pro e 5G',
      price: 7999.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      category: 'Eletrônicos',
      stock: 30
    },
    {
      name: 'AirPods Pro 2',
      description: 'Fone de ouvido sem fio com cancelamento de ruído ativo',
      price: 1899.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      category: 'Eletrônicos',
      stock: 50
    },
    {
      name: 'Smart TV 55" 4K OLED',
      description: 'Smart TV OLED 4K com HDR10+ e Dolby Vision',
      price: 3499.99,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
      category: 'Eletrônicos',
      stock: 20
    },
    {
      name: 'PlayStation 5',
      description: 'Console de última geração com SSD ultra-rápido',
      price: 3999.99,
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500',
      category: 'Eletrônicos',
      stock: 10
    },
    {
      name: 'Câmera DSLR Canon',
      description: 'Câmera profissional 24MP com lente 18-55mm',
      price: 2799.99,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500',
      category: 'Eletrônicos',
      stock: 12
    },
    {
      name: 'Camiseta Premium Cotton',
      description: 'Camiseta 100% algodão premium com design exclusivo',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      category: 'Roupas',
      stock: 100
    },
    {
      name: 'Jaqueta Jeans',
      description: 'Jaqueta jeans clássica com acabamento premium',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      category: 'Roupas',
      stock: 45
    },
    {
      name: 'Calça Jeans Slim',
      description: 'Calça jeans slim fit com elastano',
      price: 179.99,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
      category: 'Roupas',
      stock: 80
    },
    {
      name: 'Vestido Floral',
      description: 'Vestido floral elegante para ocasiões especiais',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
      category: 'Roupas',
      stock: 35
    },
    {
      name: 'Tênis Nike Air Max',
      description: 'Tênis confortável com tecnologia Air Max para corrida',
      price: 599.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      category: 'Esportes',
      stock: 40
    },
    {
      name: 'Bola de Futebol Profissional',
      description: 'Bola oficial de futebol profissional',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=500',
      category: 'Esportes',
      stock: 60
    },
    {
      name: 'Halteres 10kg (Par)',
      description: 'Par de halteres emborrachados 10kg cada',
      price: 189.99,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500',
      category: 'Esportes',
      stock: 25
    },
    {
      name: 'Clean Code - Robert Martin',
      description: 'Guia essencial para escrever código limpo e manutenível',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500',
      category: 'Livros',
      stock: 60
    },
    {
      name: 'Design Patterns',
      description: 'Padrões de projeto clássicos para desenvolvimento de software',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
      category: 'Livros',
      stock: 45
    },
    {
      name: 'Sofá 3 Lugares',
      description: 'Sofá confortável retrátil e reclinável',
      price: 1899.99,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
      category: 'Casa',
      stock: 8
    },
    {
      name: 'Mesa de Jantar 6 Lugares',
      description: 'Mesa de jantar em madeira maciça',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500',
      category: 'Casa',
      stock: 12
    },
    {
      name: 'Luminária LED Moderna',
      description: 'Luminária de piso LED com controle remoto',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
      category: 'Casa',
      stock: 30
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('✅ Produtos criados');
  console.log('\n📧 Credenciais de acesso:');
  console.log('Admin: admin@ecommerce.com / admin123');
  console.log('User: user@ecommerce.com / user123');
  console.log('\n✅ Seed concluído com sucesso!');
}

main()
  .catch(e => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
