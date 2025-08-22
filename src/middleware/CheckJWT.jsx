import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CheckJWT({ children }) {
  const navigate = useNavigate();
  const { token, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate(`/`, { replace: true });
    }
  }, [token, navigate]);

  if (token) {
    return <div className="text-center mt-10">Redirecting...</div>;
  }

  return children;
}

export default CheckJWT;
