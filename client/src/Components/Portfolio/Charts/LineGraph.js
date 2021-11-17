import React, {useEffect, useState} from 'react';
import axios from "axios";
import moment from "moment";
// import {REJECTED_SYMBOL,AWAITING_SYMBOL,SUCCESS_SYMBOL} from '../constants/actionTypes'
import config from '../../../StockData/config'
// import './App.css';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";

// import {getData} from '../../../actions/SecuritiesPrice'
const getData = async (number, endDate,startDate,setData,setLabels) =>  {
  const stock =['AMZN']
  // const stockList =['AMZN','AAPL']
  
  const api = config.FMP_API_KEY_ID
  console.log('this is the endDate in getData',endDate)
  console.log('this is the startDate in getData',startDate)
  
  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${stock}?from=${startDate}&to=${endDate}&apikey=${api}`)
    response.data.historical.reverse()
    
      
    
    console.log('this is the response in getData',response)
    
    const labels = [];
    const data = [];
    // ! talk to carlos in more detail about this
    number = response.data.historical.length
    for (let i = 0; i < response.data.historical.length; i++) {
      
      data.push(response.data.historical[i].close)
      labels.push(response.data.historical[i].date)

      if (i === (number - 1)) {
        break;
      }
    }
    setData(data)
    setLabels(labels)
    
      
    

  } catch (e) {
    
  }
}
function LineGraph({endDate,startDate,assets,ownership}) {

  const [labels,setLabels]=useState([1,2,3])
  const [data,setData]=useState([4,5,6])

  // const [num, setNum] = React.useState(5);
  // const aaaa = endDate
  // console.log('this is the endDate or aaaa in LineGraph',endDate)
  useEffect(()=>{
    // const getData = async (endDate,startDate,setData,setLabels) =>  {
    getData(0,endDate,startDate,setData,setLabels)


  },[])
  
  const finalData = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: data,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  
  
  

  return (
    <div className="LineGraph">
      <div className={"btns-wrapper"}>
  
  
  

        {/* <input onChange={e => setNum(e.target.value)} /> */}
        {/* {state.loading && <p>Loading...</p>} */}
      </div>
      <div className={"chart-wrapper"}>
        <Line
          data={finalData}
          
        />
      </div>
    </div>
  );
}

export default LineGraph;
