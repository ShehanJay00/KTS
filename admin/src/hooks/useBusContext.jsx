import { useContext } from "react";
import { BusContext } from "../context/busContext";

export const useBusContext = () => {
  const context = useContext(BusContext);

  if (!context) {
    throw new Error("User Context must be used within a UserContextProvider");
  }

  return context;
};
