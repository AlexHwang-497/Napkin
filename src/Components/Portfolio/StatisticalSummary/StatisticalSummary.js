import React, {Fragment,useState} from 'react'
import FetchStockPrice from '../../../StockData/FetchStockPrices'
import LineGraph from '../Charts/LineGraph'
import BarGraph from '../Charts/BarGraph'
import StatCard3 from './StatCard3'
import StatCards from './StatCards'
import StatCards2 from './StatCard2'
import { OrganizeData, monthlyReturn,subSet,calcBeta,getVariance,getStandardDeviation, calculateCumulativeReturn,totalPortfolioValue,totalPortfolioValueReturns, calculateAnnualizedReturn,calcCovariance, calcAlpha } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
import { Grid, Card,Select,MenuItem,Box, FormControl, InputLabel } from '@material-ui/core'
import StatisticalTable from './ReturnStatisticalTable'
import TotalIncomeDarkCard from './TotalIncomeDarkCard'
function StatisticalSummary({sector,assets,ownership, portfolioName,image, stockData,priceData ,yearArr,sectorWeighting}) {


    const [dateType,setDateType] = useState('ytd')
    var Finance = require('financejs');
    var finance = new Finance();

    console.log('[StatisticalSummary.priceData',priceData)
    console.log('[StatisticalSummary.sectorWeighting',sectorWeighting)
    
    console.log('[StatisticalSummary.yearArr',yearArr)

    if(yearArr.length===0 || !yearArr) return []
    const dateLabels = yearArr.slice(1);


    const dates = dateLabels.map(label => {
        const yearNumber = parseInt(label.split('yr')[0]);
        return generateHistoricalDate(yearNumber);
    });
    console.log('[StatisticalSummary.dates',dates)

  
    const spxValue = dates.map((date, index) => {
        const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
        const data = monthlyReturn(range).map((entry)=>entry.securityGrowthValue)[0]
        
        return data
    })
    console.log('[StatisticalSummary.spxValue',spxValue)

const totalPortoflioValue = dates.map((date, index) => {
        
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const aggPortfolioValue = totalPortfolioValue(monthlyReturn(range))
    
    return aggPortfolioValue
})
  console.log('[StatisticalSummary.totalPortoflioValue',totalPortoflioValue)
const totalPortoflioValueReturns = dates.map((date, index) => {
        
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const aggPortfolioValue = totalPortfolioValueReturns(monthlyReturn(range))
    
    return aggPortfolioValue
})
  console.log('[StatisticalSummary.totalPortoflioValueReturns',totalPortoflioValueReturns)

const dateArr = dates.map((date, index) => {
    
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map((entry)=>entry.dates.map((el)=>el.date))[0]
    
    return data    
  })
  console.log('[StatisticalSummary.dateArr',dateArr)
  console.log('[StatisticalSummary.dateType',dateType)
  

  

  let portfolioDataNeeded
  let spxDataNeeded


    let calculations = []
//   let [spxCumulativeReturn,setSpxCumulativeReturn] =useState()
  

  const portfolioAnnualizeReturn = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const annualizedReturn = calculateAnnualizedReturn(totalPortfolioValue(monthlyReturn(range)));
    // return Number.parseFloat(annualizedReturn*100).toPrecision(4)
    return [dateLabels[index], Number(annualizedReturn*100).toLocaleString()]
    
  })
  const portfolioCumulativeReturn = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const cumulativedReturn = calculateCumulativeReturn(totalPortfolioValue(monthlyReturn(range)));
    // return Number.parseFloat(annualizedReturn*100).toPrecision(4)
    return cumulativedReturn
    
  })
  calculations = calculations.concat(portfolioAnnualizeReturn)

  const spxCumulativeReturnValue = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map((entry)=>entry.securityCumulativeReturn)[0]
    console.log('[PortfolioDetail.spxCumulativeReturnValue.monReturn',data)
    return data
  })
  console.log('[StatisticalSummary.spxCumulativeReturnValue',spxCumulativeReturnValue)


  const securityData = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map((entry)=>entry)
    console.log('[PortfolioOverview.securityData.data/monthlyReturn',data)
    // console.log('[PortfolioOverview.pracsValue.monReturn',data)
    return data
})
console.log('[StatisticalSummary.securityData',securityData)




  const arrPortfolioReturns = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const aggPortfolioValueReturns = totalPortfolioValueReturns(monthlyReturn(range))
    return aggPortfolioValueReturns
  })
  let riskFreeRate = .0235
