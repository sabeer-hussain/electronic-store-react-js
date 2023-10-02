import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>This is User dashboard</h1>

      {/* nested route */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
