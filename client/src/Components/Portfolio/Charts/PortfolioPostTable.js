import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid'

const columns = [
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
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
];

export default function PortfolioPostTable({data}) {
  // if(!data || data.length===0 || data[0]===undefined) return 
    console.log('[PortfolioPostTable.dataNeeded',data.assets)

    let obj = {}
    obj.symbol=data.assets.map((el)=>el)
    obj.images=data.image
    obj.ownership=data.ownership
    console.log('[PortfolioPostTable.obj',obj)
    console.log('[PortfolioPostTable.obj.map',obj.symbol.map((el,i)=>{return {'id':i,'symbol':el, 'images':obj.images[i],'ownership':obj.ownership[i]}}))
    const row = obj.symbol.map((el,i)=>{return {'id':i,'symbol':el, 'image':obj.images[i],'ownership':obj.ownership[i]}})
  return (
    <div style={{ height: 350 }}>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // disableSelectionOnClick
      />
    </div>
  );
}
