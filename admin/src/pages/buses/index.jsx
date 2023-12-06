import { useBusContext } from "../../hooks/useBusContext";
import { useEmployeeContext } from "../../hooks/useEmployeeContext";
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

// function CustomPagination() {
//   const apiRef = useGridApiContext();
//   const page = useGridSelector(apiRef, gridPageSelector);
//   const pageCount = useGridSelector(apiRef, gridPageCountSelector);
//   return (
//     <Pagination
//       color="secondary"
//       variant="text"
//       shape="circular"
//       page={page + 1}
//       count={pageCount}
//       // @ts-expect-error
//       renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
//       onChange={(event, value) => apiRef.current.setPage(value - 1)}
//     />
//   );
// }

function BusesPage() {
  const { buses, dispatch } = useBusContext();
  const { employees } = useEmployeeContext();

  const columns = [
    {
      field: "busId",
      headerName: "Bus ID",
      width: 90,
      flex: 0.15,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "photo",
      headerName: "Photo",
      width: 90,
      flex: 0.2,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => (
        <div className="flex w-full items-center justify-center">
          <img
            src={params.row.photo.filePath}
            alt="employee"
            className="w-full h-[65px] object-cover"
          />
        </div>
      ),
    },
    {
      field: "registrationNumber",
      headerName: "Registration Number",
      width: 90,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "chassisNumber",
      headerName: "Chassis Number",
      width: 90,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "model",
      headerName: "Model",
      width: 90,
      flex: 0.2,
      align: "center",
      headerAlign: "center",
      type: "string",
    },

    {
      field: "seatingCapacity",
      headerName: "Seats",
      sortable: false,
      flex: 0.15,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "color",
      headerName: "Color",
      sortable: false,
      flex: 0.15,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "driver",
      headerName: "Driver",
      sortable: false,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {employees.find((employee) => employee._id === params.row.driver) ? (
            employees.find((employee) => employee._id === params.row.driver)
              .fullName
          ) : (
            <p className="text-red-500">Something wrong</p>
          )}
        </>
      ),
    },
    {
      field: "conductor",
      headerName: "Conductor",
      sortable: false,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {employees.find(
            (employee) => employee._id === params.row.conductor
          ) ? (
            employees.find((employee) => employee._id === params.row.conductor)
              .fullName
          ) : (
            <p className="text-red-500">Something wrong</p>
          )}
        </>
      ),
    },
    {
      field: "owner",
      headerName: "Owner",
      sortable: false,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      flex: 0.1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            console.log("edit");
          }}
        >
          <DriveFileRenameOutlineIcon sx={{ fontSize: 18 }} />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      flex: 0.1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleBusDelete(params.row._id);
          }}
        >
          <DeleteOutlinedIcon sx={{ fontSize: 19 }} />
        </IconButton>
      ),
    },
  ];

  const handleBusDelete = async (id) => {
    try {
      const res = await adminAxios.delete(`/api/buses/${id}`);
      if (res.status === 200) {
        toast.success("Bus deleted successfully", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
        dispatch({ type: "DELETE_BUS", payload: id });
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="mx-[60px] mb-[60px]">
      <p className="text-main_blue text-[37px] font-semibold font-barlows  mb-[15px] leading-6">
        Bus Details
      </p>
      <div className="mt-[20px]">
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

export default BusesPage;
