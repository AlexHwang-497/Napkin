import React, { useState, useEffect, Fragment } from "react";
import Chart from "react-apexcharts";

import ReactApexChart from "react-apexcharts";

const PortfolioPostBarChart = ({portfolioAnnualizeReturn,spxAnnualizedReturn,}) => {
  if (!spxAnnualizedReturn || spxAnnualizedReturn.length === 0)
    return <div></div>;
  var Finance = require("financejs");
  var finance = new Finance();

  let spxAnnualizedReturnMap = spxAnnualizedReturn.map((el, i) =>
    finance.CAGR(el[0], el[el.length - 1], el.length / 12).toFixed(2)
  );

  let spxYtd = finance.CAGR(
    spxAnnualizedReturn[0][0],
    spxAnnualizedReturn[0][spxAnnualizedReturn[0].length - 1],
    12 / spxAnnualizedReturn[0].length
  );

  const series = [
    {
      name: "Portfolio",
      data: [
        (portfolioAnnualizeReturn[0] * 100).toFixed(2),
        (portfolioAnnualizeReturn[1] * 100).toFixed(2),
        (portfolioAnnualizeReturn[2] * 100).toFixed(2),
        (portfolioAnnualizeReturn[3] * 100).toFixed(2),
      ],
    },
    {
      name: "SPX",
      data: [
        spxAnnualizedReturnMap[0],
        spxAnnualizedReturnMap[1],
        spxAnnualizedReturnMap[2],
        spxAnnualizedReturnMap[3],
      ],
    },
  ];

  const options = {
    colors: ["#1B8270", "#091F3C"],
    chart: {
      type: "bar",
      height: 430,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      width: 0.5,
      colors: ["#fff"],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: [
        "TTM",
        "3-Year",
        "5-year",
        spxAnnualizedReturn.length + "-year",
      ],
    },
    title: {
      text: "Portfolio Annualized Return(%)",
      align: "left",
    },
    toolbar: {
      show: false,
    },
    grid: {
      borderColor: "#fff",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "right",
      // floating: true,
      // offsetY: -25,
      // offsetX: -5,
    },
  };

  return (
    <Fragment>
      <Chart options={options} series={series} type="bar" height={400} />
    </Fragment>
  );
};

export default PortfolioPostBarChart;
