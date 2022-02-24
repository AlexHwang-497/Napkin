import React, {useState,useEffect,Fragment} from "react";
import Chart from 'react-apexcharts'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
import ReactApexChart from "react-apexcharts";


const StatisticalSummaryBarChart = ({title, portfolioData,spxData}) => {
  

// console.log('[StatisticalSummary.StatisticalSummaryBarChart.portfolioData',portfolioData)
// console.log('[StatisticalSummary.StatisticalSummaryBarChart.spxData',spxData)
console.log('[StatisticalSummary.StatisticalSummaryBarChart.title',title)


  
  const series =  [{
    name:'Portfolio',
    data: [portfolioData, spxData]
  }]
  
  const options = {
    colors: ['#1B8270', '#091F3C'],
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
    grid: {
      row: {
        colors: ['#f2f2f2','#fff']
      }
    },
    
    
    xaxis: {
      
      categories: [
        'Portfolio',
        'S&P 500',
        
      ],
      labels: {
        rotate: -90
      }
    },
    yaxis: {
      title: {
        text: 'Growth',
      },
      labels: {
        formatter: function (y) {
          if(title ==='Beta'){
            return y.toFixed(2)
          } else if(title==='Annualized Return' ) {
            return (y).toFixed(1) + "%";
          } else {
            return (y*100).toFixed(1) + "%";
          }
          
        }
      }
    },
  }
  
  return (
    <Fragment>
      <Chart options={options} series={series} type="bar" height={400} />
    </Fragment>
  )

}

export default StatisticalSummaryBarChart
