import { FaExclamationTriangle } from "react-icons/fa";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <FaExclamationTriangle className="mx-auto text-red-500 text-5xl mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Erreur de chargement</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}