import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <div className="text-sm text-gray-600">
        {user ? `Welcome, ${user.name}` : ""}
      </div>
    </header>
  );
};

export default Topbar;
