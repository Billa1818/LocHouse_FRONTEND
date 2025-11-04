import React, { useState, useEffect } from "react";
import {
  Mail,
  Key,
  User,
  Phone,
  MapPin,
  Building2,
  CheckCircle,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

const App = () => {
  const [role, setRole] = useState("proprietaire");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    propertyType: "",
    city: "",
    acceptTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Effacer l'erreur du champ quand l'utilisateur tape
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field) => {
    let error = "";

    switch (field) {
      case "fullName":
        if (!formData.fullName.trim()) error = "Le nom complet est requis";
        else if (formData.fullName.trim().length < 3)
          error = "Le nom doit contenir au moins 3 caractères";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) error = "L'email est requis";
        else if (!emailRegex.test(formData.email)) error = "Email invalide";
        break;
      case "password":
        if (!formData.password) error = "Le mot de passe est requis";
        else if (formData.password.length < 6)
          error = "Au moins 6 caractères requis";
        break;
      case "phone":
        if (formData.phone && formData.phone.length < 8)
          error = "Numéro de téléphone invalide";
        break;
      case "propertyType":
        if (role === "proprietaire" && !formData.propertyType)
          error = "Type de bien requis";
        break;
      case "city":
        if (role === "proprietaire" && !formData.city) error = "Ville requise";
        break;
    }

    setFieldErrors((prev) => ({ ...prev, [field]: error }));
    return error === "";
  };

  useEffect(() => {
    if (role === "client") {
      setFormData((prev) => ({
        ...prev,
        propertyType: "",
        city: "",
      }));
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.propertyType;
        delete newErrors.city;
        return newErrors;
      });
    }
  }, [role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Valider tous les champs
    const fieldsToValidate = ["fullName", "email", "password"];
    if (role === "proprietaire") {
      fieldsToValidate.push("propertyType", "city");
    }

    let hasErrors = false;
    fieldsToValidate.forEach((field) => {
      if (!validateField(field)) hasErrors = true;
    });

    if (!formData.acceptTerms) {
      setMessage("Veuillez accepter les conditions générales.");
      setIsLoading(false);
      return;
    }

    if (hasErrors) {
      setMessage("Veuillez corriger les erreurs avant de continuer.");
      setIsLoading(false);
      return;
    }

    console.log("Envoi des données:", { role, ...formData });

    setTimeout(() => {
      setIsLoading(false);
      setMessage(
        `Inscription réussie en tant que ${role} ! Bienvenue ${formData.fullName}.`
      );
    }, 2000);
  };

  const InputField = ({ field, value, error, touched }) => {
    const Icon = field.icon;
    const hasError = touched && error;

    return (
      <div className="space-y-2">
        <label
          htmlFor={field.name}
          className="block text-sm font-semibold text-gray-700"
        >
          <Icon size={16} className="inline mr-2 text-blue-600" />
          {field.label}{" "}
          {field.required !== false && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          <input
            type={
              field.type === "password" && showPassword ? "text" : field.type
            }
            id={field.name}
            name={field.name}
            value={value}
            onChange={handleChange}
            onBlur={() => handleBlur(field.name)}
            placeholder={field.placeholder}
            required={field.required !== false}
            className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm ${
              hasError
                ? "border-red-300 focus:ring-red-500 bg-red-50"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
          />
          {field.type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
          {hasError && (
            <AlertCircle
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
            />
          )}
        </div>
        {hasError && (
          <p className="text-sm text-red-600 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle size={14} />
            {error}
          </p>
        )}
      </div>
    );
  };

  const commonFields = [
    {
      name: "fullName",
      type: "text",
      label: "Nom complet",
      icon: User,
      placeholder: "Votre nom et prénom",
      required: true,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      icon: Mail,
      placeholder: "votre@email.com",
      required: true,
    },
    {
      name: "phone",
      type: "tel",
      label: "Téléphone",
      icon: Phone,
      placeholder: "+229 97 00 00 00",
      required: false,
    },
    {
      name: "password",
      type: "password",
      label: "Mot de passe",
      icon: Key,
      placeholder: "Au moins 6 caractères",
      required: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* En-tête avec animation */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Bienvenue sur <span className="text-blue-600">LocHouse</span>
          </h1>
          <p className="text-gray-600">
            Créez votre compte en quelques instants
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Sélecteur de Rôle Amélioré */}
          <div className="relative mb-8 bg-gradient-to-r from-gray-50 to-gray-100 p-1.5 rounded-2xl shadow-inner">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRole("proprietaire")}
                className={`flex-1 py-4 px-6 text-center rounded-xl font-bold transition-all duration-300 transform ${
                  role === "proprietaire"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-md"
                }`}
              >
                <Building2 size={20} className="inline mr-2" />
                Propriétaire
              </button>
              <button
                type="button"
                onClick={() => setRole("client")}
                className={`flex-1 py-4 px-6 text-center rounded-xl font-bold transition-all duration-300 transform ${
                  role === "client"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:bg-white hover:text-green-600 hover:shadow-md"
                }`}
              >
                <User size={20} className="inline mr-2" />
                Client
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section d'information */}
            <div
              className={`p-5 rounded-2xl text-sm border-2 transition-all duration-300 ${
                role === "proprietaire"
                  ? "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300 text-blue-900"
                  : "bg-gradient-to-r from-green-50 to-green-100 border-green-300 text-green-900"
              }`}
            >
              <p className="font-bold mb-2 flex items-center gap-2">
                {role === "proprietaire" ? (
                  <Building2 size={18} />
                ) : (
                  <User size={18} />
                )}
                {role === "proprietaire"
                  ? "Profil Propriétaire"
                  : "Profil Client"}
              </p>
              <p className="leading-relaxed">
                {role === "proprietaire"
                  ? "Gérez vos biens immobiliers facilement. Listez vos propriétés et trouvez des locataires rapidement."
                  : "Recherchez et postulez aux meilleures offres de location. Trouvez votre logement idéal en quelques clics."}
              </p>
            </div>

            {/* Message de succès/erreur */}
            {message && (
              <div
                className={`p-4 rounded-2xl text-center font-semibold flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300 ${
                  message.includes("succès")
                    ? "bg-green-100 text-green-800 border-2 border-green-300"
                    : "bg-red-100 text-red-800 border-2 border-red-300"
                }`}
              >
                {message.includes("succès") ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                {message}
              </div>
            )}

            {/* Champs Communs */}
            {commonFields.map((field) => (
              <InputField
                key={field.name}
                field={field}
                value={formData[field.name]}
                error={fieldErrors[field.name]}
                touched={touched[field.name]}
              />
            ))}

            {/* Champs Propriétaire */}
            {role === "proprietaire" && (
              <div className="space-y-6 pt-4 border-t-2 border-gray-100">
                <div className="space-y-2">
                  <label
                    htmlFor="propertyType"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    <Building2
                      size={16}
                      className="inline mr-2 text-blue-600"
                    />
                    Type de bien principal{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    onBlur={() => handleBlur("propertyType")}
                    required
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm ${
                      touched.propertyType && fieldErrors.propertyType
                        ? "border-red-300 focus:ring-red-500 bg-red-50"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  >
                    <option value="">Sélectionnez un type...</option>
                    <option value="Appartement">🏢 Appartement</option>
                    <option value="Villa">🏡 Villa</option>
                    <option value="Studio">🛋️ Studio</option>
                    <option value="Chambre">🚪 Chambre</option>
                    <option value="Immeuble">🏢 Immeuble</option>
                    <option value="Terrain">🌳 Terrain</option>
                    <option value="Autre">📦 Autre</option>
                  </select>
                  {touched.propertyType && fieldErrors.propertyType && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {fieldErrors.propertyType}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    <MapPin size={16} className="inline mr-2 text-blue-600" />
                    Ville principale <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={() => handleBlur("city")}
                    required
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm ${
                      touched.city && fieldErrors.city
                        ? "border-red-300 focus:ring-red-500 bg-red-50"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  >
                    <option value="">Sélectionnez une ville...</option>
                    <option value="Cotonou">📍 Cotonou</option>
                    <option value="Porto-Novo">📍 Porto-Novo</option>
                    <option value="Abomey-Calavi">📍 Abomey-Calavi</option>
                    <option value="Parakou">📍 Parakou</option>
                    <option value="Ouidah">📍 Ouidah</option>
                    <option value="Bohicon">📍 Bohicon</option>
                    <option value="Autre">📍 Autre</option>
                  </select>
                  {touched.city && fieldErrors.city && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {fieldErrors.city}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Termes et Conditions */}
            <div className="flex items-start space-x-3 pt-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
                className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor="acceptTerms"
                className="text-sm text-gray-700 cursor-pointer leading-relaxed"
              >
                J'accepte les{" "}
                <a
                  href="/cgu"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  conditions générales
                </a>{" "}
                et la{" "}
                <a
                  href="/confidentialite"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  politique de confidentialité
                </a>
                . <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Bouton de Soumission */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl flex items-center justify-center transform hover:scale-105 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-2xl"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={24} />
                  Création en cours...
                </>
              ) : (
                <>
                  <CheckCircle size={24} className="mr-2" />
                  Créer mon compte
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t-2 border-gray-100 pt-6">
            <p className="text-gray-600">
              Vous avez déjà un compte ?{" "}
              <a
                href="/connexion"
                className="text-blue-600 font-bold hover:underline hover:text-blue-700 transition"
              >
                Connectez-vous ici →
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2024 LocHouse. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default App;
