import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function PortfolioReturnTable({annReturn}) {
  // const rows = [
  //   createData(...annReturn[0]),
  //   // createData('3yr', 237, 9.0, 37, 4.3),
  //   // createData('5yr', 262, 16.0, 24, 6.0),
  //   // createData('10yr', 305, 3.7, 67, 4.3),
    
  // ];

  const rows =annReturn.map((entry,key)=>createData(...entry))
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell align="right">AnnualizedReturn(%)</TableCell>
            <TableCell align="right">StdDev</TableCell>
            <TableCell align="right">Beta</TableCell>
            
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
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}