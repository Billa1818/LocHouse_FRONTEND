
import { useState } from "react";
import { FaPaperPlane, FaPhone, FaWhatsapp, FaCheckCircle, FaShieldAlt, FaCalendarCheck, FaFacebook, FaTwitter, FaLink } from "react-icons/fa";

export default function ReservationSidebar({ price, period = "par mois" }) {
  const [arrivalDate, setArrivalDate] = useState("");
  const [duration, setDuration] = useState("1 mois");
  const [persons, setPersons] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Demande envoyée !\nArrivée: ${arrivalDate}\nDurée: ${duration}\nPersonnes: ${persons}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
      {/* Prix */}
      <div className="mb-6">
        <div className="text-3xl font-bold text-blue-600">{price.toLocaleString()} FCFA</div>
        <div className="text-gray-500 text-sm">{period}</div>
      </div>

      {/* Propriétaire */}
      <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          KA
        </div>
        <div>
          <div className="font-semibold text-gray-800">Kofi Adjovi</div>
          <div className="text-xs text-gray-500">Propriétaire vérifié</div>
        </div>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Date d'arrivée</label>
          <input
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Durée du séjour</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>1 mois</option>
            <option>3 mois</option>
            <option>6 mois</option>
            <option>1 an</option>
            <option>Plus d'1 an</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de personnes</label>
          <input
            type="number"
            min="1"
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </form>

      {/* Boutons */}
      <div className="space-y-3">
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
        >
          <FaPaperPlane /> Envoyer une demande
        </button>

        <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition">
          <FaPhone /> Appeler le propriétaire
        </button>

        <a
          href="https://wa.me/22912345678"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
        >
          <FaWhatsapp /> WhatsApp
        </a>
      </div>

      {/* Infos */}
      <div className="mt-6 pt-6 border-t space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-600" /> Réponse sous 24h
        </div>
        <div className="flex items-center gap-2">
          <FaShieldAlt className="text-green-600" /> Propriété vérifiée
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarCheck className="text-green-600" /> Disponible immédiatement
        </div>
      </div>

      {/* Partage */}
      <div className="mt-6 pt-6 border-t">
        <p className="text-sm font-semibold text-gray-700 mb-3">Partager cette annonce</p>
        <div className="flex gap-2">
          <button className="flex-1 py-2 border rounded-lg hover:bg-gray-50"><FaFacebook className="text-blue-600 mx-auto" /></button>
          <button className="flex-1 py-2 border rounded-lg hover:bg-gray-50"><FaTwitter className="text-blue-400 mx-auto" /></button>
          <button className="flex-1 py-2 border rounded-lg hover:bg-gray-50"><FaWhatsapp className="text-green-600 mx-auto" /></button>
          <button className="flex-1 py-2 border rounded-lg hover:bg-gray-50"><FaLink className="text-gray-600 mx-auto" /></button>
        </div>
      </div>
    </div>
  );
}