import React, {useState,useEffect,Fragment} from "react";
import Chart from 'react-apexcharts'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
import ReactApexChart from "react-apexcharts";


const StatisticalSummaryHorizontalBarChart = ({benchmarkSectorWeighting, portfolioWeighting}) => {
  // const valuesArr = data.slice(1).map((entry)=>{return entry.value})
  // const dateArr = data.slice(1).map((entry)=>{return entry.date})
  // console.log('[SeasonalBarChart.data',data)
  // console.log('[SeasonalBarChart.valuesArr',valuesArr)
  // console.log('[SeasonalBarChart.dateArr',dateArr)

console.log('[StatisticalSummary.StatisticalSummaryHorizontalBarChart.portfolioWeighting',portfolioWeighting)
  const weightingObj = portfolioWeighting.reduce((obj,el)=>({...obj,[el.sector]:el.value}),{})

  console.log('[StatisticalSummary.StatisticalSummaryHorizontalBarChart.weightingObj',weightingObj)
  console.log('[StatisticalSummary.StatisticalSummaryHorizontalBarChart.benchmarkSectorWeighting',benchmarkSectorWeighting)
  const sector = benchmarkSectorWeighting.map((el)=>el.sector)
  const weightPercentage = benchmarkSectorWeighting.map((el)=>el.weightPercentage)
  const benchMarkMap = benchmarkSectorWeighting.map((el,i)=>el.weightPercentage)
  const portfolioMarkMap = benchmarkSectorWeighting.map((el,i)=>weightingObj[sector[i]]?weightingObj[sector[i]]:0)
  console.log('[StatisticalSummary.StatisticalSummaryHorizontalBarChart.benchMarkMap',benchMarkMap)
  console.log('[StatisticalSummary.StatisticalSummaryHorizontalBarChart.portfolioMarkMap',portfolioMarkMap)
  
  const series =  [{
    name: 'benchmark',
    data: benchMarkMap,
    
  },{
    name: 'Portfolio',
    data: portfolioMarkMap
  }]
  
  const options = {
    chart: {
      type: 'bar',
      height: 200
    },
    plotOptions: {
      bar: {
        horizontal:true,
        columnWidth: '45%',
        distributed: true,
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
      width: 1,
      colors: ['#fff']
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    xaxis: {
      categories: sector
    }
  }
  
  return (
    <Fragment>
      <Chart options={options} series={series} type="bar" height={400} />
    </Fragment>
  )

}

export default StatisticalSummaryHorizontalBarChart
