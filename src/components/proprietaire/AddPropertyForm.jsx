// src/components/proprietaire/AddPropertyForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBuilding, FaMapMarkerAlt, FaDollarSign, FaCheck, FaTimes, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function AddPropertyForm({ onPropertyAdded }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "Résidentiel",
    price: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const err = {};
    if (!formData.title.trim()) err.title = "Titre requis";
    if (!formData.price || isNaN(formData.price)) err.price = "Prix valide requis";
    if (!formData.address.trim()) err.address = "Adresse requise";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const newProp = {
        id: Date.now(),
        title: formData.title,
        type: formData.type,
        price: `${formData.price} FCFA/mois`,
        status: "Disponible"
      };

      if (onPropertyAdded) onPropertyAdded(newProp);
      toast.success("Propriété ajoutée !");
      setTimeout(() => navigate("/proprietaire/profile"), 1000);
    } catch (error) {
      toast.error("Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="flex items-center gap-2 text-blue-900 font-semibold mb-3"><FaHome className="text-blue-600" /> Titre</label>
          <input type="text" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} className={`w-full px-5 py-3.5 rounded-xl border ${errors.title ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500`} />
          {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-blue-900 font-semibold mb-3"><FaBuilding className="text-blue-600" /> Type</label>
            <select value={formData.type} onChange={(e) => handleChange("type", e.target.value)} className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500">
              <option>Résidentiel</option>
              <option>Touristique</option>
              <option>Commercial</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-blue-900 font-semibold mb-3"><FaDollarSign className="text-green-600" /> Prix (FCFA)</label>
            <input type="number" value={formData.price} onChange={(e) => handleChange("price", e.target.value)} className={`w-full px-5 py-3.5 rounded-xl border ${errors.price ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500`} />
            {errors.price && <p className="text-red-500 text-sm mt-2">{errors.price}</p>}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-blue-900 font-semibold mb-3"><FaMapMarkerAlt className="text-red-600" /> Adresse</label>
          <input type="text" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} className={`w-full px-5 py-3.5 rounded-xl border ${errors.address ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500`} />
          {errors.address && <p className="text-red-500 text-sm mt-2">{errors.address}</p>}
        </div>

        <div className="flex gap-4 pt-6">
          <button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl hover:shadow-xl transition flex items-center justify-center gap-3 disabled:opacity-70">
            {loading ? <FaSpinner className="animate-spin" /> : <><FaCheck /> Publier</>}
          </button>
          <button type="button" onClick={() => navigate("/proprietaire/profile")} className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-300 transition flex items-center justify-center gap-2">
            <FaTimes /> Annuler
          </button>
        </div>
      </form>
    </motion.div>
  );
}