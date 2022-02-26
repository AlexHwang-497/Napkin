import React from 'react'
import { Grid, Card, IconButton, Icon,Divider } from '@material-ui/core'
import StatiscialSummaryBarChart from './StatiscialSummaryBarChart'

const StatCard3 = ({portfolioAnnualizedReturn,portfolioBeta,spxStDeviation,portfolioCumulativeReturn,portfolioStdDev,spxCumulativeReturn,spxAnnualizedReturn}) => {
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
            amount: portfolioStdDev,
            spxAmount:spxStDeviation
        },
        {
            
            title: 'Beta',
            amount: portfolioBeta,
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
                                <h1 className="m-0 text-muted">{item.title}</h1>
                                <h3 className="mt-1 text-32">
                                <Divider style={{ margin: '20px 0' }} />
                                
                                <StatiscialSummaryBarChart title={item.title} portfolioData={item.amount.toLocaleString()} spxData={item.spxAmount.toLocaleString()}/>    
                                    
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
