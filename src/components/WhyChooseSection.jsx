import React from "react";
import { FaShieldAlt, FaSearch } from "react-icons/fa";

const features = [
  {
    title: "Sécurité Garantie",
    description:
      "Toutes les annonces sont vérifiées. Les propriétaires sont authentifiés pour votre sécurité.",
    icon: FaShieldAlt,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Recherche Facile",
    description:
      "Filtres avancés et carte interactive pour trouver rapidement le logement idéal.",
    icon: FaSearch,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Contact Direct",
    description:
      "Communiquez directement avec les propriétaires via notre système sécurisé.",
    icon: () => (
      <svg
        className="w-10 h-10 text-purple-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    bgColor: "bg-purple-100",
  },
];

export default function WhyChooseSection() {
  return (
    <div className=" mx-auto px-6 py-20">
      <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-900 mb-16">
        Pourquoi Choisir LocHouse ?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div
              className={`w-20 h-20 mx-auto mb-6 rounded-full ${feature.bgColor} flex items-center justify-center`}
            >
              {typeof feature.icon === "function" ? (
                <feature.icon />
              ) : (
                <feature.icon className={`text-3xl ${feature.iconColor}`} />
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>


    </div>
  );
}