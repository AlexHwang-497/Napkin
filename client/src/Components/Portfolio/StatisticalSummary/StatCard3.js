import React from 'react'
import { Grid, Card, IconButton, Icon } from '@material-ui/core'
import StatiscialSummaryBarChart from '../Charts/StatiscialSummaryBarChart'

const StatCard3 = ({portfolioAnnualizedReturn,portfolioCumulativeReturn,spxCumulativeReturn,spxAnnualizedReturn}) => {
    const statList = [
        {
            
            title: 'Annualized Return',
            amount: portfolioAnnualizedReturn,
            spxAmount:spxAnnualizedReturn
        },
        {
            
            title: 'Cumulative Return',
            amount: portfolioCumulativeReturn,
            spxAmount:spxCumulativeReturn
        },
        {
            
            title: 'Return Standard Deviation',
            amount: portfolioCumulativeReturn,
            spxAmount:spxCumulativeReturn
        },
        {
            
            title: 'Beta',
            amount: portfolioCumulativeReturn,
            spxAmount:1.0
        },
        
    ]

    return (
        <div>
            <Grid container spacing={2} >
                {statList.map((item, ind) => (
                    <Grid key={item.title} item  md={3}  xs={12} >
                        <Card elevation={3} className="p-5 flex" >
                            <div>
                                {/* <IconButton
                                    size="small"
                                    className="p-2 bg-light-gray"
                                >
                                    <Icon className="text-muted">
                                        {item.icon}
                                    </Icon>
                                </IconButton> */}
                            </div>
                            <div className="ml-4">
                                <p className="m-0 text-muted">{item.title}</p>
                                <h3 className="mt-1 text-32">
                                <StatiscialSummaryBarChart categories={0} portfolioData={item.amount.toLocaleString()} spxData={item.spxAmount.toLocaleString()}/>    
                                    
                                </h3>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default StatCard3
