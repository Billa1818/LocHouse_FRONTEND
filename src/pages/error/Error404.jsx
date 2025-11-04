import React, { useState, useEffect } from "react";
import {
  Home,
  Search,
  ArrowLeft,
  Building2,
  MapPin,
  AlertCircle,
  Compass,
} from "lucide-react";

const Error = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ transform: `translate(${-position.x}px, ${-position.y}px)` }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            transform: `translate(${position.x * 0.5}px, ${
              position.y * 0.5
            }px)`,
          }}
        />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Main Error Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100 animate-in fade-in slide-in-from-bottom duration-700">
          {/* Error Icon & Number */}
          <div className="text-center mb-8">
            <div className="inline-block relative">
              <div
                className="text-9xl sm:text-[12rem] font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-in zoom-in duration-500"
                style={{
                  transform: `translate(${position.x * 0.1}px, ${
                    position.y * 0.1
                  }px)`,
                }}
              >
                404
              </div>
              <div className="absolute -top-4 -right-4 bg-red-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                <AlertCircle size={32} />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Oups ! Page Introuvable
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Cette propriété n'existe pas dans notre catalogue 🏚️
            </p>
            <p className="text-lg text-gray-500">
              Il semble que vous vous soyez égaré dans le quartier digital...
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="text-center animate-in fade-in slide-in-from-bottom duration-700 delay-500">
            <a
              href="/"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Retourner à l'Accueil
            </a>
          </div>

          {/* Error Code */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center animate-in fade-in duration-700 delay-600">
            <p className="text-sm text-gray-500 font-mono">
              Code d'erreur:{" "}
              <span className="font-bold text-gray-700">
                HTTP 404 - NOT_FOUND
              </span>
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Si vous pensez qu'il s'agit d'une erreur, contactez notre support.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse" />
    </div>
  );
};

export default Error;
