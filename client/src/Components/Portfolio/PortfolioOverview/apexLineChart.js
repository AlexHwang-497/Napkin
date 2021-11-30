import React from 'react'
import Chart from 'react-apexcharts'

const ApexLineChart = ({date,standPoorPrice}) => {
    console.log('this is the date in apex',date)
    console.log('this is the s&p in apex',standPoorPrice)
    const series = [
        {
            name: 'S&P',
            data: standPoorPrice,
            
        },{
        //   name: "Page Views",
        //   data: [3, 14, 26, 24, 13, 18, 29, 30, 36, 15, 33, 37]
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
            categories: date,
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
