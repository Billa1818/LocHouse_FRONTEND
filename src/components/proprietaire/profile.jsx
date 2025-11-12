// src/pages/OwnerProfile.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaPlus, FaTrash, FaChartLine, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBuilding, FaSave, FaTimes, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { CheckCircle, Star, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

// Données fictives simulées (API)
const mockApi = {
  fetchProfile: async () => ({ success: true, data: { name: "Koffi Adjovi", email: "koffi@lochouse.bj", phone: "+229 97 12 34 56", address: "Akpakpa, Cotonou, Bénin", bio: "Propriétaire expérimenté avec 10+ années dans l'immobilier." } }),
  updateProfile: async (data) => ({ success: true, data }),
  deleteProperty: async (id) => ({ success: true }),
  fetchProperties: async () => ([
    { id: 1, title: "Appartement Moderne - Akpakpa", type: "Résidentiel", price: "85,000 FCFA/mois", status: "Disponible" },
    { id: 2, title: "Villa Familiale - Fidjrossè", type: "Touristique", price: "150,000 FCFA/mois", status: "Loué" },
    { id: 3, title: "Studio Cosy - Porto-Novo", type: "Résidentiel", price: "45,000 FCFA/mois", status: "Disponible" },
  ]),
  fetchStats: async () => ({ totalProperties: 15, activeListings: 8, monthlyRevenue: 850000, rating: 4.8 }),
};

