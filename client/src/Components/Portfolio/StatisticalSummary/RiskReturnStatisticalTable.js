import * as React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Box, Tab, styled, Typography,Tabs, Collapse, Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Paper,} from '@material-ui/core'


function createData(riskReturn, portfolio, benchmark, delta) {
  return { riskReturn, portfolio, benchmark, delta, };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function RiskReturnStatisticalTable({portfolioCov,portfolioAlpha,portfolioBeta,spxStDeviation,portfolioAnnualizedReturn, portfolioCumulativeReturn, spxPriceStDeviation,spxCumulativeReturn,spxAnnualizedReturn,portfolioStdDev}) {
  const rows = [
    createData('Return Standard Deviation', (portfolioStdDev*100).toFixed(2)+'%', (spxStDeviation*100).toFixed(2)+'%', ((portfolioStdDev-spxStDeviation)*100).toFixed(2)+'%'),
    // createData('Price Standard Deviation', portfolioAnnualizedReturn, spxPriceStDeviation.toFixed(2), (portfolioAnnualizedReturn-spxAnnualizedReturn).toFixed(2)),
    createData('Covariance', (portfolioCov*100).toFixed(2)),
    createData('Beta',portfolioBeta.toFixed(2),(1.00).toFixed(2) ),
    createData('Alpha',portfolioAlpha.toFixed(2)  ),
    createData('Sharpe Ratio',  ),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableHead style={{background:"#091F3C"}}>
          <TableRow>
            <TableCell style={{color:"#fff"}}>Type of Risk/Return</TableCell>
            <TableCell style={{color:"#fff"}}>Portfolio</TableCell>
            <TableCell style={{color:"#fff"}} align="left">Benchmark</TableCell>
            <TableCell style={{color:"#fff"}} align="left">Delta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.riskReturn}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.riskReturn}
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
