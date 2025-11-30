import { Leaf, Recycle, Wind, Droplet } from 'lucide-react';

interface Props {
  score: number;
}

export default function SustainabilityScore({ score }: Props) {
  const getColor = () => {
    if (score >= 80) return 'from-green-400 to-emerald-600';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-orange-400 to-red-500';
  };

  return (
    <div className={`bg-gradient-to-br ${getColor()} text-white rounded-xl p-4`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Leaf size={24} />
          <span className="font-bold">Sustentabilidade</span>
        </div>
        <span className="text-3xl font-bold">{score}</span>
      </div>
      <div className="w-full bg-white/30 rounded-full h-2 mb-3">
        <div className="bg-white h-full rounded-full transition-all" style={{ width: `${score}%` }} />
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
          <Recycle size={16} className="mx-auto mb-1" />
          <p>Reciclável</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
          <Wind size={16} className="mx-auto mb-1" />
          <p>Carbono Zero</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
          <Droplet size={16} className="mx-auto mb-1" />
          <p>Eco-Friendly</p>
        </div>
      </div>
    </div>
  );
}
