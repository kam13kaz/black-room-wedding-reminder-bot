const getStatusColor = (status) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700";
    case "Partial":
      return "bg-yellow-100 text-yellow-700";
    case "Pending":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function ContributorsTable({ contributors }) {
  if (!contributors || contributors.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow mt-8 p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Contributors</h2>
        <p className="text-gray-500">No contributors found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow mt-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Contributors</h2>

        <input
          type="text"
          placeholder="Search contributor..."
          className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Name</th>
            <th>Phone</th>
            <th>Pledged</th>
            <th>Paid</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {contributors.map((person) => (
            <tr key={person.id} className="border-b hover:bg-gray-50">
              <td className="py-4">{person.fullName}</td>

              <td>{person.phone}</td>

              <td>
                TZS {(person.pledgedAmount ?? 0).toLocaleString()}
              </td>

              <td>
                TZS {(person.paidAmount ?? 0).toLocaleString()}
              </td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    person.status
                  )}`}
                >
                  {person.status}
                </span>
              </td>

              <td>
                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    Payment
                  </button>

                  <button className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800">
                    Reminder
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}