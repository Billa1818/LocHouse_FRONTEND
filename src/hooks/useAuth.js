import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Assurez-vous d'avoir ce contexte

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }

  // C'est la partie cruciale : vérifiez le rôle
  const isAdmin = context.user?.role === "ADMIN";
  const isAuthenticated = !!context.user; // True si un utilisateur est défini

  return {
    ...context, // Retourne les infos utilisateur, loading, etc.
    isAuthenticated,
    isAdmin, // La propriété utilisée pour le basculement
  };
};

export default useAuth;
