import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import {styled} from '@material-ui/core'
import TableCell , { tableCellClasses } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



function createData(year, annualizedReturn, stdDev, beta, alpha) {
  return { year, annualizedReturn, stdDev, beta, alpha };
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


export default function PortfolioReturnTable({annReturn}) {



  if(!annReturn || annReturn.length===0 || annReturn[0]===undefined) return ;

  console.log('[[PortfolioDetail.PortfolioReturnTable.annReturn',annReturn)

  

  const rows =annReturn.map((entry,key)=>createData(...entry))
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
        <TableHead style={{background:"#091F3C"}}>
          <TableRow >
            <TableCell >Year</TableCell>
            <TableCell align="right">AnnualizedReturn(%)</TableCell>
            <TableCell align="right">StdDev</TableCell>
            <TableCell align="right">Beta</TableCell>
            <TableCell align="right">Alpha</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.year}
              </TableCell>
              <TableCell align="right">{Number(row.annualizedReturn).toFixed(2)}%</TableCell>
              <TableCell align="right">{Number(row.stdDev*100).toFixed(2)}%</TableCell>
              <TableCell align="right">{Number(row.beta).toFixed(2)}</TableCell>
              <TableCell align="right">{Number(row.alpha*100).toFixed(2)}%</TableCell>           
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}