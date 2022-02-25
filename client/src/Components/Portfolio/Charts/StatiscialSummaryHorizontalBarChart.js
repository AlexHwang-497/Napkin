import React, { useState, useEffect, Fragment } from 'react'
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
import ReactApexChart from 'react-apexcharts'

const StatisticalSummaryHorizontalBarChart = ({
  benchmarkSectorWeighting,
  portfolioWeighting,
}) => {
  const weightingObj = portfolioWeighting.reduce(
    (obj, el) => ({ ...obj, [el.sector]: el.value }),
    {},
  )

  const sector = benchmarkSectorWeighting.map((el) => el.sector)
  const weightPercentage = benchmarkSectorWeighting.map(
    (el) => el.weightPercentage,
  )
  const benchMarkMap = benchmarkSectorWeighting.map(
    (el, i) => el.weightPercentage,
  )
  const portfolioMarkMap = benchmarkSectorWeighting.map((el, i) =>
    weightingObj[sector[i]] ? weightingObj[sector[i]] : 0,
  )

  const series = [
    {
      name: 'Portfolio',
      data: portfolioMarkMap,
    },
    {
      name: 'benchmark',
      data: benchMarkMap,
    },
  ]

  const options = {
    colors: ['#1B8270', '#091F3C'],
    chart: {
      type: 'bar',
      height: 430,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff'],
      },
    },
    stroke: {
      show: true,
      width: 0.5,
      colors: ['#fff'],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: sector,
    },
    grid: {
      borderColor: '#fff',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
  }

  return (
    <Fragment>
      <Chart options={options} series={series} type="bar" height={400} />
    </Fragment>
  )
}

export default StatisticalSummaryHorizontalBarChart
