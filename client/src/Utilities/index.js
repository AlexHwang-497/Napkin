import React, { useEffect, useState } from "react";
import PortfolioOverview from "../Components/Portfolio/PortfolioOverview/PortfolioOverview";
let Finance = require("financejs");
let finance = new Finance();
let cov = require("compute-covariance");

export const OrganizeData = (arr, assets, ownership, images, sector) => {
  console.log('index.OrganizeData.arr',arr)
  const min = arr.reduce(
    // *this caluclautes the smalles sampling of data
    (acc, entry) => (acc > entry.totalResults ? entry.totalResults : acc),
    Infinity
    );
    console.log('index.OrganizeData.min',min)
  return arr.map((entry) => {
    const index = assets.indexOf(entry.symbol);
    return {
      symbol: entry.symbol,
      ownership: ownership[index],
      images: images[index],
      sector: sector[index],
      dates: entry.results
        .map((d) => ({
          price: d.c,
          date: d.formated.split(" ")[0],
        }))
        .slice(0, min),
        
    };
  });
};

export const DividendData =(dividends) =>{
  console.log('[index.dividends are inside',dividends)
}

export const monthlyReturn = (data,div) => {
  // if (!div.length) return

  
  const divs = div
  if(div?.[0]){
    console.log('[index.monthlyreturns. hit the if statment',divs[0])
  } 
  
  console.log('[index.monthlyreturn.divs',divs)

  
  const results = data.map((asset,index) => {
    let aggPeriodReturn = [];
    let firstPrice = asset.dates[asset.dates.length - 1].price;
    let portoflioShareGrowth = [((10000 / firstPrice) * asset.ownership) / 100];
    let securityShareGrowth = [10000 / firstPrice];
    let securityGrowthValue = [10000];
    let portfolioValue = [(10000 * asset.ownership) / 100];
    asset.dates.reverse();
    let finalCumulativeReturn = 0;
    let annualizedReturn = 0;
    let arrPeriodReturn = [1];
    let returnMean = 0;
    let priceMean = 0;
    let sumPeriodReturn = 0;
    let sumPriceReturn = firstPrice;
    
    
    asset.dates[0].periodReturn = 1;

    for (let i = 1; i < asset.dates.length; i++) {
      let endingPrice = asset.dates[i].price / asset.dates[i - 1].price;
      sumPriceReturn += asset.dates[i].price;

      // *this provides us our daily%/monthly%/annual% cumulative return
      let timeReturns = endingPrice - 1;
      asset.dates[i].periodReturn = timeReturns;
      arrPeriodReturn.push(timeReturns);
      sumPeriodReturn += timeReturns;

      // *creates the shares for compounding
      portoflioShareGrowth.push(
        portoflioShareGrowth[i - 1] * (1 + timeReturns)
      );
      securityShareGrowth.push(securityShareGrowth[i - 1] * (1 + timeReturns));

      // *provides the $10K value of the investment
      portfolioValue.push(portoflioShareGrowth[i] * asset.dates[0].price);
      securityGrowthValue.push(securityShareGrowth[i] * asset.dates[0].price);
    }
    // * calculates portfolio's cumulative return
    let finalPortfolioValue = portfolioValue[portfolioValue.length - 1];
    finalCumulativeReturn =
      portfolioValue[portfolioValue.length - 1] / portfolioValue[0] - 1;

    // * caclualtes portfolio annualized return
    let portfolioValueLength = portfolioValue.length;
    let initialPortfolioValue = portfolioValue[0];
    annualizedReturn = finance.CAGR(
      initialPortfolioValue,
      finalPortfolioValue,
      portfolioValueLength / 12
    );

    // *calulates cumulative reutrn for each security in portfolio
    let securityCumulativeReturn =
      securityGrowthValue[securityGrowthValue.length - 1] /
        securityGrowthValue[0] -
      1;

    // * avg/mean for prices returns of portoflio
    priceMean = sumPriceReturn / (arrPeriodReturn.length - 1);

    // * avg/mean for montly returns of portoflio
    returnMean = sumPeriodReturn / (arrPeriodReturn.length - 1);

    //* (x- returnMean) aka numerator for returns variance calculation
    let returnsXsubMean = asset.dates
      .slice(1)
      .map(({ periodReturn }) => Math.pow(periodReturn - returnMean, 2))
      .reduce((a, b) => a + b);

    // * returns variance
    let n = arrPeriodReturn.length - 1;
    let returnsVariance = returnsXsubMean / n;

    // * return Standard Deviation
    let returnStDev = Math.sqrt(
      asset.dates
        .slice(1)
        .map(({ periodReturn }) => Math.pow(periodReturn - returnMean, 2))
        .reduce((a, b) => a + b) / n
    );

    // * price Standard Deviation
    let priceStDev = Math.sqrt(
      asset.dates
        .map(({ price }) => Math.pow(price - priceMean, 2))
        .reduce((a, b) => a + b) / n
    );

    // *update key/value pairs
    return {
      ...asset,
      portoflioShareGrowth,
      portfolioValue,
      finalCumulativeReturn,
      annualizedReturn,
      arrPeriodReturn,
      securityGrowthValue,
      returnStDev,
      returnMean,
      priceStDev,
      sumPriceReturn,
      firstPrice,
      aggPeriodReturn,
      finalPortfolioValue,
      portfolioValueLength,
      initialPortfolioValue,
      returnsXsubMean,
      returnsVariance,
      securityCumulativeReturn,
      divs
      
      
      
    };
  });

  // * calcluate covaraince, beta, alpaha and sharp ratio calculation and update key/value pairs
  // * 0 index of every portfolio is the S&P 500
  const spx = results[0];
  
  let riskfree = 0.0235;
  for (let i = 1; i < results.length; i++) {
    let covariance = cov(
      spx.arrPeriodReturn.slice(1),
      results[i].arrPeriodReturn.slice(1)
    );
    // *security covariance
    results[i].covariance = covariance[0][1];

    // * security beta
    results[i].beta = results[i].covariance / results[0].returnsVariance;

    // * security alpha
    results[i].alpha =
      results[i].finalCumulativeReturn -
      (riskfree +
        results[i].beta * (results[0].securityCumulativeReturn - riskfree));

    // * security sharpe ratio
    results[i].sharpe =
      (results[i].annualizedReturn / 100 - riskfree) / results[i].returnStDev;
  }
  return results;
};

