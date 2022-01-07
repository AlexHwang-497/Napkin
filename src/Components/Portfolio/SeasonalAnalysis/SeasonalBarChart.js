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
              from: -100,
              to: -46,
              color: '#66DA26'
            }, {
              from: -45,
              to: 0,
              color: '#CD363A'
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
        type: 'datetime',
        categories: dateArr,
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

export default SeasonalBarChart
