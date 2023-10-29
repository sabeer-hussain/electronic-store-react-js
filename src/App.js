import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Cart from "./pages/Cart";
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
import StorePage from "./pages/users/StorePage";
import ProductView from "./pages/users/ProductView";
import CategoryStorePage from "./pages/users/CategoryStorePage";
import CartProvider from "./context/CartProvider";
import Loading from "./components/Loading";
import { useEffect, useState } from "react";
import { privateAxios, publicAxios } from "./services/AxiosService";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // request interceptor for public endpoints
    publicAxios.interceptors.request.use(
      (config) => {
        // modification in request
        setLoading(true);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // response interceptor for public endpoints
    publicAxios.interceptors.response.use(
      (config) => {
        // modification in response
        setLoading(false);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // request interceptor for private endpoints
    privateAxios.interceptors.request.use(
      (config) => {
        // modification in request
        setLoading(true);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // response interceptor for private endpoints
    privateAxios.interceptors.response.use(
      (config) => {
        // modification in response
        setLoading(false);
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, []);

  return (
    <UserProvider>
      <CartProvider>
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
          <Loading show={loading} />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/store" element={<StorePage />} />
            <Route
              path="/store/products/:productId"
              element={<ProductView />}
            />
            <Route
              path="/store/:categoryId/:categoryTitle"
              element={<CategoryStorePage />}
            />

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
      </CartProvider>
    </UserProvider>
  );
}

export default App;
