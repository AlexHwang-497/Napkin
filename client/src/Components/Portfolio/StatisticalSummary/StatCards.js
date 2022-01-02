import React from 'react'
import { Grid, Card, Icon, IconButton, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    icon: {
        fontSize: '44px',
        opacity: 0.6,
        color: palette.primary.main,
    },
}))

const StatCards = () => {
    const classes = useStyles()

    return (
        <Grid container spacing={3} className="mb-3">
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>Returns</Icon>
                        <div className="ml-3">
                            <small className="text-muted">New Leads</small>
                            <h6 className="m-0 mt-1 text-primary font-medium">
                                3050
                            </h6>
                        </div>
                    </div>
                    <Tooltip title="View Details" placement="top">
                        <IconButton>
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>Risk/Return</Icon>
                        <div className="ml-3">
                            <small className="text-muted">
                                Inventory Status
                            </small>
                            <h6 className="m-0 mt-1 text-primary font-medium">
                                8.5% Stock Surplus
                            </h6>
                        </div>
                    </div>
                    <Tooltip title="View Details" placement="top">
                        <IconButton>
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </Card>
            </Grid>
            
        </Grid>
    )
}

export default StatCards
