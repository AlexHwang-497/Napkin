import * as React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Box, Tab, Typography,Tabs, Collapse, Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Paper,styled} from '@material-ui/core'


function createData(returns, portfolio, benchmark, delta) {
  return { returns, portfolio, benchmark, delta  };
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


export default function ReturnStatisticalTable({avgPortfolioReturns,portfolioAnnualizedReturn,spxReturnMean, portfolioCumulativeReturn, spxCumulativeReturn,spxAnnualizedReturn,portfolioMaxReturn,portfolioMinReturn}) {
  const rows = [
    createData('Cumulative Return', (portfolioCumulativeReturn*100).toFixed(2), (spxCumulativeReturn*100).toFixed(2), (portfolioCumulativeReturn-spxCumulativeReturn).toFixed(2)*100),
    createData('Annualized Return', portfolioAnnualizedReturn, spxAnnualizedReturn, (portfolioAnnualizedReturn-spxAnnualizedReturn)),
    createData('Mean Return',avgPortfolioReturns.toFixed(2)*100,spxReturnMean.toFixed(2)*100,(avgPortfolioReturns-spxReturnMean).toFixed(2)*100 ),
    createData('Highest Return Month',portfolioMaxReturn.toFixed(2)*100 ),
    createData('Lowest Return Month',  portfolioMinReturn.toFixed(2)*100),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableHead style={{background:"#819ca9"}}>
          <TableRow>
            <TableCell>Type of Return</TableCell>
            <TableCell>Portfolio</TableCell>
            <TableCell align="left">Benchmark</TableCell>
            <TableCell align="left">Delta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.returns}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.returns}
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
