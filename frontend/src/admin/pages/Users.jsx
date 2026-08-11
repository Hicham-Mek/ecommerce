import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import adminUserService from "../../services/adminUserService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await adminUserService.getUsers(search, page);

      setUsers(res.data.data || res.data);
      setLastPage(res.data.last_page || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  const handleRoleChange = async (id, role) => {
    try {
      await adminUserService.updateRole(id, role);

      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, role } : user)),
      );
      toast.success("Role updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role.");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete user?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors",
        cancelButton:
          "bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg transition-colors ml-3",
      },
    });

    if (!result.isConfirmed) return;

    try {
      await adminUserService.deleteUser(id);

      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success("User deleted successfully.");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Unable to delete user.");
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">Users</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage customers and admin accounts.</p>
        </div>

        <div className="w-full sm:w-72">
          <Input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-sm overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        
        {users.length === 0 && !loading ? (
          <div className="py-12">
            <EmptyState 
              title="No users found" 
              description={search ? "Try adjusting your search query." : "No users exist in the system yet."}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[var(--text-muted)] uppercase bg-[var(--bg-main)] border-b border-[var(--border-subtle)]">
                <tr>
                  <th className="px-6 py-4 font-semibold tracking-wider">Name</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Email</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Role</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Joined</th>
                  <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--border-subtle)]">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-[var(--bg-main)] transition-colors group">
                    <td className="px-6 py-4 font-medium text-[var(--text-primary)]">{user.name}</td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{user.email}</td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                        className="bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm rounded-md focus:ring-[var(--border-focus)] focus:border-[var(--border-focus)] block p-2 transition-colors cursor-pointer"
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)] whitespace-nowrap">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-[var(--status-error)] hover:bg-red-50 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {lastPage > 1 && (
        <div className="flex justify-center items-center gap-6 mt-8 pt-4">
          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>

          <span className="text-[var(--text-secondary)] font-medium text-sm">
            Page {page} of {lastPage}
          </span>

          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
            disabled={page === lastPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Users;
