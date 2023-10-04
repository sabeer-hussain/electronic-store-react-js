import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/HelperAuth";
import { useContext } from "react";
import UserProvider from "../../context/UserProvider";

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
