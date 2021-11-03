import { useEffect,useState } from "react"
import config from "./config"


const FetchStockPrice= ()=>{
    let cov = require( 'compute-covariance' );
    var Finance = require('financejs');
    var finance = new Finance();
    
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
        // *iterate through the stoclist
        for(let j=0;j<stockList.length;j++){
            const historicalData = stockData[j].historical.reverse()
            let currentStock =[]
            let portfolioShares=[]
            let stockValue = []
            let sum = 0
            let openSum=0
            //todo: we are calculating the average, the cumulative return and attain prices
            for(let i=1; i<historicalData.length;i++){
                let startingPrice = historicalData[0].open
                console.log('startingprice',startingPrice)

                let cumReturn = historicalData[i].open/historicalData[i-1].open-1
                // *this calculates the number of shares for growth 10k
                if(portfolioShares.length===0){
                    // *setup initial shares
                    portfolioShares.push(10000/historicalData[i].open)
                    // *setup intial investment of 10k
                    stockValue.push(10000)
                } else {    
                    let previousShare = portfolioShares[i-2]
                    
                    // *coumpounding shares
                    portfolioShares.push(previousShare*(1+cumReturn))
                    // *growth for 10k
                    stockValue.push(historicalData[i].open*portfolioShares[i-1])
                    // console.log('portfolioShares',portfolioShares)
                    // console.log('SYMBOL:',stockList[j],'investmentGrowth',stockValue)
                }
                // *pushing values for cumulative return array; we need this for covariance
                currentStock.push(cumReturn)

                sum +=cumReturn
                openSum+=historicalData[i].open
                // console.log('i:',i,'date:',historicalData[i].date,'open:',historicalData[i].open,'sum of openPrices',openSum,'cumReturn',cumReturn,'sum of CumReturn',sum)
                // console.log('j:',j,'symbol',stockData[j],'portfolioShares:',portfolioShares,'cumReturn:',cumReturn,'previousShare',previousShare)
            }
            // *push daily return values into array for covariance
            console.log('currentStock[0]',currentStock[0])
            console.log('currentStock[last]',currentStock[currentStock.length-1])
            let finalCumulativeReturn =currentStock[currentStock.length-1]/currentStock[0]-1
            console.log('finalCumulativeReturn',finalCumulativeReturn) 
            arrCumReturn.push(currentStock)
            let stockEndingGrowthValue = stockValue[stockValue.length-1]
            console.log('stockEndingGrowthValue',stockEndingGrowthValue)
            let n = historicalData.length-1
            console.log('n',n)
            console.log('annualized return formula:', finance.CAGR(10000, stockEndingGrowthValue,252/n ))
            console.log('annualized return alex :', finance.CAGR(10000, stockEndingGrowthValue,3 ))
            let average =openSum/historicalData.length
            // console.log('symbol:',stockList[j],'average: ', average,"sum",sum,'openSum',openSum)
            // *used for calcuating stdDev
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
            console.log('COVARIANCE for:',stockList[j],cov(arrCumReturn[0],arrCumReturn[j]))
        }
        console.log(arrCumReturn)
        
    },[stockData])



    return (
        <div>

            <h1>this is the stockData:{stockList}</h1>

        </div>
    )

}
export default FetchStockPrice

