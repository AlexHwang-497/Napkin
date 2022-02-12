import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid'

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
    // editable: true,
  },
  {
    field: 'ownership',
    headerName: 'Ownership',
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

export default function PortfolioPostTable({dataNeeded}) {
//   const row = dataNeeded.map((entry)=>entry.slice(1).map((el)=>{return{'image':(el.images), 'symbol':el.symbol,'ownership':el.ownership,'id':entry.indexOf(el)}}))[0]
//   console.log('[PortfolioPostTable.dataNeeded',dataNeeded)
// //  < imgsrc={post.image[i]} style={{height:'30px',width:'30px'}}/>
//  console.log('[PortfolioPostTable.row',row)
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        density = 'compact'
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}
