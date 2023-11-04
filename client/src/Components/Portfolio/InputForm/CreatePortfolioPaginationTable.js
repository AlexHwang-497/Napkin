import React from "react";
import { useState } from "react";
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  TablePagination,
  Paper,
  CardMedia,
  ImageListItem,
} from "@material-ui/core";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";

const CreatePortfolioPaginationTable = ({
  image,
  stockList,
  pct,
  deleteEntry,
  sector,
}) => {
  const [assets, setAssets] = useState(stockList || []);
  const [editContactId, setEditContactId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="w-full overflow-auto">
      <Table className="whitespace-pre">
        <TableHead style={{ background: "#819ca9" }}>
          <TableRow>
            <TableCell className="px-0"></TableCell>
            <TableCell className="px-0">Symbol</TableCell>
            <TableCell className="px-0">Sector</TableCell>
            <TableCell className="px-0">Portfolio(%)</TableCell>
            <TableCell className="px-0">Portfolio($)</TableCell>

            <TableCell className="px-0">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockList.map((el, i) => (
            <TableRow key={i}>
              <TableCell>
                <img src={image[i]} style={{ height: "30px", width: "30px" }} />
              </TableCell>
              <TableCell className="px-0 capitalize" align="left">
                {el}
              </TableCell>
              <TableCell className="px-0 capitalize" align="left">
                {sector[i]}
              </TableCell>
              <TableCell className="px-0 capitalize" align="left">
                {pct[i]}%
              </TableCell>
              <TableCell className="px-0 capitalize" align="left">
                ${pct[i] * 100}
              </TableCell>
              <TableCell className="px-0">
                {" "}
                <IconButton onClick={() => deleteEntry(i)}>
                  <DeleteForeverTwoToneIcon color="error" />
                </IconButton>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        className="px-4"
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={5}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CreatePortfolioPaginationTable;
