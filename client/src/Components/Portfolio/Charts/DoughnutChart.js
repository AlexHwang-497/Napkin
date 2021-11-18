import React, {useEffect, useState} from 'react';
import axios from "axios";
import moment from "moment";
// import {REJECTED_SYMBOL,AWAITING_SYMBOL,SUCCESS_SYMBOL} from '../constants/actionTypes'
import config from '../../../StockData/config'
// import './App.css';
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";

function DoughnutChart({sector,assets,ownership}) {
  let cov = require( 'compute-covariance' );
  var Finance = require('financejs');
  var finance = new Finance();
  const apiKey = config.FMP_API_KEY_ID
  const [stockList, setStockList] = useState(assets || ['AAPL'])
  const [stockData,editStockData] = useState([])
  const [stockWeight,setStockWeight]=useState(ownership || [0])
  const [aggregatePortfolio,setAggregatePortfolio]=useState([])

  const [labels,setLabels]=useState(sector || assets)
  const [data,setData]=useState(ownership)

console.log('this is the labels in dougnutChart',labels)
console.log('this is the labels in dougnutChart',sector)
console.log('this is the data in dougnutChart',data)
console.log('this is the data in dougnutChart',ownership)

const finalData = {
    labels: 
      labels
    ,
    datasets: [{
      label: labels,
      data: data,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  
  
  
  return (
    <div className="LineGraph">
      <div className={"btns-wrapper"}>

      </div>
      <div className={"chart-wrapper"}>
        <Doughnut
          data={finalData}          
        />
      </div>
    </div>
  );
}

export default DoughnutChart;
