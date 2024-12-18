import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem("authToken");
        const firstName = localStorage.getItem("firstName"); // Store firstName for display
        return { token, firstName };
    });

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("firstName");
        setAuth({ token: null, firstName: null });
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
