import React from 'react'
import {Grid, Paper} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'

import LineGraph from '../Charts/LineGraph'
import {useDispatch, useSelector} from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
// import TRLineChart from './TotalReturnLine'
import TRLineChart from '../Charts/TotalReturnLine'

import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'

function TotalReturn({id,assets,portfolioName,ownership,priceData}) {

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
  console.log('[TotalReturn.dateArr',dateArr)
  console.log('[TotalReturn.spxValue',spxValue)
  console.log('[TotalReturn.totalPortfolioValue',totalPortoflioValue)

    const ytdData = [dateArr[0],spxValue[0],totalPortoflioValue[0]]
    const threeYearData = [dateArr[1],spxValue[1],totalPortoflioValue[1]]
    const fiveYearData = [dateArr[2],spxValue[2],totalPortoflioValue[2]]
    console.log('[TotalReturn.ytdData',ytdData)
    
    const endDate = '2021-11-05'
    const endYear = parseInt(endDate.split('-')[0])
    const endDay = parseInt(endDate.split('-')[2])
    const endMonth = parseInt(endDate.split('-')[1])
    
    
    const ytd =endYear + '-01-01'
    const ttm = endYear-1+'-'+endMonth+'-'+endDay
    const startDate =''
    return (
        <Grid container >
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    
                  <TRLineChart priceData={ytdData} title={'YTD'}/>
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    
                    <TRLineChart priceData={ytdData} title={'TTM'} />
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    
                    <TRLineChart priceData={threeYearData} title={'Three Year'}  />
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    
                    <TRLineChart priceData={fiveYearData} title={'Five Year'} />
                </Paper>
            </Grid>
        </Grid>
    )
}
export default TotalReturn
