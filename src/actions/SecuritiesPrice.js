// import axios from "axios";
// import moment from "moment";
// import {REJECTED_SYMBOL,AWAITING_SYMBOL,SUCCESS_SYMBOL} from '../constants/actionTypes'
// import config from "../StockData/config";
// import { useEffect,useState } from "react"



// let cov = require( 'compute-covariance' );
// var Finance = require('financejs');
// var finance = new Finance();

// // *time; will be taken from const fetchData = (time)  in app.js
// // *number; represents the number of pieces of data you want from the graph
// const api = config.FMP_API_KEY_ID

// // const startDate='2021-01-01'
// // const endDate='2021-10-01'

// export const getData = ({ time, number,endDate,startDate }) => async dispatch => {
//   const stock =['AMZN']
//   const stockList =['AMZN','AAPL']
//   console.log('time in getData',time)
//   console.log('this is the endDate in getData',endDate)
//   console.log('this is the startDate in getData',startDate)
  
//   try {
//     dispatch({
//       type: AWAITING_SYMBOL
//     })

//     const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${stock}?from=${startDate}&to=${endDate}&apikey=${api}`)    
//     response.data.historical.reverse()
    
      
    
//     console.log('this is the response in getData',response)
    
//     const labels = [];
//     const data = [];
//     // ! talk to carlos in more detail about this
//     number = response.data.historical.length
//     for (let i = 0; i < response.data.historical.length; i++) {
      
//       data.push(response.data.historical[i].close)
//       labels.push(response.data.historical[i].date)

//       if (i === (number - 1)) {
//         break;
//       }
//     }
//     console.log('this is data from getData',data)
//     console.log('this is labels from getData',labels)
    
//     console.log('this is the length in getDAta',number)

//     dispatch({
//       type: SUCCESS_SYMBOL,
//       payload: {
//         data,
//         labels,
//         stock,
//         number
//       }
//     })
//   } catch (e) {
//     dispatch({
//       type: REJECTED_SYMBOL,
//     })
//   }
// }