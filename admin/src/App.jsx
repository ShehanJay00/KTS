import Navbar from "./component/navbar";
import Sidebar from "./component/sidebar";
import "./app.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage";
import Login from "./pages/loginpage";
import { useUserContext } from "./hooks/useUserAuthContext";
import AddRoute from "./pages/addRoutes";
import EmployeesPage from "./pages/employees";
import AddNoticesPage from "./pages/addNotices";
import AddBusPage from "./pages/addBusPage";
import BusesPage from "./pages/buses";
import AddEmployeePage from "./pages/addEmployeePage";
import Journey from "./pages/journey";
import CurrentRoutes from "./pages/currentRoutes";
import UsersPage from "./pages/users";
import TicketsPage from "./pages/tickets";

function App() {
  const { user } = useUserContext();

  return (
    <div className="flex h-screen ">
      <div className={user ? "w-[300px] bg-red-100 h-screen" : "hidden"}>
        <Sidebar />
      </div>
      <div className=" max-h-screen overflow-y-scroll w-full">
        <div className={user ? "" : "hidden"}>
          <Navbar />
        </div>

        <div className=" min-h-full">
          <Routes>
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/routes"
              element={user ? <CurrentRoutes /> : <Navigate to="/login" />}
            />
            <Route
              path="/add-routes"
              element={user ? <AddRoute /> : <Navigate to="/login" />}
            />
            <Route
              path="/journey"
              element={user ? <Journey /> : <Navigate to="/login" />}
            />
            <Route
              path="/users"
              element={user ? <UsersPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/tickets"
              element={user ? <TicketsPage /> : <Navigate to="/login" />}
            />

            <Route
              path="/add-notices"
              element={user ? <AddNoticesPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/insert-buses"
              element={user ? <AddBusPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/buses"
              element={user ? <BusesPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/employees"
              element={user ? <EmployeesPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/insert-employees"
              element={user ? <AddEmployeePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
