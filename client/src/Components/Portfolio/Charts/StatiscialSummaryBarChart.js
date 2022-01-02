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
    data: [21, 22, 10, 28, 16, 21, 13, 30]
  }]
  
  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [{
            from: -100,
            to: -46,
            color: '#F15B46'
          }, {
            from: -45,
            to: 0,
            color: '#FEB019'
          }]
        },
        columnWidth: '90%',
      }
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      title: {
        text: 'Growth',
      },
      labels: {
        formatter: function (y) {
          return y.toFixed(1)*100 + "%";
        }
      }
    },
    xaxis: {
      
      categories: [
        ['John', 'Doe'],
        ['Joe', 'Smith'],
        ['Jake', 'Williams'],
        'Amber',
        ['Peter', 'Brown'],
        ['Mary', 'Evans'],
        ['David', 'Wilson'],
        ['Lily', 'Roberts'], 
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
