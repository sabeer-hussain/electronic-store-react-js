import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages";
import About from "./pages/about";
import Services from "./pages/services";
import Cart from "./pages/cart";
import Store from "./pages/store";
import Dashboard from "./pages/users/dashboard";
import Profile from "./pages/users/profile";
import AboutUser from "./pages/users/about-user";
import CustomNavbar from "./components/Navbar";
import Contact from "./pages/contact";
import { Flip, ToastContainer, Zoom } from "react-toastify";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    // setting up routes

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
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<AboutUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
