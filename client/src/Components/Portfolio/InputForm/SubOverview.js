import React, { useEffect } from 'react';
import {Grid, Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import CollapsibleTable from '../CollapsableTable';

import { getPost, getPostsBySearch } from '../../../actions/posts';
import useStyles from './styles';
import CommentSection from '../../PostDetails/CommentSection';
import LineGraph from '../Charts/LineGraph';
import BarGraph from '../Charts/BarGraph';



const SubOverview = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
      }, [id]);
    
      useEffect(() => {
        if (post) {
          dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
      }, [post]);

      if (!post) return null;
      const openPost = (_id) => history.push(`/posts/${_id}`);

      if (isLoading) {
        return (
          <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
          </Paper>
        );
      }


    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);


    return (
        
            <CommentSection/>
                    
        

    )
}

export default SubOverview
