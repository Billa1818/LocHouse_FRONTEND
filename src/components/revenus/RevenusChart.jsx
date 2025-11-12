import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RevenusChart({ data }) {
  const chartData = {
    labels: ["Payés", "En attente"],
    datasets: [
      {
        data: [data.moisCourant, data.enAttente],
        backgroundColor: ["#10b981", "#fbbf24"],
        hoverBackgroundColor: ["#059669", "#f59e0b"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw.toLocaleString()} FCFA` } },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Répartition des revenus</h3>
      <div className="h-64">
        <Pie data={chartData} options={options} />
      </div>
    </motion.div>
  );
}