const portfolioVariance = getVariance(arrPortfolioReturns)
const portfolioStdDev = getStandardDeviation(arrPortfolioReturns)
const portfolioCov = arrPortfolioReturns && arrPortfolioReturns.length>0 ? calcCovariance(arrPortfolioReturns,spxValue):[]
const portfolioBeta = arrPortfolioReturns && arrPortfolioReturns.length>0 ? calcBeta(portfolioVariance,portfolioCov):[]
const maxPortfolioReturn =''
let arrPortfolioReturnsNeeded
const portfolioAlpha = calcAlpha(portfolioBeta,riskFreeRate,portfolioCumulativeReturn,spxCumulativeReturnValue)
if(portfolioStdDev && portfolioStdDev.length>0) {
  calculations = calculations.map((entry,i)=>[...entry,portfolioStdDev[i],portfolioBeta[i],portfolioAlpha[i]])
}
console.log('[StatisticalSummary.portfolioStdDev',portfolioStdDev)
console.log('[StatisticalSummary.calculations',calculations)
console.log('[StatisticalSummary.portfolioVariance',portfolioVariance)
console.log('[StatisticalSummary.portfolioBeta',portfolioBeta)
console.log('[StatisticalSummary.portfolioAlpha',portfolioAlpha)
console.log('[StatisticalSummary.portfolioCumulativeReturn',portfolioCumulativeReturn)
console.log('[StatisticalSummary.arrPortfolioReturns',arrPortfolioReturns)

let portfolioStdDevNeeded,
portfolioVarianceNeeded,
portfolioCovNeeded,
portfolioBetaNeeded,
portfolioAlphaNeeded,
spxCumulativeReturnValueNeeded,
portfolioCumulativeReturnNeeded,
portfolioAnnualizeReturnNeeded, 
spxAnnualizedReturnNeeded,
securityDataNeeded,
spxReturnStDeviation,
spxPriceStDeviation,
spxReturnMean



