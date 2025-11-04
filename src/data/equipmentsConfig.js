// src/data/equipmentsConfig.js

import {
  FaWifi,
  FaSnowflake,
  FaSwimmer,
  FaCar,
  FaTint,
  FaBolt,
  FaShieldAlt,
  FaUtensils,
  FaTv,
  FaTree,
  FaDumbbell,
  FaCouch,
} from "react-icons/fa";

const EQUIPMENTS = [
  { id: "wifi", label: "WiFi", icon: FaWifi },
  { id: "clim", label: "Climatisation", icon: FaSnowflake },
  { id: "piscine", label: "Piscine", icon: FaSwimmer },
  { id: "parking", label: "Parking", icon: FaCar },
  { id: "eau", label: "Eau courante", icon: FaTint },
  { id: "electricite", label: "Électricité", icon: FaBolt },
  { id: "securite", label: "Sécurité 24h/24", icon: FaShieldAlt },
  { id: "cuisine", label: "Cuisine équipée", icon: FaUtensils },
  { id: "tv", label: "Télévision", icon: FaTv },
  { id: "jardin", label: "Jardin", icon: FaTree },
  { id: "sport", label: "Salle de sport", icon: FaDumbbell },
  { id: "meuble", label: "Meublé", icon: FaCouch },
];

export default EQUIPMENTS;