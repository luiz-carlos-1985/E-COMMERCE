const { PrismaClient } = require('@prisma/client');
const http = require('http');

const prisma = new PrismaClient();

console.log('🔍 Verificando sistema...\n');

async function checkDatabase() {
  try {
    await prisma.$connect();
    const userCount = await prisma.user.count();
    const productCount = await prisma.product.count();
    const orderCount = await prisma.order.count();
    
    console.log('✅ Banco de dados conectado');
    console.log(`   - Usuários: ${userCount}`);
    console.log(`   - Produtos: ${productCount}`);
    console.log(`   - Pedidos: ${orderCount}`);
    
    if (productCount === 0) {
      console.log('⚠️  Nenhum produto encontrado. Execute: npm run prisma:seed');
    }
    
    return true;
  } catch (error) {
    console.log('❌ Erro ao conectar ao banco de dados');
    console.log('   Verifique se o PostgreSQL está rodando');
    console.log('   Verifique as credenciais no arquivo .env');
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

function checkBackend() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/products',
      method: 'GET',
      timeout: 3000
    };

    const req = http.request(options, (res) => {
      console.log('✅ Backend rodando na porta 3001');
      resolve(true);
    });

    req.on('error', () => {
      console.log('❌ Backend não está rodando');
      console.log('   Execute: npm run dev');
      resolve(false);
    });

    req.on('timeout', () => {
      console.log('❌ Backend não respondeu a tempo');
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

function checkFrontend() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET',
      timeout: 3000
    };

    const req = http.request(options, (res) => {
      console.log('✅ Frontend rodando na porta 3000');
      resolve(true);
    });

    req.on('error', () => {
      console.log('❌ Frontend não está rodando');
      console.log('   Execute: cd frontend && npm run dev');
      resolve(false);
    });

    req.on('timeout', () => {
      console.log('❌ Frontend não respondeu a tempo');
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

async function main() {
  const dbOk = await checkDatabase();
  console.log('');
  
  const backendOk = await checkBackend();
  console.log('');
  
  const frontendOk = await checkFrontend();
  console.log('');
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  if (dbOk && backendOk && frontendOk) {
    console.log('🎉 Sistema totalmente funcional!');
    console.log('   Acesse: http://localhost:3000');
  } else {
    console.log('⚠️  Sistema com problemas');
    console.log('   Consulte INICIAR_SISTEMA.md para ajuda');
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main();