export default function OwnerProfile() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({});
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // Chargement des données
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [profileRes, propsRes, statsRes] = await Promise.all([
          mockApi.fetchProfile(),
          mockApi.fetchProperties(),
          mockApi.fetchStats(),
        ]);
        if (profileRes.success) setProfile(profileRes.data);
        if (propsRes) setProperties(propsRes);
        if (statsRes) setStats(statsRes);
        toast.success("Données chargées !");
      } catch (error) {
        toast.error("Erreur de chargement");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Validation du formulaire
  const validateForm = () => {
    const errors = {};
    if (!profile.name?.trim()) errors.name = "Nom requis";
    if (!profile.email?.includes("@")) errors.email = "Email invalide";
    if (!profile.phone?.match(/^\+229/)) errors.phone = "Téléphone doit commencer par +229";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Sauvegarde du profil
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const res = await mockApi.updateProfile(profile);
      if (res.success) {
        setEditMode(false);
        toast.success("Profil mis à jour !");
      }
    } catch (error) {
      toast.error("Échec de la sauvegarde");
    }
  };

  // Suppression d'une propriété
  const handleDelete = async (id) => {
    try {
      await mockApi.deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
      setShowDeleteModal(null);
      toast.success("Propriété supprimée");
    } catch (error) {
      toast.error("Échec de la suppression");
    }
  };

  const handleEdit = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: "" }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

        {/* Header */}
        <header className="bg-white shadow-lg border-b border-blue-100 sticky top-0 z-40">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/proprietaire" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                LocHouse Propriétaire
              </Link>
              <div className="flex items-center space-x-4">
                <Link to="/proprietaire/add-property" className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg transition-all transform hover:scale-105">
                  <FaPlus />
                  <span>Nouvelle annonce</span>
                </Link>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-200 transition"
                >
                  <FaEdit />
                  <span>{editMode ? "Annuler" : "Éditer"}</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Stats */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Propriétés", value: stats.totalProperties, icon: FaBuilding, color: "blue" },
                { label: "Annonces actives", value: stats.activeListings, icon: CheckCircle, color: "green" },
                { label: "Revenus mensuels", value: `${stats.monthlyRevenue.toLocaleString()} FCFA`, icon: FaChartLine, color: "purple" },
                { label: "Note", value: stats.rating, icon: Star, color: "yellow" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-white rounded-2xl p-6 shadow-xl border border-${stat.color}-100`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                      <p className={`text-3xl font-bold text-${stat.color}-700 mt-1`}>
                        {stat.value}
                      </p>
                    </div>
                    <stat.icon className={`text-${stat.color}-600 size-10`} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Profil */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
                <div className="flex items-center space-x-5 mb-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                  >
                    {profile.name?.split(" ").map(n => n[0]).join("") || "KA"}
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900">{profile.name}</h3>
                    <p className="text-green-600 text-sm flex items-center gap-1">
                      <CheckCircle size={16} /> Vérifié
                    </p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {editMode ? (
                    <motion.form
                      key="edit"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={(e) => { e.preventDefault(); handleSave(); }}
                      className="space-y-5"
                    >
                      {[
                        { field: "name", label: "Nom complet", type: "text" },
                        { field: "email", label: "Email", type: "email" },
                        { field: "phone", label: "Téléphone", type: "tel" },
                        { field: "address", label: "Adresse", type: "text" },
                      ].map((input) => (
                        <div key={input.field}>
                          <label className="block text-blue-900 font-semibold text-sm mb-2">{input.label}</label>
                          <input
                            type={input.type}
                            value={profile[input.field] || ""}
                            onChange={(e) => handleEdit(input.field, e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border ${formErrors[input.field] ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                            placeholder={input.label}
                          />
                          {formErrors[input.field] && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle size={14} /> {formErrors[input.field]}
                            </p>
                          )}
                        </div>
                      ))}
                      <div>
                        <label className="block text-blue-900 font-semibold text-sm mb-2">Bio</label>
                        <textarea
                          value={profile.bio || ""}
                          onChange={(e) => handleEdit("bio", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 h-28 resize-none"
                          placeholder="Parlez de vous..."
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2"
                        >
                          <FaSave /> Sauvegarder
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditMode(false)}
                          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition"
                        >
                          Annuler
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-5"
                    >
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <p className="text-gray-700 flex items-center gap-2"><FaEnvelope className="text-blue-600" /> {profile.email}</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <p className="text-gray-700 flex items-center gap-2"><FaPhone className="text-blue-600" /> {profile.phone}</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <p className="text-gray-700 flex items-center gap-2"><FaMapMarkerAlt className="text-blue-600" /> {profile.address}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-gray-700 text-sm italic">{profile.bio}</p>
                      </div>
                      <button
                        onClick={() => setEditMode(true)}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2"
                      >
                        <FaEdit /> Modifier le profil
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Propriétés */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
                <h3 className="text-3xl font-bold text-blue-900 mb-8 flex items-center gap-3">
                  <FaBuilding /> Mes propriétés
                </h3>
                <div className="space-y-6">
                  <AnimatePresence>
                    {properties.map((prop) => (
                      <motion.div
                        key={prop.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ x: 8 }}
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-md"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-blue-900">{prop.title}</h4>
                            <p className="text-gray-600">{prop.type}</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">{prop.price}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                              prop.status === "Disponible" 
                                ? "bg-green-100 text-green-700" 
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {prop.status}
                            </span>
                            <button className="text-blue-600 hover:text-blue-800 transition">
                              <FaEdit size={20} />
                            </button>
                            <button
                              onClick={() => setShowDeleteModal(prop.id)}
                              className="text-red-600 hover:text-red-800 transition"
                            >
                              <FaTrash size={20} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <Link
                  to="/proprietaire/add-property"
                  className="mt-8 w-full block text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl hover:shadow-xl transition-all transform hover:scale-105 font-semibold"
                >
                  <FaPlus className="inline mr-2" /> Ajouter une propriété
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Modal de suppression */}
        <AnimatePresence>
          {showDeleteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowDeleteModal(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaExclamationTriangle className="text-red-600 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Confirmer la suppression</h3>
                  <p className="text-gray-600 mb-6">
                    Êtes-vous sûr de vouloir supprimer cette propriété ? Cette action est irréversible.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDelete(showDeleteModal)}
                      className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
                    >
                      Supprimer
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(null)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}