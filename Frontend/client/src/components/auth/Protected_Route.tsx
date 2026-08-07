import { Navigate } from "react-router-dom";
import use_Auth_Store from "../../Store/authStore";

interface Props{
    children: React.ReactNode;
}

function Protected_Route({
    children,

}: Props) {
    const isAuthenticated = use_Auth_Store(
        (state) => state.isAuthenticated
    );

    if(!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default Protected_Route;