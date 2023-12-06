import { MdDeleteOutline } from "react-icons/md";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";

function StationsOutput({ stations, setStations }) {
  const columns = [
    {
      field: "id",
      headerName: "SId",
      width: 90,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "lat",
      headerName: "Latitude",
      width: 90,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "lng",
      headerName: "Longitude",
      width: 90,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "price",
      headerName: "Price",
      width: 90,
      flex: 0.2,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "distance",
      headerName: "Distance",
      width: 90,
      flex: 0.2,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "delete",
      headerName: "Del",
      width: 90,
      flex: 0.1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            console.log(params.row.id);
          }}
        >
          <MdDeleteOutline
            className="text-[18px]"
            onClick={() => {
              console.log(params.row.id);
              setStations(
                stations.filter((station) => station.id !== params.row.id)
              );
            }}
          />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      {stations && (
        <div
          className={`${stations.length ? "w-[520px] mt-[15px]" : "hidden"}`}
        >
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={stations}
              columns={columns}
              rowHeight={30}
              getRowId={(row) => row.id}
              // initialState={{
              //   pagination: {
              //     paginationModel: {
              //       pageSize: 6,
              //     },
              //   },
              // }}
              hideFooter={true}
              slots={
                {
                  //toolbar: GridToolbar,
                  //pagination: CustomPagination,
                }
              }
              showColumnVerticalBorder={true}
              showCellVerticalBorder={true}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  fontFamily: "Barlow Semi Condensed",
                  fontSize: "16px",
                  fontWeight: "400",
                  backgroundColor: "#fff",
                  color: "#002147",

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
      )}
    </>
  );
}

export default StationsOutput;
