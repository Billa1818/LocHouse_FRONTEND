import React, { useState } from "react";

export default function Verification() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [sortFilter, setSortFilter] = useState("recent");
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [verificationComment, setVerificationComment] = useState("");
  const [showModal, setShowModal] = useState(false);

  const verifications = [
    {
      id: "PRO-1234",
      name: "Alain Mensah",
      email: "alain.mensah@email.com",
      initials: "AM",
      color: "from-blue-500 to-blue-600",
      document: { type: "CNI", filename: "cni_001234.jpg" },
      submittedDate: "02 Nov 2025",
      submittedTime: "14:30",
      timeAgo: "Il y a 2h",
      status: "pending",
      profileName: "Résidence Dallas",
      registrationDate: "28 Oct 2025",
      fileSize: "2.4 MB",
      format: "JPEG",
    },
    {
      id: "PRO-1235",
      name: "Sophie Koffi",
      email: "sophie.koffi@email.com",
      initials: "SK",
      color: "from-purple-500 to-purple-600",
      document: { type: "CNI", filename: "cni_001235.jpg" },
      submittedDate: "02 Nov 2025",
      submittedTime: "12:15",
      timeAgo: "Il y a 4h",
      status: "pending",
      profileName: "Villa Moderne",
      registrationDate: "27 Oct 2025",
      fileSize: "1.8 MB",
      format: "JPEG",
    },
    {
      id: "PRO-1230",
      name: "Jean Dossou",
      email: "jean.dossou@email.com",
      initials: "JD",
      color: "from-green-500 to-green-600",
      document: { type: "CNI", filename: "cni_001230.jpg" },
      submittedDate: "01 Nov 2025",
      submittedTime: "16:45",
      timeAgo: "Vérifié le 01 Nov",
      status: "approved",
      profileName: "Appartement Centre",
      registrationDate: "25 Oct 2025",
      fileSize: "2.1 MB",
      format: "JPEG",
    },
    {
      id: "PRO-1228",
      name: "Marie Tossou",
      email: "marie.tossou@email.com",
      initials: "MT",
      color: "from-red-500 to-red-600",
      document: { type: "CNI", filename: "cni_001228.jpg" },
      submittedDate: "31 Oct 2025",
      submittedTime: "10:20",
      timeAgo: "Rejeté le 31 Oct",
      status: "rejected",
      profileName: "Studio Paris",
      registrationDate: "24 Oct 2025",
      fileSize: "3.2 MB",
      format: "JPEG",
    },
  ];

  const stats = {
    pending: 12,
    approved: 87,
    rejected: 5,
    total: 104,
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: "fa-clock",
        label: "En attente",
      },
      approved: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: "fa-check-circle",
        label: "Approuvé",
      },
      rejected: {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: "fa-times-circle",
        label: "Rejeté",
      },
    };
    return badges[status];
  };

  const getRowBackground = (status) => {
    if (status === "approved") return "bg-green-50";
    if (status === "rejected") return "bg-red-50";
    return "";
  };

  const openVerificationModal = (verification) => {
    setSelectedVerification(verification);
    setVerificationComment("");
    setShowModal(true);
  };

  const closeVerificationModal = () => {
    setShowModal(false);
    setSelectedVerification(null);
    setVerificationComment("");
  };

  const approveVerification = () => {
    alert(`Identité approuvée pour ${selectedVerification.name}`);
    closeVerificationModal();
  };

  const rejectVerification = () => {
    if (!verificationComment.trim()) {
      alert("Veuillez ajouter un commentaire pour expliquer le rejet");
      return;
    }
    alert(
      `Identité rejetée pour ${selectedVerification.name}\nCommentaire: ${verificationComment}`
    );
    closeVerificationModal();
  };

  const filteredVerifications = verifications.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      {/* PAGE TITLE */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <i className="fas fa-id-card-alt text-red-500 mr-3"></i>
              Vérifications d'Identité
            </h1>
            <p className="text-gray-600 mt-2">
              Validation des documents d'identité des propriétaires
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {stats.pending} en attente
            </span>
          </div>
        </div>
      </div>

      {/* FILTRES ET RECHERCHE */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rechercher
            </label>
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Nom, email, numéro CNI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="approved">Approuvé</option>
              <option value="rejected">Rejeté</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tri
            </label>
            <select
              value={sortFilter}
              onChange={(e) => setSortFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="recent">Plus récent</option>
              <option value="oldest">Plus ancien</option>
              <option value="name">Nom (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* STATISTIQUES RAPIDES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-700 text-sm font-medium mb-1">
                En Attente
              </p>
              <h3 className="text-3xl font-bold text-yellow-800">
                {stats.pending}
              </h3>
            </div>
            <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center">
              <i className="fas fa-clock text-white text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 text-sm font-medium mb-1">
                Approuvés
              </p>
              <h3 className="text-3xl font-bold text-green-800">
                {stats.approved}
              </h3>
            </div>
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
              <i className="fas fa-check-circle text-white text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-700 text-sm font-medium mb-1">Rejetés</p>
              <h3 className="text-3xl font-bold text-red-800">
                {stats.rejected}
              </h3>
            </div>
            <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center">
              <i className="fas fa-times-circle text-white text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 text-sm font-medium mb-1">Total</p>
              <h3 className="text-3xl font-bold text-blue-800">
                {stats.total}
              </h3>
            </div>
            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center">
              <i className="fas fa-id-card text-white text-2xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* LISTE DES VÉRIFICATIONS */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <i className="fas fa-list-check mr-2"></i>
            Demandes de Vérification
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Propriétaire
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date de soumission
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVerifications.map((verification) => {
                const badge = getStatusBadge(verification.status);
                return (
                  <tr
                    key={verification.id}
                    className={`hover:bg-gray-50 transition ${getRowBackground(
                      verification.status
                    )}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-br ${verification.color} flex items-center justify-center text-white font-semibold`}
                        >
                          {verification.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {verification.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {verification.email}
                          </p>
                          <span className="text-xs text-gray-400">
                            ID: #{verification.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-blue-600">
                        <i className="fas fa-file-image text-xl"></i>
                        <div className="text-left">
                          <p className="font-medium">
                            {verification.document.type}
                          </p>
                          <p className="text-xs text-gray-500">
                            {verification.document.filename}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">
                          {verification.submittedDate}
                        </p>
                        <p className="text-gray-500">
                          {verification.submittedTime}
                        </p>
                        <span
                          className={`text-xs font-medium ${
                            verification.status === "pending"
                              ? "text-yellow-600"
                              : verification.status === "approved"
                              ? "text-gray-500"
                              : "text-red-500"
                          }`}
                        >
                          <i
                            className={`fas ${
                              verification.status === "pending"
                                ? "fa-clock"
                                : verification.status === "approved"
                                ? "fa-check"
                                : "fa-times"
                            }`}
                          ></i>{" "}
                          {verification.timeAgo}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${badge.bg} ${badge.text}`}
                      >
                        <i className={`fas ${badge.icon} mr-2`}></i>
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => openVerificationModal(verification)}
                          className={`${
                            verification.status === "pending"
                              ? "bg-blue-500 hover:bg-blue-600"
                              : "bg-gray-500 hover:bg-gray-600"
                          } text-white px-4 py-2 rounded-lg transition flex items-center space-x-2 text-sm font-medium`}
                        >
                          <i className="fas fa-eye"></i>
                          <span>
                            {verification.status === "pending"
                              ? "Examiner"
                              : "Voir"}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-sm text-gray-600">
              Affichage de <span className="font-semibold">1-10</span> sur{" "}
              <span className="font-semibold">{stats.total}</span> vérifications
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
                disabled
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                3
              </button>
              <span className="px-2 text-gray-500">...</span>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                11
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE VÉRIFICATION */}
      {showModal && selectedVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center">
                <i className="fas fa-id-card-alt mr-2"></i>
                Vérification d'Identité
              </h3>
              <button
                onClick={closeVerificationModal}
                className="text-white hover:text-gray-300 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Informations du propriétaire */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <i className="fas fa-user text-red-500 mr-2"></i>
                  Informations du Propriétaire
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nom complet</p>
                    <p className="font-semibold text-gray-800">
                      {selectedVerification.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ID Propriétaire</p>
                    <p className="font-semibold text-gray-800">
                      #{selectedVerification.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-800">
                      {selectedVerification.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date d'inscription</p>
                    <p className="font-semibold text-gray-800">
                      {selectedVerification.registrationDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nom du profil</p>
                    <p className="font-semibold text-gray-800">
                      {selectedVerification.profileName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Type de compte</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                      <i className="fas fa-building mr-2"></i>
                      Propriétaire
                    </span>
                  </div>
                </div>
              </div>

              {/* Document d'identité */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <i className="fas fa-file-image text-red-500 mr-2"></i>
                  Document d'Identité
                </h4>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <img
                    src="https://via.placeholder.com/800x500/e5e7eb/6b7280?text=Carte+Nationale+d%27Identité"
                    alt="CNI"
                    className="w-full rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition"
                  />
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    <i className="fas fa-search-plus"></i> Cliquez sur l'image
                    pour agrandir
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Nom du fichier</p>
                    <p className="font-medium text-gray-800">
                      {selectedVerification.document.filename}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Taille</p>
                    <p className="font-medium text-gray-800">
                      {selectedVerification.fileSize}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date de soumission</p>
                    <p className="font-medium text-gray-800">
                      {selectedVerification.submittedDate},{" "}
                      {selectedVerification.submittedTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Format</p>
                    <p className="font-medium text-gray-800">
                      {selectedVerification.format}
                    </p>
                  </div>
                </div>
              </div>

              {/* Zone de commentaire */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  <i className="fas fa-comment mr-2 text-red-500"></i>
                  Commentaire (optionnel)
                </label>
                <textarea
                  value={verificationComment}
                  onChange={(e) => setVerificationComment(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Ajoutez un commentaire si nécessaire (visible pour le propriétaire en cas de rejet)..."
                ></textarea>
              </div>

              {/* Actions */}
              {selectedVerification.status === "pending" && (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={approveVerification}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition flex items-center justify-center space-x-2 font-semibold"
                  >
                    <i className="fas fa-check-circle text-xl"></i>
                    <span>Approuver l'Identité</span>
                  </button>
                  <button
                    onClick={rejectVerification}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition flex items-center justify-center space-x-2 font-semibold"
                  >
                    <i className="fas fa-times-circle text-xl"></i>
                    <span>Rejeter l'Identité</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </main>
  );
}
