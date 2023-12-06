import { useContext } from "react";
import { RoadRouteContext } from "../context/roadRouteContext";

export const useRoadRouteContext = () => {
  const context = useContext(RoadRouteContext);

  if (!context) {
    throw new Error("User Context must be used within a UserContextProvider");
  }

  return context;
};
