import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles,createStyles } from '@material-ui/core/styles';




const useStyles = makeStyles({

  dataGrid: {
    
    root: {
      "& .MuiDataGrid-renderingZone": {
        "& .MuiDataGrid-row": {
          "&:nth-child(2n)": { 
            backgroundColor: "rgba(235, 235, 235, .7)" 
          }
        }
      }
    }
    
    

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
    width: 20,
    background:'#819ca9',
    color: "white",
    align:'left',
    headerAlign: 'left',
    // height: 100,
    renderCell: (params) => <img src={params.value}  style={{height:'30px',width:'30px'}}/>
  },
  {
    field: 'symbol',
    headerName: 'Symbol',
    width: 130,
    editable: false,
    align:'left',
    headerAlign: 'left',
    
  },
  {
    field: 'sector',
    headerName: 'Sector',
    width: 120,
    align:'left',
    headerAlign: 'left',
    // flex:1
    // editable: true,
  },
  {
    field: 'ownership',
    headerName: 'Portfolio(%)',
    type: 'number',
    width: 150,
    align:'left',
    headerAlign: 'left',
    // editable: true,
  },
  {
    field: 'cumulativeReturn',
    headerName: 'Cumulative Return(%)',
    type: 'number',
    width: 150,
    align:'left',
    headerAlign: 'left',
    // editable: true,
  },
  {
    field: 'annualizedReturn',
    headerName: 'Annualized Return(%)',
    type: 'number',
    width: 150,
    align:'left',
    headerAlign: 'left',
    // editable: true,
  },
  {
    field: 'priceStdv',
    headerName: 'Price StdDev($)',
    type: 'number',
    width: 150,
    align:'left',
    headerAlign: 'left',
    // editable: true,
  },
  {
    field: 'returnStd',
    headerName: 'Return StdDev(%)',
    type: 'number',
    width: 150,
    align:'left',
    headerAlign: 'left',
    // editable: true,
  },
  {
    field: 'beta',
    headerName: 'Beta',
    type: 'number',
    width: 150,
    align:'left',
    headerAlign: 'left',
    // editable: true,
  },
  {
    field: 'alpha',
    headerName: 'Alpha',
    type: 'number',
    width: 150,
    headerAlign: 'left',
    align:'left',
    
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

export default function PortfolioOverviewPagTable({dataNeeded,chartLabel}) {
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
    <div className='stripedTable' style={{ height: 400, width: '100%' }} >
     
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
