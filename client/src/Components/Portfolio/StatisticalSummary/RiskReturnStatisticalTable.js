import * as React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Box, Tab, Typography,Tabs, Collapse, Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Paper,} from '@material-ui/core'


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function RiskReturnStatisticalTable({portfolioAnnualizedReturn, portfolioCumulativeReturn, spxCumulativeReturn,spxAnnualizedReturn}) {
  const rows = [
    createData('Return Standard Deviation', portfolioCumulativeReturn.toFixed(2)*100, spxCumulativeReturn.toFixed(2)*100, (portfolioCumulativeReturn-spxCumulativeReturn).toFixed(2)*100),
    createData('Price Standard Deviation', portfolioAnnualizedReturn, spxAnnualizedReturn, (portfolioAnnualizedReturn-spxAnnualizedReturn)),
    createData('Covariance', ),
    createData('Beta', ),
    createData('Alpha',  ),
    createData('Sharpe Ratio',  ),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Risk/Return</TableCell>
            <TableCell>Portfolio</TableCell>
            <TableCell align="left">Benchmark</TableCell>
            <TableCell align="left">Delta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
              <TableCell align="left">{row.carbs}</TableCell>
              <TableCell align="left">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
