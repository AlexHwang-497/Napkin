import React from 'react';

// import './App.css';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";

import {getData} from '../../../actions/SecuritiesPrice'

function PieGraph({endDate,startDate}) {
  const dispatch = useDispatch();
  const state = useSelector(state => state.SecuritiesPriceReducer)
  console.log('this is the state in PieGraph.js',state)
  // const [num, setNum] = React.useState(5);
  // const aaaa = endDate
  // console.log('this is the endDate or aaaa in PieGraph',endDate)

  const fetchData = (time) => {
    //Fetch data from redux using time
    dispatch(getData({
      time: time,
      endDate: endDate,
      startDate:startDate
      
      // number: num
    }))
  }

  return (
    <div className="PieGraph">
      <div className={"btns-wrapper"}>
        {/* <button onClick={() => fetchData("1min")}>1 Min</button> */}
        {/* <button onClick={() => fetchData("5min")}>5 Min</button> */}
        <button onClick={() => fetchData("15min")}>15 Min</button>

        {/* <input onChange={e => setNum(e.target.value)} /> */}
        {/* {state.loading && <p>Loading...</p>} */}
      </div>
      <div className={"chart-wrapper"}>
        <Pie
          data={state.data}
        />
      </div>
    </div>
  );
}

export default PieGraph;
