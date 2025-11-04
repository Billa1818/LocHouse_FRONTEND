import React from "react";

export default function OwnerBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Vous êtes propriétaire ?
        </h2>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          Rejoignez LocHouse et donnez de la visibilité à vos biens.{" "}
          <strong>1 mois d’essai gratuit !</strong>
        </p>
        <button className="bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-100 transition flex items-center mx-auto">
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Publier une annonce
        </button>
      </div>
    </div>
  );
}