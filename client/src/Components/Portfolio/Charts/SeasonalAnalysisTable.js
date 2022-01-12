import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles';

const columns = [
  { 
    field: 'year',
    align:'center',
    headerAlign: 'center',
  },
  { 
    field: 'jan', 
    type: 'number', 
    width: 100,
    filterable: false,
    align:'center',
    headerAlign: 'center',
    valueFormatter: ({ value }) => value?`${value}%`:'' 
  },
  { 
    field: 'feb', 
    type: 'number', 
    width: 100,  
    filterable: false, 
    align:'center',
    headerAlign: 'center',
    valueFormatter: ({ value }) => value?`${value}%`:'' 
  },
  { 
    field: 'mar', 
    type: 'number', 
    width: 100,  
    filterable: false,
    align:'center',
    headerAlign: 'center',
    valueFormatter: ({ value }) => value?`${value}%`:'' 
  },
  { 
    field: 'apr', 
    type: 'number', 
    width: 100,  
    filterable: false,
    align:'center',
    headerAlign: 'center',
    valueFormatter: ({ value }) => value?`${value}%`:'' 
  },
  { 
    field: 'may', 
    type: 'number', 
    width: 100,  
    filterable: false,
    align:'center',
    headerAlign: 'center',
    valueFormatter: ({ value }) => value?`${value}%`:'' 
  },
  { 
    field: 'jun', 
    type: 'number', 
    width: 100,  
    filterable: false,
    align:'center',
    headerAlign: 'center',
    valueFormatter: ({ value }) => value?`${value}%`:'' 
  },
  { 
    field: 'jul', 
    type: 'number', 
    width: 100,  
    filterable: false,
    align:'center',
    headerAlign: 'center',
    valueFormatter: ({ value }) => value?`${value}%`:'' 
  },
  { 
    field: 'aug', 
    type: 'number', 
    width: 100,  
    filterable: false,
    align:'center',
    headerAlign: 'center',
    valueFormatter: ({ value }) => value?`${value}%`:'' 
  },
  { 
    field: 'sep', 
    type: 'number', 
    width: 100,  
    filterable: false,
    align:'center',
    headerAlign: 'center',
    valueFormatter: ({ value }) => value?`${value}%`:'' 
  },
  { 
    field: 'oct', 
    type: 'number', 
    width: 100,  
    filterable: false,
    align:'center',
    headerAlign: 'center',
    valueFormatter: ({ value }) => value?`${value}%`:'' 
  },
  { 
    field: 'nov', 
    type: 'number', 
    width: 100,  
    filterable: false,
    align:'center',
    headerAlign: 'center',
    valueFormatter: ({ value }) => value?`${value}%`:'' 
  },
  { 
    field: 'dec', 
    type: 'number', 
    width: 100,  
    filterable: false,
    align:'center',
    headerAlign: 'center',
    valueFormatter: ({ value }) => value?`${value}%`:'' 
  },
];


const useStyles = makeStyles({
  root: {
    '& .cold': {
      backgroundColor: '#CD363A',
      color: '#FFFFFF',
    },
    '& .hot': {
      // backgroundColor: '#66DA26',
      backgroundColor: '#1B8270',
      color: '#FFFFFF',
    },
  },
});

const monthMap={
    '01':'jan',
    '02':'feb',
    '03':'mar',
    '04':'apr',
    '05':'may',
    '06':'jun',
    '07':'jul',
    '08':'aug',
    '09':'sep',
    '10':'oct',
    '11':'nov',
    '12':'dec',
  }


const organizeByYear=(arr) => {
    console.log('[SeasonalAnalysisTable.organizeByYear.arr',arr)
    if(!arr || arr.length===0) return;
    const obj ={}
    obj.year=arr[0]
    for(let i=1; i<arr.length;i++){
      // console.log('[SeasonalAnalysisTable.organizeByYear.arr[i]',arr[i])
  
      let currentMonth = arr[i].date.split('-')[1]
      obj[monthMap[currentMonth]]=Number(arr[i].value*100).toFixed(1)
      obj.id=arr[0]
    }
    console.log('[SeasonalAnalysisTable.organizeByYear.obj',obj)
    return obj
  
  }
  const formatNumber = (num) => {
    num.replace('%','')
    return parseFloat(num)

  }

export default function SeasonalAnalysisTable({data, lessNumber, greaterNumber}) {
    let obj ={}
    const classes = useStyles();
    console.log('[SeasonalAnalysisTable.data',data)
    // let updatedData = data.map((el,i)=>{return{'id':i,el}})
    
    // console.log('[SeasonalAnalysisTable.updatedData',updatedData)
    // console.log('[returnsTable.SeasonalAnalysisTable.data',data)
    const filteredData = data.filter((el)=>{return el.length>1})
    console.log('[SeasonalAnalysisTable.filteredData',filteredData)
    // console.log('[returnsTable.SeasonalAnalysisTable.filteredData',filteredData)
    let newData = filteredData.map((year)=>{
        const row = organizeByYear(year)
        return row
    })
    console.log('[SeasonalAnalysisTable.newData',newData)
    console.log('[SeasonalAnalysisTable.greaterNumber',greaterNumber)
    // console.log('[returnsTable.SeasonalAnalysis.newData',newData)
    
  return (
    <div className='stripedTable'>

      <div style={{ height: 410, width: '100%' }} className={classes.root}>
        <DataGrid
          density='compact'
          rows={newData}
          columns={columns}
          // columnBuffer={2} 
          // columnThreshold={2}
          getCellClassName={(params) => {
            if (params.field === 'year') {
              return '';
            }
            // return params.value >= greaterNumber/100 || params.value <lessNumber/100 ? 'hot' : 'cold';
            if(greaterNumber && parseFloat(params.value) >= formatNumber(greaterNumber)){
              return 'hot'
            } else if(lessNumber && parseFloat(params.value) <=formatNumber(lessNumber)){
              return 'cold'
            } else {
              return 
            }
          }}
        />
      </div>
    </div>
  );
}
