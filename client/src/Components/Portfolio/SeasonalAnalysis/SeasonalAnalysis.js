import {Grid, Paper} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import VerticalBar from '../Charts/BarChart'
import CollapsibleTable from '../CollapsableTable'
import ReturnsTable from './ReturnsTable'
import React, {useEffect, useState} from 'react';
import config from '../../../StockData/config'
import { useDispatch, useSelector } from "react-redux"
import SeasonalBarChart from './SeasonalBarChart'
import HeatMapChart from './HeatMapChart'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance,totalPortfolioValueReturns } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'

function SeasonalAnalysis({assets,ownership,portfolioName,title,priceData}) {
    let cov = require( 'compute-covariance' );
    var Finance = require('financejs');
    var finance = new Finance();
    const apiKey = config.FMP_API_KEY_ID
    const [stockList, setStockList] = useState([...assets] || ['AAPL'])
    const [stockData,editStockData] = useState([])
    const [stockWeight,setStockWeight]=useState([...ownership] || [0])
    
    const [aggregatePortfolio,setAggregatePortfolio]=useState([])
    // const [aggPortfolio,setAggPortfolio]=useState([])
    const [returnsTableData,setReturnsTableData] = useState([])
  
    const [labels,setLabels]=useState([])
    const [data,setData]=useState([])
    const [spx,setSpx]=useState([])
    const [ndx,setNdx]=useState([])
    const startDate ='2019-01-01'
    const endDate ='2021-11-01'
    const yearRange = ['2014','2015','2016','2017','2018','2019','2020','2021']

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
            
            console.log('[SeasonalAnalysis.returnByYear',returnsByYear)
            console.log('[SeasonalAnalysis.currentStock',currentStock)

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


      console.log('this is the labels',labels)
      const dateLabels = ['1yr', '3yr', '5yr'];
          const dates = dateLabels.map(label => {
              const yearNumber = parseInt(label.split('yr')[0]);
              return generateHistoricalDate(yearNumber);
          });
          console.log('[ApexLineChart.dates',dates)
      
        
          const spxValue = dates.map((date, index) => {
              const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
              const data = monthlyReturn(range).map((entry)=>entry.securityGrowthValue)[0]
              console.log('[SeasonalAnalysis.spxValue.monReturn',data)
              return data
          })
          const totalPortoflioValue = dates.map((date, index) => {
            const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
            const aggPortfolioValue = totalPortfolioValue(monthlyReturn(range))  
            return aggPortfolioValue
          })
          const totalPortoflioValueReturn = dates.map((date, index) => {
              console.log('[SeasonalAnalysis.totalPortoflioValueReturn.date',date)
            const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
            const arrPortfolioValue = totalPortfolioValue(monthlyReturn(range))
        
            let arrCumulativeReturns=[1]
            for(let i=1;i<arrPortfolioValue.length;i++){
                arrCumulativeReturns.push((arrPortfolioValue[i]/arrPortfolioValue[i-1])-1)
            }  
            return arrCumulativeReturns
        })
        

          
          const dateArr = dates.map((date, index) => {
            const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
            const data = monthlyReturn(range).map((entry)=>entry.dates.map((el)=>el.date))[0]
            return data
          })
        
        
        
        console.log('[seasonalAnalysis.totalPortoflioValue',totalPortoflioValue)
        console.log('[seasonalAnalysis.totalPortoflioValueReturn.final',totalPortoflioValueReturn[2])
        const tableReturnsData = [dateArr[2],totalPortoflioValueReturn[2]]


        const  finalTableOrg = (tableReturnsData)=> {
            let result=[]
            for(let i=0;i<tableReturnsData[0].length;i++){
                result.push({date:tableReturnsData[0][i],value:tableReturnsData[1][i]})
            }
            // setSeasonalBarChartData(result)
            console.log('[seasonalAnalysis.finalTableOrg.result',result)
            // return result
            
            const returnsByYear=yearRange.map((year)=>(
              result.slice(1).filter((entry)=>entry.date.includes(year))
              ))
          yearRange.map((year,i)=>returnsByYear[i].unshift(year))
            console.log('[seasonalAnalysis.finalTableOrg.dataNeeded',returnsByYear)
          //   const returnByYear=yearRange.map((year)=>(
          //     dataNeeded.filter((entry)=>entry.date.includes(year))
          // ))
            // const newArr=yearRange.map((year,i)=>dataNeeded[i].unshift(year))
            // return newArr
            return returnsByYear
            
          }
        const  seasonalBarChartData = (tableReturnsData)=> {
            let result=[]
            for(let i=0;i<tableReturnsData[0].length;i++){
                result.push({date:tableReturnsData[0][i],value:tableReturnsData[1][i]})
            }
            // setSeasonalBarChartData(result)
            console.log('[seasonalAnalysis.finalTableOrg.result',result)
            return result
            
            
          }
          // finalTableOrg(tableReturnsData)
          const dataNeeded =finalTableOrg(tableReturnsData)
          const barChartdataNeeded =seasonalBarChartData(tableReturnsData)

        console.log('[seasonalAnalysis.finalTableOrg',dataNeeded)
        console.log('[seasonalAnalysis.seasonalBarchartData',barChartdataNeeded)

        
    
        
        
        const ytdData = [dateArr[0],spxValue[0],totalPortoflioValue[0]]
        

    return (
        <Grid container >
        <Grid item xs={6} >
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <SeasonalBarChart data={barChartdataNeeded}/>
            </Paper>
        </Grid>
        <Grid item xs={6} >
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <ReturnsTable data={dataNeeded} dataNeeded={dataNeeded}/>

            </Paper>
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                {/* <ReturnsTable data={dataNeeded} dataNeeded={dataNeeded}/> */}
                <HeatMapChart/>

            </Paper>
        </Grid>
    </Grid>
        
    )
}

export default SeasonalAnalysis
