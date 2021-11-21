import React, {Fragment} from 'react'
import FetchStockPrice from '../../../StockData/FetchStockPrices'
import LineGraph from '../Charts/LineGraph'
import BarGraph from '../Charts/BarGraph'
import StatCard3 from './StatCard3'
import StatCards from './StatCards'
import StatCards2 from './StatCard2'

import { Grid, Card } from '@material-ui/core'
function StatisticalSummary() {
    return (
        <Fragment>
        <FetchStockPrice/>
        <div className="analytics m-sm-30 mt-6">
            <Grid container spacing={3}>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    <StatCards />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12}>
                    {/* <Card className="px-6 py-4 mb-6">
                        <div className="card-title">Traffic Sources</div>
                        <div className="card-subtitle">Last 30 days</div>
                        
                    </Card> */}
                </Grid>
            </Grid>
        </div>
    </Fragment>
        
    )
}

export default StatisticalSummary
