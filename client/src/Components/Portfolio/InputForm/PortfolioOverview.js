import React, {Fragment} from 'react'
import {Grid, Paper,Card, Icon, Fab} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import CollapsibleTable from '../CollapsableTable'
import LineGraph from '../Charts/LineGraph'
import RecommendedPosts from '../../PostDetails/RecommendedPosts'
import SubOverview from './SubOverview'
import CommentSection from '../../PostDetails/CommentSection'
import BarGraph from '../Charts/BarGraph'
import StatCard3 from '../StatisticalSummary/StatCard3'
import StatCards from '../StatisticalSummary/StatCards'
import StatCards2 from '../StatisticalSummary/StatCard2'





function PortfolioOverview() {
    return (
        <Fragment>
        <div className="analytics m-sm-30 mt-6">
            <Grid container spacing={3}>
                <Grid item lg={8} md={8} sm={6} xs={12}>
                    {/* <StatCards /> */}
                    
                    <Card elevation={8} >
                        <LineGraph/>
                    </Card>
                    <Card elevation={8} >
                        <CollapsibleTable/>
                    </Card>
                    
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Card className="px-6 py-4 mb-6" elevation={8}>
                        <BarGraph/>
                    </Card>
                    <Card className="px-6 py-4 mb-6" elevation={8}>
                        <BarGraph/>
                    </Card>

                    {/* <RecommendedPosts/> */}
                    {/* <UpgradeCard />

                    <Campaigns /> */}
                </Grid>
            </Grid>
        </div>
    </Fragment>
    )
}


export default PortfolioOverview
