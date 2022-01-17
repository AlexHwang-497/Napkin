import * as React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Box, Tab, Typography,Tabs, Collapse, Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Paper, styled} from '@material-ui/core'

function createData(name, ownership, history ) {
  return {
    name,
    ownership,
    history,
  };
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



function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={{background:"#091F3C"}}>
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
                <TableHead style={{background:"#1B8270"}}>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Symbol</TableCell>
                    
                    <TableCell >Portfolio(%)</TableCell>
                    <TableCell >CumReturn(%)</TableCell>
                    <TableCell >AnnReturn(%)</TableCell>
                    <TableCell >PriceStdDev($)</TableCell>
                    <TableCell >RetStdDev(%)</TableCell>
                    <TableCell >Beta</TableCell>
                    <TableCell >Alpha</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <StyledTableRow key={historyRow.date}>
                      <TableCell  ><img src={historyRow.image} style={{height:'30px',width:'30px'}}/></TableCell>
                      <TableCell >{historyRow.asset}</TableCell>
                      {/* <TableCell >{row.name}</TableCell> */}
                      <TableCell >{historyRow.ownership}%</TableCell>
                      <TableCell >{Number(historyRow.cumulativeReturn*100).toFixed(2)}%</TableCell>
                      <TableCell >{historyRow.annualizedReturn}%</TableCell>
                      <TableCell >${historyRow.priceStdDev}</TableCell>
                      <TableCell >{historyRow.returnStdDev}%</TableCell>
                      <TableCell >{historyRow.beta}</TableCell>
                      <TableCell >{historyRow.alpha}%</TableCell>
                    </StyledTableRow>
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
  const pracs = data[dateIndex].map((el,i)=>{return {
    asset:el.symbol,
    ownership:el.ownership,
    image:el.images,
    annualizedReturn:el.annualizedReturn,
    cumulativeReturn:el.finalCumulativeReturn,
    alpha:Number(el.alpha*100).toFixed(2),
    beta:Number(el.beta).toFixed(2),
    returnStdDev:Number(el.returnStDev*100).toFixed(2),
    priceStdDev:Number(el.priceStDev).toFixed(2)

  }}).slice(1)
  console.log('[SectorTable.pracs',pracs)


  dataNeeded.map((s,i)=>{
    if(!uniqueSectors[s]){
      uniqueSectors[s]=[]
    } 
    // uniqueSectors[s].push({asset:assets[i],ownership:ownership[i],image:image[i]})
    uniqueSectors[s].push(pracs[i])
    
  })
  // sector.map((s,i)=>{
  //   if(!uniqueSectors[s]){
  //     uniqueSectors[s]=[]
  //   } 
  //   uniqueSectors[s].push({asset:assets[i],ownership:ownership[i],image:image[i]})
  //   // uniqueSectors[s].push(dataNeeded)
    
  // })

  console.log('[SectorTable.uniqueSectors',uniqueSectors)


  const individualSectors = Object.keys(uniqueSectors);
  console.log('[SectorTable.individualSectors:',individualSectors)
  const rows =individualSectors.map((sector,i)=>createData(sector,ownership,uniqueSectors[sector]))
  console.log('[SectorTable.rows:',rows)
  // const rows =individualSectors.map((sector,i)=>createData(sector,ownership,uniqueSectors[sector]))
  
  return (
    
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" >
        <TableHead >
          <TableRow >
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody >
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
