import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useUsersContext } from "../../hooks/useUsersContext";
import dayjs from "dayjs";

function UsersPage() {
  const { users } = useUsersContext();

  const columns = [
    {
      field: "sId",
      headerName: "SID",
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
      flex: 0.35,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => (
        <div className="flex w-full items-center justify-center">
          <img
            src={params.row.photo}
            alt="user"
            className="w-full h-[72px] object-cover"
          />
        </div>
      ),
    },
    {
      field: "shortName",
      headerName: "Employee Name",
      width: 90,
      flex: 0.4,
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
      headerName: "Mobile Number",
      width: 90,
      flex: 0.35,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => <>+94{params.row.mobileNo}</>,
    },

    {
      field: "address",
      headerName: "Address",
      sortable: false,
      flex: 0.7,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "dateOfEntry",
      headerName: "Date of Entry",
      sortable: false,
      flex: 0.4,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>{dayjs(params.row.dateOfEntry).format("DD-MM-YYYY")}</>
      ),
    },
    {
      field: "year",
      headerName: "year",
      sortable: false,
      flex: 0.2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "department",
      headerName: "department",
      sortable: false,
      flex: 0.6,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <div className="mx-[60px] mb-[60px]">
      <p className="text-main_blue text-[37px] font-semibold font-barlows  mb-[15px] leading-6">
        Passenger Details
      </p>
      <div className="mt-[20px]">
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={users}
            columns={columns}
            rowHeight={85}
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

export default UsersPage;
