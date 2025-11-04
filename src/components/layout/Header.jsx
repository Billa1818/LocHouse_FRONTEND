import React, { useState } from "react";
import logo from "../../assets/lochouse-logo.svg";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaBuilding,
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              {/* Placeholder pour le logo SVG */}
              <img src={logo} alt="LocHouse" className="h-12" />
            </a>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
            >
              <FaHome size={18} />
              <span>Accueil</span>
            </Link>
            <Link
              to="/recherche"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
            >
              <FaSearch size={18} />
              <span>Rechercher</span>
            </Link>
            <Link
              to="/proprietaires"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
            >
              <FaBuilding size={18} />
              <span>Propriétaires</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
            >
              <FaEnvelope size={18} />
              <span>Contact</span>
            </Link>

            {/**Essai */}
            <Link
              to="/details"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition py-2"
            >
              <span>Details</span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              <FaSignInAlt size={18} />
              <span>Connexion</span>
            </Link>
            <Link
              to="/signin"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FaUserPlus size={18} />
              <span>Inscription</span>
            </Link>
          </div>

          {/* Menu Mobile Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 text-2xl"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t mt-2 pt-4">
            <nav className="flex flex-col space-y-3">
              <a
                href="/"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition py-2"
              >
                <FaHome size={18} />
                <span>Accueil</span>
              </a>
              <a
                href="/recherche"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition py-2"
              >
                <FaSearch size={18} />
                <span>Rechercher</span>
              </a>
              <a
                href="/proprietaires"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition py-2"
              >
                <FaBuilding size={18} />
                <span>Propriétaires</span>
              </a>
              <Link
                href="/contact"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition py-2"
              >
                <FaEnvelope size={18} />
                <span>Contact</span>
              </Link>

              <div className="flex flex-col space-y-2 pt-2">
                <a
                  href="/connexion"
                  className="flex items-center justify-center space-x-2 px-4 py-2 text-center text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
                >
                  <FaSignInAlt size={18} />
                  <span>Connexion</span>
                </a>
                <a
                  href="/inscription"
                  className="flex items-center justify-center space-x-2 px-4 py-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FaUserPlus size={18} />
                  <span>Inscription</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
