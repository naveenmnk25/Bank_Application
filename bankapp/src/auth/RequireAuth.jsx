import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import { PathConstants } from "../routing/path-contants";

export const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
    if (!auth.user) {
        return <Navigate to={PathConstants.LOGIN} state={{ path: location.pathname }} />
    }
    return children;
}