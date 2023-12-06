import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useRoadRouteContext } from "../../hooks/useRoadRouteContext";
import RouteTableMap from "./RouteTableMap";
import { useNavigate } from "react-router-dom";

function Routes() {
  const { roadRoutes } = useRoadRouteContext();

  const navigate = useNavigate();
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
        <div className="w-full h-full py-[10px] ">
          <RouteTableMap
            googleRoutes={params.row.googleRoute}
            stations={params.row.stations}
            startLocation={params.row.startLocation}
          />
        </div>
      ),
    },
    {
      field: "buy",
      headerName: "Buy",
      width: 90,
      flex: 0.1,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <div className="w-full h-full py-[10px] items-center justify-center flex">
          <button
            className="text-white font-robot text-[14px] bg-main_blue px-[15px] py-[4px] rounded-lg"
            onClick={() => {
              navigate("/journey/" + params.row._id);
            }}
          >
            Buy
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-[80px] mb-[60px] mt-[30px]">
      <p className="text-main_blue text-[37px] font-semibold font-barlows  mb-[15px] leading-6">
        Read this carefully
      </p>
      <div
        className="text-justify text-[18px] "
        style={{ lineHeight: "normal" }}
      >
        <p>
          Welcome to the services we offer to ensure a brighter future for you.
          You are the future of our country and the upcoming generation, so it's
          crucial to utilize these resources wisely and responsibly. Remember,
          you hold the key to your success. Currently, we operate 15 buses that
          serve our three universities. You have the option to use any of these
          buses for your convenience. To travel on our buses, you must possess a
          valid single ticket or a season ticket.
        </p>
      </div>
      <div className="mt-[40px]">
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
                fontSize: "16px",
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

export default Routes;
