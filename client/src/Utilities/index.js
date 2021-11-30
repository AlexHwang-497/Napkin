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
  console.log('this is teh data in monthlyReturn',data)
  const results=data.map((asset)=>{
    // const periodReturn=[1]
    asset.dates.reverse()
    asset.dates[0].periodReturn=1
    for(let i=1;i<asset.dates.length;i++){
      let endingPrice=asset.dates[i].price/asset.dates[i-1].price
      // console.log('endingPrice',endingPrice)
      
      asset.dates[i].periodReturn=endingPrice-1
      // periodReturn.push(4)
    }
    return {
      ...asset,
    }
  })
  return results
}


export const subSet = (data,minDate) => {
  return data.map((asset)=>({
    ...asset,
    dates:asset.dates.filter(({date})=>Date.parse(date)>=Date.parse(minDate))
  }))

}

export const shareGrowth = (data,minDate) => {
  return data.map((asset)=>({
    ...asset,
    dates:asset.dates.filter(({date})=>Date.parse(date)>=Date.parse(minDate))
  }))

}