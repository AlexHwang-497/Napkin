// import { useEffect,useState } from "react"
// import config from "./config"

// const TreasuryRates= ()=>{
    
//     const apiKey = config.FMP_API_KEY_ID
//     const startDate='2000-10-21'
//     const endDate='2021-10-25'
                
//     const [stockList, setStockList] = useState(['aapl'])
//     const [TreasuryRatesData,editTreasuryRatesData] = useState([])

//     const url = `https://financialmodelingprep.com/api/v4/treasury?from=${startDate}&to=${endDate}&apikey=${apiKey}`

    
//     useEffect(() => {
//         Promise.all(
//         stockList.map((stock) =>
//         fetch(url)))
//         .then((results) =>
//         Promise.all(results.map((res) => res.json())).then((stocks) => {
//         editTreasuryRatesData(stocks);
//         })
//         );
//         }, [stockList]);

//         console.log('this is the treasuryRates',TreasuryRatesData)
//         // console.log('this is the stockData',stockData[2].historical)

//     return (
//         <div>

//             <h1>this is the TreasuryRatesData:</h1>

//         </div>
//     )

// }
// export default TreasuryRates

