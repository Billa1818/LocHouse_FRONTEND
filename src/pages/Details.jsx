// src/pages/Details.jsx → VERSION FINALE
import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import mockListings from "../data/mockListings";
import ReservationSidebar from "../components/ReservationSidebar";
import {
  FaArrowLeft,
  FaStar,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCouch,
  FaHeart,
} from "react-icons/fa";
import {
  FaWifi,
  FaSnowflake,
  FaCar,
  FaSwimmer,
  FaUtensils,
  FaTv,
  FaShieldAlt,
  FaBolt,
  FaTint,
} from "react-icons/fa";
import { BiHeart } from "react-icons/bi";

const Details = () => {
  const { id } = useParams();
  const [currentMainImage, setCurrentMainImage] = useState("");

  const property = useMemo(() => {
    const found = mockListings.find((l) => l.id === parseInt(id));
    if (!found) return null;

    const secondaryImages = [
      `/images/logements/extra-${found.id}-1.jpg`,
      `/images/logements/extra-${found.id}-2.jpg`,
      `/images/logements/extra-${found.id}-3.jpg`,
      `/images/logements/extra-${found.id}-4.jpg`,
    ];

    return {
      ...found,
      mainImageUrl: found.image,
      secondaryImages,
      period: found.unit.replace("FCFA/", "").trim(),
      features: [
        {
          icon: "fas fa-bed",
          text: `${found.rooms} Chambre${found.rooms > 1 ? "s" : ""}`,
        },
        {
          icon: "fas fa-bath",
          text: `${found.baths} Salle${
            found.baths > 1 ? "s de bain" : " de bain"
          }`,
        },
        { icon: "fas fa-ruler-combined", text: `${found.area} m²` },
        {
          icon: "fas fa-couch",
          text: found.furnished ? "Meublé" : "Non meublé",
        },
      ],
      equipments: [
        ...(found.wifi
          ? [{ icon: "fas fa-wifi", text: "WiFi haut débit" }]
          : []),
        ...(found.ac ? [{ icon: "fas fa-fan", text: "Climatisation" }] : []),
        ...(found.parking
          ? [{ icon: "fas fa-car", text: "Parking privé" }]
          : []),
        { icon: "fas fa-tint", text: "Eau courante" },
        { icon: "fas fa-bolt", text: "Électricité" },
        { icon: "fas fa-shield-alt", text: "Sécurité 24h/24" },
        { icon: "fas fa-utensils", text: "Cuisine équipée" },
        { icon: "fas fa-tv", text: "Télévision" },
        ...(found.pool ? [{ icon: "fas fa-swimmer", text: "Piscine" }] : []),
      ].slice(0, 10),
    };
  }, [id]);

  useEffect(() => {
    if (property) setCurrentMainImage(property.image);
  }, [property]);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Logement non trouvé
          </h2>
          <Link
            to="/rechercher"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Retour
          </Link>
        </div>
      </div>
    );
  }

  const handleThumbnailClick = (imageUrl) => {
    if (imageUrl !== property.secondaryImages[3]) {
      setCurrentMainImage(imageUrl);
    }
  };

  return (
    <main className="flex-grow bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/rechercher"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <FaArrowLeft className="mr-2" /> Retour
          </Link>
        </div>
      </div>

      {/* Galerie */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={currentMainImage}
                alt={property.title}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <button className="absolute top-4 right-4 bg-white text-gray-700 w-12 h-12 rounded-full flex items-center justify-center hover:text-red-500 transition shadow-lg">
                <FaHeart className="text-xl" />

                <div className="far fa-heart text-xl">
                  <BiHeart />
                </div>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {property.secondaryImages.map((url, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition"
                  onClick={() => handleThumbnailClick(url)}
                >
                  <img
                    src={url}
                    alt=""
                    className="w-full h-[190px] lg:h-[240px] object-cover"
                  />
                  {i === 3 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">+4</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* En-tête */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    {property.type}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <FaMapMarkerAlt className="mr-2" />{" "}
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaStar className="text-yellow-500" />
                    <span className="text-gray-700 font-semibold">
                      {property.rating}
                    </span>
                    <span className="text-gray-500">
                      ({property.reviews} avis)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-blue-600 font-bold text-3xl">
                    {property.price.toLocaleString()} FCFA
                  </div>
                  <div className="text-gray-500 text-sm">{property.period}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                {property.features.map((f, i) => (
                  <div
                    key={i}
                    className="text-center p-3 bg-gray-50 rounded-lg"
                  >
                    <i className={`${f.icon} text-blue-600 text-2xl mb-2`}></i>
                    <div className="text-gray-800 font-semibold">{f.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description, Équipements, Localisation, Avis */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Magnifique {property.type.toLowerCase()} à {property.location}.{" "}
                {property.rooms} chambre{property.rooms > 1 ? "s" : ""},{" "}
                {property.baths} salle
                {property.baths > 1 ? "s de bain" : " de bain"}, {property.area}{" "}
                m². {property.furnished ? "Meublé et équipé." : "À aménager."}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Équipements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.equipments.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <i className={`${e.icon} text-blue-600 text-xl`}></i>
                    <span className="text-gray-800">{e.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Localisation
              </h2>
              <div className="bg-gray-200 rounded-lg h-[300px] flex items-center justify-center mb-4">
                <div className="text-center text-gray-500">
                  <FaMapMarkerAlt className="text-5xl mb-2 mx-auto" />
                  <p>Carte</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Avis</h2>
                <div className="flex items-center space-x-2">
                  <FaStar className="text-yellow-500 text-xl" />
                  <span className="text-2xl font-bold text-gray-800">
                    {property.rating}
                  </span>
                  <span className="text-gray-500">
                    ({property.reviews} avis)
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {["Amina M.", "Jean D.", "Sophie K."].map((name, i) => (
                  <div key={i} className={`pb-4 ${i < 2 ? "border-b" : ""}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">
                            {name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Il y a {i + 2} mois
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, s) => (
                          <FaStar
                            key={s}
                            className={`text-sm ${
                              s < 5 - i ? "text-yellow-500" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR DE RÉSERVATION */}
          <div className="lg:col-span-1">
            <ReservationSidebar
              price={property.price}
              period={property.period}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Details;
