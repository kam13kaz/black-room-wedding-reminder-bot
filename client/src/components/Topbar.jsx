export default function Topbar({ onAddContributor }) {
  return (
    <div className="bg-white shadow p-5 flex justify-between items-center rounded-xl">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-gray-500">Wedding Reminder System</p>
      </div>

      <button
        onClick={onAddContributor}
        className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
      >
        + Add Contributor
      </button>
    </div>
  );
}