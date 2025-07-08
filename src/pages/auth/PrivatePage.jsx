import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivatesPage = ({ children }) => {
  const pages = useSelector((s) => s.all.auth);

  return pages ? children : <Navigate to="/auth/signin" />;
};

export default PrivatesPage;
