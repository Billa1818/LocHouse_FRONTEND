// src/components/HeroSection.jsx
import React, { useState } from "react";
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
  FaWifi
} from "react-icons/fa";
import { motion } from "framer-motion";
import heroBg from "../assets/home/heroSection.jpg";
import { useForm } from "../hooks/useForm";
import { useGeolocation } from "../hooks/useGeolocation";
import { useEquipmentsModal } from "../hooks/useEquipmentsModal";
import INPUT_CONFIG from "../data/searchConfig";
import EQUIPMENTS from "../data/equipmentsConfig";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const { formData, setFormData, handleChange } = useForm({
    location: "",
    type: "",
    duration: "",
    budget: "",
    bedrooms: "",
    equipments: []
  });

  const { detecting, detectLocation } = useGeolocation(coords => {
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

  const doSearch = () => {
    const params = new URLSearchParams();
    if (formData.location) params.set("location", formData.location);
    if (formData.bedrooms) params.set("bedrooms", formData.bedrooms);
    if (formData.budget) params.set("budget", formData.budget);
    if (formData.equipments.length)
      params.set("equipments", formData.equipments.join(","));

    navigate(`/rechercher?${params.toString()}`);
  };

  const equipLabel = formData.equipments.length
    ? `Équipements (${formData.equipments.length})`
    : "Équipements";

  const renderInput = ({ name, placeholder, icon: Icon, type, options, hasDetect }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
      {type === "select" ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="w-full pl-10 pr-10 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
        >
          {options.map(opt => (
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
        />
      )}
      {hasDetect && (
        <button
          type="button"
          onClick={detectLocation}
          disabled={detecting}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 p-2 disabled:opacity-50"
        >
          <FaCrosshairs className={`text-lg ${detecting ? "animate-pulse" : ""}`} />
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50">
      <section className="relative text-white overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Bénin"
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
              onSubmit={e => {
                e.preventDefault();
                doSearch();
              }}
              className="bg-white rounded-xl shadow-2xl p-5 md:p-8"
            >
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INPUT_CONFIG.map(field => (
                    <div key={field.name}>{renderInput(field)}</div>
                  ))}

                  <div className="relative">
                    <FaSlidersH className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                    <button
                      type="button"
                      onClick={openModal}
                      className="w-full pl-10 pr-4 py-3 text-left text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50 transition flex justify-between items-center"
                    >
                      <span>{equipLabel}</span>
                      <span className="text-gray-500">Down Arrow</span>
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-lg flex items-center justify-center space-x-3 mx-auto shadow-lg"
                >
                  <FaSearch className="text-xl" />
                  <span>Rechercher</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* MODALE ÉQUIPEMENTS */}
      {showEquipments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                Sélectionner les équipements
              </h2>
              <button onClick={closeModal}>
                <FaTimes className="text-2xl text-gray-500" />
              </button>
            </div>
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
            <div className="flex justify-end space-x-4 p-6 bg-gray-50 border-t">
              <button
                onClick={resetEquipments}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Réinitialiser
              </button>
              <button
                onClick={() =>
                  applyEquipments(eq =>
                    setFormData(prev => ({ ...prev, equipments: eq }))
                  )
                }
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
              >
                Appliquer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}