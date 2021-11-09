import React from "react";
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from './styles'
// *this allows us to fetch data from the REDUX store


const Posts = ({ setCurrentId }) => {
    // * how do we know that this is called posts?
        // * if you go in index.js and look at export const reducers=combineReducers({posts})
        
        const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles()

    

    
  if (!posts.length && !isLoading) return 'No posts';

    return (
        isLoading ? <CircularProgress /> : (
          <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts?.map((post) => (
              <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))}
          </Grid>
        )
      );
    };

export default Posts