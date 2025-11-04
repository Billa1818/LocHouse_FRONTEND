// src/pages/Details.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import mockListings from "../data/mockListings";
import { 
  FaArrowLeft, 
  FaStar, 
  FaMapMarkerAlt, 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaCouch, 
  FaWifi, 
  FaSnowflake, 
  FaCar, 
  FaSwimmer, 
  FaUtensils, 
  FaTv, 
  FaShieldAlt, 
  FaBolt, 
  FaHeart, 
  FaTint 
} from "react-icons/fa";

const Details = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [currentMainImage, setCurrentMainImage] = useState("");

  useEffect(() => {
    const foundProperty = mockListings.find(listing => listing.id === parseInt(id));
    if (foundProperty) {
      // Génère 4 mini-photos cohérentes
      const baseId = foundProperty.id;
      const secondaryImages = [
        `/images/logements/extra-${baseId}-1.jpg`,
        `/images/logements/extra-${baseId}-2.jpg`,
        `/images/logements/extra-${baseId}-3.jpg`,
        `/images/logements/extra-${baseId}-4.jpg`,
      ];

      setProperty({
        ...foundProperty,
        mainImageUrl: foundProperty.image, // IMAGE PRINCIPALE = LISTING
        secondaryImages,
        period: foundProperty.unit.replace("FCFA/", "").trim(),
        features: [
          { icon: "fas fa-bed", text: `${foundProperty.rooms} Chambre${foundProperty.rooms > 1 ? 's' : ''}` },
          { icon: "fas fa-bath", text: `${foundProperty.baths} Salle${foundProperty.baths > 1 ? 's de bain' : ' de bain'}` },
          { icon: "fas fa-ruler-combined", text: `${foundProperty.area} m²` },
          { icon: "fas fa-couch", text: foundProperty.furnished ? "Meublé" : "Non meublé" },
        ],
        equipments: [
          ...(foundProperty.wifi ? [{ icon: "fas fa-wifi", text: "WiFi haut débit" }] : []),
          ...(foundProperty.ac ? [{ icon: "fas fa-fan", text: "Climatisation" }] : []),
          ...(foundProperty.parking ? [{ icon: "fas fa-car", text: "Parking privé" }] : []),
          { icon: "fas fa-tint", text: "Eau courante" },
          { icon: "fas fa-bolt", text: "Électricité" },
          { icon: "fas fa-shield-alt", text: "Sécurité 24h/24" },
          { icon: "fas fa-utensils", text: "Cuisine équipée" },
          { icon: "fas fa-tv", text: "Télévision" },
          ...(foundProperty.pool ? [{ icon: "fas fa-swimmer", text: "Piscine" }] : []),
        ].slice(0, 10),
      });
      setCurrentMainImage(foundProperty.image);
    }
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Logement non trouvé</h2>
          <Link to="/rechercher" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
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
      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/rechercher" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <FaArrowLeft className="mr-2" /> Retour
          </Link>
        </div>
      </div>

      {/* GALERIE */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Image principale */}
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={currentMainImage}
                alt={property.title}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <button className="absolute top-4 right-4 bg-white text-gray-700 w-12 h-12 rounded-full flex items-center justify-center hover:text-red-500 transition shadow-lg">
                <FaHeart className="text-xl" />
              </button>
            </div>

            {/* Mini-photos */}
            <div className="grid grid-cols-2 gap-4">
              {property.secondaryImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition"
                  onClick={() => handleThumbnailClick(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt={`Photo ${index + 2}`}
                    className="w-full h-[190px] lg:h-[240px] object-cover"
                  />
                  {index === 3 && (
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

      {/* CONTENU */}
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
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <FaStar className="text-yellow-500" />
                      <span className="text-gray-700 font-semibold">{property.rating}</span>
                      <span className="text-gray-500">({property.reviews} avis)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-blue-600 font-bold text-3xl">
                    {property.price.toLocaleString()} FCFA
                  </div>
                  <div className="text-gray-500 text-sm">{property.period}</div>
                </div>
              </div>

              {/* Caractéristiques */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                {property.features.map((feature, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <i className={`${feature.icon} text-blue-600 text-2xl mb-2`}></i>
                    <div className="text-gray-800 font-semibold">{feature.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                Magnifique {property.type.toLowerCase()} à {property.location}. 
                {property.rooms} chambre{property.rooms > 1 ? 's' : ''}, 
                {property.baths} salle{property.baths > 1 ? 's de bain' : ' de bain'}, 
                {property.area} m². 
                {property.furnished ? "Meublé et équipé." : "À aménager."}
              </p>
            </div>

            {/* Équipements */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Équipements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.equipments.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <i className={`${item.icon} text-blue-600 text-xl`}></i>
                    <span className="text-gray-800">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Localisation */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Localisation</h2>
              <div className="bg-gray-200 rounded-lg h-[300px] flex items-center justify-center mb-4">
                <div className="text-center text-gray-500">
                  <FaMapMarkerAlt className="text-5xl mb-2 mx-auto" />
                  <p>Carte</p>
                </div>
              </div>
            </div>

            <AvisSection rating={property.rating} reviewsCount={property.reviews} />
          </div>

          <div className="lg:col-span-1">
            <ReservationSidebar price={property.price} />
          </div>
        </div>
      </div>
    </main>
  );
};

// === COMPOSANTS (inchangés) ===
const AvisSection = ({ rating, reviewsCount }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Avis</h2>
      <div className="flex items-center space-x-2">
        <FaStar className="text-yellow-500 text-xl" />
        <span className="text-2xl font-bold text-gray-800">{rating}</span>
        <span className="text-gray-500">({reviewsCount} avis)</span>
      </div>
    </div>
    <div className="space-y-4">
      <ReviewItem name="Amina M." date="Il y a 2 mois" initial="AM" stars={5} />
      <ReviewItem name="Jean D." date="Il y a 3 mois" initial="JD" stars={4} />
      <ReviewItem name="Sophie K." date="Il y a 4 mois" initial="SK" stars={5} isLast />
    </div>
  </div>
);

const ReviewItem = ({ name, date, initial, stars, isLast }) => (
  <div className={`pb-4 ${!isLast ? "border-b" : ""}`}>
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          {initial}
        </div>
        <div>
          <div className="font-semibold text-gray-800">{name}</div>
          <div className="text-sm text-gray-500">{date}</div>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={`text-sm ${i < stars ? "text-yellow-500" : "text-gray-300"}`} />
        ))}
      </div>
    </div>
  </div>
);

const ReservationSidebar = ({ price }) => (
  <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
    <div className="mb-6">
      <div className="text-blue-600 font-bold text-3xl mb-1">{price.toLocaleString()} FCFA</div>
      <div className="text-gray-500">par mois</div>
    </div>
    <form className="space-y-4 mb-6">
      <FormGroup label="Arrivée" type="date" />
      <FormGroup label="Durée" type="select">
        <option>1 mois</option>
        <option>3 mois</option>
        <option>6 mois</option>
      </FormGroup>
    </form>
    <Button icon="fas fa-paper-plane" text="Demande" style="bg-blue-600 text-white hover:bg-blue-700" />
  </div>
);

const FormGroup = ({ label, type, children, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    {type === "select" ? (
      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg" {...props}>{children}</select>
    ) : (
      <input type={type} className="w-full px-4 py-2 border border-gray-300 rounded-lg" {...props} />
    )}
  </div>
);

const Button = ({ icon, text, style }) => (
  <button className={`w-full py-3 rounded-lg transition font-semibold flex items-center justify-center space-x-2 ${style}`}>
    <i className={icon}></i>
    <span>{text}</span>
  </button>
);

export default Details;