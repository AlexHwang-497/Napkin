import React, {useEffect, useState} from 'react';
import axios from "axios";
import moment from "moment";
// import {REJECTED_SYMBOL,AWAITING_SYMBOL,SUCCESS_SYMBOL} from '../constants/actionTypes'
import config from './config'
// import './App.css';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";

function FetchStockPrices({assets}) {
  
  let cov = require( 'compute-covariance' );
  const startDate='2011-11-01'
  const endDate='2021-11-01'
  var Finance = require('financejs');
  const ownership=[20,20,20,20,20]
  var finance = new Finance();
  const apiKey = config.FMP_API_KEY_ID
  const [stockList, setStockList] = useState(['SPY','QQQ','TEAM','ASAN','NFLX'] || ['AAPL'])
  const [stockData,editStockData] = useState([])
  const [stockWeight,setStockWeight]=useState([20,20,20,20,20] || [0])
  const [aggregatePortfolio,setAggregatePortfolio]=useState([])

  const [labels,setLabels]=useState([])
  const [data,setData]=useState([])
  const [spx,setSpx]=useState([])
  const [ndx,setNdx]=useState([])
  const [dailyPrices,setDailyPrices]=useState([])

    
  useEffect(() => {
    Promise.all(
    stockList.map((stock) =>
    fetch(
    // `https://financialmodelingprep.com/api/v3/historical-price-full/${stock}?from=${startDate}&to=${endDate}&apikey=${apiKey}`)))
    `https://financialmodelingprep.com/api/v4/historical-price-adjusted/${stock}/1/month/${startDate}/${endDate}?apikey=${apiKey}`)))
    .then((results) =>
        Promise.all(results.map((res) => res.json())).then((stocks) => {
        editStockData(stocks);
        
    })
    );
  }, []);
  // console.log('this is in stockData of FetchStockPrices',stockData)
// ! this useEffect will cacluate our date range 
  useEffect(()=>{
    let aggCompanyDates=[]
    for(let j=0;j<stockList.length;j++){
      let companyDates=[]
      let historicalDates =stockData[j]?.results?.reverse() || []
      for(let i=0; i<historicalDates.length;i++){
        companyDates.push(historicalDates[i].formated.split(' ')[0])
      }
      aggCompanyDates.push(companyDates)
      // console.log('this is the companyDates in fetchStockPrices',companyDates)
    }
    aggCompanyDates.sort()
    let dateArrayNeeded =aggCompanyDates[0] 

    console.log('this is the aggCompanyDates  fetchStockPrices',aggCompanyDates)
    console.log('this is the starting date in fetchStockPrices',dateArrayNeeded)
    console.log('this is the starting date in fetchStockPrices',dateArrayNeeded[dateArrayNeeded.length-1])
    
    
    
  },[stockList])
  
  useEffect(()=> {
    // *this array will store all of the daily % collected
    let arrCumReturn=[]
    // *this array will store all of the daily prices collected
    let arrOfAggOfDailyPrices=[]
    // *this array will store all the individual stock's $10k/growth values in ($)
    let totalPortfolioValue=[]
    // *this array will store the sum of all the invidviual stocks $10k/growth values in ($) aka it will take all the sub arrays and add them together
    let aggregatePortfolioValue=[]
    // *this array will be utilized to store the indivudal annualized returns of each stock

    if(stockData.length===0) return;

    // *iterate through the stoclist
    for(let j=0;j<stockList.length;j++){
        const historicalData = stockData[j]?.results?.reverse() || []
        // *this array is utilzied for storing the cumulative return of the current stock that the loop is going through
        let currentStock =[]
        //* this array is utilized for storing the daily prices of a stock
        let arrOfDailyPrices=[]
        // *this array is utilized for storing the shares utilized/assiting in the calculation of the $10k growth
        let portfolioShares=[]
        // *this arryay is utilzied to store the $ amounts of each $10k growth
        let stockValue = []
        // *this sum will be utilized an variable that tracks the cumulative of the cumulative return
        let sum = 0
        let openSum=0
        //todo: we are calculating the average, the cumulative return and attain prices
        for(let i=1; i<historicalData.length;i++){
            let startingPrice = historicalData[0].o
            
            let cumReturn = historicalData[i].o/historicalData[i-1].o-1
            // *this calculates the number of shares for growth 10k
            if(portfolioShares.length===0){
                // *setup initial shares
                portfolioShares.push(10000/historicalData[i].o)
                // *setup intial investment of 10k
                stockValue.push(10000*stockWeight[j]/100)
            } else {    
                let previousShare = portfolioShares[i-2]
                
                // *coumpounding shares
                portfolioShares.push(previousShare*(1+cumReturn))
                // *growth for 10k
                stockValue.push((historicalData[i].o*portfolioShares[i-1]*ownership[j]/100)).toFixed(2)
              }
              // *pushing values for cumulative return array; we need this for covariance
              currentStock.push(cumReturn)
              sum +=cumReturn
              openSum+=historicalData[i].o
              arrOfDailyPrices.push(historicalData[i].o)
            }
        // *this is the array of all individual companies growth values aka $10k
        totalPortfolioValue.push(stockValue)
        // *this is the array of all individual companies stock prices
        arrOfAggOfDailyPrices.push(arrOfDailyPrices)



        // *push daily return values into array for covariance
        let finalCumulativeReturn =currentStock[currentStock.length-1]/currentStock[0]-1
        arrCumReturn.push(currentStock)
        let stockEndingGrowthValue = stockValue[stockValue.length-1]
        let n = historicalData.length-1
        // console.log('annualized return formula:', finance.CAGR(10000, stockEndingGrowthValue,n/12 ))

        
        let average =openSum/historicalData.length
        // console.log('symbol:',stockList[j],'average: ', average,"sum",sum,'openSum',openSum)
        // *used for calcuating stdDev
        let xMean= 0
        let xMean2= 0
        // todo: this is calculating stdDev
        for(let i=1; i<historicalData.length;i++){

                xMean+=historicalData[i].open-average
                xMean2+=Math.pow(historicalData[i].open-average,2)
                // console.log(cumReturn)
                // console.log('i:',i,'date:',historicalData[i].date,'open:',historicalData[i].open,'average',average,'xMean',xMean,'xMean^2',xMean2)
            }
        let stdDev=Math.sqrt(xMean2/n)
        // console.log('Symbol',stockList[j],'stdDev',stdDev,'xMean',xMean,'xMean^2',xMean2)
        // console.log('COVARIANCE for:',stockList[j],cov(arrCumReturn[0],arrCumReturn[j]))
        // *this creates our dates
        let dates =[]
        for (let i=0; i<historicalData.length;i++){
          dates.push(historicalData[i].formated.split(' ')[0])
          
        }
        setLabels(dates)
        setDailyPrices([dates.slice(1,dates.length),arrOfDailyPrices])
    }
    
    // console.log(arrCumReturn)
    // console.log('this is the totalPortfolioValue',totalPortfolioValue)
    // aggregatePortfolioValue



    // *calculaitng the aggetae portfolio value
    for(let i=0;i<totalPortfolioValue[0].length;i++){
        let sum=0
      for(let j=0;j<totalPortfolioValue.length;j++){
        sum+=totalPortfolioValue[j][i]
      }
      aggregatePortfolioValue.push(sum)
    }
    
    // console.log('this is the date array of FetchStockPrices',labels)
    // console.log('this is the aggOfAffOfDailyPrices of FetchStockPrices',arrOfAggOfDailyPrices)
    // console.log('aggetgatePortfolioValue of FetchStockPrices',aggregatePortfolioValue)
    // console.log('this is the totalPortfolio in fetchstockprice',totalPortfolioValue)
    // console.log('this is the date array and all of the open prices combined toghether',dailyPrices)
    
    setData(aggregatePortfolioValue)
  },[stockData])
  
  // console.log('this is the labels', labels)
  


  
  
  
  return (
    <div></div>
  );
}

export default FetchStockPrices;



// function getStandardDeviation (array) {
//   const n = array.length
//   const mean = array.reduce((a, b) => a + b) / n
//   return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
// }