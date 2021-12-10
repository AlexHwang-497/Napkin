import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({

  dataGrid: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    // border: 0,
    // color: "white",
    // height: 48,
    padding: "0 30px",
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    width: "100"
   }
 });
const columns = [
  // { field: 'id', headerName: 'ID', width: 90 },
  // {
  //   field: 'image',
  //   headerName: '',
  //   width: 150,
  //   // editable: true,
  //   renderCell: (params) => <img src={params.value} style={{height:'30px',width:'30px'}} />,
    
  // },
  {
    field: "image",
    headerName: "",
    width: 50,
    // height: 100,
    renderCell: (params) => <img src={params.value}  style={{height:'30px',width:'30px'}}/>
  },
  {
    field: 'symbol',
    headerName: 'Symbol',
    width: 150,
    editable: false,
  },
  {
    field: 'sector',
    headerName: 'Sector',
    width: 150,
    // editable: true,
  },
  {
    field: 'ownership',
    headerName: 'Portfolio(%)',
    type: 'number',
    width: 150,
    // editable: true,
  },
  {
    field: 'cumulativeReturn',
    headerName: 'Cumulative Return(%)',
    type: 'number',
    width: 150,
    // editable: true,
  },
  {
    field: 'annualizedReturn',
    headerName: 'Annualized Return(%)',
    type: 'number',
    width: 150,
    // editable: true,
  },
  {
    field: 'priceStdv',
    headerName: 'Price StdDev($)',
    type: 'number',
    width: 150,
    // editable: true,
  },
  {
    field: 'returnStd',
    headerName: 'Return StdDev(%)',
    type: 'number',
    width: 150,
    // editable: true,
  },
  {
    field: 'beta',
    headerName: 'Beta',
    type: 'number',
    width: 150,
    // editable: true,
  },
  
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 1, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 1, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 1, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 1, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 1, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
];

export default function PortfolioOverviewPagTable({dataNeeded}) {
  console.log('[PortfolioOverviewPagTable.dataNeeded',dataNeeded)
  const classes = useStyles();
  // const row = dataNeeded.map((entry)=>entry.map((el)=>{return{'image':(el.images), 'symbol':el.symbol,'ownership':el.ownership,'id':entry.indexOf(el)}}))
  const row =dataNeeded.map((entry)=>{return {
    'id':Math.random(),
    'image':entry.images,
    'symbol':entry.symbol,
    'sector':entry.sector,
    'ownership':Number(entry.ownership).toLocaleString()+'%',
    'cumulativeReturn':Number(entry.finalCumulativeReturn*100),
    'annualizedReturn':Number(entry.annualizedReturn),
    'priceStdv':Number(entry.priceStDev),
    'returnStd':Number(entry.returnStDev),
    'beta':entry.beta
  }}).slice(1)
  console.log('[PortfolioOverviewPagTable.row',row)
//  console.log('[PortfolioPostTable.row',row)
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoHeight={true}
        isableExtendRowFullWidth={true}
        autoHeight={true}
      disableExtendRowFullWidth={true}
      
      
      className={classes.dataGrid}
      />
    </div>
  );
}
