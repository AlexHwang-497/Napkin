import React from 'react'
import { Grid, Card, IconButton, Icon } from '@material-ui/core'
import StatiscialSummaryBarChart from '../Charts/StatiscialSummaryBarChart'

const StatCard3 = ({portfolioAnnualizedReturn,portfolioCumulativeReturn,spxCumulativeReturn,spxAnnualizedReturn}) => {
    const statList = [
        {
            icon: 'Annualized return',
            title: 'Annualized Return',
            amount: portfolioAnnualizedReturn,
            spxAmount:spxAnnualizedReturn
        },
        {
            icon: 'Cumulative Return',
            title: 'Cumulative Return',
            amount: portfolioCumulativeReturn,
            spxAmount:spxCumulativeReturn
        },
        
    ]

    return (
        <div>
            <Grid container spacing={3}>
                {statList.map((item, ind) => (
                    <Grid key={item.title} item  md={4}  xs={12}>
                        <Card elevation={3} className="p-5 flex">
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
                                    {item.amount.toLocaleString()}
                                    {item.spxAmount.toLocaleString()}
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
