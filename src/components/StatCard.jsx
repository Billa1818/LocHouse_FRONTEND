export default function StatCard({ title, value, icon, color, trend }) {
  const colors = {
    green: "from-green-500 to-green-600",
    blue: "from-blue-500 to-blue-600",
    yellow: "from-yellow-500 to-yellow-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:scale-105 transition-transform duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {trend && <p className="mt-1 text-sm text-green-600">{trend} vs mois dernier</p>}
        </div>
        <div className={`p-3 rounded-full bg-gradient-to-br ${colors[color]} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}