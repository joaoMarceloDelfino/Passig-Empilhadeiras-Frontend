import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BaseApi from "../../api/BaseApi";

const ProtectedRoute = ({children}) => {

    const[isLoggedUser, setIsLoggedUser] = useState(null);

    useEffect(() => {
        BaseApi.isUserLogged().then((res) => {setIsLoggedUser(res.data)}).catch(() => setIsLoggedUser(false));
    }, []);

    if (isLoggedUser === null) {
     return <></>
    }

    return isLoggedUser ? children : <Navigate to="/" />;


}

export default ProtectedRoute;