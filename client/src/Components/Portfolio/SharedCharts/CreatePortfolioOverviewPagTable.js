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

  {
    field: "image",
    headerName: "",
    width: 20,
    // height: 100,
    renderCell: (params) => <img src={params.value}  style={{height:'30px',width:'30px'}}/>
  },
  {
    field: 'symbol',
    headerName: 'Symbol',
    width: 130,
    editable: false,
  },
  {
    field: 'sector',
    headerName: 'Sector',
    width: 120,
    // flex:1
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
  {
    field: 'alpha',
    headerName: 'Alpha',
    type: 'number',
    width: 150,
    // editable: true,
  },
  
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
    'ownership':Number(entry.ownership).toFixed(2)+'%',
    'cumulativeReturn':Number(entry.finalCumulativeReturn*100).toFixed(2)+'%',
    'annualizedReturn':Number(entry.annualizedReturn).toFixed(2)+'%',
    'priceStdv':'$'+Number(entry.priceStDev).toFixed(2),
    'returnStd':Number(entry.returnStDev*100).toFixed(2)+'%',
    'beta':Number(entry.beta).toFixed(2),
    'alpha':Number(entry.alpha*100).toFixed(2)+'%'
    
  }}).slice(1)
  console.log('[PortfolioOverviewPagTable.row',row)
//  console.log('[PortfolioPostTable.row',row)
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        density = 'compact'
        
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
