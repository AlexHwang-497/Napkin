import React, { useState, useEffect, Fragment } from "react";
import Chart from "react-apexcharts";
import {
  OrganizeData,
  monthlyReturn,
  subSet,
  getStandardDeviation,
  totalPortfolioValue,
  calculateAnnualizedReturn,
  calcCovariance,
} from "../../../Utilities";
import { generateHistoricalDate } from "../../../Utilities/DateRanges";
const ApexTreeMap = ({ treeMapData, dateIndex, format, percentile }) => {
  const arr = treeMapData[dateIndex].map((el) => el.y);
  let min = Math.min(...arr);
  let max = Math.max(...arr);

  const series = [
    {
      data: treeMapData[dateIndex],
    },
  ];

  const options = {
    legend: {
      show: false,
    },
    chart: {
      height: 350,
      type: "treemap",
    },
    title: {},
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
      },
      formatter: function (text, op) {
        if (format === "$") {
          return [
            text,
            "$" +
              op.value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }),
          ];
        } else if (format === "annual") {
          return [text, op.value.toFixed(1) + "%"];
        } else {
          return [text, Number(op.value * 100).toFixed(2) + "%"];
        }
      },
      offsetY: -4,
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
              to: (max - min) * percentile + min,
              color: "#CD363A",
            },
            {
              from: (max - min) * percentile + min + 0.000001,
              to: max,

              color: "#1B8270",
            },
          ],
        },
      },
    },
  };

  return (
    <Fragment>
      <Chart options={options} series={series} type="treemap" height={400} />
    </Fragment>
  );
};

export default ApexTreeMap;
