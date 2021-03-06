import React from 'react'
import { Grid, Card, Icon, IconButton,Divider, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ReturnStatisticalTable from './ReturnStatisticalTable'
import RiskReturnStatisticalTable from './RiskReturnStatisticalTable'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    icon: {
        fontSize: '60px',
        opacity: 0.8,
        color: palette.primary,
        // color: palette.primary.main,
    },
}))

const StatCards = ({avgPortfolioReturns,spxStDeviation,portfolioBeta,portfolioAlpha,portfolioCov,spxReturnStDeviation,spxReturnMean,spxPriceStDeviation,portfolioAnnualizedReturn, portfolioCumulativeReturn, spxCumulativeReturn, spxAnnualizedReturn, portfolioStdDev, portfolioMaxReturn,portfolioMinReturn,}) => {
    const classes = useStyles()

    return (
        <Grid container spacing={3} className="mb-3">
            <Grid item xs={12} md={6} >
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        {/* <Icon className={classes.icon}>Returns</Icon> */}
                        <h1>Returns</h1>
                        <Divider style={{ margin: '20px 0' }} />
                        <div className="ml-3">
                            <ReturnStatisticalTable 
                                portfolioAnnualizedReturn={portfolioAnnualizedReturn} 
                                portfolioCumulativeReturn={portfolioCumulativeReturn} 
                                spxCumulativeReturn={spxCumulativeReturn} 
                                spxAnnualizedReturn={spxAnnualizedReturn} 
                                portfolioMaxReturn={portfolioMaxReturn} 
                                portfolioMinReturn={portfolioMinReturn}
                                spxReturnMean={spxReturnMean}
                                avgPortfolioReturns={avgPortfolioReturns}/>
                        </div>
                    </div>
                    
                </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        {/* <Icon className={classes.icon}>Risk/Return</Icon> */}
                        <h1>Risk/Return</h1>
                        <Divider style={{ margin: '20px 0' }} />
                        <RiskReturnStatisticalTable 
                            portfolioAnnualizedReturn={portfolioAnnualizedReturn} 
                            portfolioCumulativeReturn={portfolioCumulativeReturn} 
                            spxCumulativeReturn={spxCumulativeReturn} 
                            spxAnnualizedReturn={spxAnnualizedReturn}
                            spxPriceStDeviation={spxPriceStDeviation}
                            spxReturnStDeviation={spxReturnStDeviation}
                            portfolioBeta={portfolioBeta}
                            portfolioAlpha={portfolioAlpha}
                            portfolioCov={portfolioCov}
                            portfolioStdDev={portfolioStdDev}
                            spxStDeviation={spxStDeviation}
                                
                            />
                        
                    </div>
                    
                </Card>
            </Grid>
            
        </Grid>
    )
}

export default StatCards
