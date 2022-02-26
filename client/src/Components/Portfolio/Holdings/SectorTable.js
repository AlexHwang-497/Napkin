import * as React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {
  Box,
  Tab,
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
  styled,
} from "@material-ui/core";

function createData(name, ownership, history) {
  return {
    name,
    ownership,
    history,
  };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        style={{ background: "#091F3C" }}
      >
        <TableCell style={{ color: "#fff" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            style={{ color: "#fff" }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{ color: "#fff" }}>
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead style={{ background: "#1B8270" }}>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Symbol</TableCell>

                    <TableCell>Portfolio(%)</TableCell>
                    <TableCell>CumReturn(%)</TableCell>
                    <TableCell>AnnReturn(%)</TableCell>
                    <TableCell>PriceStdDev($)</TableCell>
                    <TableCell>RetStdDev(%)</TableCell>
                    <TableCell>Beta</TableCell>
                    <TableCell>Alpha</TableCell>
                    <TableCell>Sharpe Ratio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <StyledTableRow key={historyRow.date}>
                      <TableCell align="center">
                        <img
                          src={historyRow.image}
                          style={{ height: "30px", width: "30px" }}
                        />
                      </TableCell>
                      <TableCell align="center">{historyRow.asset}</TableCell>
                      {/* <TableCell >{row.name}</TableCell> */}
                      <TableCell align="center">
                        {historyRow.ownership}%
                      </TableCell>
                      <TableCell align="center">
                        {Number(historyRow.cumulativeReturn * 100).toFixed(2)}%
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.annualizedReturn}%
                      </TableCell>
                      <TableCell align="center">
                        ${historyRow.priceStdDev}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.returnStdDev}%
                      </TableCell>
                      <TableCell align="center">{historyRow.beta}</TableCell>
                      <TableCell align="center">{historyRow.alpha}</TableCell>
                      <TableCell align="center">
                        {historyRow.sharpeRatio}
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function SectorTable({
  ownership,
  assets,
  sector,
  image,
  data,
  dateIndex,
}) {
  const uniqueSectors = {};

  const dataNeeded = data[dateIndex].map((el, i) => el.sector).slice(1);

  const pracs = data[dateIndex]
    .map((el, i) => {
      return {
        asset: el.symbol,
        ownership: el.ownership,
        image: el.images,
        annualizedReturn: el.annualizedReturn,
        cumulativeReturn: el.finalCumulativeReturn,
        alpha: Number(el.alpha).toFixed(2),
        beta: Number(el.beta).toFixed(2),
        returnStdDev: Number(el.returnStDev * 100).toFixed(2),
        priceStdDev: Number(el.priceStDev).toFixed(2),
        sharpeRatio: Number(el.sharpe).toFixed(2),
      };
    })
    .slice(1);

  dataNeeded.map((s, i) => {
    if (!uniqueSectors[s]) {
      uniqueSectors[s] = [];
    }

    uniqueSectors[s].push(pracs[i]);
  });

  const individualSectors = Object.keys(uniqueSectors);

  const rows = individualSectors.map((sector, i) =>
    createData(sector, ownership, uniqueSectors[sector])
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
