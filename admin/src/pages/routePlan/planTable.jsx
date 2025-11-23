import { Box, IconButton } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import adminAxios from "../../baseURL";
import { toast } from "react-toastify";

function PlanTable() {
  const columns = [
    {
      field: "orderId",
      headerName: "Order ID",
      width: 90,
      flex: 0.15,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "assignedVehicle",
      headerName: "Assigned Vehicle",
      width: 90,
      flex: 0.15,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "assignedDriver",
      headerName: "Assigned Driver",
      width: 90,
      flex: 0.15,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "timeWindowViolations",
      headerName: "Time Violations",
      width: 90,
      flex: 0.15,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => {
        // consider any non-empty / non-'None' / non-'0' value as a violation
        const raw = params.value;
        const isViolation =
          raw !== null &&
          raw !== undefined &&
          raw !== "None" &&
          raw !== "0" &&
          raw !== 0 &&
          raw !== "";
        const label = isViolation ? "Yes" : "No";
        const bg = isViolation ? "#ffcccc" : "#ccffcc";
        return (
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              backgroundColor: bg,
              color: "#000",
              borderRadius: "6px",
              padding: "6px 8px",
            }}
          >
            {label}
          </Box>
        );
      },
    },
  ];

  // Dummy data for the table (buses / planned orders)
  const buses = [
    {
      _id: "1",
      orderId: "C-ORD-001",
      assignedVehicle: "V0001",
      assignedDriver: "Dhanuka Perera",
      timeWindowViolations: "None",
    },
    {
      _id: "2",
      orderId: "C-ORD-002",
      assignedVehicle: "V0001",
      assignedDriver: "Dhanuka Perera",
      timeWindowViolations: "None",
    },
    {
      _id: "3",
      orderId: "C-ORD-003",
      assignedVehicle: "V0001",
      assignedDriver: "Dhanuka Perera",
      timeWindowViolations: "1",
    },
    {
      _id: "4",
      orderId: "C-ORD-004",
      assignedVehicle: "V0002",
      assignedDriver: "Kasun Jayawardena",
      timeWindowViolations: "None",
    },
    {
      _id: "5",
      orderId: "C-ORD-005",
      assignedVehicle: "V0002",
      assignedDriver: "Kasun Jayawardena",
      timeWindowViolations: "2",
    },
    {
      _id: "6",
      orderId: "C-ORD-006",
      assignedVehicle: "V0001",
      assignedDriver: "Dhanuka Perera",
      timeWindowViolations: "None",
    },
    {
      _id: "7",
      orderId: "C-ORD-007",
      assignedVehicle: "V0002",
      assignedDriver: "Kasun Jayawardena",
      timeWindowViolations: "None",
    },
    {
      _id: "8",
      orderId: "C-ORD-008",
      assignedVehicle: "V0003",
      assignedDriver: "Nimal Bandara",
      timeWindowViolations: "None",
    },
  ];
  return (
    <div className=" mb-[60px]">
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={buses}
          columns={columns}
          rowHeight={75}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 6,
              },
            },
          }}
          // slots={{
          //   toolbar: GridToolbar,
          //   //pagination: CustomPagination,
          // }}
          //showColumnVerticalBorder={true}
          showCellVerticalBorder={true}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              fontFamily: "Barlow Semi Condensed",
              fontSize: "18px",
              fontWeight: "400",
              backgroundColor: "#002147",
              color: "#fff",
              // border: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#fff",
              color: "#000",
              fontFamily: "roboto",
              fontSize: "12px",
              fontWeight: "400",
            },
            // "& .MuiDataGrid-footerContainer": {
            //   backgroundColor: "#fff",
            //   paddingRight: "45%",
            // },
            "& .MuiDataGrid-toolbarContainer": {
              backgroundColor: "#fff",
              //center the toolbar
              //paddingLeft: "10%",

              "& .MuiButton-text": {
                color: "#002147",
              },
            },
            //remove cell horizontal border
            "& .MuiDataGrid-cell": {
              //borderBottom: "none",
            },
          }}
        />
      </Box>
    </div>
  );
}

export default PlanTable;
