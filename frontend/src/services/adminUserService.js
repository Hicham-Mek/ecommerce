import api from "../api/axios";

const getUsers = (search = "", page = 1) =>
  api.get(`/admin/users?search=${search}&page=${page}`);

const updateRole = (id, role) =>
  api.patch(`/admin/users/${id}/role`, {
    role,
  });

const deleteUser = (id) => api.delete(`/admin/users/${id}`);

export default {
  getUsers,
  updateRole,
  deleteUser,
};
