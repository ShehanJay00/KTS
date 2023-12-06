import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import adminAxios from "../baseURL";
import { useUserContext } from "../hooks/useUserAuthContext";

export const UsersContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { users: action.payload };
    case "ADD_USER":
      return [...state, action.payload];
    case "DELETE_USER":
      return state.filter((user) => user.id !== action.payload);
    case "UPDATE_USER":
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    default:
      return state;
  }
};

export const UsersContextProvider = ({ children }) => {
  const { user } = useUserContext();
  const [state, dispatch] = useReducer(userReducer, { users: [] });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await adminAxios.get("/api/users/", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        dispatch({ type: "SET_USERS", payload: users.data });
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getUsers();
    }
  }, [user]);

  return (
    <UsersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};
