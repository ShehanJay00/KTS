import { useContext } from "react";
import { UsersContext } from "../context/usersContext";

export const useUsersContext = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("User Context must be used within a UserContextProvider");
  }

  return context;
};
