import { Star, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews] = useState<Review[]>([
    { id: '1', userName: 'João Silva', rating: 5, comment: 'Produto excelente! Superou minhas expectativas.', date: '2024-01-15', helpful: 12 },
    { id: '2', userName: 'Maria Santos', rating: 4, comment: 'Muito bom, entrega rápida.', date: '2024-01-10', helpful: 8 }
  ]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Avaliações</h3>
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="border-b dark:border-gray-700 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {review.userName[0]}
                </div>
                <div>
                  <p className="font-semibold">{review.userName}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} fill={i < review.rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('pt-BR')}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{review.comment}</p>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600 transition">
              <ThumbsUp size={14} /> Útil ({review.helpful})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
