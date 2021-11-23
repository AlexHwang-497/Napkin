import React from 'react'
import {Grid, Paper} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import CollapsibleTable from '../CollapsableTable'
import VerticalBar from '../Charts/BarChart'
import BarGraph from '../Charts/BarGraph'
import LineGraph from '../Charts/LineGraph'
import { Line } from 'react-chartjs-2'
import DoughnutChart from '../Charts/DoughnutChart'
import SectorTable from './SectorTable'
import {useDispatch, useSelector} from 'react-redux'


function Holdings({sector,assets,ownership, portfolioName,image}) {
    const {portfolios, isLoading} = useSelector((state) => state.portfolio);
    console.log('this is the portfolio in holdings',portfolios)
    console.log('this is the sector in holdings', sector)
    console.log('this is the ownership in holdings', sector)
    return (
        <Grid container>
            <Grid item xs={6}>
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    

                    <DoughnutChart sector={sector} ownership={ownership}/>
                </Paper>

            </Grid>

            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    {/* <DoughnutChart ownership={ownership} assets={assets}/> */}
                </Paper>
            </Grid>

            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    <SectorTable ownership={ownership} assets={assets} sector={sector} image={image}/>
                    
                </Paper>
            </Grid>
            <Grid item xs={6} >

                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    <LineGraph 
                    title='Total Return of 2018'
                    endDate={'2021-11-14'}
                    startDate={'2021-01-01'}
                    assets={assets}
                    ownership={ownership}
                    portfolioName={portfolioName}
                    />
                </Paper>
                
            </Grid>
        </Grid>
        
    )
}

export default Holdings
