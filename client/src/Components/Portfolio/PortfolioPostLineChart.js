import React, {useEffect, useState} from 'react';
import Chart from 'react-apexcharts'
import moment from "moment";
import config from '../../../StockData/config'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
const PortfolioPostLineChart = ({endDate,startDate,assets,ownership,portfolioName,title}) => {
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
  
      
    useEffect(() => {
      Promise.all(
      stockList.map((stock) =>
      fetch(
      // `https://financialmodelingprep.com/api/v3/historical-price-full/${stock}?from=${startDate}&to=${endDate}&apikey=${apiKey}`)))
      `https://financialmodelingprep.com/api/v4/historical-price-adjusted/${stock}/1/month/${startDate}/${endDate}?apikey=${apiKey}`)))
      .then((results) =>
          Promise.all(results.map((res) => res.json())).then((stocks) => {
          editStockData(stocks);
      })
      );
    }, []);
    console.log('[LineGraph',stockData)
    
    
    useEffect(()=> {
      let arrCumReturn=[]
      let totalPortfolioValue=[]
      const aggregatePortfolioValue=[]
      if(stockData.length===0) return;
      // *iterate through the stoclist
      for(let j=0;j<stockList.length;j++){
          const historicalData = stockData[j]?.results?.reverse() || []
          // console.log('this is the historicalData in the innerLoop',historicalData)
          let currentStock =[]
          
          let portfolioShares=[]
          let stockValue = []
          let sum = 0
          let openSum=0
          //todo: we are calculating the average, the cumulative return and attain prices
          for(let i=1; i<historicalData.length;i++){
              let startingPrice = historicalData[0].o
              // console.log('startingprice',startingPrice)
  
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
                  // console.log('portfolioShares',portfolioShares)
                  // console.log('SYMBOL:',stockList[j],'investmentGrowth',stockValue)
              }
              // *pushing values for cumulative return array; we need this for covariance
              currentStock.push(cumReturn)
  
              sum +=cumReturn
              openSum+=historicalData[i].o
              // console.log('i:',i,'date:',historicalData[i].formated,'open:',historicalData[i].o,'sum of openPrices',openSum,'cumReturn',cumReturn,'sum of CumReturn',sum)
              // console.log('j:',j,'symbol',stockData[j],'portfolioShares:',portfolioShares,'cumReturn:',cumReturn,'previousShare',previousShare)
          }
          totalPortfolioValue.push(stockValue)
  
          // *push daily return values into array for covariance
          // console.log('currentStock[0]',currentStock[0])
          // console.log('currentStock[last]',currentStock[currentStock.length-1])
          let finalCumulativeReturn =currentStock[currentStock.length-1]/currentStock[0]-1
          // console.log('finalCumulativeReturn',finalCumulativeReturn) 
          arrCumReturn.push(currentStock)
          let stockEndingGrowthValue = stockValue[stockValue.length-1]
          // console.log('stockEndingGrowthValue',stockEndingGrowthValue)
          let n = historicalData.length-1
          // console.log('n',n)
          // console.log('annualized return formula:', finance.CAGR(10000, stockEndingGrowthValue,252/n ))
          // console.log('annualized return alex :', finance.CAGR(10000, stockEndingGrowthValue,3 ))
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
            dates.push(historicalData[i].formated)
            
          }
          setLabels(dates)
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
      
      // console.log('aggetgatePortfolioValue',aggregatePortfolioValue)
      // console.log('this is the aggregatePortfolioValue[0]',aggregatePortfolioValue[0])
      // console.log('this is aggregatePortfolioValue[aggregatePortfolioValue.length-1]',aggregatePortfolioValue[aggregatePortfolioValue.length-1])
      // console.log('# of months',aggregatePortfolioValue.length)
      // console.log('this is the cumulative return',aggregatePortfolioValue[aggregatePortfolioValue.length-1]/aggregatePortfolioValue[0]-1)
      // console.log('annualized Return:',(1+(aggregatePortfolioValue[aggregatePortfolioValue.length-1]/aggregatePortfolioValue[0]-1))^(12/aggregatePortfolioValue.length)-1)
      
      setData(aggregatePortfolioValue)
    },[stockData])
    
    // console.log('this is the labels', labels)
    
  
  
    
 
    const series = [
        
        {
          name: "SPX",
          data: [1]
          
        },
        {
          name: "Portfolio",
          data: [2]
        },
        
    ]
    
    const options = {
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2,
            },
            toolbar: {
                tools: {
                    download: false,
                    selection: false,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: false,
                    reset: true | '<img src="/static/icons/reset.png" width="20">',
                    customIcons: []
                  },
                autoSelected: 'zoom'
            },
        },
        colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            dashArray: 8
        },
        title: {
            text: '',
            align: 'left',
        },
        grid: {
            borderColor: "#fff",
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
            },
        },
        markers: {
            size: 4,
            hover: {
                size: 6,
            },
        },
        xaxis: {
            categories:  [0],
            title: {
                text: 'Dates',
            },
            axisBorder: {
                show: true,
            },
        },
        yaxis: {
            title: {
                text: 'Value($)',
            },
            axisBorder: {
                show: true,
            },
            min: -10000,
            max: 100000,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
    }
    
    return <Chart options={options} series={series} type="line" height={400} />
}

export default PortfolioPostLineChart

