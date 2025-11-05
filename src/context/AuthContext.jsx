// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  // Vérifie si un utilisateur est déjà en session (persistant)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ✅ Simulation de connexion
  const login = (email) => {
    // Si l'email contient "admin", on simule un rôle admin
    const role = email.includes("admin") ? "admin" : "user";

    const newUser = { email, role, isAuthenticated: true };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    // Redirection selon le rôle
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
