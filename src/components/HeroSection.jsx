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
import INPUT_CONFIG from "../data/searchConfig";
import EQUIPMENTS from "../data/equipmentsConfig";
import FAKE_PROPERTIES from "../data/fakeProperties";
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
    </div>
  );
}