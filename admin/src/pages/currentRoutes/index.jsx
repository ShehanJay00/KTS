import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useRoadRouteContext } from "../../hooks/useRoadRouteContext";
import RouteTableMap from "./RouteTableMap";
import adminAxios from "../../baseURL";
import { toast } from "react-toastify";

function CurrentRoutes() {
  const { roadRoutes, dispatch } = useRoadRouteContext();
  const columns = [
    {
      field: "rId",
      headerName: "ID",
      width: 90,
      flex: 0.3,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => <div>{params.row.startLocation.name}</div>,
    },
    {
      field: "stations",
      headerName: "Stations",
      width: 90,
      flex: 0.3,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <div>
          {params.row.stations.map((station) => (
            <div key={`${station.id} ${station.lat} ${station.lng}`}>
              {station.id}
            </div>
          ))}
        </div>
      ),
    },
    {
      field: "prices",
      headerName: "Prices",
      width: 90,
      flex: 0.1,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <div>
          {params.row.stations.map((station) => (
            <div key={`${station.id} ${station.lat} ${station.lng}`}>
              {station.price}
            </div>
          ))}
        </div>
      ),
    },
    {
      field: "distance",
      headerName: "Distance",
      width: 90,
      flex: 0.1,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <div>
          {params.row.stations.map((station) => (
            <div key={`${station.id} ${station.lat} ${station.lng}`}>
              {station.distance}
            </div>
          ))}
        </div>
      ),
    },
    {
      field: "map",
      headerName: "Map",
      width: 90,
      flex: 1,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <div className="w-full h-full py-[15px]">
          <RouteTableMap
            googleRoutes={params.row.googleRoute}
            stations={params.row.stations}
            startLocation={params.row.startLocation}
          />
        </div>
      ),
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
          <DriveFileRenameOutlineIcon sx={{ fontSize: 25 }} />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Edit",
      sortable: false,
      flex: 0.1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleRoadRouteDelete(params.row._id);
          }}
        >
          <DeleteOutlinedIcon sx={{ fontSize: 25 }} />
        </IconButton>
      ),
    },
  ];

  const handleRoadRouteDelete = async (id) => {
    try {
      const res = await adminAxios.delete(`/api/roadRoutes/${id}`);
      if (res.status === 200) {
        toast.success("Route deleted successfully", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
        dispatch({ type: "DELETE_ROAD_ROUTE", payload: id });
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
        Current Routes
      </p>
      <div className="mt-[20px]">
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={roadRoutes}
            columns={columns}
            rowHeight={400}
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
                fontSize: "13px",
                fontWeight: "500",
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

export default CurrentRoutes;
