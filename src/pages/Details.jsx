import React, { useState } from "react";

// Données statiques pour simuler une API (à remplacer par de vraies données)
const propertyData = {
  mainImageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  secondaryImages: [
    "https://images.unsplash.com/photo-1502672260066-6bc11996a479",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511", // L'image '+8 photos'
  ],
  title: "Appartement Moderne - Cotonou",
  type: "Résidentiel",
  location: "Akpakpa, Cotonou, Bénin",
  price: "80 000 FCFA",
  period: "par mois",
  rating: 4.8,
  reviewsCount: 12,
  features: [
    { icon: "fas fa-bed", text: "3 Chambres" },
    { icon: "fas fa-bath", text: "2 Salles de bain" },
    { icon: "fas fa-ruler-combined", text: "120 m²" },
    { icon: "fas fa-couch", text: "Meublé" },
  ],
  equipments: [
    { icon: "fas fa-wifi", text: "WiFi haut débit" },
    { icon: "fas fa-fan", text: "Climatisation" },
    { icon: "fas fa-car", text: "Parking privé" },
    { icon: "fas fa-water", text: "Eau courante" },
    { icon: "fas fa-bolt", text: "Électricité" },
    { icon: "fas fa-shield-alt", text: "Sécurité 24h/24" },
    { icon: "fas fa-utensils", text: "Cuisine équipée" },
    { icon: "fas fa-tv", text: "Télévision" },
    { icon: "fas fa-wind", text: "Générateur" },
    { icon: "fas fa-broom", text: "Service ménage" },
  ],
  // ... autres données (propriétaire, avis, etc.)
};

