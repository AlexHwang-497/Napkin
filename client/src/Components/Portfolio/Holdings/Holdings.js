import React, {Fragment, useState,useEffect} from 'react'
import {Grid, Paper,Card, Icon, Fab, Select, MenuItem, FormControl, InputLabel, Box, Divider} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import CollapsibleTable from '../CollapsableTable'
import VerticalBar from '../Charts/BarChart'
import BarGraph from '../Charts/BarGraph'
import LineGraph from '../Charts/LineGraph'
import { Line } from 'react-chartjs-2'
import DoughnutChart from '../Charts/DoughnutChart'
import SectorTable from './SectorTable'
import {useDispatch, useSelector} from 'react-redux'
import ApexTreeChart from '../PortfolioOverview/ApexTreeMap'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'


function Holdings({sector,assets,ownership, portfolioName,image, stockData,priceData}) {
    const [selectedLineChartData,setSelectedLineChartData] = useState('ytd')
    const [selectedPortfolioOverviewtData,setSelectedPortfolioOverviewtData] = useState('ytd')
    const [holdingsType,setHoldingsType] = useState('sector')
    const [dateType,setDateType] = useState('ytd')
    // const [dateIndex,setDateIndex] = useState(0)
    
    const dateLabels = ['1yr', '3yr', '5yr','6yr'];
        const dates = dateLabels.map(label => {
            const yearNumber = parseInt(label.split('yr')[0]);
            return generateHistoricalDate(yearNumber);
        });
    
    
      
        const spxValue = dates.map((date, index) => {
            const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
            const data = monthlyReturn(range).map((entry)=>entry.securityGrowthValue)[0]
            // console.log('[Holdings.spxValue.monReturn',data)
            // console.log('[Holdings.spxValue.monReturn',data)
            return data
        })
        const securityData = dates.map((date, index) => {
            const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
            const data = monthlyReturn(range).map((entry)=>entry)
            // console.log('[TotalReturn.pracsValue.monReturn',data)
            // console.log('[Holdings.pracsValue.monReturn',data)
            return data
        })
        
        const totalPortoflioValue = dates.map((date, index) => {
            // console.log('[Holdings.calculations.date',date)
        const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
        const aggPortfolioValue = totalPortfolioValue(monthlyReturn(range))
        // console.log('[Holdings.totalPortoflioValue.aggPortfolioValue',aggPortfolioValue)
        return aggPortfolioValue
        
      })
        const dateArr = dates.map((date, index) => {
            // console.log('[TotalReturn.calculations.date',date)
        const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
        const data = monthlyReturn(range).map((entry)=>entry.dates.map((el)=>el.date))[0]
        // console.log('[Holdings.dateArr.data',data)
        return data
        
      })
    console.log('[Holdings.securityData',securityData)

    let dateIndex=0
    switch(dateType){
        case '3yr':
            dateIndex=1
            break;
        case '5yr':
            dateIndex=2
            break;
        case '6yr':
            dateIndex=3
            break;
        default:
            dateIndex=0
    }

    const dateTypeHandler = (e) => {
        
        setDateType(e.target.value)
    }
    
    
    
    
    let treeMapData;
    // let dateIndex = 0
    
    
    const holdingsDataHandler = (e) => {
        setHoldingsType(e.target.value)
    
      }
      console.log('[Holdings.holdingsData',securityData)
    switch(holdingsType){
        case 'currentPortfolioValue':
            treeMapData=securityData.map((entry)=>entry.map((el)=>{return {x:el.symbol,'y':el.finalPortfolioValue}}).slice(1))

            break;
        case 'initialPortfolioValue':
            treeMapData=securityData.map((entry)=>entry.map((el)=>{return {x:el.symbol,'y':el.initialPortfolioValue}}).slice(1))

            break;
        case 'cumulativeReturn':
            treeMapData=securityData.map((entry)=>entry.map((el)=>{return {x:el.symbol,'y':el.finalCumulativeReturn}}).slice(1))
            break;
        case 'annualizedReturn':
            treeMapData=securityData.map((entry)=>entry.map((el)=>{return {x:el.symbol,'y':el.annualizedReturn}}).slice(1))
            break;
        case 'priceStandardDeviation':
            treeMapData=securityData.map((entry)=>entry.map((el)=>{return {x:el.symbol,'y':el.priceStDev}}).slice(1))
            break;
        case 'returnStandardDeviation':
            treeMapData=securityData.map((entry)=>entry.map((el)=>{return {x:el.symbol,'y':el.returnStDev}}).slice(1))
            break;
            
        default:
            treeMapData=securityData.map((entry)=>entry.map((el)=>{return {x:el.sector,'y':el.finalPortfolioValue}}).slice(1))
    }
    
    console.log('[Holdings.holdingsType',holdingsType)
    console.log('[Holdings.treeMapData',treeMapData)
    return (
        <Grid container>
            <Grid item xs={6}>
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    <SectorTable ownership={ownership} assets={assets} sector={sector} image={image}/>
                </Paper>

            </Grid>

            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Date</InputLabel>
                        <Select
                            value={dateType}
                            onChange={dateTypeHandler}
                            label="Date"
                            >
                            <MenuItem value={'ytd'}>YTD</MenuItem>
                            <MenuItem value={'3yr'}>3-Yr</MenuItem>
                            <MenuItem value={'5yr'}>5-Yr</MenuItem>
                            <MenuItem value={'6yr'}>5-Yr</MenuItem>
                        </Select>
                    </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">DataType</InputLabel>
                        <Select
                            value={holdingsType}
                            onChange={holdingsDataHandler}
                            label="Date"
                            >
                            <MenuItem value={'sector'}>Sector</MenuItem>
                            <Divider style={{ margin: '20px 0' }} />
                            <MenuItem value={'currentPortfolioValue'}>Current Portfolio Value($)</MenuItem>
                            <MenuItem value={'initialPortfolioValue'}>Initial Portfolio Value($)</MenuItem>
                            <Divider style={{ margin: '20px 0' }} />
                            <MenuItem value={'cumulativeReturn'}>Cumulative Return(%)</MenuItem>
                            <MenuItem value={'annualizedReturn'}>Annualized Return(%)</MenuItem>
                            <Divider style={{ margin: '20px 0' }} />
                            <MenuItem value={'priceStandardDeviation'}>Price Standard Deviation($)</MenuItem>
                            <MenuItem value={'returnStandardDeviation'}>Return Standard Deviation(%)</MenuItem>
                            <Divider style={{ margin: '20px 0' }} />
                            {/* <MenuItem value={''}>Beta</MenuItem>
                            <MenuItem value={''}>Alpha</MenuItem> */}
                        
                        </Select>
                    </FormControl>
                    <ApexTreeChart priceData ={priceData} treeMapData={treeMapData} dateIndex={dateIndex}/>
                </Paper>
            
            </Grid>

            
            
        </Grid>
        
    )
}

