import React, {Fragment} from 'react'
import {Grid, Paper,Card, Icon, Fab} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import CollapsibleTable from '../CollapsableTable'
import LineGraph from '../Charts/LineGraph'
import RecommendedPosts from '../../PostDetails/RecommendedPosts'
import SubOverview from '../InputForm/SubOverview'
import CommentSection from '../../PostDetails/CommentSection'
import BarGraph from '../Charts/BarGraph'
import StatCard3 from '../StatisticalSummary/StatCard3'
import StatCards from '../StatisticalSummary/StatCards'
import StatCards2 from '../StatisticalSummary/StatCard2'
import PortfolioDetail from './PortfolioDetail'
import EditableTable from '../EditableTable'
import EditCustomizedDialogs from '../editPortfolioDialog'
import { useDispatch, useSelector } from 'react-redux';
import PortfolioOverviewTable from './PortfolioOverviewTable'




function PortfolioOverview({currentId,assets,ownership,portfolioName,sector}) {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    console.log('this is the currentId in portfolioOverview',currentId)
    console.log('this is the assets in portfolioOverview',assets)
    console.log('this is the ownership in portfolioOverview',ownership)
    console.log('this is the portfolioName in portfolioOverview',portfolioName)
    console.log('this is the sector in portfolioOverview',sector)
    console.log('this is the post in portfolioOverview',post)
    return (
        <Grid container >
            <Grid item xs={6} >
                <Paper>
                    <PortfolioDetail assets={assets} currentId={currentId} ownership={ownership} portfolioName={portfolioName} sector={sector}/>    
                </Paper>
            </Grid>
            <Grid item xs={6} >
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    <LineGraph 
                        endDate={'2021-11-14'}
                        startDate={'2021-01-01'}
                        assets={assets}
                        ownership={ownership}
                        portfolioName={"Ytd Growth of $10,000"}
                    />
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    <PortfolioOverviewTable post={post}/>
                    
                </Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    <RecommendedPosts/>
                </Paper>
            </Grid>
        </Grid>

    )
}


export default PortfolioOverview