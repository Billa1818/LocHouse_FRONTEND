// src/pages/Rechercher.jsx → VERSION FINALE + BOUTON AVIS
import { useState, useMemo } from "react";
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
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [duration, setDuration] = useState("Tous");
  const [furnished, setFurnished] = useState("Tous");
  const [sortBy, setSortBy] = useState("Pertinence");
  const [equipments, setEquipments] = useState({ wifi: false, parking: false, pool: false, ac: false });

  const urlFilters = {
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "Tous",
    budget: searchParams.get("budget") || "Tous",
    rooms: searchParams.get("rooms") || "Tous",
  };

  const filteredListings = useMemo(() => {
    let filtered = [...mockListings];

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
    if (duration !== "Tous") {
      const limit = duration.includes("Court") ? 10 : 20;
      filtered = filtered.slice(0, limit);
    }
    if (furnished !== "Tous") {
      filtered = filtered.filter(l => l.furnished === (furnished === "Oui"));
    }
    if (Object.values(equipments).some(v => v)) {
      filtered = filtered.filter(l =>
        (!equipments.wifi || l.wifi) &&
        (!equipments.parking || l.parking) &&
        (!equipments.pool || l.pool) &&
        (!equipments.ac || l.ac)
      );
    }

    if (sortBy === "Prix croissant") filtered.sort((a, b) => a.price - b.price);
    if (sortBy === "Prix décroissant") filtered.sort((a, b) => b.price - a.price);
    if (sortBy === "Meilleure note") filtered.sort((a, b) => b.rating - a.rating);

    return filtered;
  }, [searchParams, duration, furnished, equipments, sortBy]);

  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);
  const paginated = filteredListings.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const totalReviews = filteredListings.reduce((sum, l) => sum + l.reviews, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-6">
        <SearchForm defaultValues={urlFilters} />

        {/* Filtres secondaires */}
        <div className="mt-6 flex flex-col lg:flex-row gap-4 flex-wrap">
          <select value={duration} onChange={e => setDuration(e.target.value)} className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500">
            {durations.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <div className="flex gap-3 flex-wrap">
            {["wifi", "parking", "pool", "ac"].map(eq => (
              <label key={eq} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={equipments[eq]}
                  onChange={e => setEquipments(prev => ({ ...prev, [eq]: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium capitalize">{eq === "ac" ? "Clim" : eq}</span>
              </label>
            ))}
          </div>

          <select value={furnished} onChange={e => setFurnished(e.target.value)} className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500">
            {furnishedOptions.map(f => <option key={f} value={f}>{f === "Tous" ? "Meublé" : f}</option>)}
          </select>

          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500">
            {sortOptions.map(s => <option key={s} value={s}>{s === "Pertinence" ? "Trier par" : s}</option>)}
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
              <p className="text-gray-500 text-lg">Aucun résultat trouvé</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {paginated.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100 transition"
                  >
                    <MdChevronLeft className="w-5 h-5" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-medium transition ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "border hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100 transition"
                  >
                    <MdChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}

          {/* BOUTON "VOIR TOUS LES AVIS" EN BAS */}
          {filteredListings.length > 0 && totalReviews > 0 && (
            <div className="mt-16 text-center">
              <Link
                to="/avis"
                className="inline-block w-full max-w-md mx-auto bg-white border-2 border-blue-600 text-blue-600 py-4 px-8 rounded-xl font-bold text-lg hover:bg-blue-50 transition shadow-md"
              >
                Voir tous les {totalReviews} avis
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}