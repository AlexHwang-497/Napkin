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


 function PortfolioOverviewTable({priceData}) {
   let key = 2
  const [data,setData] = useState()
  const dateLabels = ['1yr', '3yr', '5yr'];
  const dates = dateLabels.map(label => {
    const yearNumber = parseInt(label.split('yr')[0]);
    return generateHistoricalDate(yearNumber);
  });
  

  const calculations = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    
    
    const monReturn = monthlyReturn(range)
    console.log('[PortfolioOverviewTable.monReturn',monReturn)
    // const assetCov = calcCovariance(monReturn)
    return monReturn
    
  })

  console.log('[PortfolioOverviewTable.calculations',calculations)

  // const rows = [
  //   createData(...annReturn[0]),
  //   // createData('3yr', 237, 9.0, 37, 4.3),
  //   // createData('5yr', 262, 16.0, 24, 6.0),
  //   // createData('10yr', 305, 3.7, 67, 4.3),
    
  // ];
  console.log('[PortfolioOverviewTable.pricedata',priceData)
  // Number.parseFloat(annualizedReturn*100).toPrecision(4)

  // const rows =annReturn.map((entry,key)=>createData(...entry))
  const rows=calculations.map((entry)=>entry.slice(1))
  console.log('[PortfolioOverviewTable.rows',rows[0])
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
          {rows[key].map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell><img src={row.images} style={{height:'30px',width:'30px'}}/></TableCell> */}
              <TableCell component="th" scope="row" ><img src={row.images} style={{height:'30px',width:'30px'}}/></TableCell>
              <TableCell align="right">{row.symbol}</TableCell>
              <TableCell align="right">{Number.parseFloat(row.finalCumulativeReturn*100).toPrecision(5)}%</TableCell>
              <TableCell align="right">{Number.parseFloat(row.annualizedReturn).toPrecision(4)}%</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PortfolioOverviewTable