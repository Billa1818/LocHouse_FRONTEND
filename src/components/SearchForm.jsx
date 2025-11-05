// src/components/SearchForm.jsx
import { MdLocationOn, MdSearch, MdFilterList } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const types = ["Types", "Résidentiel", "Touristique", "Maison"];
const budgets = ["Budgets", "Moins de 50k", "50k - 100k", "100k - 200k", "Plus de 200k"];
const rooms = ["Rooms", "1", "2", "3", "4+"];

export default function SearchForm({ defaultValues = {}, onSearch }) {
  const [location, setLocation] = useState(defaultValues.location || "");
  const [type, setType] = useState(defaultValues.type || "Tous");
  const [budget, setBudget] = useState(defaultValues.budget || "Tous");
  const [chambres, setChambres] = useState(defaultValues.rooms || "Tous");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type && type !== "Tous") params.set("type", type);
    if (budget && budget !== "Tous") params.set("budget", budget);
    if (chambres && chambres !== "Tous") params.set("rooms", chambres);

    const query = params.toString();
    if (onSearch) {
      onSearch(params);
    } else {
      navigate(`/rechercher${query ? `?${query}` : ""}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1 relative">
          <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Localisation..."
            className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
          />
        </div>

        <select value={type} onChange={(e) => setType(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none">
          {types.map(t => <option key={t}>{t}</option>)}
        </select>

        <select value={budget} onChange={(e) => setBudget(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none">
          {budgets.map(b => <option key={b}>{b}</option>)}
        </select>

        <select value={chambres} onChange={(e) => setChambres(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none">
          {rooms.map(r => <option key={r}>{r}</option>)}
        </select>

        <button type="button" className="px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
          <MdFilterList className="w-5 h-5" />
          <span className="hidden sm:inline">Filtres</span>
        </button>

        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium">
          <MdSearch className="w-5 h-5" />
          <span>Rechercher</span>
        </button>
      </div>
    </form>
  );
}