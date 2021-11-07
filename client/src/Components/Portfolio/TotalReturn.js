import React from 'react'
import {Grid, Paper} from '@material-ui/core'
import PostDetails from '../PostDetails/PostDetails'
import LineChart from './Charts/LineChart'


function TotalReturn() {
    return (
        <Grid container>
            <Grid item xs={6} >
                <Paper>
                    <LineChart/>
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper>
                    <LineChart/>
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper>
                    <LineChart/>
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper>
                    <LineChart/>
                </Paper>
            </Grid>

        </Grid>
        
    )
}

export default TotalReturn
