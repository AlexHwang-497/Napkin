import React, {Fragment} from 'react'
import FetchStockPrice from '../../../StockData/FetchStockPrices'
import LineGraph from '../Charts/LineGraph'
import BarGraph from '../Charts/BarGraph'
import StatCard3 from './StatCard3'
import StatCards from './StatCards'
import StatCards2 from './StatCard2'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
import { Grid, Card } from '@material-ui/core'
import StatisticalTable from './StatisticalTable'
function StatisticalSummary({sector,assets,ownership, portfolioName,image, stockData,priceData ,yearArr}) {
    console.log('[StatisticalSummary.priceData',priceData)
    console.log('[StatisticalSummary.yearArr',yearArr)
    if(yearArr.length===0 || !yearArr) return []
    const dateLabels = yearArr.slice(1);

    // const dateLabels = ['1yr', '3yr', '5yr','10yr'];
    const dates = dateLabels.map(label => {
        const yearNumber = parseInt(label.split('yr')[0]);
        return generateHistoricalDate(yearNumber);
    });
    console.log('[StatisticalSummary.dates',dates)

  
    const spxValue = dates.map((date, index) => {
        const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
        const data = monthlyReturn(range).map((entry)=>entry.securityGrowthValue)[0]
        // console.log('[TotalReturn.spxValue.monReturn',data)
        return data
    })
    console.log('[StatisticalSummary.spxValue',spxValue)
    const totalPortoflioValue = dates.map((date, index) => {
        // console.log('[TotalReturn.calculations.date',date)
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const aggPortfolioValue = totalPortfolioValue(monthlyReturn(range))
    // console.log('[TotalReturn.totalPortoflioValue.aggPortfolioValue',aggPortfolioValue)
    return aggPortfolioValue
    
  })
    const dateArr = dates.map((date, index) => {
        // console.log('[TotalReturn.calculations.date',date)
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map((entry)=>entry.dates.map((el)=>el.date))[0]
    // console.log('[TotalReturn.dateArr.data',data)
    return data
    
  })
  console.log('[StatisticalSummary.dateArr',dateArr)


    return (
        <Fragment>
        <div className="analytics m-sm-30 mt-6">
            <Grid container spacing={3}>
                {/* <Grid item lg={8} md={8} sm={12} xs={12}> */}
                    <StatCard3 />
                    <StatCards />
                    <StatCards2 />
                    {/* <StatisticalTable  ownership={ownership} data={securityData} assets={assets} dateIndex={dateIndex} sector={sector} image={image}/> */}
                {/* </Grid> */}

                    
                
            </Grid>
        </div>
    </Fragment>
        
    )
}

export default StatisticalSummary
