import React, { useState } from "react";
import image from "../assets/home/heroSection.jpg";
import {
  FaMapMarkerAlt,
  FaHome,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaBed,
  FaSlidersH,
  FaSearch,
  FaCrosshairs,
} from "react-icons/fa";

export default function HeroSection() {
  const [showEquipments, setShowEquipments] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    type: "",
    duration: "",
    budget: "",
    bedrooms: "",
  });

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position détectée:", position.coords);
          alert(
            "Position détectée ! Latitude: " +
              position.coords.latitude +
              ", Longitude: " +
              position.coords.longitude
          );
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          alert("Impossible de détecter votre position");
        }
      );
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur");
    }
  };

  const handleSearch = () => {
    console.log("Recherche avec les critères:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative  text-white overflow-hidden bg-black">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt="Background"
          className="w-full h-full object-cover opacity-25"
        />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Trouvez Votre Logement Idéal au Bénin
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Location résidentielle et touristique sécurisée. Découvrez des
            milliers d'annonces vérifiées.
          </p>

          {/* Barre de recherche améliorée */}
          <div className="bg-white rounded-lg shadow-xl p-4 md:p-6">
            <div className="space-y-4">
              {/* Ligne 1 : Localisation et Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Localisation avec détection */}
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Ville, quartier..."
                    className="w-full pl-10 pr-12 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700 p-2"
                    title="Détecter ma position"
                  >
                    <FaCrosshairs className="text-lg" />
                  </button>
                </div>

                {/* Type de location */}
                <div className="relative">
                  <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="">Type de location</option>
                    <option value="residentiel">Résidentiel</option>
                    <option value="touristique">Touristique</option>
                  </select>
                </div>
              </div>

              {/* Ligne 2 : Durée et Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Durée */}
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="">Durée du séjour</option>
                    <option value="court">Court séjour (- 1 mois)</option>
                    <option value="moyen">Moyen séjour (1-6 mois)</option>
                    <option value="long">Long séjour (+ 6 mois)</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="relative">
                  <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="">Budget</option>
                    <option value="0-50000">Moins de 50 000 FCFA</option>
                    <option value="50000-100000">50 000 - 100 000 FCFA</option>
                    <option value="100000-200000">
                      100 000 - 200 000 FCFA
                    </option>
                    <option value="200000-500000">
                      200 000 - 500 000 FCFA
                    </option>
                    <option value="500000+">Plus de 500 000 FCFA</option>
                  </select>
                </div>
              </div>

              {/* Ligne 3 : Chambres et Équipements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Nombre de chambres */}
                <div className="relative">
                  <FaBed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="">Nombre de chambres</option>
                    <option value="1">1 chambre</option>
                    <option value="2">2 chambres</option>
                    <option value="3">3 chambres</option>
                    <option value="4">4 chambres</option>
                    <option value="5+">5+ chambres</option>
                  </select>
                </div>

                {/* Équipements */}
                <div className="relative">
                  <FaSlidersH className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowEquipments(!showEquipments)}
                    className="w-full pl-10 pr-4 py-3 text-left text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50 transition"
                  >
                    Équipements
                  </button>
                </div>
              </div>

              {/* Bouton de recherche */}
              <button
                type="button"
                onClick={handleSearch}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center space-x-2 mx-auto"
              >
                <FaSearch />
                <span>Rechercher</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
