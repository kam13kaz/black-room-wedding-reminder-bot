import { useState, useEffect } from "react";
import api from "../services/api";

export default function RecordPaymentModal({
  isOpen,
  onClose,
  contributor,
  onPaymentRecorded,
}) {
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAmount("");
      setNotes("");
    }
  }, [isOpen]);

  if (!isOpen || !contributor) return null;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/payments", {
        contributorId: contributor.id,
        amount: Number(amount),
        notes,
      });

      onPaymentRecorded();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to record payment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-5">
          Record Payment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">
              Contributor
            </label>

            <input
              value={contributor.fullName}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Amount Paid
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter payment amount"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Notes (Optional)
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Cash, Bank Transfer, M-Pesa..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}