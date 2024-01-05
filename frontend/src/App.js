import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.js";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Hotel from "./pages/Hotel/Hotel.js";
import Contact from "./pages/Contact/Contact.js";
import { BrowserRouter } from "react-router-dom";
import Hotels from "./pages/Hotels/Hotels.js";
import All_Hotels from "./pages/All_Hotels/All_Hotels";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/All_hotels" element={<All_Hotels />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
