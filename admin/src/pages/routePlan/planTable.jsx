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
      headerName: "Time Window Violations",
      width: 90,
      flex: 0.15,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
  ];

  // Dummy data for the table (buses / planned orders)
  const buses = [
    {
      _id: "1",
      orderId: "ORD-001",
      assignedVehicle: "VID-343434",
      assignedDriver: "John Doe",
      timeWindowViolations: "None",
    },
    {
      _id: "2",
      orderId: "ORD-002",
      assignedVehicle: "VID-123456",
      assignedDriver: "Jane Smith",
      timeWindowViolations: "None",
    },
    {
      _id: "3",
      orderId: "ORD-003",
      assignedVehicle: "VID-789101",
      assignedDriver: "Ali Khan",
      timeWindowViolations: "1",
    },
    {
      _id: "4",
      orderId: "ORD-004",
      assignedVehicle: "VID-555555",
      assignedDriver: "Maria Lopez",
      timeWindowViolations: "None",
    },
    {
      _id: "5",
      orderId: "ORD-005",
      assignedVehicle: "VID-343434",
      assignedDriver: "John Doe",
      timeWindowViolations: "2",
    },
    {
      _id: "6",
      orderId: "ORD-006",
      assignedVehicle: "VID-123456",
      assignedDriver: "Jane Smith",
      timeWindowViolations: "None",
    },
    {
      _id: "7",
      orderId: "ORD-007",
      assignedVehicle: "VID-789101",
      assignedDriver: "Ali Khan",
      timeWindowViolations: "None",
    },
    {
      _id: "8",
      orderId: "ORD-008",
      assignedVehicle: "VID-555555",
      assignedDriver: "Maria Lopez",
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