const Details = ({ property = propertyData }) => {
  // État pour gérer l'image principale affichée
  const [currentMainImage, setCurrentMainImage] = useState(
    property.mainImageUrl
  );

  const handleThumbnailClick = (imageUrl) => {
    // Ne change pas l'image si c'est l'image '+8 photos'
    if (imageUrl !== property.secondaryImages[3]) {
      setCurrentMainImage(imageUrl);
    }
    // Pour l'image '+8 photos', vous pourriez ouvrir une modal ici
  };

  return (
    <main className="flex-grow bg-gray-50">
      {/* --- Galerie d'images --- */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Image principale */}
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={currentMainImage}
                alt="Image principale de la propriété"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <button className="absolute top-4 right-4 bg-white text-gray-700 w-12 h-12 rounded-full flex items-center justify-center hover:text-red-500 transition shadow-lg">
                <i className="far fa-heart text-xl"></i>
              </button>
            </div>

            {/* Grille images secondaires */}
            <div className="grid grid-cols-2 gap-4">
              {property.secondaryImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition"
                  onClick={() => handleThumbnailClick(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt={`Image ${index + 2}`}
                    className="w-full h-[190px] lg:h-[240px] object-cover"
                  />
                  {/* Bloc "+8 photos" pour la dernière miniature */}
                  {index === property.secondaryImages.length - 1 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        +8 photos
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Contenu principal --- */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale (Détails) */}
          <div className="lg:col-span-2 space-y-6">
            {/* En-tête annonce */}
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
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-star text-yellow-500"></i>
                      <span className="text-gray-700 font-semibold">
                        {property.rating}
                      </span>
                      <span className="text-gray-500">
                        ({property.reviewsCount} avis)
                      </span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">Vérifié</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-blue-600 font-bold text-3xl">
                    {property.price}
                  </div>
                  <div className="text-gray-500 text-sm">{property.period}</div>
                </div>
              </div>

              {/* Caractéristiques rapides */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                {property.features.map((feature, index) => (
                  <div
                    key={index}
                    className="text-center p-3 bg-gray-50 rounded-lg"
                  >
                    <i
                      className={`${feature.icon} text-blue-600 text-2xl mb-2`}
                    ></i>
                    <div className="text-gray-800 font-semibold">
                      {feature.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Magnifique appartement moderne situé dans le quartier prisé
                d'Akpakpa à Cotonou. Cet espace lumineux et spacieux offre tout
                le confort nécessaire pour une vie agréable au Bénin.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                L'appartement dispose de 3 chambres spacieuses, d'un salon
                accueillant, d'une cuisine moderne entièrement équipée et de 2
                salles de bain. Tous les meubles et équipements sont inclus dans
                le loyer.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Idéalement situé à proximité des commerces, restaurants, écoles
                internationales et axes routiers principaux. Quartier calme et
                sécurisé avec gardiennage 24h/24.
              </p>
            </div>
            {/* Équipements */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Équipements et services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.equipments.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <i className={`${item.icon} text-blue-600 text-xl`}></i>
                    <span className="text-gray-800">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Localisation */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Localisation
              </h2>
              <div className="bg-gray-200 rounded-lg h-[300px] flex items-center justify-center mb-4">
                <div className="text-center text-gray-500">
                  <i className="fas fa-map-marked-alt text-5xl mb-2"></i>
                  <p>Carte interactive</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-map-marker-alt text-blue-600 mt-1"></i>
                  <span>Akpakpa, Cotonou, Bénin</span>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-store text-blue-600 mt-1"></i>
                  <span>Centre commercial à 5 min</span>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-graduation-cap text-blue-600 mt-1"></i>
                  <span>Écoles internationales à proximité</span>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-hospital text-blue-600 mt-1"></i>
                  <span>Clinique à 10 min</span>
                </div>
              </div>
            </div>
            {/* Avis */}
            <AvisSection /> {/* Composant d'avis pour la clarté */}
          </div>

          {/* Colonne latérale - Réservation */}
          <div className="lg:col-span-1">
            <ReservationSidebar />{" "}
            {/* Composant de réservation pour la clarté */}
          </div>
        </div>
      </div>
    </main>
  );
};

// --- Composant d'Avis (pour rendre le code plus clair) ---
const AvisSection = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Avis des locataires</h2>
      <div className="flex items-center space-x-2">
        <i className="fas fa-star text-yellow-500 text-xl"></i>
        <span className="text-2xl font-bold text-gray-800">4.8</span>
        <span className="text-gray-500">(12 avis)</span>
      </div>
    </div>

    {/* Répartition notes */}
    <div className="space-y-3 mb-6">
      <RatingBar label="Propreté" percentage={95} score={4.9} />
      <RatingBar label="Communication" percentage={90} score={4.8} />
      <RatingBar label="Emplacement" percentage={92} score={4.7} />
      <RatingBar label="Rapport qualité/prix" percentage={88} score={4.6} />
    </div>

    {/* Liste avis (partiel) */}
    <div className="space-y-4">
      <ReviewItem
        name="Amina M."
        date="Il y a 2 mois"
        initial="AM"
        color="bg-blue-600"
        stars={5}
        content="Excellent appartement ! Très propre, bien situé et le propriétaire est très réactif. Je recommande vivement pour un séjour à Cotonou."
      />
      <ReviewItem
        name="Jean D."
        date="Il y a 3 mois"
        initial="JD"
        color="bg-green-600"
        stars={4}
        content="Bel appartement avec tout le confort nécessaire. Le quartier est calme et sécurisé. Seul bémol : quelques coupures d'eau occasionnelles."
      />
      <ReviewItem
        name="Sophie K."
        date="Il y a 4 mois"
        initial="SK"
        color="bg-purple-600"
        stars={5}
        content="Parfait pour une famille ! Les chambres sont spacieuses et la cuisine bien équipée. Proche de tout. Merci au propriétaire pour son accueil."
        isLast={true}
      />
    </div>

    <button className="mt-4 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700">
      Voir tous les avis
    </button>
  </div>
);

// Composant barre de note
const RatingBar = ({ label, percentage, score }) => (
  <div className="flex items-center space-x-3">
    <span className="text-sm text-gray-600 w-24">{label}</span>
    <div className="flex-1 bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <span className="text-sm font-semibold text-gray-700 w-8">{score}</span>
  </div>
);

// Composant élément d'avis
const ReviewItem = ({ name, date, initial, color, stars, content, isLast }) => (
  <div className={`pb-4 ${!isLast ? "border-b" : ""}`}>
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-3">
        <div
          className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white font-bold`}
        >
          {initial}
        </div>
        <div>
          <div className="font-semibold text-gray-800">{name}</div>
          <div className="text-sm text-gray-500">{date}</div>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`text-sm ${
              i < stars
                ? "fas fa-star text-yellow-500"
                : "far fa-star text-gray-300"
            }`}
          ></i>
        ))}
      </div>
    </div>
    <p className="text-gray-700">{content}</p>
  </div>
);

// --- Composant de Réservation (pour rendre le code plus clair) ---
const ReservationSidebar = () => (
  <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
    <div className="mb-6">
      <div className="text-blue-600 font-bold text-3xl mb-1">80 000 FCFA</div>
      <div className="text-gray-500">par mois</div>
    </div>

    {/* Propriétaire */}
    <div className="flex items-center space-x-3 mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
        KA
      </div>
      <div>
        <div className="font-semibold text-gray-800">Kofi Adjovi</div>
        <div className="text-sm text-gray-500">Propriétaire vérifié</div>
      </div>
    </div>

    {/* Formulaire contact */}
    <form className="space-y-4 mb-6">
      <FormGroup label="Date d'arrivée" type="date" />
      <FormGroup label="Durée du séjour" type="select">
        <option>1 mois</option>
        <option>3 mois</option>
        <option>6 mois</option>
        <option>1 an</option>
        <option>Plus d'1 an</option>
      </FormGroup>
      <FormGroup
        label="Nombre de personnes"
        type="number"
        min="1"
        defaultValue="1"
      />
    </form>

    {/* Boutons action */}
    <div className="space-y-3">
      <Button
        icon="fas fa-paper-plane"
        text="Envoyer une demande"
        style="bg-blue-600 text-white hover:bg-blue-700"
      />
      <Button
        icon="fas fa-phone"
        text="Appeler le propriétaire"
        style="border border-blue-600 text-blue-600 hover:bg-blue-50"
      />
      <Button
        icon="fab fa-whatsapp"
        text="WhatsApp"
        style="border border-gray-300 text-gray-700 hover:bg-gray-50"
      />
    </div>

    {/* Info supplémentaires */}
    <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
      <InfoPill
        icon="fas fa-check-circle"
        text="Réponse sous 24h"
        color="text-green-600"
      />
      <InfoPill
        icon="fas fa-shield-alt"
        text="Propriété vérifiée"
        color="text-green-600"
      />
      <InfoPill
        icon="fas fa-calendar-check"
        text="Disponible immédiatement"
        color="text-green-600"
      />
    </div>

    {/* Partage */}
    <div className="mt-6 pt-6 border-t">
      <div className="text-sm font-semibold text-gray-700 mb-3">
        Partager cette annonce
      </div>
      <div className="flex items-center space-x-2">
        <ShareButton icon="fab fa-facebook" color="text-blue-600" />
        <ShareButton icon="fab fa-twitter" color="text-blue-400" />
        <ShareButton icon="fab fa-whatsapp" color="text-green-600" />
        <ShareButton icon="fas fa-link" color="text-gray-600" />
      </div>
    </div>
  </div>
);

// Composants de support pour la Sidebar
const FormGroup = ({ label, type, children, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    {type === "select" ? (
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    )}
  </div>
);

const Button = ({ icon, text, style }) => (
  <button
    className={`w-full py-3 rounded-lg transition font-semibold flex items-center justify-center space-x-2 ${style}`}
  >
    <i className={icon}></i>
    <span>{text}</span>
  </button>
);

const InfoPill = ({ icon, text, color }) => (
  <div className="flex items-center space-x-2">
    <i className={`${icon} ${color}`}></i>
    <span>{text}</span>
  </div>
);

const ShareButton = ({ icon, color }) => (
  <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
    <i className={`${icon} ${color}`}></i>
  </button>
);

export default Details;
