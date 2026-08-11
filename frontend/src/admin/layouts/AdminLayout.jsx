import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col lg:flex-row text-[var(--text-primary)] font-sans">
      <div className="hidden lg:block lg:w-64 lg:shrink-0 h-screen sticky top-0 overflow-y-auto">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="sticky top-0 z-30">
          <Topbar />
        </div>

        <main className="p-4 sm:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
