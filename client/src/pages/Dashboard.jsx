import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import ContributorsTable from "../components/ContributorsTable";
import AddContributorModal from "../components/AddContributorModal";
import RecordPaymentModal from "../components/RecordPaymentModal";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalContributors: 0,
    totalPledged: 0,
    totalCollected: 0,
    remainingAmount: 0,
    paidContributors: 0,
    partialContributors: 0,
    pendingContributors: 0,
  });

  const [contributors, setContributors] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState(null);

  useEffect(() => {
    refreshData();
  }, []);

  async function fetchStats() {
    try {
      const { data } = await api.get("/dashboard/stats");
      setStats(data);
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    }
  }

  async function fetchContributors() {
    try {
      const { data } = await api.get("/contributors");
      setContributors(data);
    } catch (error) {
      console.error("Error loading contributors:", error);
    }
  }

  function refreshData() {
    fetchStats();
    fetchContributors();
  }

  function openPaymentModal(contributor) {
    setSelectedContributor(contributor);
    setShowPaymentModal(true);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <Topbar onAddContributor={() => setShowModal(true)} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <StatCard
            title="Contributors"
            value={stats.totalContributors}
          />

          <StatCard
            title="Total Pledged"
            value={`TZS ${(stats.totalPledged ?? 0).toLocaleString()}`}
          />

          <StatCard
            title="Collected"
            value={`TZS ${(stats.totalCollected ?? 0).toLocaleString()}`}
          />

          <StatCard
            title="Remaining"
            value={`TZS ${(stats.remainingAmount ?? 0).toLocaleString()}`}
          />
        </div>

        <ContributorsTable
          contributors={contributors}
          onPayment={openPaymentModal}
        />

        <AddContributorModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onContributorAdded={refreshData}
        />

        <RecordPaymentModal
          isOpen={showPaymentModal}
          contributor={selectedContributor}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedContributor(null);
          }}
          onPaymentRecorded={refreshData}
        />
      </main>
    </div>
  );
}