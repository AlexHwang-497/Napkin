import React from 'react'
import Chart from 'react-apexcharts'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
const ApexLineChart = ({priceData}) => {
    const dateLabels = ['1yr', '3yr', '5yr'];
    const dates = dateLabels.map(label => {
        const yearNumber = parseInt(label.split('yr')[0]);
        return generateHistoricalDate(yearNumber);
    });
    console.log('[ApexLineChart.dates',dates)

    const calculations = dates.map((date, index) => {
        console.log('[ApexLineChart.calculations.date',date)

    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const monReturn = monthlyReturn(range)
    console.log('[ApexLineChart.calculations.monReturn',monReturn)
    const dataNeeded = monReturn.map((entry)=>entry.securityGrowthValue)
    console.log('[ApexLineChart.calculations.dataNeeded',dataNeeded)
    return dataNeeded
    // return dateArr
    
  })
  console.log('[ApexLineChart.calculations',calculations)
  console.log('[ApexLineChart.calculations.spx',calculations[0][0])
  console.log('[ApexLineChart.calculations.nflx',calculations[0][1])
  console.log('[ApexLineChart.calculations.team',calculations[0][2])

  const datesNeeded=dates.map((date,index)=>{
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const dateArr=monthlyReturn(range).map((entry)=>entry.dates.map((el)=>el.date))
    // console.log('[ApexLineChart.datesNeeded.dateArr',dateArr)
    
    return dateArr[0]
  })

    console.log('[ApexLineChart.datesNeeded',datesNeeded[0])


    // console.log('[ApexLineChart.calculations--',calculations)
//     console.log('[ApexLineChart.priceData in apex',priceData)
    
    const series = [
        {
          name: "S&P",
          data: calculations[0][0]
        },
        {
          name: "NFLX",
          data: calculations[0][1]
        },
        {
          name: "TEAM",
          data: calculations[0][2]
        },
    ]
    
    const options = {
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
                autoSelected: 'zoom'
            },
        },
        colors: ['#5d78ff', '#fbaf0f','#acaf0f'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        title: {
            text: '',
            align: 'left',
        },
        grid: {
            borderColor: "#fff",
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
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
            categories:  datesNeeded[0],
            title: {
                text: 'YTD',
            },
            axisBorder: {
                show: true,
            },
        },
        yaxis: {
            title: {
                text: '',
            },
            axisBorder: {
                show: true,
            },
            min: 8000,
            max: 42000,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
    }
    
    
    
    return <Chart options={options} series={series} type="line" height={400} />
}

export default ApexLineChart

// const series = [
//     {
//       name: "Page Views",
//       data: [10000, 20000, 26, 24, 13, 18, 29, 30, 36, 15, 33, 37]
//     },
// ]