import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Cart from "./pages/Cart";
import Store from "./pages/Store";
import Dashboard from "./pages/users/Dashboard";
import Profile from "./pages/users/Profile";
import AboutUser from "./pages/users/AboutUser";
import CustomNavbar from "./components/Navbar";
import Contact from "./pages/Contact";
import { Flip, ToastContainer, Zoom } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/users/Home";
import UserProvider from "./context/UserProvider";
import Order from "./pages/users/Order";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import AddCategory from "./pages/admin/AddCategory";
import AddProduct from "./pages/admin/AddProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import ViewCategories from "./pages/admin/ViewCategories";
import ViewProducts from "./pages/admin/ViewProducts";

function App() {
  return (
    <UserProvider>
      {/* setting up routes */}
      <BrowserRouter>
        <ToastContainer
          position="bottom-center"
          theme="dark"
          draggable
          // transition={Zoom}
          // transition={Flip}
        />
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/store" element={<Store />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/users" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="profile/:userId" element={<Profile />} />
            <Route path="about" element={<AboutUser />} />
            <Route path="orders" element={<Order />} />
          </Route>

          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="home" element={<AdminHome />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="categories" element={<ViewCategories />} />
            <Route path="products" element={<ViewProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
