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
    // console.log('[ApexLineChart.dates',dates)

    const calculations = dates.map((date, index) => {
        // console.log('[ApexLineChart.calculations.date',date)

    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const monReturn = monthlyReturn(range)
    console.log('[ApexLineChart.calculations.monReturn',monReturn)
    const dateArr = monReturn.map((entry)=>entry.dates.map((el)=>el.date))
    return dateArr
    // return dateArr
    // console.log('[ApexLineChart.calculations.dateArr',dateArr)
    
  })

  const datesNeeded=dates.map((date,index)=>{
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const dateArr=monthlyReturn(range).map((entry)=>entry.dates.map((el)=>el.date))
    // console.log('[ApexLineChart.datesNeeded.dateArr',dateArr)
    return dateArr[0]
  })

    // console.log('[ApexLineChart.datesNeeded',datesNeeded[0])


    // console.log('[ApexLineChart.calculations--',calculations)
//     console.log('[ApexLineChart.priceData in apex',priceData)
    
    const series = [
        {
            // name: 'S&P',
            // data: standPoorPrice,
            
        },{
          name: "Page Views",
          data: [3, 14, 26, 24, 13, 18, 29, 30, 36, 15, 33, 37]
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
        colors: ['#5d78ff', '#fbaf0f'],
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
            categories: datesNeeded[0],
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
            min: 5,
            max: 500,
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
