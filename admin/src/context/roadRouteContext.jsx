import { createContext } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import userAxios from "../baseURL";

export const RoadRouteContext = createContext();

export const roadRouteContextReducer = (state, action) => {
  switch (action.type) {
    case "SET_ROAD_ROUTES":
      return { roadRoutes: action.payload };
    case "ADD_ROAD_ROUTE":
      return { roadRoutes: [...state.roadRoutes, action.payload] };
    case "DELETE_ROAD_ROUTE":
      return {
        roadRoutes: state.roadRoutes.filter(
          (roadRoute) => roadRoute._id !== action.payload
        ),
      };
    case "UPDATE_ROAD_ROUTE":
      return state.map((roadRoute) =>
        roadRoute.id === action.payload.id ? action.payload : roadRoute
      );
    default:
      return state;
  }
};

export const RoadRouteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(roadRouteContextReducer, {
    roadRoutes: [],
  });

  useEffect(() => {
    const getRoadRoute = async () => {
      try {
        const roadRoute = await userAxios.get("/api/roadRoutes/");
        // console.log(roadRoute.data);
        dispatch({ type: "SET_ROAD_ROUTES", payload: roadRoute.data });
      } catch (error) {
        console.log(error);
      }
    };
    getRoadRoute();
  }, []);

  return (
    <RoadRouteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RoadRouteContext.Provider>
  );
};
