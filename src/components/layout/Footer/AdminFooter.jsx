// src/components/layout/Footer/AdminFooter.jsx
import React from "react";
import { Link } from "react-router-dom"; // Importe Link
import { Shield, Circle, Database } from "lucide-react"; // Assure-toi d'avoir installé lucide-react

function AdminFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="text-red-500" size={28} />
              <span className="text-xl font-bold text-white">
                Loc<span className="text-red-500">House</span>
              </span>
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                ADMIN
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Back-Office Administrateur - Gestion et modération de la
              plateforme LocHouse.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Accès Rapide</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/admin/dashboard"
                  className="hover:text-red-500 transition"
                >
                  {" "}
                  {/* Utilise Link */}
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/verifications"
                  className="hover:text-red-500 transition"
                >
                  {" "}
                  {/* Utilise Link */}
                  Vérifications en attente
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/announcements"
                  className="hover:text-red-500 transition"
                >
                  {" "}
                  {/* Utilise Link */}
                  Modération annonces
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Système</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Circle className="text-green-500 fill-green-500" size={12} />
                <span>Système opérationnel</span>
              </li>
              <li className="flex items-center space-x-2">
                <Database className="text-blue-500" size={16} />
                <span>Base de données: OK</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-500">
          <p>&copy; 2025 LocHouse - Back-Office Administrateur</p>
        </div>
      </div>
    </footer>
  );
}

export default AdminFooter;
