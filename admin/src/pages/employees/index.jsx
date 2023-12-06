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
import { useEmployeeContext } from "../../hooks/useEmployeeContext";
import { Box, IconButton } from "@mui/material";
import { ImProfile } from "react-icons/im";
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

function EmployeesPage() {
  const { employees, dispatch } = useEmployeeContext();
  console.log(employees);

  const columns = [
    {
      field: "eId",
      headerName: "ID",
      width: 90,
      flex: 0.3,
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
            className="w-full h-[72px] object-cover"
          />
        </div>
      ),
    },
    {
      field: "fullName",
      headerName: "Employee Name",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "email",
      headerName: "Email",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "mobile",
      headerName: "mobile Number",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => <>+94{params.row.mobile}</>,
    },

    {
      field: "role",
      headerName: "Position",
      sortable: false,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      flex: 0.15,
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
      flex: 0.15,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleEmployeeDelete(params.row._id);
          }}
        >
          <DeleteOutlinedIcon sx={{ fontSize: 19 }} />
        </IconButton>
      ),
    },
    {
      field: "profile",
      headerName: "Profile",
      sortable: false,
      flex: 0.15,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            // handleEditBus(params.row);
          }}
        >
          <ImProfile className="text-[16px]" />
        </IconButton>
      ),
    },
  ];

  const handleEmployeeDelete = async (id) => {
    try {
      const res = await adminAxios.delete(`/api/employees/${id}`);
      if (res.status === 200) {
        console.log("deleted");
        toast.success("Employee deleted successfully", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
        dispatch({ type: "DELETE_EMPLOYEE", payload: id });
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
        Employees Details
      </p>
      <div className="mt-[20px]">
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={employees}
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

export default EmployeesPage;
