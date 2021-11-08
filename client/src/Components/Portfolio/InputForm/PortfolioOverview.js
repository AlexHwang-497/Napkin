import React from 'react'
import {Grid, Paper} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import CollapsibleTable from '../CollapsableTable'
import LineGraph from '../Charts/LineGraph'
import RecommendedPosts from '../../PostDetails/RecommendedPosts'
import SubOverview from './SubOverview'
import CommentSection from '../../PostDetails/CommentSection'




function PortfolioOverview() {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Paper>
                    <SubOverview/>
                </Paper>

            </Grid>

            <Grid item xs={6} >
                <Paper>
                    <LineGraph/>

                </Paper>
            </Grid>

            <Grid item xs={6} >
                <Paper>
                    <CollapsibleTable/>

                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper>
                    <RecommendedPosts/>

                </Paper>
            </Grid>
        </Grid>
        
    )
}


export default PortfolioOverview
