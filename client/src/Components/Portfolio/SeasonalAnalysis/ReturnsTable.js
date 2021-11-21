import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createReturnsTableData(year, jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec) {
    return { year, jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec };
  }
  
  const rows = [
    createReturnsTableData('2011', 2,3,7, 9,0, 3,7, 4,3,1,4,5),
    createReturnsTableData('2012', 6, 6.0, 2, 4.0, 6, 6.0, 2, 4.0, 6, 6.0, 2, 4.0),
    createReturnsTableData('2014', 2,3,7, 9,0, 3,7, 4,3,1,4,5),
    createReturnsTableData('2015', 6, 6.0, 2, 4.0, 6, 6.0, 2, 4.0, 6, 6.0, 2, 4.0),
    createReturnsTableData('2016', 2,3,7, 9,0, 3,7, 4,3,1,4,5),
    createReturnsTableData('2017', 6, 6.0, 2, 4.0, 6, 6.0, 2, 4.0, 6, 6.0, 2, 4.0),
    createReturnsTableData('2018', 2,3,7, 9,0, 3,7, 4,3,1,4,5),
    createReturnsTableData('2019', 6, 6.0, 2, 4.0, 6, 6.0, 2, 4.0, 6, 6.0, 2, 4.0),
    createReturnsTableData('2020', 2,3,7, 9,0, 3,7, 4,3,1,4,5),
    createReturnsTableData('2021', 2,3,7, 9,0, 3,7, 4,3,1,4,5),
    
  ];
  
  export default function ReturnsTable() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell align="right">Jan</TableCell>
              <TableCell align="right">Feb</TableCell>
              <TableCell align="right">Mar</TableCell>
              <TableCell align="right">Apr</TableCell>
              <TableCell align="right">May</TableCell>
              <TableCell align="right">Jun</TableCell>
              <TableCell align="right">Jul</TableCell>
              <TableCell align="right">Aug</TableCell>
              <TableCell align="right">Sep</TableCell>
              <TableCell align="right">Oct</TableCell>
              <TableCell align="right">Nov</TableCell>
              <TableCell align="right">Dec</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.year}
                </TableCell>
                <TableCell align="right">{row.jan}</TableCell>
                <TableCell align="right">{row.feb}</TableCell>
                <TableCell align="right">{row.mar}</TableCell>
                <TableCell align="right">{row.apr}</TableCell>
                <TableCell align="right">{row.may}</TableCell>
                <TableCell align="right">{row.jun}</TableCell>
                <TableCell align="right">{row.jul}</TableCell>
                <TableCell align="right">{row.aug}</TableCell>
                <TableCell align="right">{row.sep}</TableCell>
                <TableCell align="right">{row.oct}</TableCell>
                <TableCell align="right">{row.nov}</TableCell>
                <TableCell align="right">{row.dec}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }