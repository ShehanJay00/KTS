import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/homepage";
import RoadRoutes from "./pages/routes";
import Journey from "./pages/journey";
import Booking from "./pages/booking";
import Navbar from "./component/navbar";
import Footer from "./component/footer";
import Login from "./pages/loginpage";
import { useUserContext } from "./hooks/useUserAuthContext";
import ProfilePage from "./pages/profilepage";

function App() {
  const { user } = useUserContext();

  return (
    <div className="app flex flex-col overflow-y-scroll min-h-screen">
      {user && <Navbar />}
      <div className="w-full h-full flex-1">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/routes"
            element={user ? <RoadRoutes /> : <Navigate to="/login" />}
          />
          <Route
            path="/journey/:id"
            element={user ? <Journey /> : <Navigate to="/login" />}
          />
          <Route
            path="/booking"
            element={user ? <Booking /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </div>
      {user && <Footer />}
    </div>
  );
}

export default App;
