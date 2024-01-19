import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute/Private";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./Context/authcontext";
import { ProductProvider } from "./Context/product";
import { CartProvider } from "./Context/cartcontext";
import Cart from "./pages/Cart";
import Userdashboard from "./components/PrivateRoute/userdashboard";
import Orders from "./components/PrivateRoute/Orders";
import UserProfile from "./components/PrivateRoute/UserProfile";
import Details from "./pages/Details";

function App() {
  return (
    <div>
      <CartProvider>
        <ProductProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/dashboard" element={<PrivateRoute />}>
                <Route path="user" element={<Userdashboard />} />
                <Route path="user/orders" element={<Orders />} />
               
              </Route> */}
              <Route path="/product/:id" element={<Details />} />
              <Route path="dashboard/user/profile" element={<UserProfile />} />
              <Route
                path="dashboard/user/details"
                element={<Userdashboard />}
              />
              <Route path="dashboard/user/orders" element={<Orders />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AuthProvider>
        </ProductProvider>
      </CartProvider>
    </div>
  );
}

export default App;
