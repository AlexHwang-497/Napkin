import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import moment from 'moment'

const PortfolioPostLineChart = ({
  securityData,
  spxData,
  lineGraphData,
  portfolioData,
  datesData,
}) => {
  if (
    !spxData ||
    spxData.length === 0 ||
    !portfolioData ||
    portfolioData.length === 0
  )
    return <div></div>

  const combinedArr = [...spxData, ...portfolioData].sort()
  const maxValue = Math.max(...combinedArr)
  const minValue = Math.min(...combinedArr)

  const series = [
    {
      name: 'Portfolio',
      data: portfolioData,
    },
    {
      name: 'SPX',
      data: spxData,
    },
  ]

  const options = {
    colors: ['#1B8270', '#091F3C'],
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
        show: false,
        tools: {
          download: false,
          selection: false,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        // autoSelected: 'zoom'
      },
    },
    // colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      dashArray: 8,
    },
    title: {
      text: lineGraphData.toUpperCase() + ' Portfolio Growth of $10,0000',
      align: 'left',
    },
    grid: {
      borderColor: '#fff',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 4,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      categories: datesData,
      // title: {
      //     // text: 'Dates',
      // },
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
      position: 'bottom',
      horizontalAlign: 'right',
      floating: true,
      // offsetY: -25,
      // offsetX: -5,
    },
    tooltip: {
      enabled: true,
    },
  }

  return <Chart options={options} series={series} type="line" height={400} />
}
export default PortfolioPostLineChart
