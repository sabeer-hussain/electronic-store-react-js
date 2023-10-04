import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/helper.auth";
import { useContext } from "react";
import UserProvider from "../../context/user.provider";

const AdminDashboard = () => {
  const userContext = useContext(UserProvider);

  const dashboardView = () => {
    return (
      <div>
        <h1>This is Admin dashboard</h1>

        {/* nested route */}
        <Outlet />
      </div>
    );
  };
  return isAdminUser() ? dashboardView() : <Navigate to="/users/home" />;
};

export default AdminDashboard;
