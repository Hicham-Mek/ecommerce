import { useEffect, useState } from "react";
import adminUserService from "../../services/adminUserService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await adminUserService.getUsers(search);

      setUsers(res.data.data || res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleRoleChange = async (id, role) => {
    try {
      await adminUserService.updateRole(id, role);

      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, role } : user)),
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update role.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await adminUserService.deleteUser(id);

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to delete user.");
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users</h1>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-72"
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Name</th>

              <th className="text-left p-3">Email</th>

              <th className="text-left p-3">Role</th>

              <th className="text-left p-3">Joined</th>

              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-6">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>

                  <td className="p-3">{user.email}</td>

                  <td className="p-3">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="customer">Customer</option>

                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  <td className="p-3">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
