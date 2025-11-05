import React, { useState, useMemo } from "react";
import {
  Users,
  Building,
  UserCheck,
  UserX,
  Search,
  FileDown,
  Eye,
  Edit,
  Ban,
  Unlock,
  Trash,
  Crown,
  Gift,
  Hotel,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Filter,
} from "lucide-react";

// Données initiales des utilisateurs
const initialUsers = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "+229 96 45 23 18",
    type: "proprietaire",
    status: "actif",
    verification: "verifie",
    registrationDate: "2024-10-15",
    subscription: {
      type: "premium",
      duration: "6 mois",
      expires: "2025-04-15",
    },
    initials: "JD",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    name: "Marie Sossou",
    email: "marie.sossou@email.com",
    phone: "+229 97 12 45 67",
    type: "locataire",
    status: "actif",
    verification: "non_requis",
    registrationDate: "2024-10-28",
    subscription: null,
    initials: "MS",
    color: "from-pink-400 to-pink-600",
  },
  {
    id: 3,
    name: "Amidou Kora",
    email: "amidou.kora@email.com",
    phone: "+229 95 78 34 21",
    type: "proprietaire",
    status: "en_attente",
    verification: "en_cours",
    registrationDate: "2024-11-01",
    subscription: { type: "essai", duration: "gratuit", expires: "2024-12-01" },
    initials: "AK",
    color: "from-purple-400 to-purple-600",
  },
  {
    id: 4,
    name: "Paul Todjro",
    email: "paul.todjro@email.com",
    phone: "+229 94 32 18 76",
    type: "proprietaire",
    status: "bloque",
    verification: "rejete",
    registrationDate: "2024-09-12",
    subscription: null,
    initials: "PT",
    color: "from-red-400 to-red-600",
  },
  {
    id: 5,
    name: "Sophie Laurent",
    email: "sophie.laurent@email.com",
    phone: "+33 6 12 34 56 78",
    type: "touriste",
    status: "actif",
    verification: "non_requis",
    registrationDate: "2024-11-02",
    subscription: null,
    initials: "SL",
    color: "from-orange-400 to-orange-600",
  },
  {
    id: 6,
    name: "Hôtel Dallas",
    email: "contact@hoteldallas.bj",
    phone: "+229 21 30 45 67",
    type: "hotel",
    status: "actif",
    verification: "verifie",
    registrationDate: "2024-08-08",
    subscription: { type: "premium", duration: "1 an", expires: "2025-08-08" },
    initials: "HD",
    color: "from-teal-400 to-teal-600",
  },
];

