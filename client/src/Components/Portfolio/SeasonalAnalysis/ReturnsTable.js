import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const monthMap={
  '01':'jan',
  '02':'feb',
  '03':'mar',
  '04':'apr',
  '05':'may',
  '06':'jun',
  '07':'jul',
  '08':'aug',
  '09':'sep',
  '10':'oct',
  '11':'nov',
  '12':'dec',
}
const organizeByYear=(arr) => {
  console.log('[returnsTable.organizeByYear.arr',arr)
  if(!arr || arr.length===0) return;
  const obj ={}
  obj.year=arr[0]
  for(let i=1; i<arr.length;i++){
    // console.log('[returnsTable.organizeByYear.arr[i]',arr[i])

    let currentMonth = arr[i].date.split('-')[1]
    obj[monthMap[currentMonth]]=Number.parseFloat(arr[i].value*100).toPrecision(2)+'%'
  }
  console.log('[returnsTable.organizeByYear.obj',obj)
  return obj

}
// Number.parseFloat(annualizedReturn*100).toPrecision(4)
function createReturnsTableData(year, jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec) {
    return { year, jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec };
  }
  
  export default function ReturnsTable({data=[[]],dataNeeded=[[]]}) {
    // console.log('[returnsTable.data',data.filter((el)=>{return el.length>1}))
    
    let filteredData = data.filter((el)=>{return el.length>1})
    

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
            {filteredData.map((year) =>{
              const row=organizeByYear(year)
              
              return (
              <TableRow
                key={row.year}
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
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }