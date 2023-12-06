import { useContext } from "react";
import { TicketContext } from "../context/ticketContext";

export const useTicketContext = () => {
  const context = useContext(TicketContext);

  if (!context) {
    throw new Error("User Context must be used within a UserContextProvider");
  }

  return context;
};
