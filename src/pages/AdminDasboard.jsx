import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Users,
  CheckSquare,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  TrendingUp,
  Clock,
  DollarSign,
  BarChart3,
  Zap,
  MessageSquare,
  PlusCircle,
  FileText,
  AlertCircle,
  History,
  Check,
  UserPlus,
  Star,
  Crown,
  Gauge,
  Shield,
  Database,
  Circle,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const canvasRef = useRef(null);

  // Chart drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 300;

    const data = [45, 52, 48, 65, 58, 72, 68];
    const labels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    const max = Math.max(...data) + 10;
    const barWidth = canvas.width / data.length - 20;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bars
    data.forEach((value, i) => {
      const barHeight = (value / max) * (canvas.height - 60);
      const x = i * (canvas.width / data.length) + 10;
      const y = canvas.height - barHeight - 40;

      // Gradient
      const gradient = ctx.createLinearGradient(0, y, 0, canvas.height - 40);
      gradient.addColorStop(0, "#3b82f6");
      gradient.addColorStop(1, "#1e40af");

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Labels
      ctx.fillStyle = "#6b7280";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(labels[i], x + barWidth / 2, canvas.height - 20);
      ctx.fillText(value, x + barWidth / 2, y - 5);
    });
  }, []);

  const stats = [
    {
      title: "Utilisateurs Actifs",
      value: "1,847",
      change: "+12.5%",
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      color: "blue",
    },
    {
      title: "Annonces Actives",
      value: "342",
      change: "+8.2%",
      icon: Home,
      gradient: "from-green-500 to-green-600",
      color: "green",
    },
    {
      title: "En Attente",
      value: "25",
      change: "Urgent",
      urgent: true,
      icon: Clock,
      gradient: "from-yellow-500 to-orange-500",
      color: "orange",
    },
    {
      title: "Revenus (XOF)",
      value: "47.5K",
      change: "+15.3%",
      icon: DollarSign,
      gradient: "from-purple-500 to-purple-600",
      color: "purple",
    },
  ];

  const quickActions = [
    {
      icon: CreditCard,
      label: "Vérifications",
      count: 12,
      gradient: "from-red-500 to-red-600",
      textColor: "text-red-600",
    },
    {
      icon: CheckSquare,
      label: "Annonces",
      count: 8,
      gradient: "from-yellow-500 to-orange-500",
      textColor: "text-orange-600",
    },
    {
      icon: MessageSquare,
      label: "Avis",
      count: 5,
      gradient: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
    },
    {
      icon: PlusCircle,
      label: "Nouvelle Annonce",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: FileText,
      label: "Exporter Rapport",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  const pendingVerifications = [
    {
      name: "Jean Dupont",
      initials: "JD",
      type: "Vérification d'identité",
      time: "Il y a 2h",
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "Marie Sossou",
      initials: "MS",
      type: "Document propriétaire",
      time: "Il y a 5h",
      color: "from-green-400 to-green-600",
    },
    {
      name: "Amidou Kora",
      initials: "AK",
      type: "Vérification bancaire",
      time: "Il y a 1j",
      color: "from-purple-400 to-purple-600",
    },
  ];

  const recentActivities = [
    {
      icon: Check,
      title: "Annonce validée",
      desc: "Villa 3 pièces à Cotonou approuvée",
      time: "Il y a 15 minutes",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: UserPlus,
      title: "Nouvel utilisateur",
      desc: "Sophie Martin vient de s'inscrire",
      time: "Il y a 32 minutes",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Star,
      title: "Nouvel avis",
      desc: "Avis 5 étoiles sur une location",
      time: "Il y a 1 heure",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: Crown,
      title: "Nouvel abonnement",
      desc: "Abonnement Premium souscrit",
      time: "Il y a 2 heures",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const performanceMetrics = [
    {
      label: "Taux de Validation",
      value: 75,
      desc: "Annonces approuvées",
      color: "#10b981",
    },
    {
      label: "Satisfaction",
      value: 86,
      desc: "Note moyenne utilisateurs",
      color: "#3b82f6",
    },
    {
      label: "Réponse Rapide",
      value: 65,
      desc: "< 2h de traitement",
      color: "#f59e0b",
    },
    {
      label: "Uptime",
      value: 91,
      desc: "Disponibilité serveur",
      color: "#8b5cf6",
    },
  ];

  const CircularProgress = ({ value, color }) => {
    const radius = 56;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-32 h-32 -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute">
          <p className="text-3xl font-bold text-gray-800">{value}%</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            <BarChart3 className="inline text-red-500" size={32} /> Dashboard
            Administrateur
          </h1>
          <p className="text-gray-600">
            Vue d'ensemble de la plateforme LocHouse
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <stat.icon size={28} />
                </div>
                <span
                  className={`text-sm ${
                    stat.urgent ? "bg-red-500 animate-pulse" : "bg-white/20"
                  } px-3 py-1 rounded-full`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-4xl font-bold mb-1">{stat.value}</h3>
              <p className={`text-${stat.color}-100`}>{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Activity Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                <BarChart3 className="inline text-blue-500" size={24} />{" "}
                Activité de la Plateforme
              </h2>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-gray-100 border-0 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="7days">7 derniers jours</option>
                <option value="30days">30 derniers jours</option>
                <option value="3months">3 derniers mois</option>
              </select>
            </div>
            <div className="h-[300px]">
              <canvas ref={canvasRef} className="w-full h-full"></canvas>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              <Zap className="inline text-yellow-500" size={24} /> Actions
              Rapides
            </h2>
            <div className="space-y-3">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  className={`w-full bg-gradient-to-r ${action.gradient} text-white px-4 py-3 rounded-xl hover:shadow-lg transition flex items-center justify-between group`}
                >
                  <span className="flex items-center space-x-2">
                    <action.icon size={20} />
                    <span>{action.label}</span>
                  </span>
                  {action.count && (
                    <span
                      className={`bg-white ${action.textColor} px-2 py-1 rounded-full text-xs font-bold group-hover:scale-110 transition`}
                    >
                      {action.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity & Pending Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pending Verifications */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                <AlertCircle className="inline text-red-500" size={24} />{" "}
                Vérifications en Attente
              </h2>
              <a href="#" className="text-red-500 text-sm hover:underline">
                Voir tout
              </a>
            </div>
            <div className="space-y-4">
              {pendingVerifications.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-bold`}
                  >
                    {item.initials}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-xs text-gray-500">
                      {item.type} • {item.time}
                    </p>
                  </div>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition">
                    Vérifier
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                <History className="inline text-blue-500" size={24} /> Activité
                Récente
              </h2>
              <a href="#" className="text-blue-500 text-sm hover:underline">
                Voir tout
              </a>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, idx) => (
                <div
                  key={idx}
                  className={`flex items-start space-x-3 ${
                    idx < recentActivities.length - 1
                      ? "pb-4 border-b border-gray-100"
                      : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 ${activity.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <activity.icon className={activity.iconColor} size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      <strong>{activity.title}</strong>
                    </p>
                    <p className="text-xs text-gray-500">{activity.desc}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            <Gauge className="inline text-purple-500" size={24} /> Métriques de
            Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <CircularProgress value={metric.value} color={metric.color} />
                <h3 className="font-semibold text-gray-800 mt-4">
                  {metric.label}
                </h3>
                <p className="text-sm text-gray-500">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
