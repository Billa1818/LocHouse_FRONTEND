// src/pages/Rechercher.jsx
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import mockListings from "../data/mockListings";
import ListingCard from "../components/ListingCard";
import SearchForm from "../components/SearchForm";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const ITEMS_PER_PAGE = 9;

const durations = ["Tous", "Court séjour", "Moyen séjour", "Long séjour"];
const furnishedOptions = ["Tous", "Oui", "Non"];
const sortOptions = ["Pertinence", "Prix croissant", "Prix décroissant", "Meilleure note"];

export default function Rechercher() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [duration, setDuration] = useState("Tous");
  const [furnished, setFurnished] = useState("Tous");
  const [sortBy, setSortBy] = useState("Pertinence");
  const [equipments, setEquipments] = useState({ wifi: false, parking: false, pool: false, ac: false });

  // Lire les params URL
  const urlFilters = {
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "Tous",
    budget: searchParams.get("budget") || "Tous",
    rooms: searchParams.get("rooms") || "Tous",
  };

  // Filtrer les données
  const filteredListings = useMemo(() => {
    let filtered = mockListings;

    if (urlFilters.location) {
      filtered = filtered.filter(l => l.location.toLowerCase().includes(urlFilters.location.toLowerCase()));
    }
    if (urlFilters.type && urlFilters.type !== "Tous") {
      filtered = filtered.filter(l => l.type === urlFilters.type);
    }
    if (urlFilters.budget && urlFilters.budget !== "Tous") {
      const [min, max] = urlFilters.budget.includes("Moins") ? [0, 50000] :
                        urlFilters.budget.includes("Plus") ? [200000, Infinity] :
                        [50000, 100000];
      filtered = filtered.filter(l => l.price >= min && l.price <= max);
    }
    if (urlFilters.rooms && urlFilters.rooms !== "Tous") {
      const r = urlFilters.rooms === "4+" ? 4 : parseInt(urlFilters.rooms);
      filtered = filtered.filter(l => urlFilters.rooms === "4+" ? l.rooms >= 4 : l.rooms === r);
    }
    if (duration !== "Tous") filtered = filtered.slice(0, duration.includes("Court") ? 10 : 20);
    if (furnished !== "Tous") filtered = filtered.filter(l => l.furnished === (furnished === "Oui"));
    if (Object.values(equipments).some(v => v)) {
      filtered = filtered.filter(l =>
        (!equipments.wifi || l.wifi) &&
        (!equipments.parking || l.parking) &&
        (!equipments.pool || l.pool) &&
        (!equipments.ac || l.ac)
      );
    }

    // Tri
    if (sortBy === "Prix croissant") filtered.sort((a, b) => a.price - b.price);
    if (sortBy === "Prix décroissant") filtered.sort((a, b) => b.price - a.price);
    if (sortBy === "Meilleure note") filtered.sort((a, b) => b.rating - a.rating);

    return filtered;
  }, [searchParams, duration, furnished, equipments, sortBy]);

  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);
  const paginated = filteredListings.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <SearchForm defaultValues={urlFilters} />

        {/* Filtres secondaires */}
        <div className="mt-6 flex flex-col lg:flex-row gap-4">
          <select value={duration} onChange={e => setDuration(e.target.value)} className="px-4 py-2 rounded-lg border">
            {durations.map(d => <option key={d}>{d}</option>)}
          </select>

          <div className="flex gap-2 flex-wrap">
            {["wifi", "parking", "pool", "ac"].map(eq => (
              <label key={eq} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={equipments[eq]} onChange={e => setEquipments(prev => ({ ...prev, [eq]: e.target.checked }))} className="w-4 h-4 text-blue-600" />
                <span className="capitalize text-sm">{eq === "ac" ? "Clim" : eq}</span>
              </label>
            ))}
          </div>

          <select value={furnished} onChange={e => setFurnished(e.target.value)} className="px-4 py-2 rounded-lg border">
            {furnishedOptions.map(f => <option key={f}>{f === "Tous" ? "Meublé" : f}</option>)}
          </select>

          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-4 py-2 rounded-lg border">
            {sortOptions.map(s => <option key={s}>{s === "Pertinence" ? "Trier par" : s}</option>)}
          </select>
        </div>

        {/* Résultats */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredListings.length} logement{filteredListings.length > 1 ? "s" : ""} disponible{filteredListings.length > 1 ? "s" : ""}
          </h2>
          <p className="text-gray-600">{urlFilters.location || "Bénin entier"}</p>

          {filteredListings.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">Aucun résultat trouvé</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {paginated.map(listing => <ListingCard key={listing.id} listing={listing} />)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg border disabled:opacity-50">
                    <MdChevronLeft className="w-5 h-5" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-medium transition ${
                        currentPage === i + 1 ? "bg-blue-600 text-white" : "border hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg border disabled:opacity-50">
                    <MdChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}