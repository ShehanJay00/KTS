import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/userAuthContext.jsx";
import { RoadRouteContextProvider } from "./context/roadRouteContext.jsx";
import { TicketContextProvider } from "./context/ticketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <RoadRouteContextProvider>
        <TicketContextProvider>
          <BrowserRouter>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </BrowserRouter>
        </TicketContextProvider>
      </RoadRouteContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
