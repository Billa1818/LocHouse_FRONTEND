// src/pages/ProprietairePage.jsx → VERSION FINALE 100% BLEU
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, Shield, Clock, Users, BadgeCheck, Calculator,
  FileText, Camera, DollarSign, CheckCircle, Star, ArrowRight,
  Check, ChevronDown, ChevronUp
} from "lucide-react";

export default function ProprietairePage() {
  const [monthlyRent, setMonthlyRent] = useState(120000);
  const [occupancyRate, setOccupancyRate] = useState(85);
  const [faqOpen, setFaqOpen] = useState({});
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);

  const toggleFaq = (i) => setFaqOpen(prev => ({ ...prev, [i]: !prev[i] }));

  const calculateRevenue = () => {
    const monthly = monthlyRent * (occupancyRate / 100);
    const net = monthly * 0.95;
    return {
      monthly: Math.round(monthly).toLocaleString(),
      net: Math.round(net).toLocaleString(),
    };
  };

  const revenue = calculateRevenue();

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.includes("@")) {
      setShowToast(true);
      setEmail("");
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  const advantages = [
    { icon: TrendingUp, title: "Commission 5%", desc: "La plus basse du Bénin", highlight: true },
    { icon: Shield, title: "Paiement 48h", desc: "Mobile Money ou virement" },
    { icon: Users, title: "Locataires vérifiés", desc: "CNI + avis" },
    { icon: Clock, title: "Support 24/7", desc: "En français" },
    { icon: BadgeCheck, title: "Garantie 5M", desc: "Contre les dégâts" },
  ];

  const steps = [
    { number: "1", title: "Créez votre annonce", desc: "15 min", icon: FileText },
    { number: "2", title: "Ajoutez des photos", desc: "HD & pro", icon: Camera },
    { number: "3", title: "Fixez votre prix", desc: "Conseils IA", icon: DollarSign },
    { number: "4", title: "Gagnez", desc: "Automatique", icon: CheckCircle },
  ];

  const testimonials = [
    { name: "Koffi Mensah", property: "Villa 4 ch, Cotonou", revenue: "2.1M FCFA/an", text: "Meilleure plateforme béninoise." },
    { name: "Aminata Diallo", property: "Appart 2 ch, Akpakpa", revenue: "1.4M FCFA/an", text: "Support réactif, paiement rapide." },
    { name: "Jean-Pierre A.", property: "Studio, Fidjrossè", revenue: "1M FCFA/an", text: "Commission ultra-basse." },
  ];

  const faqs = [
    { q: "Combien coûte l'inscription ?", a: "0 FCFA. Commission 5% seulement." },
    { q: "Quand suis-je payé ?", a: "48h après l'arrivée, via MTN, Moov ou virement." },
    { q: "Que se passe-t-il en cas de dégâts ?", a: "Garantie jusqu'à 5M FCFA. Signalement en 48h." },
    { q: "Puis-je refuser une réservation ?", a: "Oui, contrôle total." },
  ];

  return (
    <>
      {/* Toast */}
      {showToast && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-2 text-sm font-medium"
        >
          <Check size={18} /> Inscription confirmée
        </motion.div>
      )}

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="relative container mx-auto px-6 py-24 lg:py-32 text-center">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Louez votre bien <span className="text-blue-300">en toute confiance</span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto"
          >
            <strong className="text-blue-300">+500 propriétaires</strong> font confiance à LocHouse.
            <br />Commission <strong className="text-blue-300">5% seulement</strong>.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <button
              onClick={() => scrollTo("commencer")}
              className="px-10 py-5 bg-white text-blue-900 rounded-full font-bold text-lg shadow-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-3"
            >
              Publier gratuitement <ArrowRight size={22} />
            </button>
            <button
              onClick={() => scrollTo("calculateur")}
              className="px-10 py-5 bg-blue-700 text-white rounded-full font-bold text-lg border-2 border-blue-500 hover:bg-blue-600 transition"
            >
              Calculer mes revenus
            </button>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {["0 frais", "Sans engagement", "Support 24/7"].map((t, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Check size={16} className="text-blue-300" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Promo */}
        <div className="bg-blue-700 py-3">
          <p className="text-center text-white font-bold text-sm">
            OFFRE : 0% commission pour les 100 premiers (plus que 23 places)
          </p>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Pourquoi <span className="text-blue-700">LocHouse</span> ?
            </h2>
            <p className="text-xl text-blue-600">La référence des propriétaires au Bénin</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((a, i) => (
              <motion.div
                key={i}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-2xl border-2 transition-all hover:shadow-xl ${
                  a.highlight
                    ? "bg-gradient-to-br from-blue-900 to-blue-800 text-white border-blue-700"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  a.highlight ? "bg-white/20" : "bg-blue-200"
                }`}>
                  <a.icon size={28} className={a.highlight ? "text-white" : "text-blue-900"} />
                </div>
                <h3 className="text-xl font-bold mb-2">{a.title}</h3>
                <p className={a.highlight ? "text-blue-100" : "text-blue-700"}>{a.desc}</p>
                {a.highlight && (
                  <div className="absolute -top-3 -right-3 bg-blue-300 text-blue-900 px-3 py-1 rounded-full text-xs font-bold">
                    MEILLEUR
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">4 étapes simples</h2>
            <p className="text-xl text-blue-700">De l'inscription aux revenus</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {s.number}
                </div>
                <s.icon size={40} className="text-blue-800 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-blue-900 mb-1">{s.title}</h3>
                <p className="text-blue-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => scrollTo("commencer")}
              className="px-12 py-5 bg-blue-900 text-white rounded-full font-bold text-xl shadow-xl hover:bg-blue-800 transition"
            >
              Commencer en 2 min
            </button>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculateur" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Calculator size={56} className="text-blue-900 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Calculez vos revenus</h2>
          </div>

          <div className="max-w-3xl mx-auto bg-blue-50 rounded-3xl p-8 lg:p-12 shadow-xl border border-blue-200">
            <div className="space-y-8">
              <div>
                <label className="text-xl font-bold text-blue-900 mb-3 block">
                  Loyer mensuel : <span className="text-blue-700">{monthlyRent.toLocaleString()} FCFA</span>
                </label>
                <input
                  type="range"
                  min="30000" max="600000" step="5000"
                  value={monthlyRent}
                  onChange={e => setMonthlyRent(+e.target.value)}
                  className="w-full h-3 bg-blue-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #1e40af 0%, #1e40af ${(monthlyRent - 30000) / 570000 * 100}%, #bfdbfe ${(monthlyRent - 30000) / 570000 * 100}%, #bfdbfe 100%)`
                  }}
                />
              </div>

              <div>
                <label className="text-xl font-bold text-blue-900 mb-3 block">
                  Taux d'occupation : <span className="text-blue-700">{occupancyRate}%</span>
                </label>
                <input
                  type="range"
                  min="50" max="100" step="5"
                  value={occupancyRate}
                  onChange={e => setOccupancyRate(+e.target.value)}
                  className="w-full h-3 bg-blue-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #1e40af 0%, #1e40af ${(occupancyRate - 50) / 50 * 100}%, #bfdbfe ${(occupancyRate - 50) / 50 * 100}%, #bfdbfe 100%)`
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-blue-200">
                <div className="text-center p-6 bg-blue-100 rounded-2xl">
                  <p className="text-blue-700 mb-1">Revenus mensuels</p>
                  <p className="text-3xl font-bold text-blue-900">{revenue.monthly} FCFA</p>
                </div>
                <div className="text-center p-6 bg-blue-700 rounded-2xl text-white">
                  <p className="text-blue-200 mb-1">Revenus nets</p>
                  <p className="text-3xl font-bold">{revenue.net} FCFA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Ils nous font confiance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-blue-900 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-blue-900">{t.name}</h4>
                    <p className="text-sm text-blue-600">{t.property}</p>
                  </div>
                </div>
                <p className="text-blue-800 italic mb-4">"{t.text}"</p>
                <div className="bg-blue-100 text-blue-900 font-bold text-center py-2 rounded-xl text-sm">
                  {t.revenue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="commencer" className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à louer en toute sérénité ?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-blue-100">
            Rejoignez les propriétaires qui gagnent <strong>jusqu'à 500 000 FCFA/mois</strong>
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="flex-1 px-6 py-4 rounded-full text-blue-900 text-lg"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold text-lg shadow-xl hover:bg-blue-50 transition"
            >
              Commencer
            </button>
          </form>

          <p className="mt-6 text-sm text-blue-200">
            0 engagement • Annulation à tout moment
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Questions fréquentes</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-blue-50 rounded-2xl overflow-hidden border border-blue-200">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-8 py-5 text-left flex justify-between items-center hover:bg-blue-100 transition"
                >
                  <span className="font-semibold text-blue-900">{f.q}</span>
                  {faqOpen[i] ? <ChevronUp size={22} className="text-blue-700" /> : <ChevronDown size={22} className="text-blue-700" />}
                </button>
                {faqOpen[i] && (
                  <div className="px-8 pb-5 text-blue-700">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}