import React from "react";
import { FaMapMarkerAlt, FaBed, FaCalendarAlt, FaWifi, FaSwimmer, FaStar } from "react-icons/fa";

const recentProperties = [
  {
    id: 1,
    title: "Appartement Moderne - Cotonou",
    location: "Akpakpa, Cotonou",
    price: 80000,
    unit: "FCFA/mois",
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.8,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    type: "Résidentiel",
    typeColor: "bg-blue-600",
    icons: [FaBed, FaCalendarAlt],
  },
  {
    id: 2,
    title: "Hôtel Luxe - Ouidah",
    location: "Centre-ville, Ouidah",
    price: 35000,
    unit: "FCFA/nuit",
    rating: 4.9,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1582719478250-c89cdc43f0b6?w=800",
    type: "Touristique",
    typeColor: "bg-green-600",
    icons: [FaWifi, FaSwimmer],
  },
  {
    id: 3,
    title: "Villa Familiale - Porto-Novo",
    location: "Agbato, Porto-Novo",
    price: 150000,
    unit: "FCFA/mois",
    bedrooms: 5,
    bathrooms: 3,
    rating: 5.0,
    reviews: 8,
    image: "https://images.unsplash.com/photo-1600563438938-a9a27216b4dc?w=800",
    type: "Résidentiel",
    typeColor: "bg-blue-600",
    icons: [FaBed, FaCalendarAlt],
  },
];

export default function RecentListings() {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < fullStars ? "text-yellow-500" : "text-gray-300"} />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Annonces Récentes</h2>
        <a
          href="#"
          className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition"
        >
          Voir tout <span className="ml-2">→</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-56 object-cover"
              />
              <span
                className={`absolute top-3 left-3 ${property.typeColor} text-white px-3 py-1 rounded-full text-sm font-medium`}
              >
                {property.type}
              </span>
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800">{property.title}</h3>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <FaMapMarkerAlt className="mr-1 text-xs" /> {property.location}
              </p>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-2xl font-bold text-blue-600">
                    {property.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500"> {property.unit}</span>
                </div>
                {property.bedrooms !== undefined ? (
                  <div className="flex items-center text-sm text-gray-600">
                    <FaBed className="mr-1" /> {property.bedrooms}
                    <span className="mx-2">•</span>
                    <FaCalendarAlt className="mr-1" /> {property.bathrooms}
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-gray-600">
                    {property.icons.map((Icon, i) => (
                      <Icon key={i} className="mr-1" />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center mt-3">
                <div className="flex">{renderStars(property.rating)}</div>
                <span className="ml-2 text-sm text-gray-600">
                  {property.rating} ({property.reviews} avis)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}