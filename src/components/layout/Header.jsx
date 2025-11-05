// src/components/Header.jsx
import React, { useState } from "react";
import logo from "../../assets/lochouse-logo.svg";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaBuilding,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Lock } from "lucide-react";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // STYLE HOVER BLEU
  const hoverLink = `
    group relative flex items-center space-x-2
    px-5 py-2.5 rounded-full font-medium
    text-gray-700 hover:text-white
    transition-all duration-300
    before:absolute before:inset-0
    before:bg-gradient-to-r before:from-blue-600 before:to-blue-700
    before:rounded-full before:opacity-0
    before:hover:opacity-100 before:transition-opacity
  `;

  const underline = `
    absolute -bottom-1 left-0 w-0 h-0.5 bg-white
    group-hover:w-full transition-all duration-300 opacity-0
    group-hover:opacity-100
  `;

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 items-center py-4 gap-4">

          {/* COLONNE 1 : LOGO + MENU MOBILE */}
          <div className="flex items-center justify-start space-x-4">
            {/* LOGO TOUJOURS VISIBLE */}
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="LocHouse" 
                className="h-10 md:h-12 w-auto object-contain transition-transform hover:scale-105"
              />
            </Link>

            {/* HAMBURGER (mobile only) */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-700 text-2xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* COLONNE 2 : LIENS PRINCIPAUX (CENTRÉS) */}
          <nav className="hidden md:flex justify-center items-center space-x-4">
            <Link
              to="/"
              className={`${hoverLink} ${isActive("/") ? "text-blue-700 font-bold" : ""}`}
            >
              <FaHome size={18} className="text-gray-600 group-hover:text-white transition" />
              <span className="relative z-10">
                Accueil
                <span className={underline}></span>
              </span>
            </Link>

            <Link
              to="/rechercher"
              className={`${hoverLink} ${isActive("/rechercher") ? "text-blue-700 font-bold" : ""}`}
            >
              <FaSearch size={18} className="text-gray-600 group-hover:text-white transition" />
              <span className="relative z-10">
                Rechercher
                <span className={underline}></span>
              </span>
            </Link>

            <Link
              to="/proprietaires"
              className={`${hoverLink} ${isActive("/proprietaires") ? "text-blue-700 font-bold" : ""}`}
            >
              <FaBuilding size={18} className="text-gray-600 group-hover:text-white transition" />
              <span className="relative z-10">
                Propriétaires
                <span className={underline}></span>
              </span>
            </Link>

            <Link
              to="/paiement"
              className={`${hoverLink} ${isActive("/paiement") ? "text-blue-700 font-bold" : ""}`}
            >
              <Lock size={18} className="text-gray-600 group-hover:text-white transition" />
              <span className="relative z-10">
                Payer
                <span className={underline}></span>
              </span>
            </Link>
          </nav>

          {/* COLONNE 3 : CONNEXION / INSCRIPTION */}
          <div className="hidden md:flex justify-end items-center space-x-3">
            <Link
              to="/login"
              className={`${hoverLink} ${isActive("/login") ? "text-blue-700 font-bold" : ""}`}
            >
              <FaSignInAlt size={18} className="text-gray-600 group-hover:text-white transition" />
              <span className="relative z-10">
                Connexion
                <span className={underline}></span>
              </span>
            </Link>

            <Link
              to="/signin"
              className={`${hoverLink} ${isActive("/signin") ? "text-blue-700 font-bold" : ""}`}
            >
              <FaUserPlus size={18} className="text-gray-600 group-hover:text-white transition" />
              <span className="relative z-10">
                Inscription
                <span className={underline}></span>
              </span>
            </Link>
          </div>
        </div>

        {/* MENU MOBILE */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 border-t mt-2 pt-4">
            <nav className="flex flex-col space-y-3">
              {[
                { to: "/", icon: FaHome, label: "Accueil" },
                { to: "/rechercher", icon: FaSearch, label: "Rechercher" },
                { to: "/proprietaires", icon: FaBuilding, label: "Propriétaires" },
                { to: "/paiement", icon: Lock, label: "Payer" },
                { to: "/login", icon: FaSignInAlt, label: "Connexion" },
                { to: "/signin", icon: FaUserPlus, label: "Inscription" },
              ].map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={toggleMobileMenu}
                  className={`${hoverLink} justify-center ${isActive(to) ? "text-blue-700 font-bold" : ""}`}
                >
                  <Icon size={18} className="text-gray-600 group-hover:text-white transition" />
                  <span className="relative z-10">
                    {label}
                    <span className={underline}></span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;