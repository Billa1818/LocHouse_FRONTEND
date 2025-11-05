// src/pages/PaiementPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Lock, 
  Check, 
  AlertCircle, 
  ArrowLeft, 
  Smartphone, 
  Wallet,
  Shield,      // AJOUTÉ
  CheckCircle  // AJOUTÉ
} from "lucide-react";
export default function PaiementPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [mobileMoney, setMobileMoney] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    }, 2000);
  };

  const total = 85000;
  const commission = 4250;
  const net = total - commission;

  return (
    <>
      {/* Success Toast */}
      {success && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-8 py-4 rounded-full shadow-2xl z-50 flex items-center gap-3 text-lg font-medium"
        >
          <Check size={24} /> Paiement confirmé ! Réservation validée.
        </motion.div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <motion.h1
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-bold text-blue-900 mb-3"
            >
              Finalisez votre réservation
            </motion.h1>
            <p className="text-lg text-blue-600">Paiement sécurisé • 100% garanti</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire de paiement */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
                {/* Méthodes de paiement */}
                <div className="flex gap-4 mb-8 border-b pb-6">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-3 ${
                      paymentMethod === "card"
                        ? "bg-blue-900 text-white shadow-lg"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <CreditCard size={22} />
                    Carte bancaire
                  </button>
                  <button
                    onClick={() => setPaymentMethod("mobile")}
                    className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-3 ${
                      paymentMethod === "mobile"
                        ? "bg-blue-900 text-white shadow-lg"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Smartphone size={22} />
                    Mobile Money
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {paymentMethod === "card" ? (
                    <>
                      {/* Numéro de carte */}
                      <div>
                        <label className="block text-blue-900 font-semibold mb-2">Numéro de carte</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formatCardNumber(cardNumber)}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            className="w-full px-5 py-4 pl-14 rounded-xl border-2 border-blue-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition text-lg font-mono"
                            required
                          />
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={24} />
                        </div>
                      </div>

                      {/* Nom */}
                      <div>
                        <label className="block text-blue-900 font-semibold mb-2">Nom sur la carte</label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="KOFFI MENSAH"
                          className="w-full px-5 py-4 rounded-xl border-2 border-blue-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition text-lg"
                          required
                        />
                      </div>

                      {/* Date & CVC */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-blue-900 font-semibold mb-2">Expiration</label>
                          <input
                            type="text"
                            value={formatExpiry(expiry)}
                            onChange={(e) => setExpiry(e.target.value)}
                            placeholder="MM/AA"
                            maxLength="5"
                            className="w-full px-5 py-4 rounded-xl border-2 border-blue-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition text-lg"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-blue-900 font-semibold mb-2">CVC</label>
                          <input
                            type="text"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                            placeholder="123"
                            maxLength="4"
                            className="w-full px-5 py-4 rounded-xl border-2 border-blue-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition text-lg font-mono"
                            required
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Mobile Money */}
                      <div>
                        <label className="block text-blue-900 font-semibold mb-2">Numéro Mobile Money</label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={mobileMoney}
                            onChange={(e) => setMobileMoney(e.target.value.replace(/\D/g, ""))}
                            placeholder="97 12 34 56"
                            maxLength="10"
                            className="w-full px-5 py-4 pl-14 rounded-xl border-2 border-blue-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition text-lg font-mono"
                            required
                          />
                          <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={24} />
                        </div>
                        <p className="text-sm text-blue-600 mt-2">MTN, Moov, ou Wave</p>
                      </div>
                    </>
                  )}

                  {/* Bouton Payer */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-xl shadow-xl hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Traitement...
                      </>
                    ) : (
                      <>
                        <Lock size={24} />
                        Payer {total.toLocaleString()} FCFA
                      </>
                    )}
                  </motion.button>

                  {/* Sécurité */}
                  <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
                    <Lock size={18} />
                    <span>Paiement 100% sécurisé • SSL 256 bits</span>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Résumé de la réservation */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Wallet size={28} />
                  Résumé de la réservation
                </h3>

                <div className="space-y-5">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                    <p className="text-blue-200 text-sm">Logement</p>
                    <p className="font-bold text-lg">Appartement meublé 2 chambres</p>
                    <p className="text-sm text-blue-300">Akpakpa, Cotonou</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                    <p className="text-blue-200 text-sm">Dates</p>
                    <p className="font-bold">Du 15 au 22 novembre 2025</p>
                    <p className="text-sm text-blue-300">7 nuits</p>
                  </div>

                  <div className="border-t border-white/20 pt-5 space-y-3">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span className="font-bold">{total.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm text-blue-300">
                      <span>Commission LocHouse (5%)</span>
                      <span>-{commission.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/30">
                      <span>Net à payer</span>
                      <span>{net.toLocaleString()} FCFA</span>
                    </div>
                  </div>

                  <div className="bg-green-600/20 backdrop-blur-sm rounded-xl p-4 mt-6 flex items-start gap-3">
                    <CheckCircle size={22} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-300">Paiement sécurisé</p>
                      <p className="text-xs text-green-200">Vos données sont cryptées et protégées</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Retour */}
              <button className="mt-6 w-full py-3 text-blue-600 font-medium flex items-center justify-center gap-2 hover:text-blue-800 transition">
                <ArrowLeft size={20} />
                Modifier la réservation
              </button>
            </motion.div>
          </div>

          {/* Badges de confiance */}
          <div className="mt-16 text-center">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-600">
              <div className="flex items-center gap-2">
                <Lock size={20} />
                <span>SSL 256 bits</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={20} />
                <span>3D Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} />
                <span>PCI DSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}