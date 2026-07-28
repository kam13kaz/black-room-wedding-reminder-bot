import { useState } from "react";
import api from "../services/api";

export default function AddContributorModal({
  isOpen,
  onClose,
  onContributorAdded,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    pledgedAmount: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/contributors", {
        ...formData,
        pledgedAmount: Number(formData.pledgedAmount),
      });

      setFormData({
        fullName: "",
        phone: "",
        pledgedAmount: "",
      });

      onContributorAdded();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to add contributor.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6">
          Add Contributor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="pledgedAmount"
            placeholder="Pledged Amount"
            value={formData.pledgedAmount}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-lg"
            >
              Save
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}