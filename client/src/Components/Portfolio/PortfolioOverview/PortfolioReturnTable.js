import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { styled } from "@material-ui/core";
import TableCell, { tableCellClasses } from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function createData(year, annualizedReturn, stdDev, beta, alpha, sharpe) {
  return { year, annualizedReturn, stdDev, beta, alpha, sharpe };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  root: {
    color: "red",
  },
}));

const styles = (theme) => ({
  tableHead: {
    "&$selected, &$selected:hover": {
      backgroundColor: "purple",
    },
  },
  tableCell: {
    "$selected &": {
      color: "yellow",
    },
  },
  selected: {},
});

export default function PortfolioReturnTable({ annReturn }) {
  if (!annReturn || annReturn.length === 0 || annReturn[0] === undefined)
    return;

  const rows = annReturn.map((entry, key) => createData(...entry));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead style={{ background: "#091F3C" }}>
          <TableRow>
            <TableCell style={{ color: "#fff" }} align="center">
              Year
            </TableCell>
            <TableCell style={{ color: "#fff" }} align="center">
              Annualized Return(%)
            </TableCell>
            <TableCell style={{ color: "#fff" }} align="center">
              StdDev
            </TableCell>
            <TableCell style={{ color: "#fff" }} align="center">
              Beta
            </TableCell>
            <TableCell style={{ color: "#fff" }} align="center">
              Alpha
            </TableCell>
            <TableCell style={{ color: "#fff" }} align="center">
              Sharpe Ratio
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.year}</TableCell>
              <TableCell align="center">
                {Number(row.annualizedReturn).toFixed(2)}%
              </TableCell>
              <TableCell align="center">
                {Number(row.stdDev * 100).toFixed(2)}%
              </TableCell>
              <TableCell align="center">
                {Number(row.beta).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                {Number(row.alpha).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                {Number(row.sharpe).toFixed(2)}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
