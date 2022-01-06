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

console.log('[StatisticalSummary.StatisticalSummaryBarChart.benchmarkSectorWeighting',benchmarkSectorWeighting)
console.log('[StatisticalSummary.StatisticalSummaryBarChart.benchmarkSectorWeighting.sector',benchmarkSectorWeighting.map((el)=>el.sector))
const sector =benchmarkSectorWeighting.map((el)=>el.sector)
const benchmarkWeight =benchmarkSectorWeighting.map((el)=>el.weightPercentage)
console.log('[StatisticalSummary.StatisticalSummaryBarChart.portfolioWeighting',portfolioWeighting)
  
  const series =  [{
    data: benchmarkWeight,
    
  },{data: [53, 32, 33, 52, 13, 44, 32]}]
  
  const options = {
    chart: {
      type: 'bar',
      height: 430
    },
    plotOptions: {
      bar: {
        horizontal:true,
        columnWidth: '45%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false,
    },
    
    xaxis: {
      
      categories: 
        sector
        
      ,
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

export default StatisticalSummaryHorizontalBarChart
