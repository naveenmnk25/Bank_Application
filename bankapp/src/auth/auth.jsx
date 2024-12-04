import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [User, setUser] = useState();

    const Login = (user) => {
        setUser(user);
    }
    const Logout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ User, Login, Logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}