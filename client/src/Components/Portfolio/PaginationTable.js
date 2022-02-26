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

const PaginationTable = ({ post }) => {
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
          {post.assets &&
            post.assets.map((asset, i) => (
              <TableRow key={i}>
                <TableCell>
                  <img
                    src={post.image[i]}
                    style={{ height: "30px", width: "30px" }}
                  />
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {asset}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {post.sector[i]}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {post.ownership[i]}%
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  ${post.ownership[i] * 100}
                </TableCell>
                <TableCell className="px-0">
                  {" "}
                  <IconButton onClick={() => post.deleteEntry(i)}>
                    {" "}
                    <Icon color="error">X</Icon>{" "}
                  </IconButton>{" "}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaginationTable;
