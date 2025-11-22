import React, { useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function OrderTable() {
  const leftColumns = [
    {
      field: "orderID",
      headerName: "Order ID",
      width: 150,
      flex: 0.1,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "orderCapacity",
      headerName: "Order Capacity",
      width: 150,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "timeWindow",
      headerName: "Time Window",
      width: 200,
      flex: 0.1,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
  ];

  const leftRows = [
    {
      id: 1,
      orderID: "ORD-001",
      orderCapacity: "10",
      timeWindow: "09:00 - 11:00",
    },
    {
      id: 2,
      orderID: "ORD-002",
      orderCapacity: "20",
      timeWindow: "10:00 - 12:00",
    },
    {
      id: 3,
      orderID: "ORD-003",
      orderCapacity: "5",
      timeWindow: "08:00 - 09:30",
    },
    {
      id: 4,
      orderID: "ORD-004",
      orderCapacity: "15",
      timeWindow: "13:00 - 15:00",
    },
    {
      id: 5,
      orderID: "ORD-005",
      orderCapacity: "25",
      timeWindow: "14:00 - 16:00",
    },
    {
      id: 6,
      orderID: "ORD-006",
      orderCapacity: "8",
      timeWindow: "16:00 - 18:00",
    },
    {
      id: 7,
      orderID: "ORD-007",
      orderCapacity: "12",
      timeWindow: "11:00 - 13:00",
    },
    {
      id: 8,
      orderID: "ORD-008",
      orderCapacity: "30",
      timeWindow: "07:00 - 09:00",
    },
  ];

  // Options for the selects in the right table
  const vehicleOptions = [
    "VID-343434",
    "VID-123456",
    "VID-789101",
    "VID-555555",
  ];
  const driverOptions = ["John Doe", "Jane Smith", "Ali Khan", "Maria Lopez"];

  // Keep selection state for the single-row right table
  const [selection, setSelection] = useState({
    vehicles: "",
    drivers: "",
  });

  const handleSelectChange = (field) => (event) => {
    setSelection((s) => ({ ...s, [field]: event.target.value }));
  };

  // Right table columns: renders Select components inside cells
  const rightColumns = [
    {
      field: "vehicles",
      headerName: "Vehicles",
      width: 220,
      flex: 0.1,
      align: "center",
      headerAlign: "center",
      renderCell: () => (
        <FormControl fullWidth size="small">
          <InputLabel id="vehicle-select-label">Vehicle</InputLabel>
          <Select
            labelId="vehicle-select-label"
            value={selection.vehicles}
            label="Vehicle"
            onChange={handleSelectChange("vehicles")}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {vehicleOptions.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
    {
      field: "drivers",
      headerName: "Drivers",
      width: 220,
      flex: 0.1,
      align: "center",
      headerAlign: "center",
      renderCell: () => (
        <FormControl fullWidth size="small">
          <InputLabel id="driver-select-label">Driver</InputLabel>
          <Select
            labelId="driver-select-label"
            value={selection.drivers}
            label="Driver"
            onChange={handleSelectChange("drivers")}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {driverOptions.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
  ];

  const rightRows = [{ id: "single-row", vehicles: "", drivers: "" }];

  return (
    <div className="mb-[60px]">
      <p className="text-main_blue text-[37px] font-semibold font-barlows  mb-[15px] leading-6">
        Vehicle Details
      </p>

      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
        {/* Left table: multiple order rows */}
        <Box sx={{ flex: 1, height: 520 }}>
          <DataGrid
            rows={leftRows}
            columns={leftColumns}
            rowHeight={60}
            initialState={{
              pagination: { paginationModel: { pageSize: 6 } },
            }}
            slots={{ toolbar: GridToolbar }}
            pageSizeOptions={[6, 10]}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#002147",
                color: "#fff",
              },
            }}
          />
        </Box>

        {/* Right table: single row with selects */}
        <Box sx={{ flex: 1, height: 180 }}>
          <DataGrid
            rows={rightRows}
            columns={rightColumns}
            hideFooter
            disableColumnMenu
            rowHeight={80}
            disableSelectionOnClick
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#002147",
                color: "#fff",
              },
              "& .MuiDataGrid-cell": {
                display: "flex",
                alignItems: "center",
                padding: "8px",
              },
            }}
          />
        </Box>
      </Box>
    </div>
  );
}

export default OrderTable;
