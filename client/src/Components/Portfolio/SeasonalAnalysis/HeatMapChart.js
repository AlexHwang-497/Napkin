import React from 'react'
import Chart from 'react-apexcharts'
import {ReactApexChart} from 'react-apexcharts'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'

class HeatMapChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [
        {
          name: 'Metric1',
          data: ([4,5,6], {
            min: 0,
            max: 90
          })
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'heatmap',
        },
        stroke: {
          width: 0
        },
        plotOptions: {
          heatmap: {
            radius: 30,
            enableShades: false,
            colorScale: {
              ranges: [{
                  from: 0,
                  to: 50,
                  color: '#008FFB'
                },
                {
                  from: 51,
                  to: 100,
                  color: '#00E396'
                },
              ],
            },
        
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#fff']
          }
        },
        xaxis: {
          type: 'category',
        },
        title: {
          text: 'Rounded (Range without Shades)'
        },
      },
    
    
    };
  }



  render() {
    return (
      

<div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="heatmap" height={350} />
</div>


    );
  }
}

export default HeatMapChart

