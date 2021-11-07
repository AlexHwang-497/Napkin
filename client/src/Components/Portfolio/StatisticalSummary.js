import React from 'react'
import FetchStockPrice from '../../StockData/FetchStockPrices'
import LineGraph from './Charts/LineGraph'
function StatisticalSummary() {
    return (
        <div>
            {/* <FetchStockPrice/> */}
            <LineGraph/>
        </div>
    )
}

export default StatisticalSummary
