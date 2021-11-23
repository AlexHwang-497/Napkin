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




function PortfolioOverview({currentId,assets,ownership,portfolioName,sector, image}) {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    // console.log('this is the currentId in portfolioOverview',currentId)
    // console.log('this is the assets in portfolioOverview',assets)
    // console.log('this is the ownership in portfolioOverview',ownership)
    // console.log('this is the portfolioName in portfolioOverview',portfolioName)
    // console.log('this is the sector in portfolioOverview',sector)
    // console.log('this is the post in portfolioOverview',post)

    let cov = require( 'compute-covariance' );
    var Finance = require('financejs');
    var finance = new Finance();
    const apiKey = config.FMP_API_KEY_ID
    const [stockList, setStockList] = useState([...assets] || ['AAPL'])
    const [stockData,editStockData] = useState([])
    const [stockWeight,setStockWeight]=useState([...ownership] || [0])
    const [aggregatePortfolio,setAggregatePortfolio]=useState([])
    const [totalPortfolioValue,setTotalAggregatePortfolio]=useState([])
  
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
        let arrOfCumReturns=[]
        const aggregatePortfolioValue=[]
        if(stockData.length===0) return;
        // *iterate through the stoclist
        for(let j=0;j<stockList.length;j++){
            const historicalData = stockData[j]?.results?.reverse() || []
            console.log('this is the historicalData in the innerLoop',historicalData)
            let currentStock =[]
            let arrCurrentStock=[]
            
            let portfolioShares=[]
            let stockValue = []
            let sum = 0
            let openSum=0
            //todo: we are calculating the average, the cumulative return and attain prices
            for(let i=1; i<historicalData.length;i++){
                let startingPrice = historicalData[0].o
                console.log('startingprice',startingPrice)
                // *cumulate return
                let monthlyReturn = historicalData[i].o/historicalData[i-1].o-1
                // *this calculates the number of shares for growth 10k
                if(portfolioShares.length===0){
                    // *setup initial shares
                    portfolioShares.push(10000/historicalData[i].o)
                    // *setup intial investment of 10k
                    stockValue.push(10000*ownership[j]/100)
                } else {    
                    let previousShare = portfolioShares[i-2]
                    
                    // *coumpounding shares
                    portfolioShares.push(previousShare*(1+monthlyReturn))
                    // *growth for 10k
                    stockValue.push(historicalData[i].o*portfolioShares[i-1]*ownership[j]/100)
            
                }
                // *pushing values for cumulative return array; we need this for covariance
                currentStock.push({date:historicalData[i].formated.split(' ')[0],monthlyReturn})
                
                
            }
            // arrCurrentStock.push(currentStock)
            console.log('this is the currentStock',currentStock)
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
        
        
        // aggregatePortfolioValue
    
    
    
        // *calculaitng the aggetae portfolio value
        for(let i=0;i<totalPortfolioValue[0].length;i++){
            let sum=0
            
          for(let j=0;j<totalPortfolioValue.length;j++){
            sum+=totalPortfolioValue[j][i]
          }
          
          aggregatePortfolioValue.push(sum)
        }

        // *loop and cacluates the individual stocks cumulative returns and places in array
        // for(let i=0;i<totalPortfolioValue.length;i++){
        //     console.log(''totalPortfolioValue)
        // } 

        setTotalAggregatePortfolio(totalPortfolioValue)

        console.log('this is the totalPortfolioValue',totalPortfolioValue)
        // console.log('this is the totalPortfolioValue[0] cumulative return',totalPortfolioValue[0][totalPortfolioValue.length-1]/totalPortfolioValue[0][0]-1)
        console.log('aggetgatePortfolioValue',aggregatePortfolioValue)
        console.log('this is the aggregatePortfolioValue[0]',aggregatePortfolioValue[0])
        console.log('this is aggregatePortfolioValue[aggregatePortfolioValue.length-1]',aggregatePortfolioValue[aggregatePortfolioValue.length-1])
        console.log('# of months',aggregatePortfolioValue.length)
        console.log('this is the cumulative return of the portfolio',aggregatePortfolioValue[aggregatePortfolioValue.length-1]/aggregatePortfolioValue[0]-1)
        console.log('annualized Return:',(1+(aggregatePortfolioValue[aggregatePortfolioValue.length-1]/aggregatePortfolioValue[0]-1))^(12/aggregatePortfolioValue.length)-1)
        
        // setData(aggregatePortfolioValue)
      },[stockData])



    return (
        <Grid container >
            <Grid item xs={6} >
                <Paper>
                {/*  this will need the portfolio's annuzlied return, standard devation, beta and alpha*/}
                    <PortfolioDetail assets={assets} currentId={currentId} ownership={ownership} portfolioName={portfolioName} sector={sector}/>    

                </Paper>
            </Grid>
            <Grid item xs={6} >
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            {/*  this will need the portfolio' aggreagte value*/}
                    <LineGraph 
                        endDate={'2021-11-14'}
                        startDate={'2021-01-01'}
                        assets={assets}
                        ownership={ownership}
                        portfolioName={"Ytd Growth of $10,000"}
                    />
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                {/*  this will need each individual stock's annuzlied return, standard devation, beta and alpha*/}
                    <PortfolioOverviewTable assets={assets} image={image} totalPortfolioValue={totalPortfolioValue}/>
                    
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    {/* <RecommendedPosts/> */}
                    <InventoryLineChart />
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
