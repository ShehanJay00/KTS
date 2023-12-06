import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/userAuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmployeeContextProvider } from "./context/employeeContext.jsx";
import { BusContextProvider } from "./context/busContext.jsx";
import { UsersContextProvider } from "./context/usersContext.jsx";
import { RoadRouteContextProvider } from "./context/roadRouteContext.jsx";
import { TicketContextProvider } from "./context/ticketContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <EmployeeContextProvider>
        <BusContextProvider>
          <UsersContextProvider>
            <RoadRouteContextProvider>
              <TicketContextProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
                <ToastContainer />
              </TicketContextProvider>
            </RoadRouteContextProvider>
          </UsersContextProvider>
        </BusContextProvider>
      </EmployeeContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
