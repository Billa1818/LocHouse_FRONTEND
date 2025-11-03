import React from "react";
import logo from "../../assets/lochouse-logo.svg";
import {
  FaHome,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaHeart,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {/* Placeholder pour le logo SVG */}
              <img src={logo} alt="LocHouse" className="h-8" />
            </div>
            <p className="text-sm text-gray-400">
              Plateforme de location résidentielle et touristique sécurisée au
              Bénin.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-xl" />
              </a>
            </div>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/recherche" className="hover:text-blue-500 transition">
                  Rechercher un logement
                </a>
              </li>
              <li>
                <a
                  href="/proprietaires"
                  className="hover:text-blue-500 transition"
                >
                  Devenir propriétaire
                </a>
              </li>
              <li>
                <a href="/tarifs" className="hover:text-blue-500 transition">
                  Tarifs d'abonnement
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-blue-500 transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/contact" className="hover:text-blue-500 transition">
                  Nous contacter
                </a>
              </li>
              <li>
                <a href="/aide" className="hover:text-blue-500 transition">
                  Centre d'aide
                </a>
              </li>
              <li>
                <a href="/cgu" className="hover:text-blue-500 transition">
                  CGU
                </a>
              </li>
              <li>
                <a
                  href="/confidentialite"
                  className="hover:text-blue-500 transition"
                >
                  Confidentialité
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-blue-500 mt-1" />
                <span>Cotonou, Bénin</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-blue-500" />
                <a
                  href="mailto:contact@lochouse.bj"
                  className="hover:text-blue-500 transition"
                >
                  contact@lochouse.bj
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-blue-500" />
                <span>+229 XX XX XX XX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2025 LocHouse. Tous droits réservés.</p>
            <p className="mt-2 md:mt-0 flex items-center">
              Conçu avec <FaHeart className="text-red-500 mx-1" /> au Bénin
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
