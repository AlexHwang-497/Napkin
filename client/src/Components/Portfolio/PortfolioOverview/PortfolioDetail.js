import React, { Fragment, useEffect,useState } from 'react';
import { Paper, Typography, CircularProgress, Divider,Grid,Card,Fab } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import CommentSection from '../../PostDetails/CommentSection';
import PortfolioReturnTable from './PortfolioReturnTable';
import { getPortfolio, getPortfoliosBySearch } from '../../../actions/portfolio';
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue,totalPortfolioValueReturns, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'


function PortfolioDetail({priceData, currentId,assets,ownership,portfolioName,sector,stockData}) {

  const dateLabels = ['1yr', '3yr', '5yr','6yr'];
  const dates = dateLabels.map(label => {
    const yearNumber = parseInt(label.split('yr')[0]);
    return generateHistoricalDate(yearNumber);
  });
  const portfolioAnnualizeReturn = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const annualizedReturn = calculateAnnualizedReturn(totalPortfolioValue(monthlyReturn(range)));
    return [dateLabels[index], Number.parseFloat(annualizedReturn*100).toPrecision(4)]
    
  })

  const spxValue = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map((entry)=>entry.arrPeriodReturn)[0]
    console.log('[SeasonalAnalysis.spxValue.monReturn',data)
    return data
  })






  const arrPortfolioReturns = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const aggPortfolioValueReturns = totalPortfolioValueReturns(monthlyReturn(range))
    return aggPortfolioValueReturns
})
if(!arrPortfolioReturns || arrPortfolioReturns.length===0) return;
const portfolioStdDev = getStandardDeviation(arrPortfolioReturns)

// const portfolioCov = calcCovariance(arrPortfolioReturns,spxValue)

const calculations =portfolioAnnualizeReturn
// let dataNeeded=calculations.map((el,i)=>el.concat(portfolioStdDev[i],'Hello'))
// if(!dataNeeded || dataNeeded.length===0 || dataNeeded[0]===undefined) return ;
// if(!calculations || calculations.length===0 || calculations[0]===undefined) return ;
// const calculations1 =[portfolioAnnualizeReturn.map((entry)=>entry.push(portfolioStdDev.map((el,index)=>el[index])))]
// console.log('[PortfolioDetail.portfolioStdDev',portfolioStdDev)
// console.log('[PortfolioDetail.arrPortfolioReturns',arrPortfolioReturns)
// console.log('[PortfolioDetail.dataNeeded',dataNeeded)
// console.log('[PortfolioDetail.calculations',calculations.map((el,i)=>el.concat(portfolioStdDev[i])))
// console.log('[PortfolioDetail.calculations1',calculations1)
// console.log('[calcCovariance.spxvalue',spxValue)


  return (
    <Fragment>
          
          
          <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <PortfolioReturnTable  annReturn={calculations}/>
            <Divider style={{ margin: '20px 0' }} />
            <CommentSection/>
          </Paper>

        </Fragment>
        
        
        )
      }
      
export default PortfolioDetail



