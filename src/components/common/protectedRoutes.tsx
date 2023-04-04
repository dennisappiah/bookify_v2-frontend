import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/AuthService";

interface RouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: RouteProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getCurrentUser()) {
      navigate("/login", { state: { from: location } });
    }
  }, [location, navigate]);

  return element;
};

export default ProtectedRoute;
