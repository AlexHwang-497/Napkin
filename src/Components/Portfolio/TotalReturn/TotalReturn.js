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

function TotalReturn({id,assets,portfolioName,ownership,priceData,yearArr}) {
    if(yearArr.length===0 || !yearArr) return []
    const dateLabels = yearArr.slice(1);

    // const dateLabels = ['1yr', '3yr', '5yr','10yr'];
    const dates = dateLabels.map(label => {
        const yearNumber = parseInt(label.split('yr')[0]);
        return generateHistoricalDate(yearNumber);
    });
    // console.log('[ApexLineChart.dates',dates)

  
    const spxValue = dates.map((date, index) => {
        const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
        const data = monthlyReturn(range).map((entry)=>entry.securityGrowthValue)[0]
        // console.log('[TotalReturn.spxValue.monReturn',data)
        return data
    })
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
//   console.log('[TotalReturn.dateArr',dateArr)
//   console.log('[TotalReturn.spxValue',spxValue)
//   console.log('[TotalReturn.totalPortfolioValue',totalPortoflioValue)
let dateObj = {
    one:'12',
    two:'24',
    three:'36',
    four:'48',
    five:'60',
    six:'72',
    seven:'84',
    eight:'96',
    nine:'108',
    ten:'120',
}
let dateObjs = {
    '12':'1',
    '24':'2',
    '36':'3',
    '48':'4',
    '60':'5',
    '72':'6',
    '84':'7',
    '96':'8',
    '108':'9',
    '120':'10',
}
    const ytdData = [dateArr[0],spxValue[0],totalPortoflioValue[0]]
    const threeYearData = [dateArr[2],spxValue[2],totalPortoflioValue[2]]
    const fiveYearData = [dateArr[4],spxValue[4],totalPortoflioValue[4]]
    const longestData = [dateArr[dateLabels.length-1],spxValue[dateLabels.length-1],totalPortoflioValue[dateLabels.length-1]]
    const longestDataMonth=dateObjs[longestData[0].length] + '-Year'
    console.log('[TotalReturn.ytdData',ytdData)
    console.log('[TotalReturn.longestData',longestData)
    console.log('[TotalReturn.longestDataMonth',longestDataMonth)
    
    const endDate = '2021-11-05'
    const endYear = parseInt(endDate.split('-')[0])
    const endDay = parseInt(endDate.split('-')[2])
    const endMonth = parseInt(endDate.split('-')[1])


    
    
    const ytd =endYear + '-01-01'
    const ttm = endYear-1+'-'+endMonth+'-'+endDay
    const startDate =''
    return (
        <Grid container spacing={3}>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    
                  <TRLineChart priceData={ytdData} title={'YTD'}/>
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    
                <TRLineChart priceData={threeYearData} title={'3-Year'}  />
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    
                <TRLineChart priceData={fiveYearData} title={'5-Year'} />
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    
                    <TRLineChart priceData={longestData} title={longestDataMonth} />
                </Paper>
            </Grid>
        </Grid>
    )
}
export default TotalReturn
