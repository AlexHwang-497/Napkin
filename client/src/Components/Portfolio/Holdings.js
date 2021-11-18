import React from 'react'
import {Grid, Paper} from '@material-ui/core'
import PostDetails from '../PostDetails/PostDetails'
import CollapsibleTable from './CollapsableTable'
import VerticalBar from './Charts/BarChart'
import PieChart from './Charts/PieChart'
import BarGraph from './Charts/BarGraph'
import PieGraph from './Charts/PieGraph'
import LineGraph from './Charts/LineGraph'
import { Line } from 'react-chartjs-2'

function Holdings() {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Paper>
                    <BarGraph/>
                </Paper>

            </Grid>

            <Grid item xs={6} >
                <Paper>
                    <PieGraph/>
                </Paper>
            </Grid>

            <Grid item xs={6} >
                <Paper>
                    <CollapsibleTable/>
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper>
                    <LineGraph/>
                </Paper>
            </Grid>
        </Grid>
        
    )
}

export default Holdings
