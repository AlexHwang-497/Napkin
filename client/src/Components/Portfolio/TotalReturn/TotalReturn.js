import React from 'react'
import {Grid, Paper} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import LineChart from '../Charts/LineChart'
import LineGraph from '../Charts/LineGraph'


function TotalReturn() {
    const endDate = '2021-10-05'
    const startDate =''
    return (
        <Grid container>
            <Grid item xs={6} >
                <Paper>
                    <LineGraph 
                    endDate={endDate}
                    startDate={'2021-01-01'}/>
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper>
                    <LineGraph 
                        endDate={endDate}
                        startDate={'2021-01-01'}/>
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper>
                    <LineGraph 
                    endDate={endDate}
                    startDate={'2016-10-05'}/>
                    
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper>
                    <LineGraph 
                    endDate={endDate}
                    startDate={'2010-10-05'}/>
                </Paper>
            </Grid>

        </Grid>
        
    )
}

export default TotalReturn
