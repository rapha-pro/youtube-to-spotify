import { CardProps } from '@/types';


const Card: React.FC<CardProps> = ({ title, description, icon }) => {
  return (
    <div className="feature-card bg-gray-800/50 border border-gray-700 p-6 hover:border-green-500/50 transition-colors rounded-lg">
      {icon && <div className="h-12 w-12 mb-4">{icon}</div>}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default Card;