export default Holdings


//   const threeYrData = dateArr[1] && spxValue[1] && totalPortoflioValue[1] ?[dateArr[1],spxValue[1],totalPortoflioValue[1]]:[]
    //   const fiveYrData = dateArr[2] && spxValue[2] && totalPortoflioValue[2] ?[dateArr[2],spxValue[2],totalPortoflioValue[2]]:[]
    // //   console.log('[Holdings.threeYrData',threeYrData)
    // //   console.log('[Holdings.fiveYrData',fiveYrData)
    //   let lineChartData;
    //   if(selectedLineChartData==='ytd'){
    //     lineChartData = dateArr[0] && spxValue[0] && totalPortoflioValue[0] ?[dateArr[0],spxValue[0],totalPortoflioValue[0]]:[]
          
    //     } else if(selectedLineChartData==='3yr'){
    //         lineChartData=dateArr[1] && spxValue[1] && totalPortoflioValue[1] ?[dateArr[1],spxValue[1],totalPortoflioValue[1]]:[]
    //     } else {
    //         lineChartData=dateArr[2] && spxValue[2] && totalPortoflioValue[2] ?[dateArr[2],spxValue[2],totalPortoflioValue[2]]:[]
    //     }
    //     console.log('[Holdings.lineChartData',lineChartData)
        
    //     const lineChartHandler = (e) => {
    //         setSelectedLineChartData(e.target.value)
            
    //     }
    // // ?    ///////////////////////////////////////////////////////////////////////////////////////////
    //     let portfolioOverviewData;
    //     if(selectedPortfolioOverviewtData==='ytd'){
    //         portfolioOverviewData = securityData[0].sector
            
    //       } else if(selectedPortfolioOverviewtData==='3yr'){
    //         portfolioOverviewData=securityData[2].sector
    //       } else {
    //         portfolioOverviewData=securityData[3].sector
    //       }
    //       console.log('[Holdings.portfolioOverviewData',portfolioOverviewData)
    
    
    //   const portfolioOverviewHandler = (e) => {
    //     setSelectedPortfolioOverviewtData(e.target.value)
    
    //   }
    // // ?    ///////////////////////////////////////////////////////////////////////////////////////////
    //     let selectedHoldingsType;
    //     if(selectedPortfolioOverviewtData==='ytd'){
    //         portfolioOverviewData = securityData[0]
            
    //       } else if(selectedPortfolioOverviewtData==='3yr'){
    //         portfolioOverviewData=securityData[2]
    //       } else {
    //         portfolioOverviewData=securityData[3]
    //       }
    //       console.log('[Holdings.portfolioOverviewData',portfolioOverviewData)
    
    
    //   const holdingsTypeHandler = (e) => {
    //     setHoldingsData(e.target.value)
    
    //   }