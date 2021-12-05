import React, { useEffect,useState } from 'react';
import PortfolioOverview from '../Components/Portfolio/PortfolioOverview/PortfolioOverview';
/* Data comes in the following format: 
{
  symbol: "symbol", //stock symbol
  totalResults: 120, //total results
  results: [
      {
      o: 689.06,
      h: 700.9894,
      c: 665.64,
      l: 642.11,
      v: 56394908,
      t: 1635739200000,
      formated: "2021-11-01 00:00:00",
    }
  ]
}
Data model:
{
  symbol,
  ownership,
  image,
  sector,
  benchmark ?,
  dates :[
    {
      price,
      date
    }
  ] 
}
*/




// ! arr = results above
let Finance = require("financejs");
let finance = new Finance();
let cov = require( 'compute-covariance' );



export const OrganizeData = (arr, assets, ownership,images,sector) => {
  
  const min = arr.reduce(
    // *this caluclautes the smalles sampling of data
    (acc, entry) => (acc > entry.totalResults ? entry.totalResults : acc),
    Infinity
  );
  return arr.map((entry) => {
    console.log("this is the entry in organizeData", entry);
    const index = assets.indexOf(entry.symbol);
    console.log("this is the index in organizeData", index);
    return {
      symbol: entry.symbol,
      ownership: ownership[index],
      images:images[index],
      sector:sector[index],
      dates: entry.results
        .map((d) => ({
          price: d.o,
          date: d.formated.split(" ")[0],
        }))
        .slice(0, min),
    };
  });
};

export const monthlyReturn = (data) => {
  // console.log('[this is the data in monthlyReturn',data)
  const results = data.map((asset) => {
    let aggPeriodReturn=[]

    // console.log('[monthlyReturn.asset',asset)
    let firstPrice = asset.dates[asset.dates.length - 1].price;
    
    let portoflioShareGrowth = [((10000 / firstPrice) * asset.ownership) / 100];
    // let securityShareGrowth = [((10000 / firstPrice)  / 100];
    // let shareGrowth = [((10000 / firstPrice) * asset.ownership) / 100];
    let securityShareGrowth = [10000 / firstPrice];
    let securityGrowthValue = [10000]
    let portfolioValue = [(10000 * asset.ownership) / 100];
    asset.dates.reverse();
    let finalCumulativeReturn = 0;
    let annualizedReturn = 0;
    let arrPeriodReturn=[1]
    let returnMean=0
    let priceMean=0
    
    let sumPeriodReturn=0
    let sumPriceReturn=firstPrice

    asset.dates[0].periodReturn = 1;

    for (let i = 1; i < asset.dates.length; i++) {
      //
      let endingPrice = asset.dates[i].price / asset.dates[i - 1].price;
      sumPriceReturn+= asset.dates[i].price
      // *this provides us our daily%/monthly%/annual% cumulative return
      let timeReturns = endingPrice - 1;
      asset.dates[i].periodReturn = timeReturns;
      arrPeriodReturn.push(timeReturns)
      sumPeriodReturn+=timeReturns


      // *creates the shares compounding
      portoflioShareGrowth.push(portoflioShareGrowth[i - 1] * (1 + timeReturns));
      securityShareGrowth.push(securityShareGrowth[i - 1] * (1 + timeReturns));

      // *provides the $10K value of the investment
      portfolioValue.push(portoflioShareGrowth[i] * asset.dates[i].price);
      securityGrowthValue.push(securityShareGrowth[i]*asset.dates[i].price)
      // console.log('[monthly this is the endingPrice:',endingPrice,' timeReturns:',timeReturns, 'this is the shareGrowth',shareGrowth,'this is the investmentValue',investmentValue)
      // Number.parseFloat(row.finalCumulativeReturn*100).toPrecision(5)
    }
    // aggPeriodReturn.push(arrPeriodReturn)
    let finalportfolioValue = portfolioValue[portfolioValue.length -1];
    finalCumulativeReturn = (portfolioValue[portfolioValue.length-1]/portfolioValue[0])-1;
    annualizedReturn =finance.CAGR(10000, finalportfolioValue, portfolioValue.length / 12) ;
    returnMean=sumPeriodReturn/(arrPeriodReturn.length-1)
    priceMean=sumPriceReturn/(arrPeriodReturn.length-1)
    let n = arrPeriodReturn.length-1
    // *returns stdDev
    let returnStDev = Math.sqrt(
      asset.dates.map(({periodReturn}) => Math.pow(periodReturn - returnMean, 2)).reduce((a, b) => a + b) / n
    );
    // * returns pricesStDev
    let priceStDev = Math.sqrt(
      asset.dates.map(({price}) => Math.pow(price - priceMean, 2)).reduce((a, b) => a + b) / n
    );
    // console.log('[portfoliooverview.pracs.stDev',returnStDev)
    // console.log('[portfoliooverview.pracs.aggPeriodReturn',aggPeriodReturn)
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
      aggPeriodReturn
    };
  });
  // console.log('[PortfolioOverview.pracs.index.finalPortfolioValue]',finalportfolioValue)
  // const mean = results.arrPeriodReturn((acc,curr)=>acc+=curr)
  
  return results;
};

