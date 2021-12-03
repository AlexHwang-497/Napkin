import {Grid, Paper} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import VerticalBar from '../Charts/BarChart'
import CollapsibleTable from '../CollapsableTable'
import ReturnsTable from './ReturnsTable'
import React, {useEffect, useState} from 'react';
import config from '../../../StockData/config'
import { useDispatch, useSelector } from "react-redux"
import SeasonalBarChart from './SeasonalBarChart'

function SeasonalAnalysis({assets,ownership,portfolioName,title,priceData}) {
    let cov = require( 'compute-covariance' );
    var Finance = require('financejs');
    var finance = new Finance();
    const apiKey = config.FMP_API_KEY_ID
    const [stockList, setStockList] = useState([...assets] || ['AAPL'])
    const [stockData,editStockData] = useState([])
    const [stockWeight,setStockWeight]=useState([...ownership] || [0])
    const [aggregatePortfolio,setAggregatePortfolio]=useState([])
  
    const [labels,setLabels]=useState([])
    const [data,setData]=useState([])
    const [spx,setSpx]=useState([])
    const [ndx,setNdx]=useState([])
    const startDate ='2019-01-01'
    const endDate ='2021-11-01'
    const yearRange = ['2019','2020','2021']

    useEffect(() => {
        Promise.all(
        stockList.map((stock) =>
        fetch(
        
        `https://financialmodelingprep.com/api/v4/historical-price-adjusted/${stock}/1/month/${startDate}/${endDate}?apikey=${apiKey}`)))
        .then((results) =>
            Promise.all(results.map((res) => res.json())).then((stocks) => {
            editStockData(stocks);
        })
        );
      }, []);
      console.log('this is in stockData of LineGraph',stockData)
      
      
      useEffect(()=> {
        let arrCumReturn=[]
        let totalPortfolioValue=[]
        const aggregatePortfolioValue=[]
        if(stockData.length===0) return;
        // *iterate through the stoclist
        for(let j=0;j<stockList.length;j++){
            const historicalData = stockData[j]?.results?.reverse() || []
            console.log('this is the historicalData in the innerLoop',historicalData)
            let currentStock =[]
            
            let portfolioShares=[]
            let stockValue = []
            let sum = 0
            let openSum=0
            //todo: we are calculating the average, the cumulative return and attain prices
            for(let i=1; i<historicalData.length;i++){
                let startingPrice = historicalData[0].o
                console.log('startingprice',startingPrice)
                // *cumulate return
                let cumReturn = historicalData[i].o/historicalData[i-1].o-1
                // *this calculates the number of shares for growth 10k
                if(portfolioShares.length===0){
                    // *setup initial shares
                    portfolioShares.push(10000/historicalData[i].o)
                    // *setup intial investment of 10k
                    stockValue.push(10000*ownership[j]/100)
                } else {    
                    let previousShare = portfolioShares[i-2]
                    
                    // *coumpounding shares
                    portfolioShares.push(previousShare*(1+cumReturn))
                    // *growth for 10k
                    stockValue.push(historicalData[i].o*portfolioShares[i-1]*ownership[j]/100)
            
                }
                // *pushing values for cumulative return array; we need this for covariance
                currentStock.push({date:historicalData[i].formated.split(' ')[0],cumReturn})
            
            }
            totalPortfolioValue.push(stockValue)
            const returnsByYear=yearRange.map((year)=>(
                currentStock.filter((entry)=>entry.date.includes(year))
            ))
            yearRange.map((year,i)=>returnsByYear[i].unshift(year))

            // console.log('returns by year',returnsByYear)
            console.log('returns by year',returnsByYear)

            setData(returnsByYear)
    
            // *push daily return values into array for covariance
            
            let finalCumulativeReturn =currentStock[currentStock.length-1]/currentStock[0]-1
            
            arrCumReturn.push(currentStock)
            let stockEndingGrowthValue = stockValue[stockValue.length-1]
            
            let n = historicalData.length-1
            let average =openSum/historicalData.length
            // *used for calcuating stdDev
            let xMean= 0
            let xMean2= 0
            // todo: this is calculating stdDev
            
            // *this creates our dates
            let dates =[]
            for (let i=0; i<historicalData.length;i++){
              dates.push(historicalData[i].formated)
              
            }
            setLabels(dates)
        }
        console.log('array of cumulative stock',arrCumReturn)
        console.log('this is the totalPortfolioValue',totalPortfolioValue)
        // aggregatePortfolioValue
    
    
    
        // *calculaitng the aggetae portfolio value
        for(let i=0;i<totalPortfolioValue[0].length;i++){
            let sum=0
            
          for(let j=0;j<totalPortfolioValue.length;j++){
            sum+=totalPortfolioValue[j][i]
          }
          
          aggregatePortfolioValue.push(sum)
        }
        
        console.log('aggetgatePortfolioValue',aggregatePortfolioValue)
        console.log('this is the aggregatePortfolioValue[0]',aggregatePortfolioValue[0])
        console.log('this is aggregatePortfolioValue[aggregatePortfolioValue.length-1]',aggregatePortfolioValue[aggregatePortfolioValue.length-1])
        console.log('# of months',aggregatePortfolioValue.length)
        console.log('this is the cumulative return',aggregatePortfolioValue[aggregatePortfolioValue.length-1]/aggregatePortfolioValue[0]-1)
        console.log('annualized Return:',(1+(aggregatePortfolioValue[aggregatePortfolioValue.length-1]/aggregatePortfolioValue[0]-1))^(12/aggregatePortfolioValue.length)-1)
        
        // setData(aggregatePortfolioValue)
      },[stockData])


    return (
        <Grid container >
        <Grid item xs={6} >
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <SeasonalBarChart priceData={priceData}/>
            </Paper>
        </Grid>
        <Grid item xs={6} >
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <ReturnsTable data={data}/>
            </Paper>
        </Grid>

    </Grid>
        
    )
}

export default SeasonalAnalysis
