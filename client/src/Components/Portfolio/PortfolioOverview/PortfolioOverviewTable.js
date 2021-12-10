import React, {Fragment, useState,useEffect} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


 function PortfolioOverviewTable({portfolioOverviewData}) {
  
  
  // console.log('[PortfolioOverviewTable.portfolioOverviewData',portfolioOverviewData.slice(1))
  

  const rows=portfolioOverviewData.slice(1).map((entry)=>entry)
  
  
  // console.log('[PortfolioOverviewTable.rows',rows)
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">CumReturn(%)</TableCell>
            <TableCell align="right">AnnReturn(%)</TableCell>
            <TableCell align="right">StdDev</TableCell>
            <TableCell align="right">Beta</TableCell>
            <TableCell align="right">Alpha</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell><img src={row.images} style={{height:'30px',width:'30px'}}/></TableCell> */}
              <TableCell component="th" scope="row" ><img src={row.images} style={{height:'30px',width:'30px'}}/></TableCell>
              <TableCell align="right">{row.symbol}</TableCell>
              <TableCell align="right">{Number(row.finalCumulativeReturn*100).toFixed(2)}%</TableCell>
              <TableCell align="right">{Number(row.annualizedReturn).toFixed(2)}%</TableCell>
              <TableCell align="right">{Number(row.returnStDev*100).toFixed(2)}%</TableCell>
              <TableCell align="right">{Number(row.beta).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PortfolioOverviewTable