import * as React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Box, Tab, Typography,Tabs, Collapse, Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Paper,} from '@material-ui/core'


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function SectorWeightingTable({benchmarkSectorWeighting,portfolioWeighting}) {

  // console.log('[StatisticalSummary.SectorWeightingTable.SectorWeighting',sectorWeighting)
  // console.log('[StatisticalSummary.SectorWeightingTable.SectorWeighting2',sectorWeighting.map((el)=>el.sector))
  console.log('[StatisticalSummary.SectorWeightingTable.portfolioWeighting',portfolioWeighting)
  const sector = benchmarkSectorWeighting.map((el)=>el.sector)
  const weightPercentage = benchmarkSectorWeighting.map((el)=>el.weightPercentage)
  const rows = [
    createData(sector[0],0,weightPercentage[0]),
    createData(sector[1],0,weightPercentage[1]),
    createData(sector[2],0,weightPercentage[2]),
    createData(sector[3],0,weightPercentage[3]),
    createData(sector[4],0,weightPercentage[4]),
    createData(sector[5],0,weightPercentage[5]),
    createData(sector[6],0,weightPercentage[6]),
    createData(sector[7],0,weightPercentage[7]),
    createData(sector[8],0,weightPercentage[8]),
    createData(sector[9],0,weightPercentage[9]),
    createData(sector[10],0,weightPercentage[10]),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Sector</TableCell>
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
