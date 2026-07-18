import { createContext, useContext, useState ,useEffect} from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {


    const register = async (data) => {
    return await authService.register(data);
};


    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        await authService.login(credentials);

        const response = await authService.getUser();

        setUser(response.data.user);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };
    useEffect(() => {
    const loadUser = async () => {
        try {
            const response = await authService.getUser();
            setUser(response.data.user);
        } catch {
            setUser(null);
        }
    };

    loadUser();
}, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                setUser,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}