import * as React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Box, Tab,styled, Typography,Tabs, Collapse, Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Paper,} from '@material-ui/core'


function createData(sector, portfolio, benchmark, delta) {
  return { sector, portfolio, benchmark, delta };
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

export default function SectorWeightingTable({benchmarkSectorWeighting,portfolioWeighting}) {

  // console.log('[StatisticalSummary.SectorWeightingTable.SectorWeighting',sectorWeighting)
  // console.log('[StatisticalSummary.SectorWeightingTable.SectorWeighting2',sectorWeighting.map((el)=>el.sector))
  console.log('[StatisticalSummary.SectorWeightingTable.portfolioWeighting',portfolioWeighting)
  const weightingObj = portfolioWeighting.reduce((obj,el)=>({...obj,[el.sector]:el.value}),{})

  console.log('[StatisticalSummary.SectorWeightingTable.weightingObj',weightingObj)
  console.log('[StatisticalSummary.SectorWeightingTable.benchmarkSectorWeighting',benchmarkSectorWeighting)
  const sector = benchmarkSectorWeighting.map((el)=>el.sector)
  const weightPercentage = benchmarkSectorWeighting.map((el)=>el.weightPercentage)
  const benchMarkMap = benchmarkSectorWeighting.map((el,i)=>el)
  console.log('[StatisticalSummary.SectorWeightingTable.benchMarkMap',benchMarkMap)
  // const rows = [
  //   createData(sector[0],weightingObj[sector[0]]?weightingObj[sector[0]]:0,weightPercentage[0],(weightingObj[sector[0]]?weightingObj[sector[0]]:0)-parseInt(weightPercentage[0])), //*real estate
  //   createData(sector[1],weightingObj[sector[1]]?weightingObj[sector[1]]:0,weightPercentage[1],(weightingObj[sector[1]]?weightingObj[sector[1]]:0)-parseInt(weightPercentage[1])), //* consumer cyclica
  //   createData(sector[2],weightingObj[sector[2]]?weightingObj[sector[2]]:0,weightPercentage[2],(weightingObj[sector[2]]?weightingObj[sector[2]]:0)-parseInt(weightPercentage[2])), //* basic mateirals
  //   createData(sector[3],weightingObj[sector[3]]?weightingObj[sector[3]]:0,weightPercentage[3],(weightingObj[sector[3]]?weightingObj[sector[3]]:0)-parseInt(weightPercentage[3])), //* consumer defensive
  //   createData(sector[4],weightingObj[sector[4]]?weightingObj[sector[4]]:0,weightPercentage[4],(weightingObj[sector[4]]?weightingObj[sector[4]]:0)-parseInt(weightPercentage[4])), //* technology
  //   createData(sector[5],weightingObj[sector[5]]?weightingObj[sector[5]]:0,weightPercentage[5],(weightingObj[sector[5]]?weightingObj[sector[5]]:0)-parseInt(weightPercentage[5])), //* comunication services
  //   createData(sector[6],weightingObj[sector[6]]?weightingObj[sector[6]]:0,weightPercentage[6],(weightingObj[sector[6]]?weightingObj[sector[6]]:0)-parseInt(weightPercentage[6])), //* financail services
  //   createData(sector[7],weightingObj[sector[7]]?weightingObj[sector[7]]:0,weightPercentage[7],(weightingObj[sector[7]]?weightingObj[sector[7]]:0)-parseInt(weightPercentage[7])), //* utilites
  //   createData(sector[8],weightingObj[sector[8]]?weightingObj[sector[8]]:0,weightPercentage[8],(weightingObj[sector[8]]?weightingObj[sector[8]]:0)-parseInt(weightPercentage[8])), //* indiustrials
  //   createData(sector[9],weightingObj[sector[9]]?weightingObj[sector[9]]:0,weightPercentage[9],(weightingObj[sector[9]]?weightingObj[sector[9]]:0)-parseInt(weightPercentage[9])), //* energy
  //   createData(sector[10],weightingObj[sector[10]]?weightingObj[sector[10]]:0,weightPercentage[10],(weightingObj[sector[10]]?weightingObj[sector[10]]:0)-parseInt(weightPercentage[10])), //* healthcare
  // ];

  const rows = benchmarkSectorWeighting.map((el,i)=>
  createData(el.sector,(weightingObj[sector[i]]?weightingObj[sector[i]]:0),el.weightPercentage))
    

  
  console.log('[StatisticalSummary.SectorWeightingTable.rows',rows)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
      <TableHead style={{background:"#819ca9"}}>
          <TableRow>
            <TableCell>Sector</TableCell>
            <TableCell>Portfolio</TableCell>
            <TableCell align="left">Benchmark</TableCell>
            <TableCell align="left">Delta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.sector}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.sector}
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
