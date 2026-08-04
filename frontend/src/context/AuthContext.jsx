import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const saveToken = (token) => {
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    const token = response.data.token;
    saveToken(token);
    setUser(response.data.user);
    return response;
  };

  const register = async (data) => {
    const response = await authService.register(data);
    const token = response.data.token;
    saveToken(token);
    setUser(response.data.user);
    return response;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      clearAuth();
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    const handleLogoutEvent = () => {
      clearAuth();
      navigate("/login", { replace: true });
    };

    window.addEventListener("auth.logout", handleLogoutEvent);
    return () => {
      window.removeEventListener("auth.logout", handleLogoutEvent);
    };
  }, [navigate]);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authService.getUser();
        setUser(response.data.user);
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        register,
        logout,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
