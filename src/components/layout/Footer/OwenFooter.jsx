import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaSave, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function OwnerProfile() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "Koffi Adjovi",
    email: "koffi@lochouse.bj",
    phone: "+229 97 12 34 56",
    address: "Akpakpa, Cotonou, Bénin",
    bio: "Propriétaire expérimenté avec 10+ années dans l'immobilier au Bénin.",
  });

  const handleEdit = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setEditMode(false);
    console.log("Profil sauvegardé :", profile);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/proprietaire" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
            <FaArrowLeft />
            <span>Retour au dashboard</span>
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-blue-900">Mon profil</h1>
              <button
                onClick={() => setEditMode(!editMode)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                <FaEdit />
                <span>{editMode ? "Annuler" : "Modifier"}</span>
              </button>
            </div>

            {editMode ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-blue-900 font-semibold mb-2">Nom complet</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleEdit("name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-blue-900 font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleEdit("email", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-blue-900 font-semibold mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleEdit("phone", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-blue-900 font-semibold mb-2">Adresse</label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => handleEdit("address", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-blue-900 font-semibold mb-2">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => handleEdit("bio", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                      placeholder="Décrivez-vous en quelques mots..."
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <FaSave />
                      <span>Sauvegarder</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-400"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-gray-600 flex items-center gap-2"><FaEnvelope className="text-blue-600" /> {profile.email}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-gray-600 flex items-center gap-2"><FaPhone className="text-blue-600" /> {profile.phone}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-gray-600 flex items-center gap-2"><FaMapMarkerAlt className="text-blue-600" /> {profile.address}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-gray-600 text-sm">{profile.bio}</p>
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 mt-6"
                >
                  <FaEdit />
                  <span>Modifier le profil</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-blue-100">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                <FaBuilding />
                Mes propriétés
              </h3>
              <div className="space-y-4">
                {properties.map((prop) => (
                  <motion.div 
                    key={prop.id} 
                    className="bg-blue-50 rounded-xl p-4 border border-blue-100"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-blue-900">{prop.title}</h4>
                        <p className="text-gray-600 text-sm">{prop.type}</p>
                        <p className="text-xl font-bold text-green-600">{prop.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          prop.status === "Disponible" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {prop.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <FaEdit size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link 
                to="/proprietaire/add-property"
                className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                <FaPlus />
                <span>Ajouter une propriété</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}