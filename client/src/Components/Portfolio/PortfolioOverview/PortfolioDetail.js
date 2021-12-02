import React, { Fragment, useEffect,useState } from 'react';
import { Paper, Typography, CircularProgress, Divider,Grid,Card,Fab } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import CommentSection from '../../PostDetails/CommentSection';
import PortfolioReturnTable from './PortfolioReturnTable';
import { getPortfolio, getPortfoliosBySearch } from '../../../actions/portfolio';
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'


function PortfolioDetail({priceData, currentId,assets,ownership,portfolioName,sector,stockData}) {
  // ! this is making a deep copy
  // const ttmData = JSON.parse(JSON.stringify(subSet(priceData,'2020-12-01')))
    // const ttmMontlyReturn =monthlyReturn(ttmData)
    // const ttmAggValue = totalPortfolioValue(ttmMontlyReturn)
    // const ttmAnnReturn = calculateAnnualizedReturn(ttmAggValue)
    
    // console.log('[prac this is the ttmData in portfolioDetail',ttmData)
    // console.log('[prac this is the ttmMontlyReturn in portfolioDetail',ttmMontlyReturn)
    // console.log('[prac this is the ttmAggValue in portfolioDetail',ttmAggValue)
    // console.log('[prac this is the ttmAnnReturn in portfolioDetail',ttmAnnReturn)
    
    // const twoYearData = JSON.parse(JSON.stringify(subSet(priceData,'2019-12-01')))
    // console.log('[prac this is the twoYearData in portfolioDetail',twoYearData)
    // const twoYearMontlyReturn =monthlyReturn(twoYearData)
    // console.log('[prac this is the twoYearMontlyReturn in portfolioDetail',twoYearMontlyReturn)
    // const twoYearAggValue = totalPortfolioValue(twoYearMontlyReturn)
    // console.log('[prac this is the twoYearAggValue in portfolioDetail',twoYearAggValue)
    // const twoYearAnnReturn = calculateAnnualizedReturn(twoYearAggValue)
    // console.log('[prac this is the twoYearAnnReturn in portfolioDetail',twoYearAnnReturn)
  // console.log('this is the ownership in portfolioDetail',ownership)
  const dateLabels = ['1yr', '3yr', '5yr'];
  const dates = dateLabels.map(label => {
    const yearNumber = parseInt(label.split('yr')[0]);
    return generateHistoricalDate(yearNumber);
  });
  const calculations = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const annualizedReturn = calculateAnnualizedReturn(totalPortfolioValue(monthlyReturn(range)));
    const standardDeviation = getStandardDeviation(range);
    const monReturn = monthlyReturn(range)
    const assetCov = calcCovariance(monReturn)
    // return [dateLabels[index], annualizedReturn, standardDeviation, 24]
    return [dateLabels[index], Number.parseFloat(annualizedReturn).toPrecision(4), Number.parseFloat(standardDeviation).toPrecision(2), 24]
    // return [dateLabels[index], annualizedReturn.toFixed(2), standardDeviation.toFixed(2), 24]
  })
  let cov = require( 'compute-covariance' );
  console.log('this is priceData in portfolioDetail',priceData)
  const startDate='2011-11-01'
  const endDate='2021-11-01'
  var Finance = require('financejs');
  // const ownership=[20,20,20,20,20]
  var finance = new Finance();
  const [stockWeight,setStockWeight]=useState(ownership || [0])
  // console.log('this is the stockWeight',stockWeight)
  const [aggregatePortfolio,setAggregatePortfolio]=useState([])

  const [labels,setLabels]=useState([])
  const [data,setData]=useState([])
  const [dailyPrices,setDailyPrices]=useState([])


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

    if(!stockData || stockData.length===0) return;

    // *iterate through the stoclist
    for(let j=0;j<stockData.length;j++){
        const historicalData = stockData[j]?.dates || []
        // console.log('this is the historical data in portfolioDetail',historicalData)
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
                stockValue.push((historicalData[i].o*portfolioShares[i-1]*ownership[j]/100))
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
    
    // console.log('this is the date array of PortfolioDetail',labels)
    // console.log('this is the aggOfAffOfDailyPrices of PortfolioDetail',arrOfAggOfDailyPrices)
    // console.log('aggetgatePortfolioValue of PortfolioDetail',aggregatePortfolioValue)
    // console.log('this is the totalPortfolio in PortfolioDetail',totalPortfolioValue)
    // console.log('this is the date array and all of the open prices combined toghether',dailyPrices)
    
    setData(aggregatePortfolioValue)
  },[stockData])
  return (
    <Fragment>
          
          
          <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <PortfolioReturnTable stockData={stockData} annReturn={calculations}/>
            <Divider style={{ margin: '20px 0' }} />
            <CommentSection/>
          </Paper>

        </Fragment>
        
        
        )
      }
      
export default PortfolioDetail




      // useEffect(()=>{
      //   let result =[]
      //   let arrOfDailyPrices=[]
      //   // *set date array as 0
      //   for(let j=0; j<stockData.length;j++){
      //     let historicalData = stockData[j]?.dates || []
      //     let arrOfDates = []
      //     let dailyPrices=[]
      //     for(let i=0;i<historicalData.length;i++){
      //       arrOfDates.push(stockData[j].dates[i].formated.split(' ')[0])
      //       // arrOfDates.push(Date.parse(stockData[j].dates[i].formated))
      //     }
      //     setDatesArr(arrOfDates)
      //     console.log('datesArr:',datesArr)
    
    
      //     // *set up daily prices of indvidual sotcks array
      //     for(let i=0;i<historicalData.length;i++){
      //       dailyPrices.push(stockData[j].dates[i].o)
           
      //     }
      //     arrOfDailyPrices.push(dailyPrices.reverse())
      //     setDailyPrices([datesArr,dailyPrices])
      //   }
        
        
      //   console.log('result:',result)
    
      // },[stockData])
    
      // console.log('dailyPricesArr:',dailyPricesArr)
