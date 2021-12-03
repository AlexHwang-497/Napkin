import React, {useState,useEffect,Fragment} from "react";
import Chart from 'react-apexcharts'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
const SeasonalBarChart = ({priceData}) => {
  
    const dateLabels = ['1yr', '3yr', '5yr'];
    const dates = dateLabels.map(label => {
        const yearNumber = parseInt(label.split('yr')[0]);
        return generateHistoricalDate(yearNumber);
    });
    console.log('[ApexBarChart.dates',dates)

    const calculations = dates.map((date, index) => {
        console.log('[ApexBarChart.calculations.date',date)

    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const monReturn = monthlyReturn(range)
    console.log('[ApexBarChart.calculations.monReturn',monReturn)
    const dataNeeded = monReturn.map((entry)=>entry.securityGrowthValue)
    console.log('[ApexBarChart.calculations.dataNeeded',dataNeeded)
    return dataNeeded
    // return dateArr
    
  })
    const monthlyDataData = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const monReturn = monthlyReturn(range)
    console.log('[ApexBarChart.monthlyData.monReturn.entry',monReturn.map((entry)=>entry))
    console.log('[ApexBarChart.monthlyData.monReturn',monReturn.map((entry)=>{return {'x':entry.symbol,'y':entry.portfolioValue[entry.portfolioValue.length-1]}}))
    return monReturn.map((entry)=>{return {'x':entry.symbol,'y':entry.portfolioValue[entry.portfolioValue.length-1]}})
    
    
  })
  console.log('[ApexBarChart.monthlyData.monthlyDataData.final',monthlyDataData[0].slice(1))

  
  // console.log('[ApexBarChart.monthlyData.symbol',monthlyDataData[0].map((entry)=>entry.symbol))
  // const symbolNeeded=monthlyDataData[0].map((entry)=>entry.symbol).slice(1)
  // console.log('[ApexBarChart.monthlyData.entry',monthlyDataData[0].map((entry)=>entry.portfolioValue[entry.portfolioValue.length-1]).slice(1))
  // const values = monthlyDataData[0].map((entry)=>entry.portfolioValue[entry.portfolioValue.length-1]).slice(1)
    
    const series = [
      {
        data:monthlyDataData[0].slice(1)
      }
      
        
    ]
    
    const options = {
      legend: {
        show: false
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
      title: {
        text: 'Current Portfolio'
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '12px',
        },
        formatter: function(text, op) {
          return [text, op.value]
        },
        offsetY: -4
      },
      plotOptions: {
        treemap: {
          enableShades: true,
          shadeIntensity: 0.5,
          reverseNegativeShade: true,
          distributed: true,
          colorScale: {
            ranges: [
              {
                from: -6,
                to: 10000,
                color: '#CD363A'
              },
              {
                from: 10000.5,
                to: 1000000,
                color: '#52B12C'
              }
            ]
          }
        }
      }
    }
    
    
    
    return(
      <Fragment>
        <Chart options={options} series={series} type="bar" height={400} />
        

      </Fragment>
      
    )
}

export default SeasonalBarChart

//   data:[
      //     {
      //       x:'new Delhi',
      //       y:218,
      //     },
      //     {
      //       x:'new york',
      //       y:100,
      //     },
      //     {
      //       x:'los Angels',
      //       y:100,
      //     },
      //   ]
      
      // }