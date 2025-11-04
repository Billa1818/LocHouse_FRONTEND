import React, { useState } from "react";
import {
  FaMapMarkerAlt, FaHome, FaCalendarAlt, FaMoneyBillWave, FaBed,
  FaSlidersH, FaSearch, FaCrosshairs, FaTimes, FaStar, FaArrowLeft,
  FaWifi, FaSnowflake, FaSwimmer, FaCar, FaTint, FaBolt, FaShieldAlt,
  FaUtensils, FaTv, FaTree, FaDumbbell, FaCouch, FaBuilding, FaUmbrellaBeach
} from "react-icons/fa";
import { motion } from "framer-motion";
import heroBg from "../assets/home/heroSection.jpg";

import { useForm } from "../hooks/useForm";
import { useGeolocation } from "../hooks/useGeolocation";
import { useEquipmentsModal } from "../hooks/useEquipmentsModal";

// ================== TOUTES LES DONNÉES ICI ==================
const INPUT_CONFIG = [
  { name: "location", placeholder: "Ville, quartier...", icon: FaMapMarkerAlt, type: "text", hasDetect: true },
  { name: "type", placeholder: "Type de location", icon: FaHome, type: "select", options: [
      { value: "", label: "Type de location" },
      { value: "residentiel", label: "Résidentiel" },
      { value: "touristique", label: "Touristique" },
    ]},
  { name: "duration", placeholder: "Durée du séjour", icon: FaCalendarAlt, type: "select", options: [
      { value: "", label: "Durée du séjour" },
      { value: "court", label: "Court séjour (- 1 mois)" },
      { value: "moyen", label: "Moyen séjour (1-6 mois)" },
      { value: "long", label: "Long séjour (+ 6 mois)" },
    ]},
  { name: "budget", placeholder: "Budget", icon: FaMoneyBillWave, type: "select", options: [
      { value: "", label: "Budget" },
      { value: "0-50000", label: "Moins de 50 000 FCFA" },
      { value: "50000-100000", label: "50 000 - 100 000 FCFA" },
      { value: "100000-200000", label: "100 000 - 200 000 FCFA" },
      { value: "200000-500000", label: "200 000 - 500 000 FCFA" },
      { value: "500000+", label: "Plus de 500 000 FCFA" },
    ]},
  { name: "bedrooms", placeholder: "Nombre de chambres", icon: FaBed, type: "select", options: [
      { value: "", label: "Nombre de chambres" },
      { value: "1", label: "1 chambre" },
      { value: "2", label: "2 chambres" },
      { value: "3", label: "3 chambres" },
      { value: "4", label: "4 chambres" },
      { value: "5+", label: "5+ chambres" },
    ]},
];

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

const FAKE_PROPERTIES = [
  { id: 1, title: "Villa de Luxe Fidjrossè", price: 500000, bedrooms: 5, location: "Fidjrossè", rating: 4.9, image: "https://images.unsplash.com/photo-1613490493576-7fbecc31db04?w=800", equipments: ["wifi","clim","piscine","parking","securite","jardin","meuble","sport"] },
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
  { id: 20, title: "Palais Zone Résidentielle", price: 280000, bedrooms: 8, location: "Zone 4", rating: 5.0, image: "https://images.unsplash.com/photo-1600607687644-1f8b88f1f3a6?w=800", equipments: ["wifi","piscine","sport","jardin","securite","meuble","cuisine","tv"] },
];

const EquipIcon = ({ id }) => {
  const eq = EQUIPMENTS.find(e => e.id === id);
  const Icon = eq?.icon || FaWifi;
  return <Icon className="text-blue-600" />;
};

