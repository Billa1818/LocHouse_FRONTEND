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
  FaStar,
  FaArrowLeft,
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

// === 20 DONNÉES FICTIVES 100% BÉNIN ===
const FAKE_PROPERTIES = [
  { id: 1, title: "Villa de Luxe Fidjrossè", price: 95000, bedrooms: 5, location: "Fidjrossè", rating: 4.9, image: "https://images.unsplash.com/photo-1613490493576-7fbecc31db04?w=800", equipments: ["wifi","clim","piscine","parking","securite","jardin","meuble","sport"] },
  { id: 2, title: "Appart Cosy Akpakpa", price: 42000, bedrooms: 2, location: "Akpakpa", rating: 4.6, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", equipments: ["wifi","tv","cuisine","eau","clim"] },
  { id: 3, title: "Studio Moderne Cadjèhoun", price: 35000, bedrooms: 1, location: "Cadjèhoun", rating: 4.5, image: "https://images.unsplash.com/photo-1502672260266-9d1ccddfe4d8?w=800", equipments: ["wifi","clim","parking","tv"] },
  { id: 4, title: "Maison Familiale Gbegamey", price: 135000, bedrooms: 6, location: "Gbegamey", rating: 5.0, image: "https://images.unsplash.com/photo-1576941089067-2de3c901608a?w=800", equipments: ["wifi","piscine","jardin","sport","securite","cuisine","meuble"] },
  { id: 5, title: "Duplex Vue Mer", price: 88000, bedrooms: 3, location: "Cotonou Plage", rating: 4.8, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", equipments: ["wifi","clim","parking","tv","cuisine","securite"] },
  { id: 6, title: "T3 Lumineux Vodje", price: 55000, bedrooms: 3, location: "Vodje", rating: 4.7, image: "https://images.unsplash.com/photo-1580587776467-2d1e44e0f6a2?w=800", equipments: ["wifi","clim","eau","electricite","cuisine"] },
  { id: 7, title: "Résidence Agla", price: 38000, bedrooms: 2, location: "Agla", rating: 4.4, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", equipments: ["wifi","parking","tv","eau"] },
  { id: 8, title: "Penthouse Tokpa", price: 180000, bedrooms: 4, location: "Tokpa", rating: 4.9, image: "https://images.unsplash.com/photo-1600563438938-a9a27216b4dc?w=800", equipments: ["wifi","piscine","sport","jardin","securite","meuble"] },
  { id: 9, title: "Bungalow Zongo", price: 29000, bedrooms: 1, location: "Zongo", rating: 4.3, image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800", equipments: ["wifi","eau","electricite"] },
  { id: 10, title: "Villa Écologique Cocotomey", price: 110000, bedrooms: 4, location: "Cocotomey", rating: 4.8, image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800", equipments: ["wifi","jardin","piscine","securite","meuble"] },
  { id: 11, title: "Appart Haie Vive", price: 48000, bedrooms: 2, location: "Haie Vive", rating: 4.6, image: "https://images.unsplash.com/photo-1568605114967-7f5f71f54e44?w=800", equipments: ["wifi","clim","parking","tv"] },
  { id: 12, title: "Maison Jericho", price: 72000, bedrooms: 3, location: "Jericho", rating: 4.7, image: "https://images.unsplash.com/photo-1600565193348-396df2a6e9a3?w=800", equipments: ["wifi","cuisine","securite","jardin"] },
  { id: 13, title: "Studio Vossa", price: 32000, bedrooms: 1, location: "Vossa", rating: 4.4, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800", equipments: ["wifi","clim","tv"] },
  { id: 14, title: "Loft Saint Michel", price: 65000, bedrooms: 2, location: "Saint Michel", rating: 4.8, image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800", equipments: ["wifi","parking","sport"] },
  { id: 15, title: "Résidence Les Cocotiers", price: 150000, bedrooms: 5, location: "Les Cocotiers", rating: 5.0, image: "https://images.unsplash.com/photo-1600585154526-990dced4cb0d?w=800", equipments: ["wifi","piscine","jardin","securite","meuble","sport"] },
  { id: 16, title: "T2 Moderne Ganhi", price: 41000, bedrooms: 2, location: "Ganhi", rating: 4.5, image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800", equipments: ["wifi","clim","eau"] },
  { id: 17, title: "Villa Djeffa", price: 98000, bedrooms: 4, location: "Djeffa", rating: 4.7, image: "https://images.unsplash.com/photo-1600563440095-5d0308f1c29b?w=800", equipments: ["wifi","piscine","jardin","parking"] },
  { id: 18, title: "Studio Étoile", price: 28000, bedrooms: 1, location: "Étoile", rating: 4.3, image: "https://images.unsplash.com/photo-1519643381401-22c44e6055b8?w=800", equipments: ["wifi","tv"] },
  { id: 19, title: "Duplex Missebo", price: 78000, bedrooms: 3, location: "Missebo", rating: 4.6, image: "https://images.unsplash.com/photo-1600563438938-a9a27216b4dc?w=800", equipments: ["wifi","clim","cuisine","securite"] },
  { id: 20, title: "Palais Moderne Zone Résidentielle", price: 280000, bedrooms: 8, location: "Zone 4", rating: 5.0, image: "https://images.unsplash.com/photo-1600607687644-1f8b88f1f3a6?w=800", equipments: ["wifi","piscine","sport","jardin","securite","meuble","cuisine","tv"] },
];

export default function HeroSection() {
  const [formData, setFormData] = useState({
    location: "",
    type: "",
    duration: "",
    budget: "",
    bedrooms: "",
    equipments: [],
  });

  const [showEquipments, setShowEquipments] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [detecting, setDetecting] = useState(false);
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const modalRef = useRef(null);

  // === FILTRE INTELLIGENT ===
  const doSearch = () => {
    let results = [...FAKE_PROPERTIES];

    if (formData.location) {
      results = results.filter(p => p.location.toLowerCase().includes(formData.location.toLowerCase()));
    }
    if (formData.bedrooms) {
      const minBed = formData.bedrooms === "5+" ? 5 : parseInt(formData.bedrooms);
      results = results.filter(p => p.bedrooms >= minBed);
    }
    if (formData.budget) {
      const max = formData.budget === "500000+" ? Infinity : parseInt(formData.budget.split("-")[1]);
      results = results.filter(p => p.price <= max);
    }
    if (formData.equipments.length > 0) {
      results = results.filter(p => formData.equipments.every(eq => p.equipments.includes(eq)));
    }

    setFiltered(results);
    setShowResults(true);
  };

  // === HANDLERS ===
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleDetectLocation = useCallback(() => {
    if (!navigator.geolocation) return alert("Géolocalisation non supportée");
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setFormData(prev => ({ ...prev, location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
        setDetecting(false);
        alert(`Position détectée !\nLat: ${latitude.toFixed(4)} | Lng: ${longitude.toFixed(4)}`);
      },
      () => { setDetecting(false); alert("Permission refusée"); },
      { timeout: 10000 }
    );
  }, []);

  // === MODALE ===
  const openModal = () => { setSelectedEquipments(formData.equipments); setShowEquipments(true); };
  const closeModal = () => setShowEquipments(false);
  const resetEquipments = () => setSelectedEquipments([]);
  const applyEquipments = () => { setFormData(prev => ({ ...prev, equipments: selectedEquipments })); closeModal(); };
  const toggleEquipment = (id) => setSelectedEquipments(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);

  // Fermer modale
  useEffect(() => {
    const esc = e => e.key === "Escape" && closeModal();
    const outside = e => modalRef.current && !modalRef.current.contains(e.target) && closeModal();
    if (showEquipments) {
      document.addEventListener("keydown", esc);
      document.addEventListener("mousedown", outside);
    }
    return () => {
      document.removeEventListener("keydown", esc);
      document.removeEventListener("mousedown", outside);
    };
  }, [showEquipments]);

  const equipLabel = formData.equipments.length ? `Équipements (${formData.equipments.length})` : "Équipements";

  // === ICÔNE ÉQUIPEMENT ===
  const EquipIcon = ({ id }) => {
    const eq = EQUIPMENTS.find(e => e.id === id);
    const Icon = eq?.icon || FaWifi;
    return <Icon className="text-blue-600" />;
  };

  // === RENDER INPUT ===
  const renderInput = ({ name, placeholder, icon: Icon, type, options, hasDetect }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
      {type === "select" ? (
        <select name={name} value={formData[name]} onChange={handleChange}
          className="w-full pl-10 pr-10 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer">
          {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      ) : (
        <input type="text" name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      )}
      {hasDetect && (
        <button type="button" onClick={handleDetectLocation} disabled={detecting}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 p-2 disabled:opacity-50">
          <FaCrosshairs className={`text-lg ${detecting ? "animate-pulse" : ""}`} />
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* === PAGE PRINCIPALE OU RÉSULTATS === */}
      {!showResults ? (
        /* === HERO SECTION === */
        <section className="relative text-white overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <img src={heroBg} alt="Logements au Bénin" className="w-full h-full object-cover opacity-30" loading="lazy" />
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

              <form onSubmit={(e) => { e.preventDefault(); doSearch(); }} className="bg-white rounded-xl shadow-2xl p-5 md:p-8">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {INPUT_CONFIG.map(field => (
                      <div key={field.name}>{renderInput(field)}</div>
                    ))}

                    <div className="relative">
                      <FaSlidersH className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
                      <button type="button" onClick={openModal}
                        className="w-full pl-10 pr-4 py-3 text-left text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50 transition flex items-center justify-between">
                        <span>{equipLabel}</span>
                        <span className="text-gray-500">▼</span>
                      </button>
                    </div>
                  </div>

                  <button type="submit"
                    className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition font-bold text-lg flex items-center justify-center space-x-3 mx-auto shadow-lg">
                    <FaSearch className="text-xl" />
                    <span>Rechercher</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      ) : (
        /* === PAGE RÉSULTATS === */
        <section className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <button onClick={() => setShowResults(false)}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <FaArrowLeft className="mr-2" /> Retour à la recherche
            </button>

            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {filtered.length} logement{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
            </h1>
            <p className="text-gray-600 mb-8">
              à {formData.location || "Cotonou et environs"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map(property => (
                <div key={property.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
                  <div className="relative">
                    <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />
                    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center shadow">
                      <FaStar className="text-yellow-500 mr-1" />
                      <span className="font-bold text-sm">{property.rating}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-800">{property.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <FaMapMarkerAlt className="mr-1" /> {property.location}
                    </p>

                    <div className="flex items-center space-x-2 mt-3 text-sm text-gray-600">
                      <FaBed />
                      <span>{property.bedrooms} chambre{property.bedrooms > 1 ? "s" : ""}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {property.equipments.slice(0, 5).map(eq => (
                        <EquipIcon key={eq} id={eq} />
                      ))}
                      {property.equipments.length > 5 && (
                        <span className="text-xs text-gray-500">+{property.equipments.length - 5}</span>
                      )}
                    </div>

                    <div className="mt-5 flex justify-between items-end">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          {property.price.toLocaleString()} FCFA
                        </span>
                        <span className="text-sm text-gray-500">/mois</span>
                      </div>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                        Voir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === MODALE ÉQUIPEMENTS === */}
      {showEquipments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Sélectionner les équipements</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes className="text-2xl" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {EQUIPMENTS.map(({ id, label, icon: Icon }) => (
                  <label key={id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                    <input type="checkbox" checked={selectedEquipments.includes(id)} onChange={() => toggleEquipment(id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                    <Icon className="text-2xl text-blue-600" />
                    <span className="text-gray-800 font-medium">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 p-6 border-t bg-gray-50 rounded-b-2xl">
              <button onClick={resetEquipments}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium">
                Réinitialiser
              </button>
              <button onClick={applyEquipments}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md">
                Appliquer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}