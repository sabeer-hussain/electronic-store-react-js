import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>This is Admin dashboard</h1>

      {/* nested route */}
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
