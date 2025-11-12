import React, { useState, useEffect, useRef } from "react";
import RevenusHeader from "../../components/revenus/RevenusHeader";
import RevenusStatsCards from "../../components/revenus/RevenusStatsCards";
import RevenusTable from "../../components/revenus/RevenusTable";
import RevenusChart from "../../components/revenus/RevenusChart";
import MonthFilter from "../../components/revenus/MonthFilter";
import ExportPDFButton from "../../components/revenus/ExportPDFButton";
import LoadingSkeleton from "../../components/revenus/LoadingSkeleton";
import ErrorState from "../../components/revenus/ErrorState";
import { formatDateTime } from "../../data/formatters";

const fetchRevenusData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: 2850000,
        moisCourant: 450000,
        enAttente: 120000,
        transactions: [
          { id: 1, date: "2025-11-04", montant: 150000, statut: "payé", locataire: "Koffi A." },
          { id: 2, date: "2025-11-03", montant: 150000, statut: "payé", locataire: "Aminata D." },
          { id: 3, date: "2025-11-01", montant: 150000, statut: "en attente", locataire: "Jean-Paul B." },
          { id: 4, date: "2025-10-28", montant: 150000, statut: "payé", locataire: "Koffi A." },
        ],
      });
    }, 800);
  });
};

export default function RevenusPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchRevenusData();
        setData(result);
        setFilteredData(result);
      } catch (err) {
        setError("Impossible de charger les revenus.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleFilter = (month) => {
    if (!data) return;
    const filtered = {
      ...data,
      transactions: data.transactions.filter(tx => new Date(tx.date).getMonth() === month)
    };
    setFilteredData(filtered);
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4" id="revenus-content" ref={contentRef}>
      <div className="max-w-7xl mx-auto">
        <RevenusHeader />

        <div className="flex justify-between items-center mb-6">
          <MonthFilter onFilter={handleFilter} />
          <ExportPDFButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RevenusStatsCards data={filteredData} />
          </div>
          <RevenusChart data={filteredData} />
        </div>

        <RevenusTable transactions={filteredData.transactions} />

        <p className="mt-8 text-center text-sm text-gray-500">
          Dernière mise à jour : {formatDateTime()}
        </p>
      </div>
    </div>
  );
}