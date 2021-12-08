import React, {Fragment, useState,useEffect} from 'react'
import {Grid, Paper,Card, Icon, Fab, Select,MenuItem,FormControl,InputLabel, Box} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import CollapsibleTable from '../CollapsableTable'
import LineGraph from '../Charts/LineGraph'
import RecommendedPosts from '../../PostDetails/RecommendedPosts'
import SubOverview from '../InputForm/SubOverview'
import CommentSection from '../../PostDetails/CommentSection'
import BarGraph from '../Charts/BarGraph'
import StatCard3 from '../StatisticalSummary/StatCard3'
import StatCards from '../StatisticalSummary/StatCards'
import StatCards2 from '../StatisticalSummary/StatCard2'
import PortfolioDetail from './PortfolioDetail'
import EditCustomizedDialogs from '../editPortfolioDialog'
import { useDispatch, useSelector } from 'react-redux';
import PortfolioOverviewTable from './PortfolioOverviewTable'
import config from '../../../StockData/config'
import InventoryLineChart from './apexLineChart'
import SecondApexLineChart from './secondApexLineChart'
import ApexHeatChart from '../Charts/ApexHeatmap'
import ApexDonutChart from './apexDoughnutchart'
import ApexTreeChart from './ApexTreeMap'
import ApexLineChart from './apexLineChart'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, totalPortfolioValueReturns, calculateAnnualizedReturn } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
import TRLineChart from '../Charts/TotalReturnLine'

