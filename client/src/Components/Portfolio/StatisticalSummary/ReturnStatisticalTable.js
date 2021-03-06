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
    createData('Cumulative Return', (portfolioCumulativeReturn*100).toFixed(2)+'%', (spxCumulativeReturn*100).toFixed(2)+'%', ((portfolioCumulativeReturn-spxCumulativeReturn)*100).toFixed(2)+'%'),
    createData('Annualized Return', parseInt(portfolioAnnualizedReturn).toFixed(2)+'%', parseInt(spxAnnualizedReturn).toFixed(2)+'%', (portfolioAnnualizedReturn-spxAnnualizedReturn).toFixed(2)+'%'),
    createData('Mean Return',(avgPortfolioReturns*100).toFixed(2)+'%',(spxReturnMean*100).toFixed(2)+'%',((avgPortfolioReturns-spxReturnMean)*100).toFixed(2)+'%' ),
    createData('Highest Return Month',(portfolioMaxReturn*100).toFixed(2)+'%' ),
    createData('Lowest Return Month',  (portfolioMinReturn*100).toFixed(2)+'%'),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableHead style={{background:"#091F3C"}}>
          <TableRow>
            <TableCell style={{color:"#fff"}}>Type of Return</TableCell>
            <TableCell style={{color:"#fff"}}>Portfolio</TableCell>
            <TableCell style={{color:"#fff"}} align="left">Benchmark</TableCell>
            <TableCell style={{color:"#fff"}} align="left">Delta</TableCell>
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
