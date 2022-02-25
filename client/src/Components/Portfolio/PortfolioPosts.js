import React, { useState, useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import useStyles from '../Posts/styles'
import PortfolioPost from './PortfolioPost'
import ComplexCards from './Cards/ComplexCard'
import {
  OrganizeData,
  monthlyReturn,
  subSet,
  getStandardDeviation,
  totalPortfolioValue,
  calculateAnnualizedReturn,
  calcCovariance,
  totalPortfolioValueReturns,
} from '../../Utilities'
import config from '../../StockData/config'
const PortfolioPosts = ({ setCurrentId }) => {
  const { portfolios, isLoading } = useSelector((state) => state.portfolio)

  const classes = useStyles()

  const apiKey = config.FMP_API_KEY_ID
  const [pracData, setPracData] = useState([])
  const [dateArr, setDateArr] = useState([])

  const startDate = '2009-11-01'
  const endDate = '2021-12-31'

  if (!portfolios.length && !isLoading) return 'No portfolios'

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {portfolios?.map((portfolio) => (
        <Grid key={portfolio._id} item xs={12} sm={4}>
          <PortfolioPost post={portfolio} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  )
}

export default PortfolioPosts