// * combines weighted indivdual securites for array of aggreagate portfolio cashflows
export const totalPortfolioValue = (data) => {
  if (!data || data.length === 0 || !data[0].portfolioValue) return;
  let aggValue = [];

  for (let i = 0; i < data[0].portfolioValue.length; i++) {
    let sum = 0;
    for (let j = 0; j < data.length; j++) {
      sum += data[j].portfolioValue[i];
    }
    aggValue.push(sum);
  }
  return aggValue;
};

// * array of aggregate portfolio cumulative returns
export const totalPortfolioValueReturns = (data) => {
  if (!data || data.length === 0 || !data[0].portfolioValue) return;

  let aggValue = [10000];
  let cumReturn = 0;
  let arrCumReturn = [1];

  for (let i = 1; i < data[0].portfolioValue.length; i++) {
    let sum = 0;
    for (let j = 1; j < data.length; j++) {
      sum += data[j].portfolioValue[i];
    }
    let cumReturn = sum / aggValue[i - 1] - 1;
    aggValue.push(sum);

    arrCumReturn.push(cumReturn);
  }
  return arrCumReturn;
};

// * annualized returns of aggregate portfolio
export const calculateAnnualizedReturn = (aggValue) => {
  if (!aggValue || aggValue.length === 0) return;
  return (
    finance.CAGR(
      aggValue[0],
      aggValue[aggValue.length - 1],
      aggValue.length / 12
    ) / 100
  );
};

// * aggregate portfolio's cumulative return
export const calculateCumulativeReturn = (aggValue) => {
  if (!aggValue || aggValue.length === 0) return;
  return aggValue[aggValue.length - 1] / aggValue[0] - 1;
};

// * aggregate portfolio's standard deviation
export const getStandardDeviation = (data) => {
  if (!data || data.length === 0 || data[0] === undefined) return;

  let sum = data.map(
    (entry) => entry.slice(1).reduce((acc, curr) => (acc += curr)),
    0
  );

  let n = data.map((entry) => entry.length - 1);
  let mean = sum.map((entry, index) => entry / n[index]);
  const variance = data
    .map((returns, index) =>
      returns
        .slice(1)
        .map((entry) => Math.pow(entry - mean[index], 2))
        .reduce((a, b) => a + b, 0)
    )
    .map((el, i) => el / n[i]);
  const stdDev = variance.map((entry) => Math.sqrt(entry));
  return stdDev;
};

// * aggregate portfolio's variance
export const getVariance = (data) => {
  if (
    !data ||
    data.length === 0 ||
    data[0] === undefined ||
    (data.length > 0 && data[0] === undefined)
  )
    return;
  let sum = data.map(
    (entry) => entry.slice(1).reduce((acc, curr) => (acc += curr)),
    0
  );
  let n = data.map((entry) => entry.length - 1);
  let mean = sum.map((entry, index) => entry / n[index]);
  const variance = data
    .map((returns, index) =>
      returns
        .slice(1)
        .map((entry) => Math.pow(entry - mean[index], 2))
        .reduce((a, b) => a + b, 0)
    )
    .map((el, i) => el / n[i]);
  return variance;
};

// * aggregate portfolio's covariance
export const calcCovariance = (data, spxReturns) => {
  if (
    !data ||
    data.length === 0 ||
    !spxReturns ||
    spxReturns.length === 0 ||
    (data.length > 0 && data[0] === undefined)
  )
    return;

  const dataResult = data.map((entry) => entry.slice(1));
  const spxResult = spxReturns.map((entry) => entry.slice(1));
  let covResult = dataResult
    .map((entry, i) => cov(spxResult[i], entry))
    .reduce((acc, curr) => [...acc, curr[1][0]], []);
  return covResult;
};

// * aggregate portfolio's beta
export const calcBeta = (variance, coVariance) => {
  if (!variance || !coVariance) return;
  return coVariance.map((entry, i) => entry / variance[i]);
};

// * aggregate portfolio's alpha
export const calcAlpha = (
  beta,
  riskFree,
  cumulativeReturn,
  benchmarkCumulativeReturn
) => {
  if (!beta || !riskFree || !cumulativeReturn || !benchmarkCumulativeReturn)
    return;

  let calc = cumulativeReturn.map(
    (el, i) =>
      el - (riskFree + beta[i] * (benchmarkCumulativeReturn[i] - riskFree))
  );
  return calc;
};

export const subSet = (data, minDate) => {
  return data.map((asset) => ({
    ...asset,
    dates: asset.dates.filter(
      ({ date }) => Date.parse(date) >= Date.parse(minDate)
    ),
  }));
};
