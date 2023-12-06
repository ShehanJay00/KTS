import { EmployeeContext } from "../context/employeeContext";
import { useContext } from "react";

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error("User Context must be used within a UserContextProvider");
  }

  return context;
};
