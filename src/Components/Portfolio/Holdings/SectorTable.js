import * as React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Box, Tab, Typography,Tabs, Collapse, Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Paper,} from '@material-ui/core'
function createData(name, ownership, history ) {
  return {
    name,
    ownership,
    history,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Symbol</TableCell>
                    <TableCell >Sector</TableCell>
                    <TableCell >Portfolio(%)</TableCell>
                    <TableCell >CumulativeReturn(%)</TableCell>
                    <TableCell >AnnualizedReturn(%)</TableCell>
                    <TableCell >AnnualizedReturn(%)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell  ><img src={historyRow.image} style={{height:'30px',width:'30px'}}/></TableCell>
                      <TableCell >{historyRow.asset}</TableCell>
                      {/* <TableCell >{row.name}</TableCell> */}
                      <TableCell >{historyRow.ownership}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}





export default function SectorTable({ownership,assets,sector,image, data,dateIndex }) {
  const uniqueSectors={}
  console.log('[SectorTable.data',data[dateIndex])
  const dataNeeded = data[dateIndex].map((el,i)=>el.sector).slice(1)
  console.log('[SectorTable.dataNeeded',dataNeeded)
  console.log('[SectorTable.sector',sector)
  const pracs = dataNeeded
  console.log('[SectorTable.pracs',pracs)


  sector.map((s,i)=>{
    if(!uniqueSectors[s]){
      uniqueSectors[s]=[]
    } 
    uniqueSectors[s].push({asset:assets[i],ownership:ownership[i],image:image[i]})
    // uniqueSectors[s].push(dataNeeded)
    
  })

  console.log('[SectorTable.uniqueSectors',uniqueSectors)


  const individualSectors = Object.keys(uniqueSectors);
  const rows =individualSectors.map((sector,i)=>createData(sector,ownership,uniqueSectors[sector]))
  console.log('[SectorTable.individualSectors:',individualSectors)
  console.log('[SectorTable.rows:',rows)
  // createData(name,ownership[2],assets[2],image[2],
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
