import React from 'react'
import {Grid, Paper} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import LineChart from '../Charts/LineChart'
import LineGraph from '../Charts/LineGraph'



function TotalReturn() {
    const endDate = '2021-10-05'
    const endYear = parseInt(endDate.split('-')[0])
    const endDay = parseInt(endDate.split('-')[2])
    const endMonth = parseInt(endDate.split('-')[1])
    const ytd =endYear + '-01-01'
    const ttm = endYear-1+'-'+endMonth+'-'+endDay
    const startDate =''
    return (
        <Grid container>
            <Grid item xs={6} >
                <Paper>
                    <LineGraph 
                    endDate={endDate}
                    startDate={ytd}/>
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper>
                    <LineGraph 
                        endDate={endDate}
                        startDate={ttm}/>
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper>
                    <LineGraph 
                    endDate={endDate}
                    startDate={'2016-02-20'}/>
                    
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
