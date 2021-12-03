import React, {Fragment, useState,useEffect} from 'react'
import {Grid, Paper,Card, Icon, Fab} from '@material-ui/core'
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
import EditableTable from '../EditableTable'
import EditCustomizedDialogs from '../editPortfolioDialog'
import { useDispatch, useSelector } from 'react-redux';
import PortfolioOverviewTable from './PortfolioOverviewTable'
import config from '../../../StockData/config'
import InventoryLineChart from './apexLineChart'
import SecondApexLineChart from './secondApexLineChart'
import ApexHeatChart from './ApexHeatmap'
import ApexDonutChart from './apexDoughnutchart'
import ApexTreeChart from './ApexTreeMap'
import ApexLineChart from './apexLineChart'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
import TRLineChart from '../Charts/TotalReturnLine'

function PortfolioOverview({currentId,sector,portfolioName,assets,image,ownership,priceData}) {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    // console.log('this is the pricedata in portfolio Overview',priceData)
    // console.log('[prac this is the pricedata in portfolio Overview',priceData)
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
    console.log('this is the S&P',sAndPPrice)
    
    
  
    const [labels,setLabels]=useState(priceData[0])
    const [data,setData]=useState([])
    const [spx,setSpx]=useState([])
    const [ndx,setNdx]=useState([])
    const startDate ='2019-01-01'
    const endDate ='2021-11-01'
    const yearRange = ['2019','2020','2021']

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
        console.log('[TotalReturn.spxValue.monReturn',data)
        return data
    })
    const totalPortoflioValue = dates.map((date, index) => {
        console.log('[TotalReturn.calculations.date',date)
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const aggPortfolioValue = totalPortfolioValue(monthlyReturn(range))
    console.log('[TotalReturn.totalPortoflioValue.aggPortfolioValue',aggPortfolioValue)
    return aggPortfolioValue
    
  })
    const dateArr = dates.map((date, index) => {
        console.log('[TotalReturn.calculations.date',date)
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map((entry)=>entry.dates.map((el)=>el.date))[0]
    console.log('[TotalReturn.dateArr.data',data)
    return data
    
  })
  const ytdData = [dateArr[0],spxValue[0],totalPortoflioValue[0]]

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
            {/*  this will need the portfolio' aggreagte value*/}
                    
                <TRLineChart priceData={ytdData} />
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                {/*  this will need each individual stock's annuzlied return, standard devation, beta and alpha*/}
                    <PortfolioOverviewTable priceData={priceData} assets={stockList} image={image} />
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
