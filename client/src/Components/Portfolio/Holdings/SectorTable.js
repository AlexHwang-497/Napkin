import * as React from 'react';
import PropTypes from 'prop-types';
// import Box from '@material-ui/Box';
// import Collapse from '@material-ui/Collapse';
// import IconButton from '@material-ui/icons/IconButton';
// import { IconButton } from '@material-ui/material'
// import { IconClassKey } from '@material-ui/core/Icon'
import { IconButton } from '@material-ui/core';

// import Table from '@material-ui/Table';
// import TableBody from '@material-ui/TableBody';
// import TableCell from '@material-ui/TableCell';
// import TableContainer from '@material-ui/material/TableContainer';
// import TableHead from '@material-ui/TableHead';
// import TableRow from '@material-ui/TableRow';
// import Typography from '@material-ui/Typography';
// import Paper from '@material-ui/material/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Box, Tab, Typography,Tabs, Collapse, Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Paper,} from '@material-ui/core'
function createData(name, ownership, history ) {
  console.log('this is the name in createData in SectorTabale',name)
  // console.log('this is the sector in createData in SectorTabale',sector)
  console.log('this is the ownership in createData in SectorTabale',ownership)
  
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell  ><img src={historyRow.image} style={{height:'30px',width:'30px'}}/></TableCell>
                      <TableCell >{historyRow.asset}</TableCell>
                      <TableCell >{row.name}</TableCell>
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





export default function SectorTable({ownership,assets,sector,image}) {
  const uniqueSectors={}

  sector.map((s,i)=>{
    if(!uniqueSectors[s]){
      uniqueSectors[s]=[]
    } 
    uniqueSectors[s].push({asset:assets[i],ownership:ownership[i],image:image[i]})
    
  })

  console.log('this is the uniqueSectors',uniqueSectors)


  const individualSectors = Object.keys(uniqueSectors);
  const rows =individualSectors.map((sector,i)=>createData(sector,ownership,uniqueSectors[sector]))
  console.log('individualSectors:',individualSectors)
  console.log('rows:',rows)
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
