import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class ApexHeatMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
        
          series: [{
            name: 'Metric1',
            data: ([44, 55, 41, 17, 15], {min: 0,max: 90})
          },
          {
            name: 'Metric2',
            data: ([44, 55, 41, 17, 15], {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric3',
            data: ([44, 55, 41, 17, 15], {
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
      <div className="donut">
        <Chart options={this.state.options} series={this.state.series} type="donut" width="350" />
      </div>
    );
  }
}

export default ApexHeatMap;
