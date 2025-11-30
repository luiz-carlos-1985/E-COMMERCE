import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import api from '../services/api';
import { Product, Order } from '../types';

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', description: '', price: 0, image: '', category: '', stock: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    api.get('/products').then(res => setProducts(res.data));
    api.get('/orders/all').then(res => setOrders(res.data));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form);
      } else {
        await api.post('/products', form);
      }
      setShowForm(false);
      setEditingId(null);
      setForm({ name: '', description: '', price: 0, image: '', category: '', stock: 0 });
      loadData();
    } catch {
      alert('Erro ao salvar produto');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja excluir este produto?')) {
      await api.delete(`/products/${id}`);
      loadData();
    }
  };

  const handleEdit = (product: Product) => {
    setForm(product);
    setEditingId(product.id);
    setShowForm(true);
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await api.patch(`/orders/${id}/status`, { status });
    loadData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Painel Administrativo</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Produtos</h2>
            <button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-purple-700 hover:to-blue-700 transition">
              <Plus size={20} /> Novo Produto
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <input type="text" placeholder="Nome" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="px-4 py-2 rounded-lg border" required />
              <input type="text" placeholder="Categoria" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="px-4 py-2 rounded-lg border" required />
              <input type="number" placeholder="Preço" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} className="px-4 py-2 rounded-lg border" required />
              <input type="number" placeholder="Estoque" value={form.stock} onChange={e => setForm({...form, stock: Number(e.target.value)})} className="px-4 py-2 rounded-lg border" required />
              <input type="text" placeholder="URL da Imagem" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="px-4 py-2 rounded-lg border col-span-2" required />
              <textarea placeholder="Descrição" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="px-4 py-2 rounded-lg border col-span-2" required />
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">Salvar</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">Cancelar</button>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Nome</th>
                  <th className="px-4 py-2 text-left">Categoria</th>
                  <th className="px-4 py-2 text-left">Preço</th>
                  <th className="px-4 py-2 text-left">Estoque</th>
                  <th className="px-4 py-2 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b">
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">{product.category}</td>
                    <td className="px-4 py-2">R$ {product.price.toFixed(2)}</td>
                    <td className="px-4 py-2">{product.stock}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button onClick={() => handleEdit(product)} className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Pedidos</h2>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">Pedido #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-gray-600">Cliente: {order.user?.name}</p>
                    <p className="text-sm text-gray-600">Total: R$ {order.total.toFixed(2)}</p>
                  </div>
                  <select value={order.status} onChange={e => updateOrderStatus(order.id, e.target.value)} className="px-3 py-1 rounded border">
                    <option value="PENDING">Pendente</option>
                    <option value="PROCESSING">Processando</option>
                    <option value="SHIPPED">Enviado</option>
                    <option value="DELIVERED">Entregue</option>
                    <option value="CANCELLED">Cancelado</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
