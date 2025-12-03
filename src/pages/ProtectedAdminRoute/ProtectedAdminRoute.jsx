import { useEffect, useState } from "react";
import BaseApi from "../../api/BaseApi";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import AdminPageBase from "../AdminPageBase/AdminPageBase";

const ProtectedAdminRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedUserData, setLoggedUserData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await BaseApi.getLoggedUser();
        setLoggedUserData(res.data);
      } catch {
        setLoggedUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!loggedUserData || loggedUserData.role?.name !== "Admin") {
    return <Navigate to="/" />;
  }

  return <AdminPageBase/>;
};

export default ProtectedAdminRoute;