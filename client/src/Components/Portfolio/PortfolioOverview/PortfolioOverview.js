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




function PortfolioOverview({currentId,sector,portfolioName,assets,image,ownership,priceData}) {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    console.log('this is the pricedata in portfolio Overview',priceData)
    

    let cov = require( 'compute-covariance' );
    var Finance = require('financejs');
    var finance = new Finance();
    const apiKey = config.FMP_API_KEY_ID
    const [stockList, setStockList] = useState(assets || ['AAPL'])
    
    const [stockWeight,setStockWeight]=useState(ownership || [])
    const [aggregatePortfolio,setAggregatePortfolio]=useState([])
    const [totalPortfolioValue,setTotalAggregatePortfolio]=useState([])
  
    const [labels,setLabels]=useState(priceData[0])
    const [data,setData]=useState([])
    const [spx,setSpx]=useState([])
    const [ndx,setNdx]=useState([])
    const startDate ='2019-01-01'
    const endDate ='2021-11-01'
    const yearRange = ['2019','2020','2021']

console.log('this is the labels',labels)

    return (
        <Grid container >
            <Grid item xs={6} >
                <Paper>
                {/*  this will need the portfolio's annuzlied return, standard devation, beta and alpha*/}
                    <PortfolioDetail  assets={stockList} currentId={currentId} ownership={stockWeight} portfolioName={portfolioName} sector={sector}/>    

                </Paper>
            </Grid>
            <Grid item xs={6} >
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            {/*  this will need the portfolio' aggreagte value*/}
                    {/* <LineGraph 
                        endDate={'2021-11-14'}
                        startDate={'2021-01-01'}
                        assets={stockList}
                        ownership={stockWeight}
                        portfolioName={"Ytd Growth of $10,000"}
                    /> */}
                    <InventoryLineChart />
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                {/*  this will need each individual stock's annuzlied return, standard devation, beta and alpha*/}
                    <PortfolioOverviewTable assets={stockList} image={image} totalPortfolioValue={totalPortfolioValue}/>
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    <RecommendedPosts/>
                    {/* <SecondApexLineChart/> */}
                    {/* <ApexHeatChart/> */}
                    {/* <ApexDonutChart/> */}
                    {/* <ApexTreeChart/> */}
                </Paper>
            </Grid>
        </Grid>

    )
}


export default PortfolioOverview
