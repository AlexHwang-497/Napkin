import React from 'react'
import Chart from 'react-apexcharts'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
const HeatMapChart = ({dataNeeded}) => {
  console.log('[HeatMapChart.dataNeeded',dataNeeded)
  const results = dataNeeded.map((entry)=>{return {'name':entry[0],'data':entry.map((el)=>el.value)}})
  console.log('[HeatMapChart.results',results.slice(3))
  
    const series = [
        
        {
          name: "Metric 1",
          data: [0.5, 0.1, 0.2, .3, 0.4, 0.5,0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.05]
          
        },

        
        results[4],
        results[5],
        results[6],
        results[7],
        
         
        
        
    ]
    
    const options = {
      chart: {
        height: 400,
        type: "heatmap"
      },
      stroke: {
        width: 0
      },
      plotOptions: {
        heatmap: {
          radius: 20,
          enableShades: false,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 0.05,
                color: "#CD363A"
              },
              {
                from: .05,
                to: 1,
                color: "#66DA26"
              }
            ]
          }
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#fff"]
        }
      },
      xaxis: {
        type: "category",
        categories:['Jan','Feb',"Mar",'Apr','May','Jun',"Jul",'Aug','Sep','Oct','Nov','Dec']

      },
      title: {
        text: "Rounded (Range without Shades)"
      }
    }
    
    return <Chart options={options} series={series} type="heatmap" height={400} />
}

export default HeatMapChart