let neededIndex = 0
if(dateType==='ytd'){
    neededIndex = 0
    
  } else if(dateType==='3yr') {
    neededIndex = 2
    
  } else if(dateType==='5yr') {
    neededIndex = 4
    
  } else {
    neededIndex = securityData.length-1
  }
  
  securityDataNeeded=securityData[0][neededIndex]
  spxReturnStDeviation=securityDataNeeded.returnStDev
  spxPriceStDeviation=securityDataNeeded.priceStDev
  spxReturnMean=securityDataNeeded.returnMean
  let portfolioWeighting=securityData[neededIndex].slice(1).map((el)=>{return {sector:el.sector,ownership:el.ownership,portfolioValue:el.securityGrowthValue[el.securityGrowthValue.length-1]}})
  portfolioBetaNeeded=portfolioBeta[neededIndex]
  portfolioAlphaNeeded=portfolioAlpha[neededIndex]
  portfolioCovNeeded=portfolioCov[neededIndex]
  arrPortfolioReturnsNeeded=arrPortfolioReturns[neededIndex].slice(1)
  let maxarrPortfolioReturnsNeeded=Math.max(...arrPortfolioReturnsNeeded)
  let minarrPortfolioReturnsNeeded=Math.min(...arrPortfolioReturnsNeeded)
  let avgPortfolioReturnsNeeded = arrPortfolioReturnsNeeded.reduce((a,b) => a + b, 0)/arrPortfolioReturnsNeeded.length
  
  portfolioStdDevNeeded=portfolioStdDev[neededIndex]
  portfolioCumulativeReturnNeeded=portfolioCumulativeReturn[neededIndex]
  portfolioAnnualizeReturnNeeded=portfolioAnnualizeReturn[neededIndex].slice(1)
  spxCumulativeReturnValueNeeded=spxCumulativeReturnValue[neededIndex]
  spxAnnualizedReturnNeeded = finance.CAGR(spxValue[neededIndex][0],spxValue[neededIndex][spxValue.length-1],spxValue[neededIndex].length/12) ;

  console.log('[StatisticalSummary.portfolioStdDevNeeded',portfolioStdDevNeeded)
  console.log('[StatisticalSummary.portfolioCumulativeReturnNeeded',portfolioCumulativeReturnNeeded)
  console.log('[StatisticalSummary.portfolioAnnualizeReturnNeeded',portfolioAnnualizeReturnNeeded)
  console.log('[StatisticalSummary.spxCumulativeReturnValueNeeded',spxCumulativeReturnValueNeeded)
  console.log('[StatisticalSummary.spxAnnualizedReturnNeeded',spxAnnualizedReturnNeeded)
  console.log('[StatisticalSummary.arrPortfolioReturnsNeeded',arrPortfolioReturnsNeeded)
  console.log('[StatisticalSummary.maxarrPortfolioReturnsNeeded',maxarrPortfolioReturnsNeeded)
  console.log('[StatisticalSummary.minarrPortfolioReturnsNeeded',minarrPortfolioReturnsNeeded)
  console.log('[StatisticalSummary.avgPortfolioReturnsNeeded',avgPortfolioReturnsNeeded)
  console.log('[StatisticalSummary.securityDataNeeded',securityDataNeeded)
  console.log('[StatisticalSummary.spxReturnStDeviation',spxReturnStDeviation)
  console.log('[StatisticalSummary.spxPriceStDeviation',spxPriceStDeviation)
  console.log('[StatisticalSummary.spxReturnMean',spxReturnMean)
  console.log('[StatisticalSummary.portfolioBetaNeeded',portfolioBetaNeeded)
  console.log('[StatisticalSummary.portfolioAlphaNeeded',portfolioAlphaNeeded)
  console.log('[StatisticalSummary.portfolioWeighting',portfolioWeighting)




    const dateTypeHandler = (e) => {
    setDateType(e.target.value)
    }


    return (
      <Fragment>
      <FormControl>
        <InputLabel id="demo-simple-select-standard-label">Date</InputLabel>
        <Select
            value={'dateType'}
            onChange={dateTypeHandler}
            label="Date">
            <MenuItem value={'ytd'}>YTD</MenuItem>
            <MenuItem value={'3yr'}>3-Yr</MenuItem>
            <MenuItem value={'5yr'}>5-Yr</MenuItem>
            <MenuItem value={'6yr'}>{dateLabels.length}-Yr</MenuItem>
        </Select>
      </FormControl>
  
  <div className="analytics m-sm-30 mt-6">
      <Grid container spacing={2}>
          <Grid xs={12}   >
              <StatCard3 
                portfolioAnnualizedReturn={portfolioAnnualizeReturnNeeded} 
                portfolioCumulativeReturn={portfolioCumulativeReturnNeeded} 
                spxCumulativeReturn={spxCumulativeReturnValueNeeded} 
                spxAnnualizedReturn={spxAnnualizedReturnNeeded}/>
              
              <StatCards2 
                benchmarkSectorWeighting={sectorWeighting}
                portfolioWeighting={portfolioWeighting}

                />
                
              <StatCards 
                portfolioAnnualizedReturn={portfolioAnnualizeReturnNeeded} 
                portfolioCumulativeReturn={portfolioCumulativeReturnNeeded} 
                portfolioBeta={portfolioBetaNeeded}
                portfolioAlpha={portfolioAlphaNeeded}
                portfolioCov={portfolioCovNeeded}
                spxCumulativeReturn={spxCumulativeReturnValueNeeded} 
                spxAnnualizedReturn={spxAnnualizedReturnNeeded}
                spxReturnMean={spxReturnMean} 
                spxReturnStDeviation={spxReturnStDeviation}
                spxPriceStDeviation={spxPriceStDeviation}
                portfolioStdDev={portfolioStdDevNeeded}
                portfolioBeta={portfolioBeta}
                portfolioAlpha={portfolioAlpha}
                portfolioMaxReturn={maxarrPortfolioReturnsNeeded}
                portfolioMinReturn={minarrPortfolioReturnsNeeded}
                avgPortfolioReturns={avgPortfolioReturnsNeeded}/>
                
          </Grid>
      </Grid>
      
  </div>
</Fragment>
        
    )
}

export default StatisticalSummary
