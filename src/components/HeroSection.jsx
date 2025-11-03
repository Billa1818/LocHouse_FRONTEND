import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  FaMapMarkerAlt,
  FaHome,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaBed,
  FaSlidersH,
  FaSearch,
  FaCrosshairs,
  FaTimes,
  FaWifi,
  FaSnowflake,
  FaSwimmer,
  FaCar,
  FaTint,
  FaBolt,
  FaShieldAlt,
  FaUtensils,
  FaTv,
  FaTree,
  FaDumbbell,
  FaCouch,
} from "react-icons/fa";
import heroBg from "../assets/home/heroSection.jpg";

// === CONFIG DES INPUTS ===
const INPUT_CONFIG = [
  {
    name: "location",
    placeholder: "Ville, quartier...",
    icon: FaMapMarkerAlt,
    type: "text",
    hasDetect: true,
  },
  {
    name: "type",
    placeholder: "Type de location",
    icon: FaHome,
    type: "select",
    options: [
      { value: "", label: "Type de location" },
      { value: "residentiel", label: "Résidentiel" },
      { value: "touristique", label: "Touristique" },
    ],
  },
  {
    name: "duration",
    placeholder: "Durée du séjour",
    icon: FaCalendarAlt,
    type: "select",
    options: [
      { value: "", label: "Durée du séjour" },
      { value: "court", label: "Court séjour (- 1 mois)" },
      { value: "moyen", label: "Moyen séjour (1-6 mois)" },
      { value: "long", label: "Long séjour (+ 6 mois)" },
    ],
  },
  {
    name: "budget",
    placeholder: "Budget",
    icon: FaMoneyBillWave,
    type: "select",
    options: [
      { value: "", label: "Budget" },
      { value: "0-50000", label: "Moins de 50 000 FCFA" },
      { value: "50000-100000", label: "50 000 - 100 000 FCFA" },
      { value: "100000-200000", label: "100 000 - 200 000 FCFA" },
      { value: "200000-500000", label: "200 000 - 500 000 FCFA" },
      { value: "500000+", label: "Plus de 500 000 FCFA" },
    ],
  },
  {
    name: "bedrooms",
    placeholder: "Nombre de chambres",
    icon: FaBed,
    type: "select",
    options: [
      { value: "", label: "Nombre de chambres" },
      { value: "1", label: "1 chambre" },
      { value: "2", label: "2 chambres" },
      { value: "3", label: "3 chambres" },
      { value: "4", label: "4 chambres" },
      { value: "5+", label: "5+ chambres" },
    ],
  },
];

// === TOUS LES ÉQUIPEMENTS ===
const EQUIPMENTS = [
  { id: "wifi", label: "WiFi", icon: FaWifi },
  { id: "clim", label: "Climatisation", icon: FaSnowflake },
  { id: "piscine", label: "Piscine", icon: FaSwimmer },
  { id: "parking", label: "Parking", icon: FaCar },
  { id: "eau", label: "Eau courante", icon: FaTint },
  { id: "electricite", label: "Électricité", icon: FaBolt },
  { id: "securite", label: "Sécurité 24h/24", icon: FaShieldAlt },
  { id: "cuisine", label: "Cuisine équipée", icon: FaUtensils },
  { id: "tv", label: "Télévision", icon: FaTv },
  { id: "jardin", label: "Jardin", icon: FaTree },
  { id: "sport", label: "Salle de sport", icon: FaDumbbell },
  { id: "meuble", label: "Meublé", icon: FaCouch },
];

export default function HeroSection() {
  const [formData, setFormData] = useState({
    location: "",
    type: "",
    duration: "",
    budget: "",
    bedrooms: "",
    equipments: [], // ← tableau des IDs sélectionnés
  });

  const [showEquipments, setShowEquipments] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const modalRef = useRef(null);

  // === HANDLERS ===
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSearch = useCallback(() => {
    console.log(" RECHERCHE COMPLÈTE :", formData);
    // TODO: envoie à ton API
  }, [formData]);

  const handleDetectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Géolocalisation non supportée");
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setFormData((prev) => ({
          ...prev,
          location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        }));
        setDetecting(false);
        alert(`Position détectée !\nLat: ${latitude.toFixed(4)} | Lng: ${longitude.toFixed(4)}`);
      },
      () => {
        setDetecting(false);
        alert("Permission refusée ou timeout");
      },
      { timeout: 10000 }
    );
  }, []);

  // === MODALE ÉQUIPEMENTS ===
  const openModal = () => {
    setSelectedEquipments(formData.equipments);
    setShowEquipments(true);
  };

  const closeModal = () => setShowEquipments(false);

  const resetEquipments = () => setSelectedEquipments([]);

  const applyEquipments = () => {
    setFormData((prev) => ({ ...prev, equipments: selectedEquipments }));
    closeModal();
  };

  const toggleEquipment = (id) => {
    setSelectedEquipments((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  // Fermer avec Échap ou clic dehors
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && closeModal();
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) closeModal();
    };
    if (showEquipments) {
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEquipments]);

  // === RENDER INPUTS ===
  const renderInput = ({ name, placeholder, icon: Icon, type, options, hasDetect }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
      {type === "select" ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="w-full pl-10 pr-10 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
          aria-label={placeholder}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={placeholder}
        />
      )}
      {hasDetect && (
        <button
          type="button"
          onClick={handleDetectLocation}
          disabled={detecting}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 p-2 disabled:opacity-50"
          title="Détecter ma position"
        >
          <FaCrosshairs className={`text-lg ${detecting ? "animate-pulse" : ""}`} />
        </button>
      )}
    </div>
  );

  // Texte du bouton Équipements
  const equipLabel = formData.equipments.length
    ? `Équipements (${formData.equipments.length})`
    : "Équipements";

  return (
    <>
      {/* === HERO SECTION === */}
      <section className="relative text-white overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Logements au Bénin"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Trouvez Votre Logement Idéal au Bénin
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Location résidentielle et touristique sécurisée.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="bg-white rounded-xl shadow-2xl p-5 md:p-8"
            >
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INPUT_CONFIG.map((field) => (
                    <div key={field.name}>{renderInput(field)}</div>
                  ))}

                  {/* BOUTON ÉQUIPEMENTS */}
                  <div className="relative">
                    <FaSlidersH className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
                    <button
                      type="button"
                      onClick={openModal}
                      className="w-full pl-10 pr-4 py-3 text-left text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50 transition flex items-center justify-between"
                    >
                      <span>{equipLabel}</span>
                      <span className="text-gray-500">▼</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition font-bold text-lg flex items-center justify-center space-x-3 mx-auto shadow-lg"
                >
                  <FaSearch className="text-xl" />
                  <span>Rechercher</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* === MODALE ÉQUIPEMENTS === */}
      {showEquipments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                Sélectionner les équipements
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Fermer"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>

            {/* Contenu */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {EQUIPMENTS.map(({ id, label, icon: Icon }) => (
                  <label
                    key={id}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={selectedEquipments.includes(id)}
                      onChange={() => toggleEquipment(id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <Icon className="text-2xl text-blue-600" />
                    <span className="text-gray-800 font-medium">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-4 p-6 border-t bg-gray-50 rounded-b-2xl">
              <button
                type="button"
                onClick={resetEquipments}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Réinitialiser
              </button>
              <button
                type="button"
                onClick={applyEquipments}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
              >
                Appliquer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}