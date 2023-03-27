import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectToken);
  let isManager = false;
  let isAdmin = false;
  let status = "EMPLOYEE";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    isManager = roles.includes("MANAGER");
    isAdmin = roles.includes("ADMIN");

    if (isManager) status = "MANAGER";
    if (isAdmin) status = "Admin";

    return { username, roles, status, isManager, isAdmin };
  }

  return {
    username: "",
    roles: [],
    isManager,
    isAdmin,
    status,
  };
};
export default useAuth;
