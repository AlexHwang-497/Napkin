import React, { useState,useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from "react-redux";

// import Post from "../Posts/Post/Post";
import useStyles from '../Posts/styles'
import PortfolioPost from "./PortfolioPost";
import ComplexCards from "./Cards/ComplexCard";
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance,totalPortfolioValueReturns } from "../../Utilities";
import config from '../../StockData/config';
const PortfolioPosts = ({ setCurrentId }) => {
  const { portfolios, isLoading } = useSelector((state) => state.portfolio);
  const classes = useStyles()
  
  
  const apiKey = config.FMP_API_KEY_ID
const [pracData, setPracData] = useState([])
const [dateArr,setDateArr] = useState([])

const startDate = '2009-11-01'
const endDate = '2021-12-31'
const stuff = portfolios.map((el)=>el.assets)
console.log('[PortfolioPosts.stuff',stuff)
// useEffect(() => {
//   Promise.all(
//     stuff.map((stock) =>
//   fetch(
//   `https://financialmodelingprep.com/api/v4/historical-price-adjusted/${stock}/1/month/${startDate}/${endDate}?apikey=${apiKey}`)))
//   .then((results) =>
//   Promise.all(results.map((res) => res.json())).then((stocks) => {
//     console.log('[PortfolioPosts.results',results)
//       // editStockData(stocks);
//       const portfolioData = OrganizeData(
//         stocks,
//         ["SPY", ...portfolios.assets.map((e) => e.toUpperCase())],
//         ["", ...portfolios.ownership],
//         ["", ...portfolios.image],
//         ["", ...portfolios.sector]
//         )
//         setPracData(portfolioData);
//         setDateArr(portfolioData[0].dates.map((el)=>el.date))
//         console.log('[PortfolioPosts.portfolioData',portfolioData)
      
//   })
//   );
// }, []);
    
  
    console.log('[PortfolioPosts.portfolios',portfolios)

    
  if (!portfolios.length && !isLoading) return 'No portfolios';

    return (
        isLoading ? <CircularProgress /> : (
          <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {portfolios?.map((portfolio) => (
              <Grid key={portfolio._id} item xs={4} >
              {/* <Grid key={portfolio._id} item xs={12} sm={6} md={6} lg={3}> */}
                <PortfolioPost post={portfolio} setCurrentId={setCurrentId} />
                


              </Grid>
            ))}
          </Grid>
        )
      );
    };

export default PortfolioPosts