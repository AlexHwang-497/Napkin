import React from 'react'
import {Grid, Paper} from '@material-ui/core'
import PostDetails from '../PostDetails/PostDetails'
import CollapsibleTable from '../Portfolio/CollapsableTable'
import VerticalBar from '../Portfolio/Charts/BarChart'
import BarGraph from '../Portfolio/Charts/BarGraph'
import LineGraph from '../Portfolio/Charts/LineGraph'
import { Line } from 'react-chartjs-2'
import DoughnutChart from '../Portfolio/Charts/DoughnutChart'
import SectorTable from './SectorTable'


function Holdings({sector,assets,ownership, portfolioName,image}) {
    console.log('this is the sector in holdings', sector)
    console.log('this is the ownership in holdings', sector)
    return (
        <Grid container>
            <Grid item xs={6}>
                <Paper>
                    <DoughnutChart sector={sector} ownership={ownership}/>
                </Paper>

            </Grid>

            <Grid item xs={6} >
                <Paper>
                    <DoughnutChart ownership={ownership} assets={assets}/>
                </Paper>
            </Grid>

            <Grid item xs={6} >
                <Paper>
                    <SectorTable ownership={ownership} assets={assets} sector={sector} image={image}/>
                    
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper>
                <Paper>
                    <LineGraph 
                    title='Total Return of 2018'
                    endDate={'2021-11-14'}
                    startDate={'2021-01-01'}
                    assets={assets}
                    ownership={ownership}
                    portfolioName={portfolioName}
                    />
                </Paper>
                </Paper>
            </Grid>
        </Grid>
        
    )
}

export default Holdings
