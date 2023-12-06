import { createContext, useEffect, useReducer } from "react";
import adminAxios from "../baseURL";

export const EmployeeContext = createContext();

export const employeeReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLOYEES":
      return { employees: action.payload };
    case "ADD_EMPLOYEE":
      return { employees: [...state.employees, action.payload] };
    case "DELETE_EMPLOYEE":
      return {
        employees: state.employees.filter(
          (employees) => employees._id !== action.payload
        ),
      };
    case "UPDATE_EMPLOYEE":
      return state.map((employee) =>
        employee.id === action.payload.id ? action.payload : employee
      );
    default:
      return state;
  }
};

export const EmployeeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, { employees: [] });

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const employees = await adminAxios.get("/api/employees/");

        dispatch({ type: "SET_EMPLOYEES", payload: employees.data });
      } catch (error) {
        console.log(error);
      }
    };

    getEmployees();
  }, []);

  return (
    <EmployeeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
};
