import React from 'react'
import {Grid, Paper} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'

import LineGraph from '../Charts/LineGraph'
import {useDispatch, useSelector} from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';

function TotalReturn({id,assets,portfolioName,ownership}) {

    console.log('this is the id in totalReturn',id)
    console.log('this is the assets in totalReturn',assets)
    console.log('this is the portfolioName in totalReturn',portfolioName)
    console.log('this is the ownership in totalReturn',ownership)

    
    const endDate = '2021-11-05'
    const endYear = parseInt(endDate.split('-')[0])
    const endDay = parseInt(endDate.split('-')[2])
    const endMonth = parseInt(endDate.split('-')[1])
    
    
    const ytd =endYear + '-01-01'
    const ttm = endYear-1+'-'+endMonth+'-'+endDay
    const startDate =''
    return (
        <Grid container >
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    <LineGraph 
                    endDate={endDate}
                    startDate={ytd}
                    assets={assets}
                    ownership={ownership}
                    portfolioName={"Ytd Growth of $10,000"}
                    >Annualized Return</LineGraph>
                </Paper>
            </Grid>
            <Grid item xs={6} >
                {/* <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    <LineGraph 
                        endDate={endDate}
                        startDate={ttm}
                        assets={assets}
                        ownership={ownership}
                        portfolioName={"TTM Growth of $10,000"}
                    />
                </Paper> */}
            </Grid>
            <Grid item xs={6} >
                {/* <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    <LineGraph 
                        title='Total Return of 2018'
                        endDate={endDate}
                        startDate={'2016-02-20'}
                        assets={assets}
                        ownership={ownership}
                        portfolioName={"5 Year Growth of $10,000"}
                    />
                </Paper> */}
            </Grid>
            <Grid item xs={6} >
                {/* <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    <LineGraph 
                        title='Total Return of 2018'
                        endDate={endDate}
                        startDate={'2011-10-05'}
                        assets={assets}
                        ownership={ownership}
                        portfolioName={"10 Year Growth of $10,000"}
                    />
                </Paper> */}
            </Grid>
        </Grid>
    )
}
export default TotalReturn
