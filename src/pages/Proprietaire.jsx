import React, { useState } from "react";
import {
  Home,
  Search,
  Building,
  Mail,
  Menu,
  TrendingUp,
  Shield,
  Clock,
  Users,
  BadgeCheck,
  Calculator,
  FileText,
  Camera,
  MessageSquare,
  BarChart3,
  Smartphone,
  Calendar,
  DollarSign,
  Phone,
  CheckCircle,
  Star,
  Award,
  Zap,
  MapPin,
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function ProprietairePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [monthlyRent, setMonthlyRent] = useState(80000);
  const [occupancyRate, setOccupancyRate] = useState(80);
  const [faqOpen, setFaqOpen] = useState({});

  const toggleFaq = (index) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const calculateRevenue = () => {
    const commission = 0.05;
    const monthlyRevenue = monthlyRent * (occupancyRate / 100);
    const annualRevenue = monthlyRevenue * 12;
    const platformFee = monthlyRevenue * commission;
    const netMonthly = monthlyRevenue - platformFee;

    return {
      monthly: monthlyRevenue.toLocaleString(),
      annual: annualRevenue.toLocaleString(),
      fee: platformFee.toLocaleString(),
      net: netMonthly.toLocaleString(),
    };
  };

  const revenue = calculateRevenue();

  const advantages = [
    {
      icon: TrendingUp,
      title: "Commission de 5% seulement",
      description:
        "La commission la plus basse du marché béninois. Gardez plus de revenus.",
    },
    {
      icon: Shield,
      title: "Paiement sécurisé garanti",
      description:
        "Recevez vos paiements sous 48h via Mobile Money ou virement bancaire.",
    },
    {
      icon: Users,
      title: "Locataires vérifiés",
      description:
        "Système de vérification d'identité et d'avis pour votre sécurité.",
    },
    {
      icon: Clock,
      title: "Support 24/7",
      description:
        "Équipe locale disponible en français pour vous accompagner.",
    },
    {
      icon: BadgeCheck,
      title: "Protection hôte",
      description: "Garantie contre les dégâts jusqu'à 5 millions FCFA.",
    },
    {
      icon: Zap,
      title: "Inscription gratuite",
      description:
        "Aucun frais d'inscription. Commencez immédiatement sans engagement.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Créez votre annonce",
      description: "Remplissez les informations de votre bien en 15 minutes",
      icon: FileText,
    },
    {
      number: "2",
      title: "Ajoutez des photos",
      description:
        "Téléchargez de belles photos pour attirer plus de locataires",
      icon: Camera,
    },
    {
      number: "3",
      title: "Fixez votre prix",
      description: "Déterminez votre tarif ou laissez-nous vous conseiller",
      icon: DollarSign,
    },
    {
      number: "4",
      title: "Recevez des réservations",
      description: "Acceptez les demandes et commencez à générer des revenus",
      icon: CheckCircle,
    },
  ];

  const testimonials = [
    {
      name: "Koffi Mensah",
      property: "Villa 4 chambres, Cotonou",
      image: "KM",
      rating: 5,
      text: "En 6 mois, j'ai généré plus de 2 millions FCFA ! La plateforme est simple et les locataires sont sérieux.",
      revenue: "350 000 FCFA/mois",
      bgColor: "bg-blue-600",
    },
    {
      name: "Aminata Diallo",
      property: "Appartement 2 chambres, Akpakpa",
      image: "AD",
      rating: 5,
      text: "Je loue mon appartement pendant que je voyage. Le support client est excellent et très réactif.",
      revenue: "120 000 FCFA/mois",
      bgColor: "bg-purple-600",
    },
    {
      name: "Jean-Pierre Assogba",
      property: "Studio meublé, Fidjrossè",
      image: "JP",
      rating: 5,
      text: "Commission très basse comparée aux autres plateformes. Je recommande à tous les propriétaires !",
      revenue: "85 000 FCFA/mois",
      bgColor: "bg-green-600",
    },
  ];

  const documents = [
    {
      icon: FileText,
      title: "Titre de propriété",
      desc: "Ou autorisation écrite du propriétaire",
    },
    {
      icon: BadgeCheck,
      title: "Pièce d'identité",
      desc: "CNI, Passeport ou Carte de séjour valide",
    },
    {
      icon: Camera,
      title: "Photos du bien",
      desc: "Minimum 5 photos de bonne qualité",
    },
    { icon: Home, title: "Attestation de domicile", desc: "Moins de 3 mois" },
  ];

  const tools = [
    {
      icon: Calendar,
      title: "Calendrier intelligent",
      desc: "Gérez vos disponibilités facilement",
    },
    {
      icon: MessageSquare,
      title: "Messagerie sécurisée",
      desc: "Communiquez avec vos locataires",
    },
    {
      icon: BarChart3,
      title: "Statistiques détaillées",
      desc: "Suivez vos performances",
    },
    { icon: DollarSign, title: "Prix dynamique", desc: "Optimisez vos tarifs" },
    {
      icon: Smartphone,
      title: "Application mobile",
      desc: "Gérez partout, à tout moment",
    },
    { icon: Award, title: "Promotion", desc: "Mettez en avant vos annonces" },
  ];

  const propertyTypes = [
    "Appartements (Studio à 5+ chambres)",
    "Villas et maisons individuelles",
    "Chambres en résidence principale",
    "Immeubles entiers",
    "Résidences secondaires",
    "Bungalows et lodges",
  ];

  const faqs = [
    {
      question: "Combien coûte l'inscription sur LocHouse ?",
      answer:
        "L'inscription est 100% gratuite ! Aucun frais d'inscription, aucun frais cachés. Vous payez uniquement une commission de 5% sur chaque réservation confirmée.",
    },
    {
      question: "Combien puis-je gagner en louant mon bien ?",
      answer:
        "Cela dépend de votre bien, son emplacement et son standing. En moyenne, nos propriétaires gagnent entre 80 000 et 500 000 FCFA par mois. Utilisez notre calculateur ci-dessus pour une estimation personnalisée.",
    },
    {
      question: "Quand suis-je payé ?",
      answer:
        "Vous recevez votre paiement sous 48h après l'arrivée du locataire via Mobile Money (MTN, Moov) ou virement bancaire selon votre préférence.",
    },
    {
      question: "Puis-je refuser une réservation ?",
      answer:
        "Oui, vous avez le contrôle total. Vous pouvez accepter ou refuser toute demande de réservation. Nous vous recommandons de consulter le profil et les avis du locataire avant de décider.",
    },
    {
      question: "Que se passe-t-il en cas de dégâts ?",
      answer:
        "Notre garantie hôte couvre les dégâts jusqu'à 5 millions FCFA. Vous devez signaler tout dégât dans les 48h suivant le départ du locataire avec photos et description.",
    },
    {
      question: "Puis-je louer si je suis moi-même locataire ?",
      answer:
        "Vous devez avoir l'autorisation écrite de votre propriétaire pour sous-louer. Certains baux interdisent la sous-location. Vérifiez votre contrat avant de publier.",
    },
    {
      question: "Quelle est la durée minimum de location ?",
      answer:
        "Vous fixez vous-même la durée minimum : 1 nuit pour du touristique, 1 mois pour du résidentiel, ou plus selon vos préférences.",
    },
    {
      question: "Puis-je gérer plusieurs biens sur LocHouse ?",
      answer:
        "Absolument ! Vous pouvez ajouter autant de biens que vous le souhaitez avec un seul compte. Un tableau de bord centralisé vous permet de tout gérer facilement.",
    },
  ];

  const comparisonData = [
    { feature: "Commission", lochouse: "5%", others: "10-25%" },
    {
      feature: "Support local",
      lochouse: "24/7 en français",
      others: "Limité",
    },
    { feature: "Délai de paiement", lochouse: "48h", others: "5-15 jours" },
    {
      feature: "Frais d'inscription",
      lochouse: "Gratuit",
      others: "0-50 000 FCFA",
    },
    { feature: "Couverture Bénin", lochouse: "Optimale", others: "Faible" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Louez votre bien et générez des revenus en toute sécurité
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Rejoignez plus de 500 propriétaires satisfaits au Bénin.
                Commission de 5% seulement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#commencer"
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg"
                >
                  Publier une annonce gratuitement
                </a>
                <a
                  href="#calculateur"
                  className="px-8 py-4 bg-blue-500 text-white rounded-lg font-bold text-lg hover:bg-blue-400 transition border-2 border-white"
                >
                  Calculer mes revenus
                </a>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={20} />
                  <span>Inscription gratuite</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={20} />
                  <span>Sans engagement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={20} />
                  <span>Support 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <section className="bg-yellow-400 py-4">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-gray-900 font-bold text-lg">
                🎉 OFFRE DE LANCEMENT : Les 100 premiers propriétaires
                bénéficient de 0% de commission pendant 3 mois !
              </p>
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Pourquoi choisir LocHouse ?
              </h2>
              <p className="text-xl text-gray-600">
                La meilleure plateforme pour louer votre bien au Bénin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((advantage, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <advantage.icon className="text-blue-600" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-xl text-gray-600">
                Publiez votre annonce en 4 étapes simples
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 text-center relative"
                >
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <step.icon className="text-blue-600 mx-auto mb-4" size={40} />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 text-blue-300">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="#commencer"
                className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg"
              >
                Commencer maintenant
              </a>
            </div>
          </div>
        </section>

        {/* Revenue Calculator */}
        <section id="calculateur" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Calculator className="text-blue-600 mx-auto mb-4" size={48} />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Calculez vos revenus potentiels
                </h2>
                <p className="text-xl text-gray-600">
                  Estimez combien vous pourriez gagner avec LocHouse
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg">
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                      Prix de location mensuel : {monthlyRent.toLocaleString()}{" "}
                      FCFA
                    </label>
                    <input
                      type="range"
                      min="30000"
                      max="500000"
                      step="10000"
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(Number(e.target.value))}
                      className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>30 000 FCFA</span>
                      <span>500 000 FCFA</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-800 font-semibold mb-3 text-lg">
                      Taux d'occupation : {occupancyRate}%
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      step="5"
                      value={occupancyRate}
                      onChange={(e) => setOccupancyRate(Number(e.target.value))}
                      className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Vos revenus estimés
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-gray-600 text-sm mb-1">
                        Revenus mensuels bruts
                      </p>
                      <p className="text-3xl font-bold text-blue-600">
                        {revenue.monthly} FCFA
                      </p>
                    </div>

                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-gray-600 text-sm mb-1">
                        Revenus annuels bruts
                      </p>
                      <p className="text-3xl font-bold text-blue-600">
                        {revenue.annual} FCFA
                      </p>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-600 text-sm mb-1">
                        Commission LocHouse (5%)
                      </p>
                      <p className="text-2xl font-bold text-gray-700">
                        -{revenue.fee} FCFA
                      </p>
                    </div>

                    <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-500">
                      <p className="text-gray-600 text-sm mb-1">
                        Revenus nets mensuels
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {revenue.net} FCFA
                      </p>
                    </div>
                  </div>

                  <p className="text-center text-gray-600 text-sm mt-6">
                    * Estimation basée sur les données moyennes de la plateforme
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Ce que disent nos propriétaires
              </h2>
              <p className="text-xl text-gray-600">
                Rejoignez des centaines de propriétaires satisfaits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 ${testimonial.bgColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                    >
                      {testimonial.image}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-bold text-gray-800">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.property}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.text}"
                  </p>

                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-green-700 font-bold text-center">
                      {testimonial.revenue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Required */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <FileText className="text-blue-600 mx-auto mb-4" size={48} />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Documents à fournir
              </h2>
              <p className="text-xl text-gray-600">
                Quelques documents simples pour publier votre annonce
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-xl p-6 flex items-start space-x-4 hover:shadow-lg transition"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <doc.icon className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {doc.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">
                📋 Documents additionnels pour location touristique :
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle
                    size={20}
                    className="text-blue-600 flex-shrink-0 mt-0.5"
                  />
                  <span>Autorisation municipale (si applicable)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle
                    size={20}
                    className="text-blue-600 flex-shrink-0 mt-0.5"
                  />
                  <span>Assurance habitation valide</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle
                    size={20}
                    className="text-blue-600 flex-shrink-0 mt-0.5"
                  />
                  <span>Certificat de conformité (si disponible)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Property Types */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Home className="text-blue-600 mx-auto mb-4" size={48} />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Types de biens acceptés
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Tous les types de propriétés sont les bienvenus sur LocHouse
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {propertyTypes.map((type, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-4 flex items-center space-x-3 hover:shadow-md transition"
                  >
                    <CheckCircle
                      className="text-green-600 flex-shrink-0"
                      size={24}
                    />
                    <span className="text-gray-800 font-medium">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tools & Services */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Outils et services inclus
              </h2>
              <p className="text-xl text-gray-600">
                Tout ce dont vous avez besoin pour gérer vos locations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <tool.icon className="text-blue-600" size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                LocHouse vs Autres plateformes
              </h2>
              <p className="text-xl text-gray-600">
                Pourquoi nous sommes le meilleur choix pour les propriétaires
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left">Caractéristique</th>
                    <th className="py-4 px-6 text-center">LocHouse</th>
                    <th className="py-4 px-6 text-center">Autres</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-4 px-6 font-semibold text-gray-800">
                        {row.feature}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">
                          {row.lochouse}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full font-medium">
                          {row.others}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Questions fréquentes
              </h2>
              <p className="text-xl text-gray-600">
                Tout ce que vous devez savoir avant de commencer
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition"
                  >
                    <span className="font-bold text-gray-800 text-lg pr-4">
                      {faq.question}
                    </span>
                    {faqOpen[idx] ? (
                      <ChevronUp
                        className="text-blue-600 flex-shrink-0"
                        size={24}
                      />
                    ) : (
                      <ChevronDown
                        className="text-blue-600 flex-shrink-0"
                        size={24}
                      />
                    )}
                  </button>
                  {faqOpen[idx] && (
                    <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Zones */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <MapPin className="text-blue-600 mx-auto mb-4" size={48} />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Zones populaires au Bénin
              </h2>
              <p className="text-xl text-gray-600">
                Forte demande dans ces zones stratégiques
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Cotonou",
                "Porto-Novo",
                "Ouidah",
                "Grand-Popo",
                "Abomey-Calavi",
                "Parakou",
                "Ganvié",
                "Possotomè",
              ].map((zone, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition cursor-pointer"
                >
                  <MapPin className="text-blue-600 mx-auto mb-2" size={24} />
                  <span className="font-semibold text-gray-800">{zone}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Ressources pour propriétaires
              </h2>
              <p className="text-xl text-gray-600">
                Des guides pour optimiser vos locations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center hover:shadow-lg transition">
                <FileText className="text-blue-600 mx-auto mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Guide du parfait hôte
                </h3>
                <p className="text-gray-600 mb-4">
                  Conseils pour maximiser vos réservations
                </p>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Télécharger PDF
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center hover:shadow-lg transition">
                <Camera className="text-purple-600 mx-auto mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Photos professionnelles
                </h3>
                <p className="text-gray-600 mb-4">
                  Comment prendre de superbes photos
                </p>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  Voir le guide
                </button>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center hover:shadow-lg transition">
                <Award className="text-green-600 mx-auto mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Success Stories
                </h3>
                <p className="text-gray-600 mb-4">
                  Inspirez-vous des meilleurs hôtes
                </p>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  Lire les histoires
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Security */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Shield className="text-blue-600 mx-auto mb-4" size={48} />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Sécurité et confiance
              </h2>
              <p className="text-xl text-gray-600">
                Votre tranquillité d'esprit est notre priorité
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-green-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Paiements sécurisés
                </h3>
                <p className="text-gray-600 text-sm">
                  Transactions cryptées et garanties
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BadgeCheck className="text-blue-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Propriétés vérifiées
                </h3>
                <p className="text-gray-600 text-sm">
                  Validation de tous les documents
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-purple-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Support juridique
                </h3>
                <p className="text-gray-600 text-sm">
                  Assistance légale incluse
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-orange-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Assurance hôte</h3>
                <p className="text-gray-600 text-sm">
                  Protection jusqu'à 5M FCFA
                </p>
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </div>
  );
}

export default ProprietairePage;
