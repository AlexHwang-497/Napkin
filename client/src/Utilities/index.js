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
let Finance = require('financejs');  
let finance = new Finance();
export const OrganizeData = (arr, assets, ownership) => {
  const min = arr.reduce(
    // *this caluclautes the smalles sampling of data
    (acc, entry) => (acc > entry.totalResults ? entry.totalResults : acc),
    Infinity
    );
    return arr.map((entry) => {
      console.log('this is the entry in organizeData',entry)
      const index = assets.indexOf(entry.symbol);
      console.log('this is the index in organizeData',index)
      return {
        symbol: entry.symbol,
        ownership: ownership[index],
        dates: entry.results
        .map((d) => ({
          price: d.o,
          date: d.formated.split(" ")[0],
        }))
        .slice(0, min),
      };
    });
  };

export const monthlyReturn =(data)=> {
  // console.log('[this is the data in monthlyReturn',data)
  const results=data.map((asset)=>{
    // console.log('[monthlyReturn.asset',asset)
    let firstPrice= asset.dates[asset.dates.length-1].price
    console.log('[monthlyReturn.firstPrice',firstPrice)
    // let arrOfShares=[10000/firstPrice]
    let shareGrowth=[10000/firstPrice]
    let investmentValue=[10000]
    asset.dates.reverse()
    let finalCumulativeReturn=0
    let annualizedReturn=0

    asset.dates[0].periodReturn=1

    for(let i=1;i<asset.dates.length;i++){
      // 
      let endingPrice=(asset.dates[i].price/asset.dates[i-1].price)
      // *this provides us our daily%/monthly%/annual% cumulative return
      let timeReturns = (endingPrice-1)
      asset.dates[i].periodReturn=timeReturns

      // *creates the shares compounding
      shareGrowth.push(shareGrowth[i-1]*((1+timeReturns)))
      
      // *provides the $10K value of the investment
      investmentValue.push(shareGrowth[i]*asset.dates[i].price)
      // console.log('[monthly this is the endingPrice:',endingPrice,' timeReturns:',timeReturns, 'this is the shareGrowth',shareGrowth,'this is the investmentValue',investmentValue)
    }
    let finalInvestmentValue = investmentValue[investmentValue.length-1]
    finalCumulativeReturn=finalInvestmentValue/10000
    annualizedReturn=finance.CAGR(10000,finalInvestmentValue,investmentValue.length/12)/100
    
    return {
      ...asset, shareGrowth,investmentValue,finalCumulativeReturn,annualizedReturn
    }
  })
  return results
}

export const  getStandardDeviation = (data) => {
  // const results = data.map((asset)=>{
  //   console.log('[monthlyReturn this si the data in STDDEv',asset.dates.price)
  //   let n = asset.dates.length
    console.log('[monthlyReturn this is the n in STdDev',data)
  //   asset.dates.price.reduce((acc, {price}) => acc += price, 0)
  //   // console.log('[monthlyReturn this is the mean in STdDev',mean)
  // })
  const results = data.map((asset)=>{
    console.log('[monthlyReturn this is the asset',asset)
    let sum=asset.dates.reduce((acc, {price}) => acc += price, 0)
    let n = asset.dates.length
    let mean = sum/n
    console.log('[monthlyReturn this is the sum',sum)
    console.log('[monthlyReturn this is the mean',mean)
    let stDev= Math.sqrt(asset.dates.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    console.log('[monthlyReturn this is the stDev',stDev)
    
  })
  // const mean = array.reduce((a, b) => a + b) / n
}

export const subSet = (data,minDate) => {
  return data.map((asset)=>({
    ...asset,
    dates:asset.dates.filter(({date})=>Date.parse(date)>=Date.parse(minDate)),
  }))

}