export default function HeroSection() {
  const { formData, setFormData, handleChange } = useForm({
    location: "", type: "", duration: "", budget: "", bedrooms: "", equipments: []
  });

  const { detecting, detectLocation } = useGeolocation((coords) => {
    setFormData(prev => ({ ...prev, location: coords }));
  });

  const {
    show: showEquipments,
    selected: selectedEquipments,
    ref: modalRef,
    open: openModal,
    close: closeModal,
    toggle: toggleEquipment,
    reset: resetEquipments,
    apply: applyEquipments
  } = useEquipmentsModal(formData.equipments);

  const [showResults, setShowResults] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const doSearch = () => {
    let results = [...FAKE_PROPERTIES];

    if (formData.location) results = results.filter(p => p.location.toLowerCase().includes(formData.location.toLowerCase()));
    if (formData.bedrooms) {
      const min = formData.bedrooms === "5+" ? 5 : parseInt(formData.bedrooms);
      results = results.filter(p => p.bedrooms >= min);
    }
    if (formData.budget) {
      const max = formData.budget === "500000+" ? Infinity : parseInt(formData.budget.split("-")[1]);
      results = results.filter(p => p.price <= max);
    }
    if (formData.equipments.length) {
      results = results.filter(p => formData.equipments.every(eq => p.equipments.includes(eq)));
    }

    setFiltered(results);
    setShowResults(true);
  };

  const equipLabel = formData.equipments.length ? `Équipements (${formData.equipments.length})` : "Équipements";

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
        <button type="button" onClick={detectLocation} disabled={detecting}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 p-2 disabled:opacity-50">
          <FaCrosshairs className={`text-lg ${detecting ? "animate-pulse" : ""}`} />
        </button>
      )}
    </div>
  );

  return (
    <div className=" bg-gray-50">
      {/* HERO + FORMULAIRE */}
      {!showResults ? (
        <section className="relative text-white overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <img src={heroBg} alt="Bénin" className="w-full h-full object-cover opacity-30" loading="lazy" />
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
                      <FaSlidersH className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                      <button type="button" onClick={openModal}
                        className="w-full pl-10 pr-4 py-3 text-left text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50 transition flex justify-between items-center">
                        <span>{equipLabel}</span>
                        <span className="text-gray-500">▼</span>
                      </button>
                    </div>
                  </div>

                  <button type="submit"
                    className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-lg flex items-center justify-center space-x-3 mx-auto shadow-lg">
                    <FaSearch className="text-xl" />
                    <span>Rechercher</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      ) : (
        /* RÉSULTATS */
        <section className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <button onClick={() => setShowResults(false)}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <FaArrowLeft className="mr-2" /> Retour
            </button>
            <h1 className="text-4xl font-bold mb-2">{filtered.length} logement{filtered.length > 1 ? "s" : ""}</h1>
            <p className="text-gray-600 mb-8">à {formData.location || "Cotonou et environs"}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map(p => (
                <div key={p.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
                  <div className="relative">
                    <img src={p.image} alt={p.title} className="w-full h-56 object-cover" />
                    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center shadow">
                      <FaStar className="text-yellow-500 mr-1" />
                      <span className="font-bold text-sm">{p.rating}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-800">{p.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <FaMapMarkerAlt className="mr-1" /> {p.location}
                    </p>
                    <div className="flex items-center space-x-2 mt-3 text-sm text-gray-600">
                      <FaBed /> <span>{p.bedrooms} chambre{p.bedrooms > 1 ? "s" : ""}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {p.equipments.slice(0, 5).map(eq => <EquipIcon key={eq} id={eq} />)}
                      {p.equipments.length > 5 && <span className="text-xs text-gray-500">+{p.equipments.length - 5}</span>}
                    </div>
                    <div className="mt-5 flex justify-between items-end">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">{p.price.toLocaleString()} FCFA</span>
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

      {/* MODALE ÉQUIPEMENTS */}
      {showEquipments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Sélectionner les équipements</h2>
              <button onClick={closeModal}><FaTimes className="text-2xl text-gray-500" /></button>
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
            <div className="flex justify-end space-x-4 p-6 bg-gray-50 border-t">
              <button onClick={resetEquipments} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                Réinitialiser
              </button>
              <button onClick={() => applyEquipments(eq => setFormData(prev => ({ ...prev, equipments: eq })))}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow">
                Appliquer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === EXPLOREZ PAR CATÉGORIE (CORRIGÉ : DÉPLACÉ À L'INTÉRIEUR) === */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <h2 className="text-center text-5xl font-black text-gray-900 mb-20">
          Explorez par Catégorie
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* CARTE BLEUE */}
          <motion.a
            href="https://exemple.com/location-residentielle"
            target="_blank"
            rel="noopener"
            whileHover={{ y: -12 }}
            className="group block"
          >
            <div className="h-full bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-12 text-white shadow-2xl flex flex-col">
              <FaBuilding className="w-16 h-16 mb-8" />
              <h3 className="text-3xl font-bold mb-4">Location Résidentielle</h3>
              <p className="text-lg opacity-90 mb-12 flex-1">
                Appartements et maisons pour séjour longue durée
              </p>
              <span className="font-bold text-xl flex items-center gap-2 group-hover:gap-4 transition-all">
                Découvrir →
              </span>
            </div>
          </motion.a>

          {/* CARTE VERTE */}
          <motion.a
            href="https://exemple.com/location-touristique"
            target="_blank"
            rel="noopener"
            whileHover={{ y: -12 }}
            className="group block"
          >
            <div className="h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-12 text-white shadow-2xl flex flex-col">
              <FaUmbrellaBeach className="w-16 h-16 mb-8" />
              <h3 className="text-3xl font-bold mb-4">Location Touristique</h3>
              <p className="text-lg opacity-90 mb-12 flex-1">
                Hôtels et résidences pour courts séjours
              </p>
              <span className="font-bold text-xl flex items-center gap-2 group-hover:gap-4 transition-all">
                Découvrir →
              </span>
            </div>
          </motion.a>
        </div>
      </div>
      {/* === ANNONCES RÉCENTES === */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900">Annonces Récentes</h2>
          <a href="#" className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition">
            Voir tout <span className="ml-2">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Carte 1 - Résidentiel */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" 
                alt="Appartement Moderne - Cotonou" 
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Résidentiel
              </span>
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800">Appartement Moderne - Cotonou</h3>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <FaMapMarkerAlt className="mr-1 text-xs" /> Akpakpa, Cotonou
              </p>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-2xl font-bold text-blue-600">80 000</span>
                  <span className="text-sm text-gray-500"> FCFA/mois</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaBed className="mr-1" /> 3
                  <span className="mx-2">•</span>
                  <FaCalendarAlt className="mr-1" /> 2
                </div>
              </div>
              <div className="flex items-center mt-3">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < 4 ? "" : "text-gray-300"} />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">4.8 (12 avis)</span>
              </div>
            </div>
          </div>

          {/* Carte 2 - Touristique */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cdc43f0b6?w=800" 
                alt="Hôtel Luxe - Ouidah" 
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Touristique
              </span>
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800">Hôtel Luxe - Ouidah</h3>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <FaMapMarkerAlt className="mr- 1 text-xs" /> Centre-ville, Ouidah
              </p>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-2xl font-bold text-blue-600">35 000</span>
                  <span className="text-sm text-gray-500"> FCFA/nuit</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaWifi className="mr-1" />
                  <FaSwimmer className="mr-1" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < 4 ? "" : "text-gray-300"} />
                  ))}
                  <FaStar className="text-yellow-500" />
                </div>
                <span className="ml-2 text-sm text-gray-600">4.9 (28 avis)</span>
              </div>
            </div>
          </div>

          {/* Carte 3 - Résidentiel */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600563438938-a9a27216b4dc?w=800" 
                alt="Villa Familiale - Porto-Novo" 
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Résidentiel
              </span>
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800">Villa Familiale - Porto-Novo</h3>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <FaMapMarkerAlt className="mr-1 text-xs" /> Agbato, Porto-Novo
              </p>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-2xl font-bold text-blue-600">150 000</span>
                  <span className="text-sm text-gray-500"> FCFA/mois</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaBed className="mr-1" /> 5
                  <span className="mx-2">•</span>
                  <FaCalendarAlt className="mr-1" /> 3
                </div>
              </div>
              <div className="flex items-center mt-3">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">5.0 (8 avis)</span>
              </div>
            </div>
          </div>
        </div>
      </div>






      {/* === POURQUOI CHOISIR LOCHOUSE ? === */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-900 mb-16">
          Pourquoi Choisir LocHouse ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Carte 1 - Sécurité */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
              <FaShieldAlt className="text-3xl text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Sécurité Garantie</h3>
            <p className="text-gray-600 leading-relaxed">
              Toutes les annonces sont vérifiées. Les propriétaires sont authentifiés pour votre sécurité.
            </p>
          </div>

          {/* Carte 2 - Recherche */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <FaSearch className="text-3xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Recherche Facile</h3>
            <p className="text-gray-600 leading-relaxed">
              Filtres avancés et carte interactive pour trouver rapidement le logement idéal.
            </p>
          </div>

          {/* Carte 3 - Contact */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-purple-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Contact Direct</h3>
            <p className="text-gray-600 leading-relaxed">
              Communiquez directement avec les propriétaires via notre système sécurisé.
            </p>
          </div>
        </div>
      </div>

      {/* === BANDEAU PROPRIÉTAIRE === */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Vous êtes propriétaire ?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez LocHouse et donnez de la visibilité à vos biens. <strong>1 mois d’essai gratuit !</strong>
          </p>
          <button className="bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-100 transition flex items-center mx-auto">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Publier une annonce
          </button>
        </div>
      </div>




    </div>
  );
}