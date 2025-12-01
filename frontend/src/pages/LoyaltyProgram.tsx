import { useEffect, useState } from 'react';
import { Trophy, Star, Gift, Crown, Zap, Award } from 'lucide-react';
import axios from 'axios';

interface LoyaltyData {
  points: number;
  tier: string;
  nextTier: string | null;
  pointsToNext: number;
  achievements: any[];
  benefits: string[];
}

const TIER_COLORS: Record<string, string> = {
  BRONZE: 'from-orange-600 to-orange-400',
  SILVER: 'from-gray-400 to-gray-200',
  GOLD: 'from-yellow-500 to-yellow-300',
  PLATINUM: 'from-purple-600 to-purple-400',
  DIAMOND: 'from-cyan-500 to-blue-500'
};

const TIER_ICONS: Record<string, any> = {
  BRONZE: Award,
  SILVER: Star,
  GOLD: Trophy,
  PLATINUM: Crown,
  DIAMOND: Zap
};

export default function LoyaltyProgram() {
  const [loyalty, setLoyalty] = useState<LoyaltyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLoyaltyData();
  }, []);

  const loadLoyaltyData = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:3001/api/loyalty/status', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLoyalty(data);
    } catch (error) {
      console.error('Failed to load loyalty data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  if (!loyalty) return <div>Erro ao carregar dados</div>;

  const TierIcon = TIER_ICONS[loyalty.tier];
  const progress = loyalty.nextTier ? ((loyalty.points % 1000) / 1000) * 100 : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-8 text-center">
          Programa de Fidelidade
        </h1>

        {/* Tier Card */}
        <div className={`bg-gradient-to-r ${TIER_COLORS[loyalty.tier]} rounded-3xl p-8 mb-8 shadow-2xl`}>
          <div className="flex items-center justify-between text-white">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <TierIcon size={48} />
                <h2 className="text-4xl font-bold">{loyalty.tier}</h2>
              </div>
              <p className="text-2xl font-semibold">{loyalty.points.toLocaleString()} pontos</p>
            </div>
            <Gift size={64} className="opacity-50" />
          </div>

          {loyalty.nextTier && (
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Próximo nível: {loyalty.nextTier}</span>
                <span>{loyalty.pointsToNext} pontos restantes</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div
                  className="bg-white rounded-full h-3 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Star className="text-yellow-400" />
              Seus Benefícios
            </h3>
            <ul className="space-y-3">
              {loyalty.benefits.map((benefit, i) => (
                <li key={i} className="text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Trophy className="text-yellow-400" />
              Conquistas Recentes
            </h3>
            <div className="space-y-3">
              {loyalty.achievements.slice(0, 5).map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                  <Award className="text-yellow-400" size={24} />
                  <div>
                    <p className="text-white font-semibold">{achievement.title}</p>
                    <p className="text-gray-300 text-sm">{achievement.points} pontos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rewards */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Gift className="text-pink-400" />
            Recompensas Disponíveis
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Cupom 10% OFF', points: 500, icon: '🎫' },
              { name: 'Frete Grátis', points: 300, icon: '📦' },
              { name: 'Produto Exclusivo', points: 2000, icon: '⭐' },
              { name: 'Upgrade de Tier', points: 1000, icon: '👑' },
              { name: 'Acesso VIP', points: 5000, icon: '💎' },
              { name: 'Consultoria Grátis', points: 1500, icon: '🎨' }
            ].map((reward, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4 text-center cursor-pointer transform hover:scale-105 transition-all ${
                  loyalty.points < reward.points ? 'opacity-50' : ''
                }`}
              >
                <div className="text-4xl mb-2">{reward.icon}</div>
                <h4 className="text-white font-bold mb-1">{reward.name}</h4>
                <p className="text-white/80 text-sm">{reward.points} pontos</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
