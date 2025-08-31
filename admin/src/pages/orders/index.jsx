import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEmployeeContext } from "../../hooks/useEmployeeContext";
import { Box, IconButton } from "@mui/material";
import { ImProfile } from "react-icons/im";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import adminAxios from "../../baseURL";
import { toast } from "react-toastify";

function Orders() {
  // Dummy order data
  const dummyOrders = [
    {
      _id: "1",
      orderId: "ORD-001",
      customer_name: "John Doe",
      del_address: "123 Main St, Cityville",
      del_window: "10:00 AM - 12:00 PM",
      urgency_level: "High",
      order_status: "Pending",
      assigned_driver: "Alice Smith",
      eta: "11:30 AM",
    },
    {
      _id: "2",
      orderId: "ORD-002",
      customer_name: "Jane Smith",
      del_address: "456 Oak Ave, Townsville",
      del_window: "1:00 PM - 3:00 PM",
      urgency_level: "Medium",
      order_status: "In Progress",
      assigned_driver: "Bob Johnson",
      eta: "2:15 PM",
    },
    {
      _id: "3",
      orderId: "ORD-003",
      customer_name: "Mike Brown",
      del_address: "789 Pine Rd, Villageburg",
      del_window: "4:00 PM - 6:00 PM",
      urgency_level: "Low",
      order_status: "Delivered",
      assigned_driver: "Charlie Lee",
      eta: "5:45 PM",
    },
  ];

  const columns = [
    {
      field: "orderId",
      headerName: "Order Id",
      width: 90,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
      width: 90,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "del_address",
      headerName: "Delivery Address",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "del_window",
      headerName: "Delivery window",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "urgency_level",
      headerName: "Urgency Level",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case "High":
            color = "#ff5252"; // red
            break;
          case "Medium":
            color = "#ffb300"; // orange
            break;
          case "Low":
            color = "#43a047"; // green
            break;
          default:
            color = "#757575"; // grey
        }
        return (
          <span
            style={{
              color: "#fff",
              backgroundColor: color,
              padding: "6px 14px",
              borderRadius: "16px",
              fontWeight: 600,
              fontSize: "13px",
              display: "inline-block",
              minWidth: "70px",
              textAlign: "center",
            }}
          >
            {params.value}
          </span>
        );
      },
    },
    {
      field: "order_status",
      headerName: "Order Status",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "assigned_driver",
      headerName: "Assigned Driver",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "eta",
      headerName: "Estimated Delivery Time (ETA)",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
  ];

  return (
    <div className="mx-[60px] mb-[60px]">
      <p className="text-main_blue text-[37px] font-semibold font-barlows  mb-[15px] leading-6">
        Order Details
      </p>
      <div className="mt-[20px]">
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={dummyOrders}
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
            slots={{
              toolbar: GridToolbar,
              //pagination: CustomPagination,
            }}
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
    </div>
  );
}

export default Orders;
