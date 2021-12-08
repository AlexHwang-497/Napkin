import React from "react";
import ReactApexChart from "react-apexcharts";

export default class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Metric1",
          data: [0, 1, 2, 3, 4, 5]
        },
        {
          name: "Metric2",
          data: [0, 1, 2, 3, 4, 5]
        },
        {
          name: "Metric3",
          data: [0, 1, 2, 3, 4, 5]
        },
        {
          name: "Metric4",
          data: [0, 1, 20, 30, 40, 500]
        },
        {
          name: "Metric5",
          data: [0, 1, 2, 3, 4, 5]
        },
        {
          name: "Metric6",
          data: [0, 1, 2, 3, 4, 5]
        },
        {
          name: "Metric7",
          data: [0, 1, 2, 3, 4, 5]
        },
        {
          name: "Metric8",
          data: [0, 1, 2, 3, 4, 5]
        },
        {
          name: "Metric8",
          data: [0, 1, 2, 3, 4, 5]
        }
      ],
      options: {
        chart: {
          height: 400,
          type: "heatmap"
        },
        stroke: {
          width: 0
        },
        plotOptions: {
          heatmap: {
            radius: 100,
            enableShades: false,
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 50,
                  color: "#CD363A"
                },
                {
                  from: 51,
                  to: 10000,
                  color: "#66DA26"
                }
              ]
            }
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ["#fff"]
          }
        },
        xaxis: {
          type: "category"
        },
        title: {
          text: "Rounded (Range without Shades)"
        }
      }
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="heatmap"
        height={400}
      />
    );
  }
}
