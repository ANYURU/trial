import { useLocation, Navigate, Outlet} from "react-router-dom"

const AuthorizedTo = ({ allowedRoles, user_roles }) => {
    const location = useLocation()

    return (
        user_roles.find(role => allowedRoles.includes(role)) 
        ? 
        <Outlet/> 
        : 
        <Navigate to="/notauthorized" state={{ from: location }} replace/>
    ) 
}

export default AuthorizedTo