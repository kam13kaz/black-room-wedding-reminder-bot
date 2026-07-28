export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        🖤 BLACK ROOM
      </h1>

      <nav className="space-y-4">
        <button className="block w-full text-left hover:text-gray-300">
          Dashboard
        </button>

        <button className="block w-full text-left hover:text-gray-300">
          Contributors
        </button>

        <button className="block w-full text-left hover:text-gray-300">
          Payments
        </button>

        <button className="block w-full text-left hover:text-gray-300">
          Reminders
        </button>
      </nav>
    </aside>
  );
}