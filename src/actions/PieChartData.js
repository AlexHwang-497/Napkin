import axios from "axios";
import moment from "moment";
import {REJECTED_SYMBOL,AWAITING_SYMBOL,SUCCESS_SYMBOL,SUCCESS_SYMBOL_PIE} from '../constants/actionTypes'
import config from "../StockData/config";
import { useEffect,useState } from "react"
import {getPortfolio} from './portfolio'



let cov = require( 'compute-covariance' );
var Finance = require('financejs');
var finance = new Finance();

// *time; will be taken from const fetchData = (time)  in app.js
// *number; represents the number of pieces of data you want from the graph
const api = config.FMP_API_KEY_ID

const startDate='2021-01-01'
const endDate='2021-10-01'

export const PieChartData = ({ stockList, ownership,number}) => async dispatch => {
  const stock =['AMZN']
  // const stockList =['AMZN','AAPL']
  // console.log('time in PieChartData',time)
  // console.log('this is the endDate in PieChartData',endDate)
  // console.log('this is the startDate in PieChartData',startDate)
  console.log('this is the stockList in PieChartData', stockList)
  console.log('this is the ownership in PieChartData', ownership)
  
  try {
    dispatch({
      type: AWAITING_SYMBOL
    })

    const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${stock}?from=${startDate}&to=${endDate}&apikey=${api}`)    
    response.data.historical.reverse()
    
      
    
    console.log('this is the response in PieChartData',response)
    
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
    console.log('this is data from PieChartData',data)
    console.log('this is labels from PieChartData',labels)
    
    console.log('this is the length in PieChartData',number)

    dispatch({
      type: SUCCESS_SYMBOL_PIE,
      payload: {
        data:ownership,
        labels:stockList
      }
    })
  } catch (e) {
    dispatch({
      type: REJECTED_SYMBOL,
    })
  }
}