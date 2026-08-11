import { useEffect, useState } from "react";
import Spinner from "../components/common/Spinner";
import profileService from "../services/profileService";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { User, Lock, CheckCircle2 } from "lucide-react";

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
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

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
    setIsSavingProfile(true);
    setMessage("");
    try {
      const res = await profileService.updateProfile(form);
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsSavingPassword(true);
    setMessage("");
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
    } finally {
      setIsSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
          My Profile
        </h1>
        <p className="text-[var(--text-secondary)] mt-2">
          Manage your personal information and security settings.
        </p>
      </div>

      {message && (
        <div className="mb-8 rounded-lg bg-[var(--status-success)]/10 border border-[var(--status-success)]/20 text-[var(--status-success)] p-4 flex items-center gap-3">
          <CheckCircle2 size={20} />
          <span className="font-medium">{message}</span>
        </div>
      )}

      <div className="space-y-8">
        {/* Profile Form */}
        <div className="bg-[var(--bg-surface)] shadow-sm border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-main)] flex items-center gap-3">
            <User size={20} className="text-[var(--color-primary-600)]" />
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Profile Information</h2>
          </div>

          <form onSubmit={handleProfileSubmit} className="p-6 space-y-6">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleProfileChange}
              required
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={form.email}
              onChange={handleProfileChange}
              required
            />

            <div className="pt-2">
              <Button type="submit" variant="primary" disabled={isSavingProfile}>
                {isSavingProfile ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>

        {/* Password Form */}
        <div className="bg-[var(--bg-surface)] shadow-sm border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-main)] flex items-center gap-3">
            <Lock size={20} className="text-[var(--color-primary-600)]" />
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="p-6 space-y-6">
            <Input
              label="Current Password"
              type="password"
              name="current_password"
              value={password.current_password}
              onChange={handlePasswordChange}
              required
            />

            <Input
              label="New Password"
              type="password"
              name="password"
              value={password.password}
              onChange={handlePasswordChange}
              required
            />

            <Input
              label="Confirm New Password"
              type="password"
              name="password_confirmation"
              value={password.password_confirmation}
              onChange={handlePasswordChange}
              required
            />

            <div className="pt-2">
              <Button type="submit" variant="secondary" disabled={isSavingPassword}>
                {isSavingPassword ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
