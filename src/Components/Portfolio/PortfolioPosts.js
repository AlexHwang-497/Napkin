import React from "react";
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from "react-redux";

// import Post from "../Posts/Post/Post";
import useStyles from '../Posts/styles'
import PortfolioPost from "./PortfolioPost";
import ComplexCards from "./Cards/ComplexCard";


const PortfolioPosts = ({ setCurrentId }) => {
    // * how do we know that this is called posts?
        // * if you go in index.js and look at export const reducers=combineReducers({posts})
        
    const { portfolios, isLoading } = useSelector((state) => state.portfolio);
    // const { portfolio} = useSelector((state) => state.portfolio);
    // const portfolios =[]
    // const isLoading=false

    // console.log('this is the posts in portfolioPosts.js',portfolios)
    const classes = useStyles()

    

    
  if (!portfolios.length && !isLoading) return 'No portfolios';

    return (
        isLoading ? <CircularProgress /> : (
          <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {portfolios?.map((portfolio) => (
              <Grid key={portfolio._id} item xs={12} sm={6} md={6} lg={3}>
                <PortfolioPost post={portfolio} setCurrentId={setCurrentId} />
                


              </Grid>
            ))}
          </Grid>
        )
      );
    };

export default PortfolioPosts