function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedVerification, setSelectedVerification] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filtrer les utilisateurs
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm);

      const matchesType = !selectedType || user.type === selectedType;
      const matchesStatus = !selectedStatus || user.status === selectedStatus;
      const matchesVerification =
        !selectedVerification || user.verification === selectedVerification;

      return (
        matchesSearch && matchesType && matchesStatus && matchesVerification
      );
    });
  }, [users, searchTerm, selectedType, selectedStatus, selectedVerification]);

  // Statistiques
  const stats = useMemo(
    () => ({
      total: users.length,
      proprietaires: users.filter(
        (u) => u.type === "proprietaire" || u.type === "hotel"
      ).length,
      locataires: users.filter(
        (u) => u.type === "locataire" || u.type === "touriste"
      ).length,
      bloques: users.filter((u) => u.status === "bloque").length,
    }),
    [users]
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedStatus("");
    setSelectedVerification("");
    setCurrentPage(1);
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleAllUsers = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map((u) => u.id));
    }
  };

  const handleAction = (action, userId) => {
    console.log(`Action: ${action} sur utilisateur: ${userId}`);
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Il y a 1 jour";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaine(s)`;
    return `Il y a ${Math.floor(diffDays / 30)} mois`;
  };

  const TypeBadge = ({ type }) => {
    const badges = {
      proprietaire: {
        icon: Building,
        text: "Propriétaire",
        color: "bg-purple-100 text-purple-700",
      },
      locataire: {
        icon: Users,
        text: "Locataire",
        color: "bg-green-100 text-green-700",
      },
      touriste: {
        icon: Users,
        text: "Touriste",
        color: "bg-green-100 text-green-700",
      },
      hotel: {
        icon: Hotel,
        text: "Hôtel",
        color: "bg-purple-100 text-purple-700",
      },
    };
    const badge = badges[type];
    const Icon = badge.icon;
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}
      >
        <Icon size={12} className="mr-1" />
        {badge.text}
      </span>
    );
  };

  const StatusBadge = ({ status }) => {
    const statuses = {
      actif: { text: "Actif", color: "bg-green-100 text-green-700" },
      inactif: { text: "Inactif", color: "bg-gray-100 text-gray-700" },
      bloque: { text: "Bloqué", color: "bg-red-100 text-red-700" },
      en_attente: {
        text: "En attente",
        color: "bg-yellow-100 text-yellow-700",
      },
    };
    const statusConfig = statuses[status];
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
      >
        <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
        {statusConfig.text}
      </span>
    );
  };

  const VerificationBadge = ({ verification }) => {
    const verifications = {
      verifie: { text: "Vérifié", color: "bg-green-100 text-green-700" },
      non_verifie: { text: "Non vérifié", color: "bg-gray-100 text-gray-700" },
      en_cours: { text: "En cours", color: "bg-yellow-100 text-yellow-700" },
      rejete: { text: "Rejeté", color: "bg-red-100 text-red-700" },
      non_requis: { text: "Non requis", color: "bg-gray-100 text-gray-700" },
    };
    const verif = verifications[verification];
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${verif.color}`}
      >
        {verif.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <Users className="text-blue-500" size={32} />
                Gestion des Utilisateurs
              </h1>
              <p className="text-gray-600">
                Consulter et gérer tous les comptes de la plateforme
              </p>
            </div>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2">
              <FileDown size={18} />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Users size={24} />
              </div>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                Total
              </span>
            </div>
            <h3 className="text-4xl font-bold mb-1">
              {stats.total.toLocaleString()}
            </h3>
            <p className="text-blue-100">Utilisateurs Totaux</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Building size={24} />
              </div>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                +8.2%
              </span>
            </div>
            <h3 className="text-4xl font-bold mb-1">{stats.proprietaires}</h3>
            <p className="text-purple-100">Propriétaires</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <UserCheck size={24} />
              </div>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                +12.5%
              </span>
            </div>
            <h3 className="text-4xl font-bold mb-1">{stats.locataires}</h3>
            <p className="text-green-100">Locataires/Touristes</p>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <UserX size={24} />
              </div>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                Attention
              </span>
            </div>
            <h3 className="text-4xl font-bold mb-1">{stats.bloques}</h3>
            <p className="text-red-100">Comptes Bloqués</p>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rechercher
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nom, email, téléphone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type d'utilisateur
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous</option>
                <option value="proprietaire">Propriétaires</option>
                <option value="locataire">Locataires/Touristes</option>
                <option value="hotel">Hôtels</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous</option>
                <option value="actif">Actifs</option>
                <option value="inactif">Inactifs</option>
                <option value="bloque">Bloqués</option>
                <option value="en_attente">En attente</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vérification
              </label>
              <select
                value={selectedVerification}
                onChange={(e) => setSelectedVerification(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous</option>
                <option value="verifie">Vérifiés</option>
                <option value="non_verifie">Non vérifiés</option>
                <option value="en_cours">En cours</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{filteredUsers.length}</span>{" "}
              résultats trouvés
            </p>
            <button
              onClick={resetFilters}
              className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              <RotateCw size={14} />
              <span>Réinitialiser les filtres</span>
            </button>
          </div>
        </div>

        {/* Tableau des utilisateurs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedUsers.length === paginatedUsers.length &&
                        paginatedUsers.length > 0
                      }
                      onChange={toggleAllUsers}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Utilisateur
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Vérification
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Inscription
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Abonnement
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-50 transition ${
                      user.status === "bloque" ? "bg-red-50/30" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${user.color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
                        >
                          {user.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-500">{user.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <TypeBadge type={user.type} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-6 py-4">
                      <VerificationBadge verification={user.verification} />
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-800">
                        {new Date(user.registrationDate).toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getRelativeTime(user.registrationDate)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {user.subscription ? (
                        <>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              user.subscription.type === "premium"
                                ? "bg-blue-100 text-blue-700"
                                : user.subscription.type === "essai"
                                ? "bg-green-100 text-green-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {user.subscription.type === "premium" && (
                              <Crown size={12} className="mr-1" />
                            )}
                            {user.subscription.type === "essai" && (
                              <Gift size={12} className="mr-1" />
                            )}
                            {user.subscription.type === "premium"
                              ? "Premium"
                              : "Essai"}{" "}
                            {user.subscription.duration}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            Expire:{" "}
                            {new Date(
                              user.subscription.expires
                            ).toLocaleDateString("fr-FR")}
                          </p>
                        </>
                      ) : (
                        <span className="text-xs text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleAction("view", user.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Voir détails"
                        >
                          <Eye size={18} />
                        </button>
                        {user.status !== "bloque" ? (
                          <>
                            <button
                              onClick={() => handleAction("edit", user.id)}
                              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
                              title="Modifier"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleAction("block", user.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Bloquer"
                            >
                              <Ban size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleAction("unlock", user.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Débloquer"
                            >
                              <Unlock size={18} />
                            </button>
                            <button
                              onClick={() => handleAction("delete", user.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Supprimer"
                            >
                              <Trash size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Affichage de{" "}
                <span className="font-semibold">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                à{" "}
                <span className="font-semibold">
                  {Math.min(currentPage * itemsPerPage, filteredUsers.length)}
                </span>{" "}
                sur{" "}
                <span className="font-semibold">{filteredUsers.length}</span>{" "}
                résultats
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <ChevronLeft size={16} /> Précédent
                </button>

                <div className="hidden md:flex items-center space-x-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-lg transition ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="px-2 text-gray-500">...</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  Suivant <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
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
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default UserManagement;
