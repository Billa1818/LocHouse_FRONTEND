// src/data/searchConfig.js

import {
  FaMapMarkerAlt,
  FaHome,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaBed,
} from "react-icons/fa";

const INPUT_CONFIG = [
  {
    name: "location",
    placeholder: "Ville, quartier...",
    icon: FaMapMarkerAlt,
    type: "text",
    hasDetect: true,
  },
  {
    name: "type",
    placeholder: "Type de location",
    icon: FaHome,
    type: "select",
    options: [
      { value: "", label: "Type de location" },
      { value: "residentiel", label: "Résidentiel" },
      { value: "touristique", label: "Touristique" },
    ],
  },
  {
    name: "duration",
    placeholder: "Durée du séjour",
    icon: FaCalendarAlt,
    type: "select",
    options: [
      { value: "", label: "Durée du séjour" },
      { value: "court", label: "Court séjour (- 1 mois)" },
      { value: "moyen", label: "Moyen séjour (1-6 mois)" },
      { value: "long", label: "Long séjour (+ 6 mois)" },
    ],
  },
  {
    name: "budget",
    placeholder: "Budget",
    icon: FaMoneyBillWave,
    type: "select",
    options: [
      { value: "", label: "Budget" },
      { value: "0-50000", label: "Moins de 50 000 FCFA" },
      { value: "50000-100000", label: "50 000 - 100 000 FCFA" },
      { value: "100000-200000", label: "100 000 - 200 000 FCFA" },
      { value: "200000-500000", label: "200 000 - 500 000 FCFA" },
      { value: "500000+", label: "Plus de 500 000 FCFA" },
    ],
  },
  {
    name: "bedrooms",
    placeholder: "Nombre de chambres",
    icon: FaBed,
    type: "select",
    options: [
      { value: "", label: "Nombre de chambres" },
      { value: "1", label: "1 chambre" },
      { value: "2", label: "2 chambres" },
      { value: "3", label: "3 chambres" },
      { value: "4", label: "4 chambres" },
      { value: "5+", label: "5+ chambres" },
    ],
  },
];

export default INPUT_CONFIG;