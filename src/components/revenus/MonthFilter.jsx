import { useState } from "react";

export default function MonthFilter({ onFilter }) {
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const currentMonth = new Date().getMonth();
  const [selected, setSelected] = useState(currentMonth);

  const handleChange = (e) => {
    const month = parseInt(e.target.value);
    setSelected(month);
    onFilter(month);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-700">Mois :</label>
      <select
        value={selected}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {months.map((m, i) => (
          <option key={i} value={i}>{m} 2025</option>
        ))}
      </select>
    </div>
  );
}