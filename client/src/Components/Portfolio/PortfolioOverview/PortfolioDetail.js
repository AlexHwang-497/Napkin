import React, { Fragment, useEffect,useState } from 'react';
import { Paper, Typography, CircularProgress, Divider,Grid,Card,Fab } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import CommentSection from '../../PostDetails/CommentSection';
import PortfolioReturnTable from './PortfolioReturnTable';
import { getPortfolio, getPortfoliosBySearch } from '../../../actions/portfolio';
import { OrganizeData, monthlyReturn,subSet,calcBeta,getVariance,getStandardDeviation, calculateCumulativeReturn,totalPortfolioValue,totalPortfolioValueReturns, calculateAnnualizedReturn,calcCovariance, calcAlpha } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'


function PortfolioDetail({priceData, currentId,assets,ownership,portfolioName,sector,stockData,yearArr}) {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  console.log('[PortfolioDetail.post',post)
  console.log('[PortfolioDetail.yearArr',yearArr)
  let calculations = []
  let [spxCumulativeReturn,setSpxCumulativeReturn] =useState()
  
  if(yearArr.length===0 || !yearArr) return []
  // const dateLabels = ['1yr', '3yr', '5yr','6yr'];
  const dateLabels = yearArr.slice(1);
  const dates = dateLabels.map(label => {
    const yearNumber = parseInt(label.split('yr')[0]);
    return generateHistoricalDate(yearNumber);
  });
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

  const spxValue = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map((entry)=>entry.arrPeriodReturn)[0]
    // console.log('[PortfolioDetail.spxValue.monReturn',data)
    return data
  })
  const spxCumulativeReturnValue = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map((entry)=>entry.securityCumulativeReturn)[0]
    console.log('[PortfolioDetail.spxCumulativeReturnValue.monReturn',data)
    return data
  })
  console.log('[PortfolioDetail.spxCumulativeReturnValue',spxCumulativeReturnValue)






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
const portfolioAlpha = calcAlpha(portfolioBeta,riskFreeRate,portfolioCumulativeReturn,spxCumulativeReturnValue)
if(portfolioStdDev && portfolioStdDev.length>0) {
  calculations = calculations.map((entry,i)=>[...entry,portfolioStdDev[i],portfolioBeta[i],portfolioAlpha[i]])
}

console.log('[PortfolioDetail.portfolioStdDev',portfolioStdDev)
console.log('[PortfolioDetail.calculations',calculations)
console.log('[PortfolioDetail.portfolioVariance',portfolioVariance)
console.log('[PortfolioDetail.portfolioBeta',portfolioBeta)
console.log('[PortfolioDetail.portfolioAlpha',portfolioAlpha)
console.log('[PortfolioDetail.portfolioCumulativeReturn',portfolioCumulativeReturn)
console.log('[PortfolioDetail.portfolioCov',portfolioCov)
console.log('[PortfolioDetail.arrPortfolioReturns',arrPortfolioReturns)
console.log('[PortfolioDetail.spxValue',spxValue)


  return (
    <Fragment>
          
          
          {/* <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}> */}
          <h1>Trailing Risk and Returns of Currrent Portoflio</h1>
          <Divider style={{ margin: '20px 0' }} />
          
          

            <PortfolioReturnTable  annReturn={calculations}/>
          
          



          
          

          
            
            {/* <CommentSection post={post}/> */}
          {/* </Paper> */}

        </Fragment>
        
        
        )
      }
      
export default PortfolioDetail



