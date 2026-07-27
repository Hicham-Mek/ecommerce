import { useEffect, useState } from "react";
import profileService from "../services/profileService";

const Profile = () => {
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [password, setPassword] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await profileService.getProfile();

      setForm({
        name: res.data.name,
        email: res.data.email,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await profileService.updateProfile(form);

      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await profileService.updatePassword(password);

      setMessage(res.data.message);

      setPassword({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {message && (
        <div className="mb-6 rounded bg-green-100 text-green-700 p-3">
          {message}
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleProfileChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleProfileChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Password Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Current Password</label>

            <input
              type="password"
              name="current_password"
              value={password.current_password}
              onChange={handlePasswordChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">New Password</label>

            <input
              type="password"
              name="password"
              value={password.password}
              onChange={handlePasswordChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>

            <input
              type="password"
              name="password_confirmation"
              value={password.password_confirmation}
              onChange={handlePasswordChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
