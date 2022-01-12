import React, {useState,useEffect,Fragment} from "react";
import Chart from 'react-apexcharts'
// import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
// import {generateHistoricalDate} from '../../../Utilities/DateRanges'
import ReactApexChart from "react-apexcharts";


const PortfolioPostBarChart = ({portfolioAnnualizeReturn, spxAnnualizedReturn}) => {
  if(!spxAnnualizedReturn || spxAnnualizedReturn.length===0) return (<div></div>);
  var Finance = require('financejs');
  var finance = new Finance();
console.log('[PortfolioPost.PortfolioPostBarChart.portfolioAnnualizeReturn',portfolioAnnualizeReturn)
console.log('[PortfolioPost.PortfolioPostBarChart.spxAnnualizedReturn',spxAnnualizedReturn)
// console.log('[PortfolioPost.PortfolioPostBarChart.spxAnnualizedReturn.calcs',finance.CAGR(spxAnnualizedReturn[0][0],spxAnnualizedReturn[0][spxAnnualizedReturn[0].length-1],12/spxAnnualizedReturn[0].length))
// let spxYtd = finance.CAGR(spxAnnualizedReturn[0][0],spxAnnualizedReturn[0][spxAnnualizedReturn[0].length-1],12/spxAnnualizedReturn[0].length)
// let spxTwoyear = finance.CAGR(spxAnnualizedReturn[2][0],spxAnnualizedReturn[2][spxAnnualizedReturn[2].length-1],12/spxAnnualizedReturn[2].length)
  
  const series =  [
    {
      name: 'Portfolio ',
      data: [portfolioAnnualizeReturn[0],portfolioAnnualizeReturn[1],portfolioAnnualizeReturn[2],portfolioAnnualizeReturn[3]]
    },
    {
    name: 'benchmark ',
    data: [.2,.4,.5,.20],
    },
]
  
  const options = {
    chart: {
      type: 'bar',
      height: 430
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        }
      }
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },stroke: {
      show: true,
      width: .5,
      colors: ['#fff']
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    xaxis: {
      categories: ['TTM','3-Year','5-year','10-year']
    },
  }
  
  return (
    <Fragment>
      <Chart options={options} series={series} type="bar" height={400} />
    </Fragment>
  )

}

export default PortfolioPostBarChart
