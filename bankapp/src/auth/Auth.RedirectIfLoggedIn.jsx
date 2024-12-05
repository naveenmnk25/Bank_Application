import { useAuth } from "./auth";
import { Navigate } from "react-router-dom";
import { PathConstants } from "../routing/path-contants";

const RedirectIfLoggedIn = ({ children }) => {
    const auth = useAuth();

    // If the user is already logged in, redirect to the dashboard
    if (auth.user) {
        return <Navigate to={PathConstants.DASHBOARD} state={{ path: location.pathname }} />;
    }

    return children;
};

export default RedirectIfLoggedIn;
