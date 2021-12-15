import React, {useState,useEffect,Fragment} from "react";
import Chart from 'react-apexcharts'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
const ApexTreeMap = ({treeMapData,dateIndex,format,percentile}) => {

  console.log('[holdings.apexTreeMax.treeMapData',treeMapData[dateIndex].map((el)=>el.y))
  const arr=  treeMapData[dateIndex].map((el)=>el.y)
  let min =  Math.min(...arr)
  let max =  Math.max(...arr)
  console.log('[holdings.apexTreeMax.max',max)
  console.log('[holdings.apexTreeMax.min',min)
  console.log('[holdings.apexTreeMax.max-min*.5',((max-min)*.5)+min)
  console.log('[holdings.apexTreeMax.max-min*.5.01',((max-min)*.5)+min+.01)
  console.log('[holdings.apexTreeMax.format',format)
    
    const series = [
      // {
      //   data:monthlyDataData[0].slice(1)
      // },
      {
        data:treeMapData[dateIndex]
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
          if (format==='$'){
            return [text, '$'+Number(op.value).toFixed(2)]

          } else if(format==='annual') {
            return [text, Number(op.value).toFixed(2)+'%']
          }else {
            return [text, Number(op.value*100).toFixed(2)+'%']
          }
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
                from: -Math.abs(min),
                to: ((max-min)*percentile)+min,
                color: '#CD363A'
              },
              {
                from: ((max-min)*percentile)+min+.000001,
                to:max,
                color: '#66DA26'
              }
            ]
          }
        }
      }
    }
    
    
    
    return(
      <Fragment>
        <Chart options={options} series={series} type="treemap" height={400} />
        

      </Fragment>
      
    )
}

export default ApexTreeMap

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