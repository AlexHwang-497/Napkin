import React, {useState,useEffect,Fragment} from "react";
import Chart from 'react-apexcharts'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
import ReactApexChart from "react-apexcharts";


const StatisticalSummaryBarChart = ({categories,portfolioData,spxData}) => {
  // const valuesArr = data.slice(1).map((entry)=>{return entry.value})
  // const dateArr = data.slice(1).map((entry)=>{return entry.date})
  // console.log('[SeasonalBarChart.data',data)
  // console.log('[SeasonalBarChart.valuesArr',valuesArr)
  // console.log('[SeasonalBarChart.dateArr',dateArr)

console.log('[StatisticalSummary.StatisticalSummaryBarChart.portfolioData',portfolioData)
console.log('[StatisticalSummary.StatisticalSummaryBarChart.spxData',spxData)
  
  const series =  [{
    data: [portfolioData, spxData]
  }]
  
  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        
        columnWidth: '45%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false,
    },
    
    xaxis: {
      
      categories: [
        'Portfolio',
        'S&P 500',
        
      ],
      labels: {
        rotate: -90
      }
    }
  }
  
  return (
    <Fragment>
      <Chart options={options} series={series} type="bar" height={400} />
    </Fragment>
  )

}

export default StatisticalSummaryBarChart
