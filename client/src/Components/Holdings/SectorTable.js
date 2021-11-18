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
function createData(name, calories, fat, carbs, protein, price) {
  console.log('this is the name in createData in SectorTabale',name)
  console.log('this is the calories in createData in SectorTabale',calories)
  console.log('this is the fat in createData in SectorTabale',fat)
  console.log('this is the carbs in createData in SectorTabale',carbs)
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    history: [
      {
        date: '2020-01-02',
        customerId:'Anonymous',
        amount: 1,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
        {/* <TableCell align="right">{row.calories}</TableCell> */}
        {/* <TableCell align="right">{row.fat}</TableCell> */}
        {/* <TableCell align="right">{row.carbs}</TableCell> */}
        {/* <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Investments
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
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

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.number.isRequired,
        date: PropTypes.number.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};



export default function SectorTable({ownership,assets,sector,image}) {
  const rows = [
    createData(sector[0],ownership[0],assets[0],image[0]),
    createData(sector[1],ownership[1],assets[1],image[1]),
    // createData(sector[2]),ownership[2],assets[2],image[2],
  ];
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            
            {/* <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Portfolio(%)</TableCell>
            <TableCell align="right">Portfolio()(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
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
