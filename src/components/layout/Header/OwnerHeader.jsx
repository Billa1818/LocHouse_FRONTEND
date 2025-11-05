// src/components/layout/Header/OwnerHeader.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/lochouse-logo.svg";
import { FaHome, FaBuilding, FaChartLine, FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

function OwnerHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const navItems = [
    { to: "/proprietaire", icon: FaHome, label: "Tableau de bord" },
    { to: "/proprietaire/annonces", icon: FaBuilding, label: "Mes annonces" },
    { to: "/proprietaire/revenus", icon: FaChartLine, label: "Revenus" },
    { to: "/proprietaire/profil", icon: FaUser, label: "Profil" },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 xl:px-8">

        {/* MOBILE */}
        <div className="flex items-center justify-between py-4 xl:hidden">
          <Link to="/proprietaire" className="flex items-center">
            <img src={logo} alt="LocHouse" className="h-9 w-auto" />
          </Link>
          <button onClick={toggleMenu} className="text-white text-2xl p-2">
            {mobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>

        {/* DESKTOP */}
        <div className="hidden xl:flex items-center justify-between py-4">
          <Link to="/proprietaire" className="flex items-center">
            <img src={logo} alt="LocHouse" className="h-11 w-auto" />
          </Link>

          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-2 px-5 py-3 rounded-full font-medium transition-all ${
                  isActive(item.to)
                    ? "bg-white text-blue-900 shadow-md"
                    : "hover:bg-white/20"
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <button className="flex items-center space-x-2 px-5 py-3 bg-red-600 hover:bg-red-700 rounded-full font-medium transition">
            <FaSignOutAlt size={18} />
            <span>Déconnexion</span>
          </button>
        </div>

        {/* MENU MOBILE */}
        {mobileMenuOpen && (
          <div className="xl:hidden pb-6 border-t border-blue-700 mt-2 pt-4">
            <nav className="flex FLex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={toggleMenu}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition ${
                    isActive(item.to) ? "bg-white text-blue-900" : "hover:bg-white/10"
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
              <button className="flex items-center space-x-3 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-medium">
                <FaSignOutAlt size={20} />
                <span>Déconnexion atassa</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default OwnerHeader;