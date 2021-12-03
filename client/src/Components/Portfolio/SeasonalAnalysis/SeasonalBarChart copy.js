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
  console.log('[ApexLineChart.dates',dates)

  const calculations = dates.map((date, index) => {
      console.log('[ApexLineChart.calculations.date',date)

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

  console.log('[ApexLineChart.datesNeeded',datesNeeded[0])


  // console.log('[ApexLineChart.calculations--',calculations)
//     console.log('[ApexLineChart.priceData in apex',priceData)
  
  const series = [
      {
          // name: 'S&P',
          // data: standPoorPrice,
          
      },{
        name: 'Cash Flow',
              data: [1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09, 0.34, 3.88, 13.07,
                5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8, -27.03, -54.4, -47.2, -43.3, -18.6, -
                48.6, -41.1, -39.6, -37.6, -29.4, -21.4, -2.4
              ]
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
          categories:[
            '2011-01-01', '2011-02-01', '2011-03-01', '2011-04-01', '2011-05-01', '2011-06-01',
            '2011-07-01', '2011-08-01', '2011-09-01', '2011-10-01', '2011-11-01', '2011-12-01',
            '2012-01-01', '2012-02-01', '2012-03-01', '2012-04-01', '2012-05-01', '2012-06-01',
            '2012-07-01', '2012-08-01', '2012-09-01', '2012-10-01', '2012-11-01', '2012-12-01',
            '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01',
            '2013-07-01', '2013-08-01', '2013-09-01'
          ],
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
  
  

  return <Chart options={options} series={series} type="bar" height={400} />
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