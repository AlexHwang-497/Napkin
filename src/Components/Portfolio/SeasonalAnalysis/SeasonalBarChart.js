import React, {useState,useEffect,Fragment} from "react";
import Chart from 'react-apexcharts'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance,totalPortfolioValueReturns } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
const SeasonalBarChart = ({data}) => {
    const valuesArr = data.slice(1).map((entry)=>{return entry.value})
    const dateArr = data.slice(1).map((entry)=>{return entry.date})
    // console.log('[SeasonalBarChart.data',data)
    // console.log('[SeasonalBarChart.valuesArr',valuesArr)
    // console.log('[SeasonalBarChart.dateArr',dateArr)

    
    const series = [
        
        {
        name: 'Return %',
        data: valuesArr
        },
    ]
    
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [{
              from: 0,
              to: 100,
              
              // color: '#66DA26'
              color: '#1B8270'
            }, {
              from: -100,
              to: 0,
              // color: '#CD363A'
              
              color: '#CD363A'
            }]
          },
          columnWidth: '150%',
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
        type: 'datetime',
        categories: dateArr,
        labels: {
          rotate: -90
        }
      },
      grid: {
        borderColor: "#fff",
        row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 1.0,
        },
    },
    }
    
    return (
      <Fragment>
        <Chart options={options} series={series} type="bar" height={400} />
      </Fragment>
    )

}

export default SeasonalBarChart
