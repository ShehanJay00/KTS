import { createContext } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import userAxios from "../baseURL";

export const TicketContext = createContext();

export const ticketContextReducer = (state, action) => {
  switch (action.type) {
    case "SET_TICKETS":
      return { tickets: action.payload };
    case "ADD_TICKET":
      return { tickets: [...state.tickets, action.payload] };
    case "DELETE_TICKET":
      return state.filter((ticket) => ticket.id !== action.payload);
    case "UPDATE_TICKET":
      return state.map((ticket) =>
        ticket.id === action.payload.id ? action.payload : ticket
      );
    default:
      return state;
  }
};

export const TicketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ticketContextReducer, {
    tickets: [],
  });

  useEffect(() => {
    const getTicket = async () => {
      try {
        const ticket = await userAxios.get("/api/tickets/");

        dispatch({ type: "SET_TICKETS", payload: ticket.data });
      } catch (error) {
        console.log(error);
      }
    };
    getTicket();
  }, []);

  return (
    <TicketContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TicketContext.Provider>
  );
};
