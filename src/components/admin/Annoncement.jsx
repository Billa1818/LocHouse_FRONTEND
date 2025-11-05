import React, { useState } from "react";

export default function Announcements() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [sortFilter, setSortFilter] = useState("recent");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const requests = [
    {
      id: "REQ-1234",
      tenant: {
        name: "Alain Mensah",
        email: "alain.mensah@email.com",
        phone: "+229 97 12 34 56",
        initials: "AM",
        color: "from-blue-500 to-blue-600",
      },
      property: {
        name: "Appartement Moderne - Centre Ville",
        location: "Cotonou, Akpakpa",
        price: "150,000 FCFA/mois",
        image:
          "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Appartement",
      },
      message:
        "Bonjour, je suis intéressé par cet appartement pour une location de longue durée. Est-il toujours disponible ?",
      requestDate: "03 Nov 2025",
      requestTime: "10:30",
      timeAgo: "Il y a 1h",
      status: "pending",
      duration: "Long séjour (12 mois)",
      moveInDate: "15 Nov 2025",
      tenants: "2 personnes",
    },
    {
      id: "REQ-1235",
      tenant: {
        name: "Sophie Koffi",
        email: "sophie.koffi@email.com",
        phone: "+229 96 45 78 90",
        initials: "SK",
        color: "from-purple-500 to-purple-600",
      },
      property: {
        name: "Studio Meublé",
        location: "Cotonou, Cadjehoun",
        price: "80,000 FCFA/mois",
        image: "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Studio",
      },
      message:
        "Je cherche un studio pour 6 mois. Quelles sont les conditions de location ?",
      requestDate: "03 Nov 2025",
      requestTime: "08:15",
      timeAgo: "Il y a 3h",
      status: "pending",
      duration: "Moyen séjour (6 mois)",
      moveInDate: "20 Nov 2025",
      tenants: "1 personne",
    },
    {
      id: "REQ-1230",
      tenant: {
        name: "Jean Dossou",
        email: "jean.dossou@email.com",
        phone: "+229 95 23 45 67",
        initials: "JD",
        color: "from-green-500 to-green-600",
      },
      property: {
        name: "Villa 3 Chambres",
        location: "Cotonou, Fidjrossè",
        price: "250,000 FCFA/mois",
        image: "https://via.placeholder.com/400x300/10b981/ffffff?text=Villa",
      },
      message:
        "Très intéressé par votre villa. Je souhaite visiter cette semaine.",
      requestDate: "02 Nov 2025",
      requestTime: "16:45",
      timeAgo: "Approuvé le 02 Nov",
      status: "approved",
      duration: "Long séjour (24 mois)",
      moveInDate: "01 Dec 2025",
      tenants: "4 personnes",
      response:
        "Bonjour Jean, merci pour votre intérêt. Vous pouvez visiter la villa demain à 14h. Mon contact: +229 XX XX XX XX",
    },
    {
      id: "REQ-1228",
      tenant: {
        name: "Marie Tossou",
        email: "marie.tossou@email.com",
        phone: "+229 94 56 78 90",
        initials: "MT",
        color: "from-red-500 to-red-600",
      },
      property: {
        name: "Chambre Étudiante",
        location: "Abomey-Calavi",
        price: "35,000 FCFA/mois",
        image: "https://via.placeholder.com/400x300/ef4444/ffffff?text=Chambre",
      },
      message: "Je suis étudiante et cherche une chambre simple.",
      requestDate: "01 Nov 2025",
      requestTime: "14:20",
      timeAgo: "Rejeté le 01 Nov",
      status: "rejected",
      duration: "Long séjour (10 mois)",
      moveInDate: "10 Nov 2025",
      tenants: "1 personne",
      response: "Désolé, la chambre a déjà été louée.",
    },
  ];

  const stats = {
    pending: 8,
    approved: 24,
    rejected: 3,
    total: 35,
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

  const openRequestModal = (request) => {
    setSelectedRequest(request);
    setResponseMessage(request.response || "");
    setShowModal(true);
  };

  const closeRequestModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
    setResponseMessage("");
  };

  const approveRequest = () => {
    if (!responseMessage.trim()) {
      alert("Veuillez ajouter un message de réponse avec vos coordonnées");
      return;
    }
    alert(
      `Demande approuvée pour ${selectedRequest.tenant.name}\nVos coordonnées ont été transmises.`
    );
    closeRequestModal();
  };

  const rejectRequest = () => {
    if (!responseMessage.trim()) {
      alert("Veuillez ajouter un message expliquant le rejet");
      return;
    }
    alert(
      `Demande rejetée pour ${selectedRequest.tenant.name}\nMessage: ${responseMessage}`
    );
    closeRequestModal();
  };

  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      {/* PAGE TITLE */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <i className="fas fa-envelope-open-text text-blue-600 mr-3"></i>
              Demandes de Location
            </h1>
            <p className="text-gray-600 mt-2">
              Gérez les demandes de contact de vos locataires potentiels
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-semibold flex items-center">
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
                placeholder="Nom du locataire, bien, référence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="recent">Plus récent</option>
              <option value="oldest">Plus ancien</option>
              <option value="property">Par bien</option>
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
              <i className="fas fa-envelope text-white text-2xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* LISTE DES DEMANDES */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <i className="fas fa-list-check mr-2"></i>
            Demandes Reçues
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Locataire
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Bien Concerné
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date de Demande
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
              {filteredRequests.map((request) => {
                const badge = getStatusBadge(request.status);
                return (
                  <tr
                    key={request.id}
                    className={`hover:bg-gray-50 transition ${getRowBackground(
                      request.status
                    )}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-br ${request.tenant.color} flex items-center justify-center text-white font-semibold`}
                        >
                          {request.tenant.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {request.tenant.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {request.tenant.email}
                          </p>
                          <span className="text-xs text-gray-400">
                            ID: #{request.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={request.property.image}
                          alt={request.property.name}
                          className="w-16 h-12 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {request.property.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            <i className="fas fa-map-marker-alt mr-1"></i>
                            {request.property.location}
                          </p>
                          <p className="text-sm text-blue-600 font-semibold">
                            {request.property.price}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">
                          {request.requestDate}
                        </p>
                        <p className="text-gray-500">{request.requestTime}</p>
                        <span
                          className={`text-xs font-medium ${
                            request.status === "pending"
                              ? "text-yellow-600"
                              : request.status === "approved"
                              ? "text-gray-500"
                              : "text-red-500"
                          }`}
                        >
                          <i
                            className={`fas ${
                              request.status === "pending"
                                ? "fa-clock"
                                : request.status === "approved"
                                ? "fa-check"
                                : "fa-times"
                            }`}
                          ></i>{" "}
                          {request.timeAgo}
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
                          onClick={() => openRequestModal(request)}
                          className={`${
                            request.status === "pending"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-gray-500 hover:bg-gray-600"
                          } text-white px-4 py-2 rounded-lg transition flex items-center space-x-2 text-sm font-medium`}
                        >
                          <i className="fas fa-eye"></i>
                          <span>
                            {request.status === "pending" ? "Répondre" : "Voir"}
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
              <span className="font-semibold">{stats.total}</span> demandes
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
                disabled
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
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
                4
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE RÉPONSE */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center">
                <i className="fas fa-envelope-open-text mr-2"></i>
                Demande de Location
              </h3>
              <button
                onClick={closeRequestModal}
                className="text-white hover:text-gray-200 text-2xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Informations du bien */}
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <i className="fas fa-building text-blue-600 mr-2"></i>
                  Bien Concerné
                </h4>
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedRequest.property.image}
                    alt={selectedRequest.property.name}
                    className="w-32 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-800 text-lg">
                      {selectedRequest.property.name}
                    </h5>
                    <p className="text-gray-600 mt-1">
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      {selectedRequest.property.location}
                    </p>
                    <p className="text-blue-600 font-bold text-lg mt-2">
                      {selectedRequest.property.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informations du locataire */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <i className="fas fa-user text-blue-600 mr-2"></i>
                  Informations du Locataire
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nom complet</p>
                    <p className="font-semibold text-gray-800">
                      {selectedRequest.tenant.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ID Demande</p>
                    <p className="font-semibold text-gray-800">
                      #{selectedRequest.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-800">
                      {selectedRequest.tenant.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="font-semibold text-gray-800">
                      {selectedRequest.tenant.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Type de séjour</p>
                    <p className="font-semibold text-gray-800">
                      {selectedRequest.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Date d'emménagement souhaitée
                    </p>
                    <p className="font-semibold text-gray-800">
                      {selectedRequest.moveInDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nombre d'occupants</p>
                    <p className="font-semibold text-gray-800">
                      {selectedRequest.tenants}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date de la demande</p>
                    <p className="font-semibold text-gray-800">
                      {selectedRequest.requestDate} à{" "}
                      {selectedRequest.requestTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message du locataire */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <i className="fas fa-comment-dots text-blue-600 mr-2"></i>
                  Message du Locataire
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{selectedRequest.message}</p>
                </div>
              </div>

              {/* Zone de réponse */}
              {selectedRequest.status === "pending" ? (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    <i className="fas fa-reply mr-2 text-blue-600"></i>
                    Votre Réponse
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    En approuvant, vos coordonnées seront transmises au
                    locataire pour faciliter le contact direct.
                  </p>
                  <textarea
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Bonjour, merci pour votre intérêt. Le bien est toujours disponible. Vous pouvez me contacter au +229 XX XX XX XX pour organiser une visite..."
                  ></textarea>
                </div>
              ) : (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    <i className="fas fa-reply mr-2 text-blue-600"></i>
                    Votre Réponse
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                    <p className="text-gray-700">{selectedRequest.response}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              {selectedRequest.status === "pending" && (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={approveRequest}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition flex items-center justify-center space-x-2 font-semibold"
                  >
                    <i className="fas fa-check-circle text-xl"></i>
                    <span>Approuver et Transmettre mes Coordonnées</span>
                  </button>
                  <button
                    onClick={rejectRequest}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition flex items-center justify-center space-x-2 font-semibold"
                  >
                    <i className="fas fa-times-circle text-xl"></i>
                    <span>Refuser la Demande</span>
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
