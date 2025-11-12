import { FaMoneyBillWave, FaCalendarAlt, FaExclamationTriangle } from "react-icons/fa";
import StatCard from "../StatCard";
import { formatCFA } from "../../data/formatters"; // AJOUTÉ !

export default function RevenusStatsCards({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total perçu"
        value={formatCFA(data.total)}
        icon={<FaMoneyBillWave />}
        color="green"
        trend="+12%"
      />
      <StatCard
        title="Mois en cours"
        value={formatCFA(data.moisCourant)}
        icon={<FaCalendarAlt />}
        color="blue"
      />
      <StatCard
        title="En attente"
        value={formatCFA(data.enAttente)}
        icon={<FaExclamationTriangle />}
        color="yellow"
      />
    </div>
  );
}