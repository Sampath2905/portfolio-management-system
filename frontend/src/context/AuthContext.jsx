import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("admin_token"));

    const login = async (username, password) => {
        const response = await api.post("/auth/login", { username, password });
        const newToken = response.data.access_token;
        localStorage.setItem("admin_token", newToken);
        setToken(newToken);
        return true;
    };

    const logout = () => {
        localStorage.removeItem("admin_token");
        setToken(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}