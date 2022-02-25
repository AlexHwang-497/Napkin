import React from 'react'
import Chart from 'react-apexcharts'
import {
  OrganizeData,
  monthlyReturn,
  subSet,
  getStandardDeviation,
  totalPortfolioValue,
  calculateAnnualizedReturn,
  calcCovariance,
} from '../../../Utilities'
import { generateHistoricalDate } from '../../../Utilities/DateRanges'
const TRLineChart = ({ priceData, title }) => {
  if (!priceData || priceData.length === 0) return <div></div>

  const combinedArr = [...priceData[1], ...priceData[2]].sort()
  const maxValue = Math.max(...combinedArr)
  const minValue = Math.min(...combinedArr)

  const series = [
    {
      name: 'SPX',
      data: priceData[1],
    },
    {
      name: 'Portfolio',
      data: priceData[2],
    },
  ]

  const options = {
    colors: ['#091F3C', '#1B8270'],
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        offsetX: 0,
        offsetY: -10,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        position: 'bottom',
        autoSelected: 'zoom',
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      dashArray: 8,
    },
    title: {
      text: title + ' Growth',
      align: 'center',
    },
    grid: {
      borderColor: '#fff',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 1.0,
      },
    },
    markers: {
      size: 4,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      categories: priceData[0],
      title: {
        text: 'Dates',
      },
      axisBorder: {
        show: true,
      },
    },
    yaxis: {
      title: {
        text: 'Value($)',
      },
      axisBorder: {
        show: true,
      },
      min: minValue,
      max: maxValue,
      labels: {
        formatter: function (y) {
          return (
            '$' +
            y.toLocaleString(undefined, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })
          )
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  }

  return <Chart options={options} series={series} type="line" height={300} />
}

export default TRLineChart
