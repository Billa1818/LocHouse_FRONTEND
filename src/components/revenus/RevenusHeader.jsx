import { FaChartLine } from "react-icons/fa";

export default function RevenusHeader() {
  return (
    <div className="mb-8 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
        <FaChartLine className="text-green-600" />
        Mes Revenus
      </h1>
      <p className="text-gray-600 mt-2">Suivez vos paiements et revenus mensuels en temps réel.</p>
    </div>
  );
}