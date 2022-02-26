import React, { Fragment, useState } from "react";
import StatCard3 from "./StatCard3";
import StatCards from "./StatCards";
import StatCards2 from "./StatCard2";
import {
  OrganizeData,
  monthlyReturn,
  subSet,
  calcBeta,
  getVariance,
  getStandardDeviation,
  calculateCumulativeReturn,
  totalPortfolioValue,
  totalPortfolioValueReturns,
  calculateAnnualizedReturn,
  calcCovariance,
  calcAlpha,
} from "../../../Utilities";
import { generateHistoricalDate } from "../../../Utilities/DateRanges";
import {
  Grid,
  Card,
  Select,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Divider,
} from "@material-ui/core";
import StatisticalTable from "./ReturnStatisticalTable";
import TotalIncomeDarkCard from "./TotalIncomeDarkCard";
function StatisticalSummary({
  sector,
  assets,
  ownership,
  portfolioName,
  image,
  stockData,
  priceData,
  yearArr,
  sectorWeighting,
  dateSelect,
}) {
  const [dateType, setDateType] = useState("ytd");
  var Finance = require("financejs");
  var finance = new Finance();

  if (yearArr.length === 0 || !yearArr) return [];
  const dateLabels = yearArr.slice(1);

  const dates = dateLabels.map((label) => {
    const yearNumber = parseInt(label.split("yr")[0]);
    return generateHistoricalDate(yearNumber);
  });

  const spxValue = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map((entry) => entry.arrPeriodReturn)[0];
    return data;
  });

  const totalPortoflioValue = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const aggPortfolioValue = totalPortfolioValue(monthlyReturn(range));

    return aggPortfolioValue;
  });

  const totalPortoflioValueReturns = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const aggPortfolioValue = totalPortfolioValueReturns(monthlyReturn(range));

    return aggPortfolioValue;
  });

  const dateArr = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map((entry) =>
      entry.dates.map((el) => el.date)
    )[0];

    return data;
  });

  let portfolioDataNeeded;
  let spxDataNeeded;

  let calculations = [];

  const portfolioAnnualizeReturn = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const annualizedReturn = calculateAnnualizedReturn(
      totalPortfolioValue(monthlyReturn(range))
    );

    return [dateLabels[index], Number(annualizedReturn * 100).toLocaleString()];
  });
  const portfolioCumulativeReturn = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const cumulativedReturn = calculateCumulativeReturn(
      totalPortfolioValue(monthlyReturn(range))
    );

    return cumulativedReturn;
  });
  calculations = calculations.concat(portfolioAnnualizeReturn);

  const spxCumulativeReturnValue = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map(
      (entry) => entry.securityCumulativeReturn
    )[0];

    return data;
  });

  const securityData = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map((entry) => entry);

    return data;
  });

  const arrPortfolioReturns = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const aggPortfolioValueReturns = totalPortfolioValueReturns(
      monthlyReturn(range)
    );
    return aggPortfolioValueReturns;
  });
  let riskFreeRate = 0.0235;
  const benchmarkVariance = getVariance(spxValue);
  const portfolioVariance = getVariance(arrPortfolioReturns);
  const portfolioStdDev = getStandardDeviation(arrPortfolioReturns);
  const portfolioPriceStdDev = getStandardDeviation(totalPortoflioValue);
  const portfolioCov =
    arrPortfolioReturns && arrPortfolioReturns.length > 0
      ? calcCovariance(arrPortfolioReturns, spxValue)
      : [];

  const portfolioBeta = portfolioCov.map((el, i) => el / benchmarkVariance[i]);
  const maxPortfolioReturn = "";
  let arrPortfolioReturnsNeeded;
  const portfolioAlpha = calcAlpha(
    portfolioBeta,
    riskFreeRate,
    portfolioCumulativeReturn,
    spxCumulativeReturnValue
  );
  if (portfolioStdDev && portfolioStdDev.length > 0) {
    calculations = calculations.map((entry, i) => [
      ...entry,
      portfolioStdDev[i],
      portfolioBeta[i],
      portfolioAlpha[i],
    ]);
  }

  let portfolioStdDevNeeded,
    portfolioVarianceNeeded,
    portfolioCovNeeded,
    portfolioBetaNeeded,
    portfolioAlphaNeeded,
    spxCumulativeReturnValueNeeded,
    portfolioCumulativeReturnNeeded,
    portfolioAnnualizeReturnNeeded,
    spxAnnualizedReturnNeeded,
    securityDataNeeded,
    spxReturnStDeviation,
    spxPriceStDeviation,
    spxReturnMean;

  let neededIndex = 0;
  if (dateSelect === "ttm") {
    neededIndex = 0;
  } else if (dateSelect === "3yr") {
    neededIndex = 2;
  } else if (dateSelect === "5yr") {
    neededIndex = 4;
  } else {
    neededIndex = securityData.length - 1;
  }

  securityDataNeeded = securityData[neededIndex];
  let securityDataNeededPracs = securityData[neededIndex];
  spxReturnStDeviation = securityDataNeeded[0].returnStDev;
  spxPriceStDeviation = securityDataNeeded[0].priceStDev;
  spxReturnMean = securityDataNeeded[0].returnMean;
  let portfolioWeighting = securityData[neededIndex].slice(1).map((el) => {
    return {
      sector: el.sector,
      ownership: el.ownership,
      portfolioValue: el.securityGrowthValue[el.securityGrowthValue.length - 1],
    };
  });
  portfolioBetaNeeded = portfolioBeta[neededIndex];
  portfolioAlphaNeeded = portfolioAlpha[neededIndex];
  portfolioCovNeeded = portfolioCov[neededIndex];
  arrPortfolioReturnsNeeded = arrPortfolioReturns[neededIndex].slice(1);
  let maxarrPortfolioReturnsNeeded = Math.max(...arrPortfolioReturnsNeeded);
  let minarrPortfolioReturnsNeeded = Math.min(...arrPortfolioReturnsNeeded);
  let avgPortfolioReturnsNeeded =
    arrPortfolioReturnsNeeded.reduce((a, b) => a + b, 0) /
    arrPortfolioReturnsNeeded.length;

  portfolioStdDevNeeded = portfolioStdDev[neededIndex];
  portfolioCumulativeReturnNeeded = portfolioCumulativeReturn[neededIndex];
  portfolioAnnualizeReturnNeeded =
    portfolioAnnualizeReturn[neededIndex].slice(1);
  spxCumulativeReturnValueNeeded = spxCumulativeReturnValue[neededIndex];

  let spxSecurityGrowthValue = securityDataNeeded[0].securityGrowthValue;
  spxAnnualizedReturnNeeded = finance.CAGR(
    spxSecurityGrowthValue[0],
    spxSecurityGrowthValue[spxSecurityGrowthValue.length - 1],
    spxSecurityGrowthValue.length / 12
  );

  const dateTypeHandler = (e) => {
    setDateType(e.target.value);
  };

  return (
    <Fragment>
      <div className="analytics m-sm-30 mt-6">
        <Grid container spacing={2}>
          <Grid xs={12}>
            <StatCard3
              portfolioAnnualizedReturn={portfolioAnnualizeReturnNeeded}
              portfolioCumulativeReturn={portfolioCumulativeReturnNeeded}
              spxStDeviation={spxReturnStDeviation}
              portfolioStdDev={portfolioStdDevNeeded}
              spxCumulativeReturn={spxCumulativeReturnValueNeeded}
              spxAnnualizedReturn={spxAnnualizedReturnNeeded}
              portfolioBeta={portfolioBetaNeeded}
            />

            <StatCards2
              benchmarkSectorWeighting={sectorWeighting}
              portfolioWeighting={portfolioWeighting}
            />

            <StatCards
              portfolioAnnualizedReturn={portfolioAnnualizeReturnNeeded}
              portfolioCumulativeReturn={portfolioCumulativeReturnNeeded}
              portfolioStdDev={portfolioStdDevNeeded}
              portfolioBeta={portfolioBetaNeeded}
              portfolioAlpha={portfolioAlphaNeeded}
              portfolioCov={portfolioCovNeeded}
              spxCumulativeReturn={spxCumulativeReturnValueNeeded}
              spxAnnualizedReturn={spxAnnualizedReturnNeeded}
              spxReturnMean={spxReturnMean}
              spxReturnStDeviation={spxReturnStDeviation}
              spxPriceStDeviation={spxPriceStDeviation}
              portfolioStdDev={portfolioStdDevNeeded}
              portfolioBeta={portfolioBetaNeeded}
              portfolioAlpha={portfolioAlphaNeeded}
              portfolioMaxReturn={maxarrPortfolioReturnsNeeded}
              portfolioMinReturn={minarrPortfolioReturnsNeeded}
              avgPortfolioReturns={avgPortfolioReturnsNeeded}
              spxStDeviation={spxReturnStDeviation}
            />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}

export default StatisticalSummary;