export const totalPortfolioValue = (data) => {
  if (!data || data.length === 0 || !data[0].portfolioValue) return;
  let aggValue = [];
  let annualizedReturn = 0;
  // console.log('[index',data)

  for (let i = 0; i < data[0].portfolioValue.length; i++) {
    let sum = 0;
    for (let j = 0; j < data.length; j++) {
      sum += data[j].portfolioValue[i];
      // console.log('[index.sum',sum)
    }
    aggValue.push(sum);
    // console.log('[index.aggValue',aggValue,'[index.sum',sum)
  }
  return aggValue;
};
export const totalPortfolioValueReturns = (data) => {
  if (!data || data.length === 0 || !data[0].portfolioValue) return;
  let aggValue = [];
  let arrCumReturn = [1];
  let cumReturn=0 
  // console.log('[index.totalPortfolioValueReturns.data',data)
  for (let i = 0; i < data[0].portfolioValue.length; i++) {
    let sum = 0;
    for (let j = 0; j < data.length; j++) {
      sum += data[j].portfolioValue[i];
      let cumReturn = data[j]/data[j-1]
    }
    arrCumReturn.push(cumReturn)
    aggValue.push(sum);

  }
  // console.log('agg')
  return aggValue;
  


  
};

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

export const getStandardDeviation = (data) => {

  // console.log("[monthlyReturn this is the n in STdDev", data);
  const results = data.map((asset) => {
    console.log("[getStdDev this is the asset", asset);
    let sum = asset.dates.reduce((acc, { price }) => (acc += price), 0);
    let n = asset.dates.length;
    let mean = sum / n;
    // console.log("[monthlyReturn this is the sum", sum);
    // console.log("[monthlyReturn this is the mean", mean);
    let stDev = Math.sqrt(
      asset.dates.map(({price}) => Math.pow(price - mean, 2)).reduce((a, b) => a + b) / n
    );
    console.log("[getStdDev this is the stDev", stDev);
    return stDev;
  });
  //Results is an array of standard deviation values for each asset - do we take the avg?
  return results.reduce((sum, st)=> sum + st, 0) / results.length;
  // const mean = array.reduce((a, b) => a + b) / n
};
console.log('[index.getStandardDeviation',getStandardDeviation)

export const calcCovariance = (data) => {
  if(!data || data.length===0) return;
  console.log('[calcCovariance: this is the data',data)
  const result = data.map((entry)=>
    entry.arrPeriodReturn
  )
  
  console.log('[calcCovariance: this is the spResult',result)
  let covResult=cov(result[0].slice(1),result[2].slice(1))
  console.log('[calcCovariance: this is the covResult',covResult)


}

export const subSet = (data, minDate) => {
  return data.map((asset) => ({
    ...asset,
    dates: asset.dates.filter(
      ({ date }) => Date.parse(date) >= Date.parse(minDate)
    ),
  }));
};
