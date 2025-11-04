import React from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaUmbrellaBeach } from "react-icons/fa";

const categories = [
  {
    title: "Location Résidentielle",
    description: "Appartements et maisons pour séjour longue durée",
    icon: FaBuilding,
    gradient: "from-blue-500 to-cyan-600",
    href: "https://exemple.com/location-residentielle",
  },
  {
    title: "Location Touristique",
    description: "Hôtels et résidences pour courts séjours",
    icon: FaUmbrellaBeach,
    gradient: "from-emerald-500 to-teal-600",
    href: "https://exemple.com/location-touristique",
  },
];

export default function CategorySection() {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-20">
      <h2 className="text-center text-5xl font-black text-gray-900 mb-20">
        Explorez par Catégorie
      </h2>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {categories.map((cat, index) => (
          <motion.a
            key={index}
            href={cat.href}
            target="_blank"
            rel="noopener"
            whileHover={{ y: -12 }}
            className="group block"
          >
            <div
              className={`h-full bg-gradient-to-br ${cat.gradient} rounded-3xl p-12 text-white shadow-2xl flex flex-col`}
            >
              <cat.icon className="w-16 h-16 mb-8" />
              <h3 className="text-3xl font-bold mb-4">{cat.title}</h3>
              <p className="text-lg opacity-90 mb-12 flex-1">
                {cat.description}
              </p>
              <span className="font-bold text-xl flex items-center gap-2 group-hover:gap-4 transition-all">
                Découvrir
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}