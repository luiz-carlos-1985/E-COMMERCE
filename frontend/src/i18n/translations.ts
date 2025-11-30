export const translations = {
  pt: {
    nav: { products: 'Produtos', orders: 'Pedidos', admin: 'Admin', logout: 'Sair', login: 'Entrar', register: 'Cadastrar' },
    home: { title: 'Produtos em Destaque', search: 'Buscar produtos...', allCategories: 'Todas Categorias', addToCart: 'Adicionar', stock: 'Estoque', outOfStock: 'Esgotado' },
    cart: { title: 'Carrinho', empty: 'Carrinho Vazio', continue: 'Continuar Comprando', subtotal: 'Subtotal', total: 'Total', checkout: 'Finalizar Pedido', success: 'Pedido realizado!' },
    auth: { name: 'Nome', email: 'Email', password: 'Senha', loginBtn: 'Entrar', registerBtn: 'Cadastrar', hasAccount: 'Já tem conta?', noAccount: 'Não tem conta?' },
    orders: { title: 'Meus Pedidos', order: 'Pedido', status: { PENDING: 'Pendente', PROCESSING: 'Processando', SHIPPED: 'Enviado', DELIVERED: 'Entregue', CANCELLED: 'Cancelado' } },
    admin: { title: 'Painel Admin', products: 'Produtos', orders: 'Pedidos', newProduct: 'Novo Produto', save: 'Salvar', cancel: 'Cancelar', delete: 'Excluir', edit: 'Editar' }
  },
  en: {
    nav: { products: 'Products', orders: 'Orders', admin: 'Admin', logout: 'Logout', login: 'Login', register: 'Sign Up' },
    home: { title: 'Featured Products', search: 'Search products...', allCategories: 'All Categories', addToCart: 'Add to Cart', stock: 'Stock', outOfStock: 'Out of Stock' },
    cart: { title: 'Shopping Cart', empty: 'Empty Cart', continue: 'Continue Shopping', subtotal: 'Subtotal', total: 'Total', checkout: 'Checkout', success: 'Order placed!' },
    auth: { name: 'Name', email: 'Email', password: 'Password', loginBtn: 'Login', registerBtn: 'Sign Up', hasAccount: 'Have an account?', noAccount: "Don't have an account?" },
    orders: { title: 'My Orders', order: 'Order', status: { PENDING: 'Pending', PROCESSING: 'Processing', SHIPPED: 'Shipped', DELIVERED: 'Delivered', CANCELLED: 'Cancelled' } },
    admin: { title: 'Admin Panel', products: 'Products', orders: 'Orders', newProduct: 'New Product', save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit' }
  },
  es: {
    nav: { products: 'Productos', orders: 'Pedidos', admin: 'Admin', logout: 'Salir', login: 'Entrar', register: 'Registrarse' },
    home: { title: 'Productos Destacados', search: 'Buscar productos...', allCategories: 'Todas Categorías', addToCart: 'Agregar', stock: 'Stock', outOfStock: 'Agotado' },
    cart: { title: 'Carrito', empty: 'Carrito Vacío', continue: 'Seguir Comprando', subtotal: 'Subtotal', total: 'Total', checkout: 'Finalizar', success: '¡Pedido realizado!' },
    auth: { name: 'Nombre', email: 'Email', password: 'Contraseña', loginBtn: 'Entrar', registerBtn: 'Registrarse', hasAccount: '¿Tienes cuenta?', noAccount: '¿No tienes cuenta?' },
    orders: { title: 'Mis Pedidos', order: 'Pedido', status: { PENDING: 'Pendiente', PROCESSING: 'Procesando', SHIPPED: 'Enviado', DELIVERED: 'Entregado', CANCELLED: 'Cancelado' } },
    admin: { title: 'Panel Admin', products: 'Productos', orders: 'Pedidos', newProduct: 'Nuevo Producto', save: 'Guardar', cancel: 'Cancelar', delete: 'Eliminar', edit: 'Editar' }
  }
};

export type Language = keyof typeof translations;
