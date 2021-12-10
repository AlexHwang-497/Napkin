import {Grid, Paper} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import VerticalBar from '../Charts/BarChart'
import CollapsibleTable from '../CollapsableTable'
import ReturnsTable from './ReturnsTable'
import React, {useEffect, useState} from 'react';
import config from '../../../StockData/config'
import { useDispatch, useSelector } from "react-redux"
import SeasonalBarChart from './SeasonalBarChart'
import HeatMapChart from '../Charts/HeatMapChart'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance,totalPortfolioValueReturns } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
import PortfolioPostTable from '../Charts/PortfolioPostTable'
import SeasonalAnalysisTable from '../Charts/SeasonalAnalysisTable'

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
    const yearRange = ['2013','2014','2015','2016','2017','2018','2019','2020','2021']

      console.log('this is the labels',labels)
      const dateLabels = ['1yr', '3yr', '5yr'];
          const dates = dateLabels.map(label => {
              const yearNumber = parseInt(label.split('yr')[0]);
              return generateHistoricalDate(yearNumber);
          });
          // console.log('[ApexLineChart.dates',dates)
      
        
          const spxValue = dates.map((date, index) => {
              const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
              const data = monthlyReturn(range).map((entry)=>entry.securityGrowthValue)[0]
              // console.log('[SeasonalAnalysis.spxValue.monReturn',data)
              return data
          })
          const totalPortoflioValue = dates.map((date, index) => {
            const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
            const aggPortfolioValue = totalPortfolioValue(monthlyReturn(range))  
            return aggPortfolioValue
          })
          const monthlyData = dates.map((date, index) => {
            const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
            return  monthlyReturn(range)
            // return aggPortfolioValue
          })
          const totalPortoflioValueReturn = dates.map((date, index) => {
              // console.log('[SeasonalAnalysis.totalPortoflioValueReturn.date',date)
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
        
        
        
        // console.log('[seasonalAnalysis.totalPortoflioValue',totalPortoflioValue)
        // console.log('[seasonalAnalysis.totalPortoflioValueReturn.final',totalPortoflioValueReturn[2])
        const tableReturnsData = [dateArr[2],totalPortoflioValueReturn[2]]


        const  finalTableOrg = (tableReturnsData)=> {
            let result=[]
            for(let i=0;i<tableReturnsData[0].length;i++){
                result.push({date:tableReturnsData[0][i],value:tableReturnsData[1][i]})
            }
            // setSeasonalBarChartData(result)
            // console.log('[seasonalAnalysis.finalTableOrg.result',result)
            // return result
            
            const returnsByYear=yearRange.map((year)=>(
              result.slice(1).filter((entry)=>entry.date.includes(year))
              ))
          yearRange.map((year,i)=>returnsByYear[i].unshift(year))
            // console.log('[seasonalAnalysis.finalTableOrg.dataNeeded',returnsByYear)
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
            // console.log('[seasonalAnalysis.finalTableOrg.result',result)
            return result
            
            
          }
          // finalTableOrg(tableReturnsData)
          const dataNeeded =finalTableOrg(tableReturnsData)
          const barChartdataNeeded =seasonalBarChartData(tableReturnsData)

        // console.log('[seasonalAnalysis.finalTableOrg',dataNeeded)
        // console.log('[seasonalAnalysis.seasonalBarchartData',barChartdataNeeded)

        
    
        
        
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
        
                {/* <ReturnsTable data={dataNeeded} dataNeeded={dataNeeded}/> */}
                {/* <HeatMapChart dataNeeded={dataNeeded}/> */}
                {/* <PortfolioPostTable dataNeeded={monthlyData}/> */}
                <SeasonalAnalysisTable data={dataNeeded}/>
        
        </Grid>
    </Grid>
        
    )
}

export default SeasonalAnalysis