function PortfolioOverview({currentId,sector,portfolioName,assets,image,ownership,priceData}) {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    console.log('[ PortfolioOverview.priceData',priceData)
    
    // ! this is making a deep copy
    // const ttmData = JSON.parse(JSON.stringify(subSet(priceData,'2020-12-01')))
    // monthlyReturn(ttmData)
    // console.log('[prac this is the ttmData in portfolio Overview',ttmData)
    

    let cov = require( 'compute-covariance' );
    var Finance = require('financejs');
    var finance = new Finance();
    const apiKey = config.FMP_API_KEY_ID
    const [stockList, setStockList] = useState(assets || ['AAPL'])
    
    const [stockWeight,setStockWeight]=useState(ownership || [])
    const [aggregatePortfolio,setAggregatePortfolio]=useState([])
    // const [totalPortfolioValue,setTotalAggregatePortfolio]=useState([])
    const [sAndPPrice,setSAndPPrice]=useState(priceData[1])
    const [ytd,setYtd]=useState()
    const [selectedLineChartData,setSelectedLineChartData] = useState('ytd')
    const [selectedPortfolioOverviewtData,setSelectedPortfolioOverviewtData] = useState('ytd')
    console.log('this is the S&P',sAndPPrice)
    
    
  
    const [labels,setLabels]=useState(priceData[0])
    const [data,setData]=useState([])
    const [spx,setSpx]=useState([])
    const [ndx,setNdx]=useState([])
    const startDate ='2019-01-01'
    const endDate ='2021-11-01'
    const yearRange = ['2019','2020','2021']

console.log('this is the labels',labels)
const dateLabels = ['1yr', '3yr', '5yr','6yr','7yr','8yr'];
    const dates = dateLabels.map(label => {
        const yearNumber = parseInt(label.split('yr')[0]);
        return generateHistoricalDate(yearNumber);
    });


  
    const spxValue = dates.map((date, index) => {
        const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
        const data = monthlyReturn(range).map((entry)=>entry.securityGrowthValue)[0]
        console.log('[PortfolioOverview.spxValue.monReturn',data)
        return data
    })
    const securityData = dates.map((date, index) => {
        const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
        const data = monthlyReturn(range).map((entry)=>entry)
        // console.log('[TotalReturn.pracsValue.monReturn',data)
        console.log('[PortfolioOverview.pracsValue.monReturn',data)
        return data
    })
    console.log('[PortfolioOverview.securityData',securityData)


    const totalPortoflioValue = dates.map((date, index) => {
        console.log('[PortfolioOverview.calculations.date',date)
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const aggPortfolioValue = totalPortfolioValue(monthlyReturn(range))
    const portfolioAnnualizeReturn = calculateAnnualizedReturn(aggPortfolioValue)
    return aggPortfolioValue
    
  })
    const arrPortfolioReturns = dates.map((date, index) => {
        const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
        const aggPortfolioValueReturns = totalPortfolioValueReturns(monthlyReturn(range))
        return aggPortfolioValueReturns
  })

  console.log('[getStandardDeviation.arrPortfolioReturns',arrPortfolioReturns)
    const portfolioStdDev = getStandardDeviation(arrPortfolioReturns)
    console.log('[getStandardDeviation.portfolioStdDev',portfolioStdDev)

  
  
    const dateArr = dates.map((date, index) => {
        console.log('[TotalReturn.calculations.date',date)
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map((entry)=>entry.dates.map((el)=>el.date))[0]
    console.log('[PortfolioOverview.dateArr.data',data)
    return data
    
  })
  const threeYrData = dateArr[1] && spxValue[1] && totalPortoflioValue[1] ?[dateArr[1],spxValue[1],totalPortoflioValue[1]]:[]
  const fiveYrData = dateArr[2] && spxValue[2] && totalPortoflioValue[2] ?[dateArr[2],spxValue[2],totalPortoflioValue[2]]:[]
  console.log('[PortfolioOverview.threeYrData',threeYrData)
  console.log('[PortfolioOverview.fiveYrData',fiveYrData)
  let lineChartData;
  if(selectedLineChartData==='ytd'){
        lineChartData = dateArr[0] && spxValue[0] && totalPortoflioValue[0] ?[dateArr[0],spxValue[0],totalPortoflioValue[0]]:[]
      
    } else if(selectedLineChartData==='3yr'){
        lineChartData=dateArr[1] && spxValue[1] && totalPortoflioValue[1] ?[dateArr[1],spxValue[1],totalPortoflioValue[1]]:[]
    } else if(selectedLineChartData==='5yr'){
        lineChartData=dateArr[5] && spxValue[5] && totalPortoflioValue[2] ?[dateArr[5],spxValue[5],totalPortoflioValue[5]]:[]
    } else {
        lineChartData=dateArr[3] && spxValue[3] && totalPortoflioValue[3] ?[dateArr[3],spxValue[3],totalPortoflioValue[3]]:[]
    }
    console.log('[PortfolioOverview.lineChartData',lineChartData)
    
    const lineChartHandler = (e) => {
        setSelectedLineChartData(e.target.value)
        
    }
// ?    ///////////////////////////////////////////////////////////////////////////////////////////
    let portfolioOverviewData;
    if(selectedPortfolioOverviewtData==='ytd'){
        portfolioOverviewData = securityData[0]
        
      } else if(selectedPortfolioOverviewtData==='3yr'){
        portfolioOverviewData=securityData[2]
      } else {
        portfolioOverviewData=securityData[3]
      }
      console.log('[PortfolioOverview.portfolioOverviewData',portfolioOverviewData)


  const portfolioOverviewHandler = (e) => {
    setSelectedPortfolioOverviewtData(e.target.value)

  }

    return (
        <Grid container >
            <Grid item xs={6} >
                <Paper>
                {/*  this will need the portfolio's annuzlied return, standard devation, beta and alpha*/}
                    <PortfolioDetail  priceData={priceData} assets={stockList} currentId={currentId} ownership={stockWeight} portfolioName={portfolioName} sector={sector}/>    

                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Date</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={selectedLineChartData}
                        onChange={lineChartHandler}
                        label="Date"
                        >
                        <MenuItem value="">
                            
                        </MenuItem>
                        <MenuItem value={'ytd'}>YTD</MenuItem>
                        <MenuItem value={'3yr'}>3-Yr</MenuItem>
                        <MenuItem value={'5yr'}>5-Yr</MenuItem>
                        </Select>
                    </FormControl>
                    <TRLineChart priceData={lineChartData} />
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                {/*  this will need each individual stock's annuzlied return, standard devation, beta and alpha*/}
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Date</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={selectedPortfolioOverviewtData}
                        onChange={portfolioOverviewHandler}
                        label="Date"
                        >
                        <MenuItem value="">
                        </MenuItem>
                        <MenuItem value={'ytd'}>YTD</MenuItem>
                        <MenuItem value={'3yr'}>3-Yr</MenuItem>
                        <MenuItem value={'5yr'}>5-Yr</MenuItem>
                        </Select>
                    </FormControl>
                  
                    <PortfolioOverviewTable portfolioOverviewData={portfolioOverviewData} />
                    
                
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    <RecommendedPosts/>

                </Paper>
                
            </Grid>
        </Grid>

    )
}


export default PortfolioOverview
