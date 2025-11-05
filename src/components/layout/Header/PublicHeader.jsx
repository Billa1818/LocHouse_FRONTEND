// src/components/layout/Header/PublicHeader.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/lochouse-logo.svg";
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

function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
      <div className="container mx-auto px-4 xl:px-8">

        {/* MOBILE & TABLETTE (< xl) */}
        <div className="flex items-center justify-between py-4 xl:hidden">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="LocHouse"
              className="h-10 w-auto object-contain transition-transform hover:scale-105"
            />
          </Link>

          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 text-2xl p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>

        {/* DESKTOP (xl et +) */}
        <div className="hidden xl:grid xl:grid-cols-12 xl:items-center xl:gap-8 xl:py-4">
          {/* LOGO */}
          <div className="xl:col-span-3 flex justify-start">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="LocHouse"
                className="h-12 w-auto object-contain transition-transform hover:scale-105"
              />
            </Link>
          </div>

          {/* LIENS CENTRAUX */}
          <nav className="xl:col-span-6 flex justify-center items-center space-x-4">
            <Link to="/" className={`${hoverLink} ${isActive("/") ? "text-blue-700 font-bold" : ""}`}>
              <FaHome size={18} className="text-gray-600 group-hover:text-blue-500 transition" />
              <span className="relative z-10">
                Accueil
                <span className={underline}></span>
              </span>
            </Link>

            <Link to="/rechercher" className={`${hoverLink} ${isActive("/rechercher") ? "text-blue-700 font-bold" : ""}`}>
              <FaSearch size={18} className="text-gray-600 group-hover:text-blue-500 transition" />
              <span className="relative z-10">
                Rechercher
                <span className={underline}></span>
              </span>
            </Link>

            <Link to="/proprietaires" className={`${hoverLink} ${isActive("/proprietaires") ? "text-blue-700 font-bold" : ""}`}>
              <FaBuilding size={18} className="text-gray-600 group-hover:text-blue-500 transition" />
              <span className="relative z-10">
                Propriétaires
                <span className={underline}></span>
              </span>
            </Link>

            <Link to="/paiement" className={`${hoverLink} ${isActive("/paiement") ? "text-blue-700 font-bold" : ""}`}>
              <Lock size={18} className="text-gray-600 group-hover:text-blue-500 transition" />
              <span className="relative z-10">
                Payer
                <span className={underline}></span>
              </span>
            </Link>
          </nav>

          {/* CONNEXION / INSCRIPTION */}
          <div className="xl:col-span-3 flex justify-end items-center space-x-3">
            <Link to="/login" className={`${hoverLink} ${isActive("/login") ? "text-blue-700 font-bold" : ""}`}>
              <FaSignInAlt size={18} className="text-gray-600 group-hover:text-white transition" />
              <span className="relative z-10">
                Connexion
                <span className={underline}></span>
              </span>
            </Link>

            <Link to="/signin" className={`${hoverLink} ${isActive("/signin") ? "text-blue-700 font-bold" : ""}`}>
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
          <div className="xl:hidden pb-6 border-t mt-2 pt-4">
            <nav className="flex flex-col space-y-4">
              {[
                { to: "/", icon: FaHome, label: "Accueil" },
                { to: "/rechercher", icon: FaSearch, label: "Rechercher" },
                { to: "/proprietaires", icon: FaBuilding, label: "Propriétaires" },
                { to: "/paiement", icon: Lock, label: "Payer" },
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

              {/* BOUTONS EN MOBILE */}
              <div className="flex flex-col space-y-3 pt-4">
                <Link
                  to="/login"
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center space-x-2 px-6 py-3 text-center text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
                >
                  <FaSignInAlt size={18} />
                  <span>Connexion</span>
                </Link>
                <Link
                  to="/signin"
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center space-x-2 px-6 py-3 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
                >
                  <FaUserPlus size={18} />
                  <span>Inscription</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default PublicHeader;