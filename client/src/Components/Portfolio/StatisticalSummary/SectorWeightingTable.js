import * as React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {
  Box,
  Tab,
  styled,
  Typography,
  Tabs,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

function createData(sector, portfolio, benchmark, delta) {
  return { sector, portfolio, benchmark, delta };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function SectorWeightingTable({
  benchmarkSectorWeighting,
  portfolioWeighting,
}) {
  const weightingObj = portfolioWeighting.reduce(
    (obj, el) => ({ ...obj, [el.sector]: el.value }),
    {}
  );

  const sector = benchmarkSectorWeighting.map((el) => el.sector);
  const weightPercentage = benchmarkSectorWeighting.map(
    (el) => el.weightPercentage
  );
  const benchMarkMap = benchmarkSectorWeighting.map((el, i) => el);

  const rows = benchmarkSectorWeighting.map((el, i) =>
    createData(
      el.sector,
      (weightingObj[sector[i]] ? weightingObj[sector[i]] : 0) + "%",
      el.weightPercentage,
      (
        (weightingObj[sector[i]] ? weightingObj[sector[i]] : 0) -
        parseInt(el.weightPercentage)
      ).toFixed(1) + "%"
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableHead style={{ background: "#091F3C" }}>
          <TableRow>
            <TableCell style={{ color: "#fff" }}>Sector</TableCell>
            <TableCell style={{ color: "#fff" }}>Portfolio</TableCell>
            <TableCell style={{ color: "#fff" }} align="left">
              Benchmark
            </TableCell>
            <TableCell style={{ color: "#fff" }} align="left">
              Delta
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.sector}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.sector}
              </TableCell>
              <TableCell align="left">{row.portfolio}</TableCell>
              <TableCell align="left">{row.benchmark}</TableCell>
              <TableCell align="left">{row.delta}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
