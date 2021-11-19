import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import CommentSection from '../../PostDetails/CommentSection';

// import { getPost, getPostsBySearch } from '../../actions/posts';
import { getPortfolio, getPortfoliosBySearch } from '../../../actions/portfolio';



function PortfolioDetail({currentId,assets,ownership,portfolioName,sector}) {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    console.log('this is the post in portfolioDetail',post)
  const dispatch = useDispatch();
  const history = useHistory();
//   const classes = useStyles();
  const { id } = useParams();
    return (
        <CommentSection/>
        
    )
}

export default PortfolioDetail
