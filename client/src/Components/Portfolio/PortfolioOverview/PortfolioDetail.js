import React, { Fragment, useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider,Grid,Card,Fab } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import CommentSection from '../../PostDetails/CommentSection';

import PortfolioReturnTable from './PortfolioReturnTable';
import { getPortfolio, getPortfoliosBySearch } from '../../../actions/portfolio';



function PortfolioDetail({currentId,assets,ownership,portfolioName,sector}) {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    console.log('this is the post in portfolioDetail',post)
  const dispatch = useDispatch();
  const history = useHistory();
//   const classes = useStyles();
  const { id } = useParams();
    return (
        <Fragment>
          
          
          <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <PortfolioReturnTable post={posts}/>
            <Divider style={{ margin: '20px 0' }} />
            <CommentSection/>
          </Paper>

        </Fragment>
        
        
    )
}

export default PortfolioDetail
