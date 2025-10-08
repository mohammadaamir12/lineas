import { ArrowRight } from 'lucide-react';
export default function QuickActionCard({ icon: Icon, title, subtitle, color,subColor ,iconColor}) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-700",
    red: "bg-red-50 text-red-700",
    green: "bg-green-50 text-green-700",
  };

  return (
    <div className={`flex items-center justify-between rounded-lg p-4 shadow-sm  hover:shadow-md transition`}
    style={{backgroundColor: `${color}`, 
          color: color}}
    >
      <div 
        className="p-3 rounded-md"
        style={{ 
          backgroundColor: `${subColor}`, 
          color: subColor 
        }}
      >
        <Icon size={22} color={iconColor} />
      </div>
      <div className="flex-1 px-4">
        <h3 className="text-md font-semibold text-gray-700">{title}</h3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
      <div className="text-gray-400">
        <ArrowRight size={20} />
      </div>
    </div>
  );
}
