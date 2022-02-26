import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  {
    field: "image",
    headerName: "",
    width: 50,
    // sortingMode={false}
    // height: 100,
    renderCell: (params) => (
      <img src={params.value} style={{ height: "30px", width: "30px" }} />
    ),
  },
  {
    field: "symbol",
    headerName: "Symbol",
    minWidth: 50,
    // editable: true,
  },

  {
    field: "ownership",
    headerName: "Ownership",
    type: "number",
    minWidth: 50,
    valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toLocaleString();
      return `${valueFormatted} %`;
    },
  },
  {
    field: "sector",
    headerName: "Sector",
    minWidth: 50,
    // editable: true,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
];

export default function PortfolioPostTable({ data }) {
  let obj = {};
  obj.symbol = data.assets.map((el) => el);
  obj.images = data.image;
  obj.ownership = data.ownership;
  obj.sector = data.sector;

  const row = obj.symbol.map((el, i) => {
    return {
      id: i,
      symbol: el,
      image: obj.images[i],
      ownership: obj.ownership[i],
      sector: obj.sector[i],
    };
  });
  return (
    <div style={{ height: 350, width: "100%" }}>
      <DataGrid
        rows={row}
        pageSize={5}
        rowsPerPageOptions={[5]}
        columns={columns}
        disableColumnMenu={true}
      />
    </div>
  );
}
