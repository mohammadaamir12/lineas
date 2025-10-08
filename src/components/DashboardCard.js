import { ArrowRight } from 'lucide-react';

export default function DashboardCard({ icon: Icon, title, value, color,subColor }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-5 border border-gray-100">
      <div 
        className="p-3 rounded-md"
        style={{ 
          backgroundColor: `${color}`, 
          color: color 
        }}
      >
        <Icon size={22} color={subColor} />
      </div>
      <div className="flex-1 px-4">
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className="text-gray-400">
        <ArrowRight size={20} />
      </div>
    </div>
  );
}