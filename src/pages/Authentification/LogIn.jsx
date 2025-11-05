import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Mail,
  Key,
  LogIn,
  Loader2,
  Send,
  CheckCircle,
  RotateCcw,
  Shield,
  Lock,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

// Code OTP Simulée (pour la démo)
const DEMO_OTP_CODE = "123456";

function Login() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [resendTimer, setResendTimer] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isInitializing, setIsInitializing] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Simulation d'initialisation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Timer pour renvoyer le code
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Animation d'entrée
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!email || !email.includes("@")) {
      setMessage({
        type: "error",
        text: "Veuillez entrer une adresse email valide.",
      });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setStep("code");
    setResendTimer(60);
    setMessage({
      type: "info",
      text: `Code de vérification envoyé ! Vérifiez votre boîte de réception.`,
    });
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus sur le prochain champ
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData
      .split("")
      .concat(Array(6 - pastedData.length).fill(""));
    setOtpCode(newOtp.slice(0, 6));

    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    const lastInput = document.getElementById(`otp-${lastFilledIndex}`);
    if (lastInput) lastInput.focus();
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const enteredCode = otpCode.join("");

    if (enteredCode.length !== 6) {
      setMessage({
        type: "error",
        text: "Veuillez entrer les 6 chiffres du code.",
      });
      return;
    }

    if (enteredCode !== DEMO_OTP_CODE) {
      setAttempts(attempts + 1);
      setMessage({
        type: "error",
        text: `Code incorrect. ${3 - attempts - 1} tentative(s) restante(s).`,
      });

      if (attempts >= 2) {
        setMessage({
          type: "error",
          text: "Trop de tentatives échouées. Veuillez demander un nouveau code.",
        });
        setTimeout(resetForm, 3000);
      }

      setOtpCode(["", "", "", "", "", ""]);
      document.getElementById("otp-0")?.focus();
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setStep("success");

    // 🔥 Simulation de rôle (admin ou utilisateur)
    const role = email === "admin@lochouse.bj" ? "admin" : "user";

    // On connecte l'utilisateur via le contexte
    login(email, role);

    // Redirection selon le rôle
    setTimeout(() => {
      if (role === "admin") navigate("/admin");
      else navigate("/");
    }, 1500);
  };

  const handleResendCode = async () => {
    if (resendTimer > 0) return;

    setIsLoading(true);
    setMessage(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setResendTimer(60);
    setAttempts(0);
    setOtpCode(["", "", "", "", "", ""]);
    setMessage({
      type: "success",
      text: "Nouveau code envoyé avec succès !",
    });

    document.getElementById("otp-0")?.focus();
  };

  const resetForm = () => {
    setEmail("");
    setOtpCode(["", "", "", "", "", ""]);
    setStep("email");
    setMessage(null);
    setResendTimer(0);
    setAttempts(0);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center p-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl">
          <Loader2
            className="animate-spin text-blue-600 mx-auto mb-4"
            size={48}
          />
          <p className="text-gray-700 font-semibold text-lg">
            Initialisation...
          </p>
        </div>
      </div>
    );
  }

  const getMessageClasses = (type) => {
    if (type === "success")
      return "bg-green-50 text-green-800 border-green-200";
    if (type === "error") return "bg-red-50 text-red-800 border-red-200";
    return "bg-blue-50 text-blue-800 border-blue-200";
  };

  const getMessageIcon = (type) => {
    if (type === "success") return <CheckCircle size={18} />;
    if (type === "error") return <AlertCircle size={18} />;
    return <Shield size={18} />;
  };

  const renderFormStep = () => {
    switch (step) {
      case "email":
        return (
          <div
            className={`transition-all duration-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
                <Mail size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Connexion Sécurisée
              </h2>
              <p className="text-gray-600">
                Entrez votre email pour recevoir un code de vérification
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Adresse Email
                </label>
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-gray-800 transition-all duration-200 shadow-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={22} />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={22} className="mr-2" />
                    Recevoir le Code
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-start space-x-3">
                <Shield
                  size={20}
                  className="text-blue-600 mt-0.5 flex-shrink-0"
                />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-1">
                    Connexion sans mot de passe
                  </p>
                  <p className="text-gray-600">
                    Nous vous enverrons un code de vérification unique pour
                    sécuriser votre connexion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "code":
        return (
          <div
            className={`transition-all duration-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <button
              onClick={resetForm}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
            >
              <ArrowLeft
                size={18}
                className="mr-2 group-hover:-translate-x-1 transition-transform"
              />
              <span className="text-sm font-medium">Changer d'email</span>
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg">
                <Key size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Vérification du Code
              </h2>
              <p className="text-gray-600">
                Code envoyé à{" "}
                <span className="font-semibold text-indigo-600">{email}</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Code de démo :{" "}
                <span className="font-mono font-bold text-indigo-600">
                  {DEMO_OTP_CODE}
                </span>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 text-center">
                  Entrez le code à 6 chiffres
                </label>
                <div className="flex justify-center gap-2 sm:gap-3">
                  {otpCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                      className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 shadow-sm"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || otpCode.join("").length !== 6}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={22} />
                    Vérification...
                  </>
                ) : (
                  <>
                    <LogIn size={22} className="mr-2" />
                    Valider et Se Connecter
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendTimer > 0}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors inline-flex items-center"
                >
                  <RotateCcw size={14} className="mr-1" />
                  {resendTimer > 0
                    ? `Renvoyer le code dans ${resendTimer}s`
                    : "Renvoyer un nouveau code"}
                </button>
              </div>
            </form>

            {attempts > 0 && (
              <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-800 text-center">
                  <AlertCircle size={16} className="inline mr-1" />
                  {3 - attempts} tentative(s) restante(s)
                </p>
              </div>
            )}
          </div>
        );

      case "success":
        return (
          <div
            className={`text-center space-y-6 transition-all duration-500 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full shadow-2xl animate-bounce">
              <CheckCircle size={48} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Connexion Réussie !
              </h2>
              <p className="text-gray-600 text-lg">
                Bienvenue{" "}
                <span className="font-semibold text-green-600">{email}</span>
              </p>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
              <p className="text-gray-700 mb-4">
                Vous êtes maintenant connecté à votre compte LocHouse de manière
                sécurisée.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-green-700">
                <Lock size={16} />
                <span className="font-semibold">
                  Connexion protégée et chiffrée
                </span>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              <RotateCcw size={22} className="mr-2" />
              Nouvelle Connexion
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-10 border border-white">
          {message && (
            <div
              className={`p-4 rounded-xl text-sm mb-6 border-2 font-medium flex items-start space-x-3 ${getMessageClasses(
                message.type
              )} animate-fade-in`}
            >
              {getMessageIcon(message.type)}
              <span className="flex-1">{message.text}</span>
            </div>
          )}

          {renderFormStep()}
        </div>

        <p className="text-gray-600 text-sm mt-6 text-center">
          Pas encore de compte ?{" "}
          <Link
            to="/signin"
            className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline transition-colors"
          >
            S'inscrire gratuitement
          </Link>
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Login;
