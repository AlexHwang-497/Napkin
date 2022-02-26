import React, { Fragment, useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Grid,
  Card,
  Fab,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import CommentSection from "../../PostDetails/CommentSection";
import PortfolioReturnTable from "./PortfolioReturnTable";
import {
  getPortfolio,
  getPortfoliosBySearch,
} from "../../../actions/portfolio";
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

function PortfolioDetail({
  priceData,
  currentId,
  assets,
  ownership,
  portfolioName,
  sector,
  stockData,
  yearArr,
}) {
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  let calculations = [];
  let [spxCumulativeReturn, setSpxCumulativeReturn] = useState();

  if (yearArr.length === 0 || !yearArr) return [];

  const dateLabels = yearArr.slice(1);
  const dates = dateLabels.map((label) => {
    const yearNumber = parseInt(label.split("yr")[0]);
    return generateHistoricalDate(yearNumber);
  });
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

  const spxValue = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map((entry) => entry.arrPeriodReturn)[0];

    return data;
  });
  const spxCumulativeReturnValue = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    const data = monthlyReturn(range).map(
      (entry) => entry.securityCumulativeReturn
    )[0];

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
  const portfolioCov =
    arrPortfolioReturns && arrPortfolioReturns.length > 0
      ? calcCovariance(arrPortfolioReturns, spxValue)
      : [];

  const portfolioBeta = portfolioCov.map((el, i) => el / benchmarkVariance[i]);
  const portfolioAlpha = calcAlpha(
    portfolioBeta,
    riskFreeRate,
    portfolioCumulativeReturn,
    spxCumulativeReturnValue
  );

  const portfolioSharpe = portfolioAnnualizeReturn.map(
    (el, i) => (Number(el[1] / 100) - riskFreeRate) / portfolioStdDev[i]
  );

  if (portfolioStdDev && portfolioStdDev.length > 0) {
    calculations = calculations.map((entry, i) => [
      ...entry,
      portfolioStdDev[i],
      portfolioBeta[i],
      portfolioAlpha[i],
      portfolioSharpe[i],
    ]);
  }

  return (
    <Fragment>
      <h1>Trailing Risk and Returns of Currrent Portoflio</h1>
      <Divider style={{ margin: "20px 0" }} />
      <PortfolioReturnTable annReturn={calculations} />
    </Fragment>
  );
}

export default PortfolioDetail;
