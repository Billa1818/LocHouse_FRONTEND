import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assurez-vous que vous utilisez react-router-dom
import {
  Shield,
  BarChart3,
  Users,
  CheckSquare,
  CreditCard,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react"; // Assurez-vous d'avoir installé lucide-react

function AdminHeader() {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Ajouté pour le menu mobile admin

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center space-x-2 group"
            >
              <Shield
                className="text-red-500 group-hover:scale-110 transition-transform"
                size={32}
              />
              <div>
                <span className="text-2xl font-bold text-white">
                  Loc<span className="text-red-500">House</span>
                </span>
                <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full font-semibold">
                  ADMIN
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Link
              to="/admin/dashboard" // Utilisez un chemin réel pour le dashboard admin
              className="flex items-center space-x-2 text-white bg-gray-700 px-4 py-2 rounded-lg"
            >
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/admin/users" // Utilisez un chemin réel pour les utilisateurs admin
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition"
            >
              <Users size={18} />
              <span>Utilisateurs</span>
            </Link>
            <Link
              to="/admin/announcements" // Utilisez un chemin réel pour les annonces admin
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition relative"
            >
              <CheckSquare size={18} />
              <span>Annonces</span>
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                8
              </span>
            </Link>
            <Link
              to="/admin/verifications" // Utilisez un chemin réel pour les vérifications admin
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition relative"
            >
              <CreditCard size={18} />
              <span>Vérifications</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                12
              </span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="relative text-gray-300 hover:text-white transition p-2 hover:bg-gray-700 rounded-lg">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                9
              </span>
            </button>

            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition p-2 rounded-lg hover:bg-gray-700"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white border-2 border-red-400">
                  <Shield size={20} />
                </div>
                <div className="text-left">
                  <div className="font-medium text-white">Admin</div>
                  <div className="text-xs text-gray-400">Super Admin</div>
                </div>
                <ChevronDown size={16} />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 border">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-semibold text-gray-800">
                      Admin Principal
                    </p>
                    <p className="text-xs text-gray-500">admin@lochouse.bj</p>
                    <span className="mt-2 inline-block text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                      <Shield className="inline" size={12} /> Super Admin
                    </span>
                  </div>
                  <Link
                    to="/admin/profile" // Chemin pour le profil admin
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    <User size={18} />
                    <span>Mon Profil</span>
                  </Link>
                  <Link
                    to="/admin/settings" // Chemin pour les paramètres admin
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    <Settings size={18} />
                    <span>Paramètres</span>
                  </Link>
                  <div className="border-t my-2"></div>
                  <Link
                    to="/logout" // Chemin pour la déconnexion
                    className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut size={18} />
                    <span>Déconnexion</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation (Admin) */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-700 mt-2 pt-4">
            <nav className="flex flex-col space-y-3 px-4">
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-2 text-white bg-gray-700 px-4 py-2 rounded-lg"
              >
                <BarChart3 size={18} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/admin/users"
                className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition"
              >
                <Users size={18} />
                <span>Utilisateurs</span>
              </Link>
              <Link
                to="/admin/announcements"
                className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition"
              >
                <CheckSquare size={18} />
                <span>Annonces</span>
              </Link>
              <Link
                to="/admin/verifications"
                className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition"
              >
                <CreditCard size={18} />
                <span>Vérifications</span>
              </Link>
              <div className="border-t border-gray-700 my-2"></div>
              <Link
                to="/admin/profile"
                className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition"
              >
                <User size={18} />
                <span>Mon Profil</span>
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition"
              >
                <Settings size={18} />
                <span>Paramètres</span>
              </Link>
              <Link
                to="/logout"
                className="flex items-center space-x-3 px-4 py-2 text-red-500 hover:bg-gray-700 transition"
              >
                <LogOut size={18} />
                <span>Déconnexion</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default AdminHeader;
