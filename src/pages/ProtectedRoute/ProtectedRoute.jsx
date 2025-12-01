import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BaseApi from "../../api/BaseApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const ProtectedRoute = ({ children, setIsLoggedUserHandler, isLoggedUser, setLoggedUserHandler }) => {
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await BaseApi.isUserLogged();
      setIsLoggedUserHandler(res.data);
    } catch {
      setIsLoggedUserHandler(false);
    }

    try {
      const resUser = await BaseApi.getLoggedUser();
      setLoggedUserHandler(resUser.data);
    } catch {
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isLoggedUser ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
