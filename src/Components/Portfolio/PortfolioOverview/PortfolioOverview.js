import React, {Fragment, useState,useEffect} from 'react'
import {Grid, Paper,Card, Icon, Fab, Select,MenuItem,FormControl,InputLabel, Box, Divider, Typography} from '@material-ui/core'
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
import PortfolioOverviewPagTable from '../Charts/PortfolioOverviewPagTable'

function PortfolioOverview({currentId,sector,portfolioName,assets,image,ownership,priceData,yearArr,dateSelect}) {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const  states= useSelector((state) => state);
    
    console.log('[ PortfolioOverview.posts',posts)
    console.log('[ PortfolioOverview.states',states)
    console.log('[ PortfolioOverview.post',post)
    // console.log('[ PortfolioOverview.priceData',priceData)
    

    // ! this is making a deep copy
    // const ttmData = JSON.parse(JSON.stringify(subSet(priceData,'2020-12-01')))
    // monthlyReturn(ttmData)
    // console.log('[prac this is the ttmData in portfolio Overview',ttmData)
    console.log('[PortfolioOverview.state.posts',post)    
    

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
    
    
    
  
    const [labels,setLabels]=useState(priceData[0])
    const [data,setData]=useState([])
    const [spx,setSpx]=useState([])
    const [ndx,setNdx]=useState([])
    // const [yearArray,SetYearArray] = useState(yearArr)
    const startDate ='2019-01-01'
    const endDate ='2021-11-01'
    const yearRange = ['2019','2020','2021']
    

console.log('[PortfolioOverview.yearArr',yearArr)
if(yearArr.length===0 || !yearArr) return []
// const dateLabels = ['1yr','3yr','5yr','10yr'];
const dateLabels = yearArr.slice(1);

    const dates = dateLabels.map(label => {
        const yearNumber = parseInt(label.split('yr')[0]);
        return generateHistoricalDate(yearNumber);
    });


  
    const spxValue = dates.map((date, index) => {
        const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
        const data = monthlyReturn(range).map((entry)=>entry.securityGrowthValue)[0]
        // console.log('[PortfolioOverview.spxValue.monReturn',data)
        return data
    })

    // console.log('[PortfolioOverview.spxValue',spxValue)
    const securityData = dates.map((date, index) => {
        const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
        const data = monthlyReturn(range).map((entry)=>entry)
        console.log('[PortfolioOverview.securityData.data/monthlyReturn',data)
        // console.log('[PortfolioOverview.pracsValue.monReturn',data)
        return data
    })
    console.log('[PortfolioOverview.securityData',securityData)


    const totalPortoflioValue = dates.map((date, index) => {
        // console.log('[PortfolioOverview.calculations.date',date)
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

//   console.log('[getStandardDeviation.arrPortfolioReturns',arrPortfolioReturns)
    const portfolioStdDev = getStandardDeviation(arrPortfolioReturns)
    // console.log('[getStandardDeviation.portfolioStdDev',portfolioStdDev)

  
  
    const dateArr = dates.map((date, index) => {
        // console.log('[TotalReturn.calculations.date',date)
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map((entry)=>entry.dates.map((el)=>el.date))[0]
    console.log('[PortfolioOverview.dateArr.data',data)
    return data
    
})
console.log('[PortfolioOverview.dateArr.data',dateArr)
console.log('[PortfolioOverview.dateSelect',dateSelect)

//   const threeYrData = dateArr[1] && spxValue[1] && totalPortoflioValue[1] ?[dateArr[1],spxValue[1],totalPortoflioValue[1]]:[]
//   const fiveYrData = dateArr[2] && spxValue[2] && totalPortoflioValue[2] ?[dateArr[2],spxValue[2],totalPortoflioValue[2]]:[]
//   console.log('[PortfolioOverview.threeYrData',threeYrData)
//   console.log('[PortfolioOverview.fiveYrData',fiveYrData)
  let lineChartData;
  let portfolioOverviewData;
  let indexNeeded=0
  let chartLabel = ''
  if(dateSelect==='ttm'){
        // lineChartData = dateArr[0] && spxValue[0] && totalPortoflioValue[0] ?[dateArr[0],spxValue[0],totalPortoflioValue[0]]:[]
        // portfolioOverviewData = securityData[0]
        chartLabel = 'TTM'
        indexNeeded=0
    } else if(dateSelect==='3yr'){
        // lineChartData=dateArr[2] && spxValue[2] && totalPortoflioValue[2] ?[dateArr[2],spxValue[2],totalPortoflioValue[2]]:[]
        // portfolioOverviewData=securityData[2]
        chartLabel = '3-Yr'
        indexNeeded=2
    } else if(dateSelect==='5yr'){
        // lineChartData=dateArr[4] && spxValue[4] && totalPortoflioValue[4] ?[dateArr[4],spxValue[4],totalPortoflioValue[4]]:[]
        // portfolioOverviewData=securityData[4]
        indexNeeded=4
        chartLabel = '5-Yr'
    } else {
        // lineChartData=dateArr[dateLabels.length-1] && spxValue[dateLabels.length-1] && totalPortoflioValue[dateLabels.length-1] ?[dateArr[dateLabels.length-1],spxValue[dateLabels.length-1],totalPortoflioValue[dateLabels.length-1]]:[]
        // portfolioOverviewData=securityData[dateLabels.length-1]
        indexNeeded=dateLabels.length-1
        chartLabel = dateLabels.length +'-Yr'
    }
    // console.log('[PortfolioOverview.lineChartData',lineChartData)
    let lineChartDataNeeded = dateArr[indexNeeded] && spxValue[indexNeeded] && totalPortoflioValue[indexNeeded] ?[dateArr[indexNeeded],spxValue[indexNeeded],totalPortoflioValue[indexNeeded]]:[]
    let portfolioOverviewDataNeeded=securityData[indexNeeded]

    console.log('[PortfolioOverview.lineChartDataNeeded',lineChartDataNeeded)
    console.log('[PortfolioOverview.portfolioOverviewDataNeeded',portfolioOverviewDataNeeded)


    const lineChartHandler = (e) => {
        setSelectedLineChartData(e.target.value)
        
    }

    
    
    return (
        <Box>

        <Grid container spacing={3}>

            <Grid item sm={6} xs={12}  >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                        <PortfolioDetail  priceData={priceData} assets={stockList} currentId={currentId} ownership={stockWeight} portfolioName={portfolioName} sector={sector} yearArr={yearArr}/>    
                </Paper> 
            </Grid>

            <Grid item sm={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    
                    <h1>{chartLabel} Portfolio Growth of $10,000</h1>
                    <Divider style={{ margin: '20px 0' }} />
                    <TRLineChart priceData={lineChartDataNeeded} title={chartLabel} />
                </Paper>
            </Grid>
            <Grid item sm={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                
                  
                    <h1>Current Portoflio Securitites as of Trailing {chartLabel} Data</h1>
                    {/* <Typography variant ="h3">Current Portoflio Securitites as of Trailing {chartLabel} Data</Typography> */}
                    <Divider style={{ margin: '20px 0' }} />

                    <PortfolioOverviewPagTable dataNeeded={portfolioOverviewDataNeeded} chartLabel={chartLabel}/>
                    
                
                </Paper>
            </Grid>
            <Grid item sm={6} xs={12} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <h1>Comment Section</h1>
                <Divider style={{ margin: '20px 0' }} />
                    <CommentSection currentId={currentId} post={post}/>
                    <Divider style={{ margin: '20px 0' }} />
                    <RecommendedPosts/>
                

                </Paper>
                
            </Grid>
        </Grid>
        </Box>

    )
}


export default PortfolioOverview
