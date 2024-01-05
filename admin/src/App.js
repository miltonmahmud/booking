import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import { BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Hotels from "./pages/Hotels/Hotels";
import Homepage from "./pages/Homepage/Homepage";
import Users from "./pages/Users/Users";
import Contact from "./pages/Contact/Contact";
import Subscriber from "./pages/Subscriber/Subscriber";
import Message from "./pages/Message/Message";
import { Toaster } from "react-hot-toast";
import Hero from "./pages/Hero/Hero";
import Banners from "./pages/Banners/Banners";
function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route
            index
            path="/"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/hotels"
            element={
              <ProtectedRoute>
                <Hotels />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hero"
            element={
              <ProtectedRoute>
                <Hero />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscriber"
            element={
              <ProtectedRoute>
                <Subscriber />
              </ProtectedRoute>
            }
          />
          <Route
            path="/message"
            element={
              <ProtectedRoute>
                <Message />
              </ProtectedRoute>
            }
          />
          <Route
            path="/banners"
            element={
              <ProtectedRoute>
                <Banners />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
