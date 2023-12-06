import { createContext } from "react";
import adminAxios from "../baseURL";
import { useEffect } from "react";
import { useReducer } from "react";

export const BusContext = createContext();

export const busReducer = (state, action) => {
  switch (action.type) {
    case "SET_BUSES":
      return { buses: action.payload };
    case "ADD_BUS":
      return { buses: [...state.buses, action.payload] };
    case "DELETE_BUS":
      return { buses: state.buses.filter((bus) => bus._id !== action.payload) };
    case "UPDATE_BUS":
      return state.map((bus) =>
        bus.id === action.payload.id ? action.payload : bus
      );
    default:
      return state;
  }
};

export const BusContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(busReducer, { buses: [] });

  useEffect(() => {
    const getBus = async () => {
      try {
        const bus = await adminAxios.get("/api/buses/");
        dispatch({ type: "SET_BUSES", payload: bus.data });
      } catch (error) {
        console.log(error);
      }
    };
    getBus();
  }, []);

  return (
    <BusContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BusContext.Provider>
  );
};
