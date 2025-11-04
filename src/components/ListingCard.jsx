// src/components/ListingCard.jsx → MODIFIÉ
import { MdLocationOn, MdFavoriteBorder, MdFavorite, MdStar, MdStarHalf, MdStarBorder, MdWifi, MdLocalParking, MdPool, MdAcUnit, MdBed, MdBathtub, MdSquareFoot } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  const filledStars = Math.floor(listing.rating);
  const hasHalfStar = listing.rating % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <Link to={`/details/${listing.id}`} className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
      {/* IMAGE ICI */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=Image+non+trouvée";
          }}
        />
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium text-white ${
          listing.type === "Touristique" ? "bg-green-600" : "bg-blue-600"
        }`}>
          {listing.type}
        </span>
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition">
          <MdFavoriteBorder className="w-5 h-5 text-gray-600 group-hover:hidden" />
          <MdFavorite className="w-5 h-5 text-red-500 hidden group-hover:block" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-1">
          {listing.title}
        </h3>
        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
          <MdLocationOn className="w-4 h-4" />
          {listing.location}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-gray-900">
            {listing.price.toLocaleString()} {listing.unit}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <MdBed className="w-4 h-4" /> {listing.rooms}
            <MdBathtub className="w-4 h-4" /> {listing.baths}
            <MdSquareFoot className="w-4 h-4" /> {listing.area}m²
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            {[...Array(filledStars)].map((_, i) => <MdStar key={i} className="w-4 h-4 text-yellow-500" />)}
            {hasHalfStar && <MdStarHalf className="w-4 h-4 text-yellow-500" />}
            {[...Array(emptyStars)].map((_, i) => <MdStarBorder key={i} className="w-4 h-4 text-yellow-500" />)}
            <span className="text-xs text-gray-600 ml-1">({listing.reviews})</span>
          </div>
          <div className="flex gap-2 text-gray-600">
            {listing.wifi && <MdWifi className="w-4 h-4" />}
            {listing.parking && <MdLocalParking className="w-4 h-4" />}
            {listing.pool && <MdPool className="w-4 h-4" />}
            {listing.ac && <MdAcUnit className="w-4 h-4" />}
          </div>
        </div>
      </div>
    </Link>
  );
}