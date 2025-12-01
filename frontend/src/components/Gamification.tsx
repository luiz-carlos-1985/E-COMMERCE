import { useState, useEffect } from 'react';
import { Trophy, Star, Zap, Gift, Award, TrendingUp } from 'lucide-react';
import { useStore } from '../store/useStore';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  progress: number;
  total: number;
  unlocked: boolean;
  points: number;
}

export default function Gamification() {
  const user = useStore(state => state.user);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Primeira Compra',
      description: 'Realize sua primeira compra',
      icon: Trophy,
      progress: 0,
      total: 1,
      unlocked: false,
      points: 100
    },
    {
      id: '2',
      title: 'Comprador Frequente',
      description: 'Realize 10 compras',
      icon: Star,
      progress: 0,
      total: 10,
      unlocked: false,
      points: 500
    },
    {
      id: '3',
      title: 'Avaliador Expert',
      description: 'Avalie 5 produtos',
      icon: Award,
      progress: 0,
      total: 5,
      unlocked: false,
      points: 200
    },
    {
      id: '4',
      title: 'Caçador de Ofertas',
      description: 'Compre 3 produtos em promoção',
      icon: Zap,
      progress: 0,
      total: 3,
      unlocked: false,
      points: 150
    }
  ]);

  useEffect(() => {
    const savedPoints = localStorage.getItem('gamification-points');
    if (savedPoints) {
      setPoints(parseInt(savedPoints));
      setLevel(Math.floor(parseInt(savedPoints) / 1000) + 1);
    }
  }, []);

  const addPoints = (amount: number) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    setLevel(Math.floor(newPoints / 1000) + 1);
    localStorage.setItem('gamification-points', newPoints.toString());
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev =>
      prev.map(achievement =>
        achievement.id === id
          ? { ...achievement, unlocked: true, progress: achievement.total }
          : achievement
      )
    );
    const achievement = achievements.find(a => a.id === id);
    if (achievement) {
      addPoints(achievement.points);
      useStore.getState().addNotification('success', `Conquista desbloqueada: ${achievement.title}! +${achievement.points} pontos`);
    }
  };

  const progressToNextLevel = ((points % 1000) / 1000) * 100;

  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            Nível {level}
          </h3>
          <p className="text-purple-100 text-sm">{points} pontos totais</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{points % 1000}</div>
          <div className="text-xs text-purple-100">/ 1000 para próximo nível</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-white/20 rounded-full h-3 overflow-hidden">
          <div
            className="bg-white h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressToNextLevel}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 transition-all ${
              achievement.unlocked ? 'ring-2 ring-yellow-400' : 'opacity-70'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-yellow-400 text-purple-900' : 'bg-white/20'}`}>
                <achievement.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                <p className="text-xs text-purple-100 mb-2">{achievement.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span>{achievement.progress}/{achievement.total}</span>
                  <span className="font-bold">+{achievement.points} pts</span>
                </div>
                <div className="bg-white/20 rounded-full h-1 mt-2 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full transition-all"
                    style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
          <Gift className="w-6 h-6 mx-auto mb-1" />
          <div className="text-lg font-bold">5</div>
          <div className="text-xs text-purple-100">Recompensas</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
          <TrendingUp className="w-6 h-6 mx-auto mb-1" />
          <div className="text-lg font-bold">#{Math.floor(Math.random() * 100)}</div>
          <div className="text-xs text-purple-100">Ranking</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
          <Star className="w-6 h-6 mx-auto mb-1" />
          <div className="text-lg font-bold">{achievements.filter(a => a.unlocked).length}</div>
          <div className="text-xs text-purple-100">Conquistas</div>
        </div>
      </div>
    </div>
  );
}
