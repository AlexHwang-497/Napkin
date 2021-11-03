import { useEffect,useState } from "react"
import config from "./config"


const FetchStockPrice= ()=>{
    let cov = require( 'compute-covariance' );
    
    const apiKey = config.FMP_API_KEY_ID
    const startDate='2020-01-01'
    const endDate='2021-10-01'
                
    // const [stockList, setStockList] = useState(['SPY','AAPL','AMZN','GOOG','NFLX','KKR'])
    const [stockList, setStockList] = useState(['AAPL'])
    const [stockData,editStockData] = useState([])
    const [stockWeight,setStockWeight]=useState([0,.20,.20,.20,.20,.20])

    
    useEffect(() => {
        Promise.all(
        stockList.map((stock) =>
        fetch(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${stock}?from=${startDate}&to=${endDate}&apikey=${apiKey}`)))
        .then((results) =>
            Promise.all(results.map((res) => res.json())).then((stocks) => {
            editStockData(stocks);
        })
        );
        }, []);

        
    useEffect(()=> {
        let arrCumReturn=[]
        if(stockData.length===0) return;
        // *this will iterate through the stoclist
        for(let j=0;j<stockList.length;j++){
            const historicalData = stockData[j].historical.reverse()
            let currentStock =[]
            let portfolioShares=[]
            let stockValue = []
            let sum = 0
            let openSum=0
            //todo: we are calculating the average, the cumulative return and attain prices
            for(let i=1; i<historicalData.length;i++){
                let cumReturn = historicalData[i].open/historicalData[i-1].open-1
                
                // *this calculates the number of shares 
                if(portfolioShares.length===0){
                    portfolioShares.push(10000/historicalData[i].open)
                    stockValue.push(10000)
                } else {    
                    let previousShare = portfolioShares[i-2]
                    // let previousShare = portfolioShares[i-2]
                    // console.log('previuosShare',previousShare)
                    portfolioShares.push(previousShare*(1+cumReturn))
                    stockValue.push(historicalData[i].open*portfolioShares[i-1])
                    // console.log('portfolioShares',portfolioShares)
                    console.log('stockValue',stockValue)
                }
                currentStock.push(cumReturn)
                sum +=cumReturn
                openSum+=historicalData[i].open
                // console.log('i:',i,'date:',historicalData[i].date,'open:',historicalData[i].open,'sum of openPrices',openSum,'cumReturn',cumReturn,'sum of CumReturn',sum)
                // console.log('j:',j,'symbol',stockData[j],'portfolioShares:',portfolioShares,'cumReturn:',cumReturn,'previousShare',previousShare)
    
            }
            arrCumReturn.push(currentStock)
            let n = historicalData.length-1
            console.log('n',n)
            let average =openSum/historicalData.length
            // console.log('symbol:',stockList[j],'average: ', average,"sum",sum,'openSum',openSum)

            let xMean= 0
            let xMean2= 0
            // todo: this is calculating stdDev
            for(let i=1; i<historicalData.length;i++){

                    xMean+=historicalData[i].open-average
                    xMean2+=Math.pow(historicalData[i].open-average,2)
                    // console.log(cumReturn)
                    // console.log('i:',i,'date:',historicalData[i].date,'open:',historicalData[i].open,'average',average,'xMean',xMean,'xMean^2',xMean2)
                }
            let stdDev=Math.sqrt(xMean2/n)
            // console.log('Symbol',stockList[j],'stdDev',stdDev,'xMean',xMean,'xMean^2',xMean2)
        }
        console.log(arrCumReturn)
        // console.log(cov(arrCumReturn[0],arrCumReturn[1]))
    },[stockData])



    return (
        <div>

            <h1>this is the stockData:</h1>

        </div>
    )

}
export default FetchStockPrice

