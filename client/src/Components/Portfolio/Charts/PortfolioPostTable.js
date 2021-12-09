import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid'

const columns = [
  // { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'image',
    headerName: '',
    width: 150,
    editable: true,
  },
  {
    field: 'symbol',
    headerName: 'Symbol',
    width: 150,
    editable: true,
  },
  {
    field: 'ownership',
    headerName: 'Ownership',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    // field: 'fullName',
    // headerName: 'Full name',
    // description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    // width: 160,
    // valueGetter: (params) =>
    //   `${params.getValue(params.id, 'firstName') || ''} ${
    //     params.getValue(params.id, 'lastName') || ''
    //   }`,
  },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 1, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 1, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 1, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 1, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 1, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
// ];

export default function PortfolioPostTable({dataNeeded}) {
  console.log('[PortfolioPostTable.dataNeeded',dataNeeded)
 const row = dataNeeded.map((entry)=>entry.slice(1).map((el)=>{return{'image':(el.images), 'symbol':el.symbol,'ownership':el.ownership,'id':entry.indexOf(el)}}))[0]
//  < imgsrc={post.image[i]} style={{height:'30px',width:'30px'}}/>
 console.log('[PortfolioPostTable.row',row)
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
