import axios from "axios";
import moment from "moment";
import {REJECTED_SYMBOL,AWAITING_SYMBOL,SUCCESS_SYMBOL} from '../constants/actionTypes'


// *time; will be taken from const fetchData = (time)  in app.js
// *number; represents the number of pieces of data you want from the graph
const api = 'f69c6a774b0cfb6186868a361929fd36'
const startDate='2020-01-01'
const endDate='2021-10-01'

export const getData = ({ time, number }) => async dispatch => {
  const stock =['AAPL']
  console.log('time in getData',time)
  try {
    dispatch({
      type: AWAITING_SYMBOL
    })

    // const response = await axios.get(`https://financialmodelingprep.com/${api}/v3/historical-chart/${time}/BTCUSD`)
    // const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/${time}/BTCUSD?apikey=f69c6a774b0cfb6186868a361929fd36`)
    // const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/1min/${time}?apikey=f69c6a774b0cfb6186868a361929fd36`)
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${stock}?from=${startDate}&to=${endDate}&apikey=${api}`)    
    // console.log('this is the response in getData',response.data.historical.reverse()[0].close)
    // console.log('this is the response in getData',response.data.historical.reverse()[0].date)
    console.log('this is the response in getData',response)

    const labels = [];
    const data = [];
    for (let i = 0; i < response.data.historical.length; i++) {
      // data.unshift(response.data[i].close)
      // labels.unshift(moment(response.data[i].date).format("LT"))
      data.push(response.data.historical[i].close)
      labels.push(response.data.historical[i].date)

      if (i === (number - 1)) {
        break;
      }
    }
    console.log('this is data from getData',data)
    console.log('this is labels from getData',labels)

    dispatch({
      type: SUCCESS_SYMBOL,
      payload: {
        data,
        labels,
        stock
      }
    })
  } catch (e) {
    dispatch({
      type: REJECTED_SYMBOL,
    })
  }
}
