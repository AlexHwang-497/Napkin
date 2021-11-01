import { useEffect,useState } from "react"
import config from "./config"

const FetchStockPrice= ()=>{
    // console.log('this is the api key in fetchStock',api)
    
    // const url = `https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?from=${startDate}&to=${endDate}&apikey=${api}`
    
    // const response = await fetch(url)
    // console.log('this is response in fetchLatest',response)
    // if(!response.ok){
        //     throw new Error('Something went wrong!!!')
        // }
        // const responseData = await response.json()
        // console.log(responseData)
        // const loadQuote =[]
        
        // for(const key in responseData){
            //     loadQuote.push({
                //         symbol:responseData.symbol,
                //         currentPrice:responseData.historical[0].date
                //     })
                // }
                // console.log('loadQuote',loadQuote)
    const apiKey = config.FMP_API_KEY_ID
    const startDate='2000-10-21'
    const endDate='2021-10-25'
                
    const [stockList, setStockList] = useState(['AAPL','AMZN','GOOG','MSFT','TEAM','NFLX','PTON', 'FUTU', 'TIGR','NIO','SQ','TSM','PYPL','AMD','KKR','TSLA','PLTR','ASAN','SNOW','SE','ARES','LMND','BLDR','CRM','MA','INTU','Z','HD','V','FTNT','CNR','POOL','SNAP','PDD','OPEN','BABA','TWTR','ZM','BMBL','UPST'])
    const [stockData,editStockData] = useState([])

    
    useEffect(() => {
        Promise.all(
        stockList.map((stock) =>
        fetch(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${stock}?from=${startDate}&to=${endDate}&apikey=${apiKey}`
        )
        )
        ).then((results) =>
        Promise.all(results.map((res) => res.json())).then((stocks) => {
        editStockData(stocks);
        })
        );
        }, [stockList]);

        console.log('this is the stockData',stockData)
        // console.log('this is the stockData',stockData[2].historical)

    return (
        <div>

            <h1>this is the stockData:</h1>

        </div>
    )

}
export default FetchStockPrice

