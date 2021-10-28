import { useEffect,useState } from "react"
import config from "./config"

const FetchStockPrice =  async() =>{
    const api = config.FMP_API_KEY_ID
    console.log('this is the api key in fetchStock',api)
    const startDate='2021-10-21'
    const endDate='2021-10-25'
    const url = `https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?from=${startDate}&to=${endDate}&apikey=${api}`
    
    const response = await fetch(url)
    console.log('this is response in fetchLatest',response)
    if(!response.ok){
        throw new Error('Something went wrong!!!')
    }
    const responseData = await response.json()
    console.log(responseData)
    const loadQuote =[]

    for(const key in responseData){
        loadQuote.push({
            symbol:responseData.symbol,
            currentPrice:responseData.historical[0].date
        })
    }
    console.log('loadQuote',loadQuote)

    return (
        <div>

            <h1>this is in here</h1>
        </div>
    )

}
export default FetchStockPrice

