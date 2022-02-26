import {
  Grid,
  Paper,
  TextField,
  Box,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import ReturnsTable from './ReturnsTable'
import React, { useEffect, useState } from 'react'
import config from '../../../StockData/config'
import { useDispatch, useSelector } from 'react-redux'
import SeasonalBarChart from './SeasonalBarChart'
import {
  OrganizeData,
  monthlyReturn,
  subSet,
  getStandardDeviation,
  totalPortfolioValue,
  calculateAnnualizedReturn,
  calcCovariance,
  totalPortfolioValueReturns,
} from '../../../Utilities'
import { generateHistoricalDate } from '../../../Utilities/DateRanges'
import PortfolioPostTable from '../SharedCharts/PortfolioPostTable'
import SeasonalAnalysisTable from './SeasonalAnalysisTable'
import useStyles from './styles'
import portfolioIcon from '../../../images/portfolioIcon.png'
import standardIcon from '../../../images/SP500.png'
function SeasonalAnalysis({
  assets,
  ownership,
  portfolioName,
  title,
  priceData,
  yearArr,
  SeasonalAnalysisYearArr,
}) {
  let cov = require('compute-covariance')
  var Finance = require('financejs')
  const classes = useStyles()
  var finance = new Finance()
  const apiKey = config.FMP_API_KEY_ID
  const [stockList, setStockList] = useState([...assets] || ['AAPL'])
  const [stockData, editStockData] = useState([])
  const [stockWeight, setStockWeight] = useState([...ownership] || [0])
  const [greaterNumber, setGreaterNumber] = useState('5')
  const [lessNumber, setLessNumber] = useState('-5')
  const [symbol, setSymbol] = useState('portfolio')
  const [image, setImage] = useState(portfolioIcon)
  const [symbolId, setSymbolId] = useState(0)

  const [aggregatePortfolio, setAggregatePortfolio] = useState([])
  const [returnsTableData, setReturnsTableData] = useState([])

  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  const [spx, setSpx] = useState([])
  const [ndx, setNdx] = useState([])
  const startDate = '2019-01-01'
  const endDate = '2021-11-01'

  const yearRange = SeasonalAnalysisYearArr

  if (yearArr.length === 0 || !yearArr) return []
  const dateLabels = yearArr.slice(1)
  const dates = dateLabels.map((label) => {
    const yearNumber = parseInt(label.split('yr')[0])
    return generateHistoricalDate(yearNumber)
  })
  

  const spxValue = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)))
    const data = monthlyReturn(range).map(
      (entry) => entry.securityGrowthValue,
    )[0]  
    return data
  })
  const totalPortoflioValue = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)))
    const aggPortfolioValue = totalPortfolioValue(monthlyReturn(range))
    return aggPortfolioValue
  })
  const monthlyData = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)))
    return monthlyReturn(range)
  })
  const totalPortoflioValueReturn = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)))
    const arrPortfolioValue = totalPortfolioValue(monthlyReturn(range))
    let arrCumulativeReturns = [1]
    for (let i = 1; i < arrPortfolioValue.length; i++) {
      arrCumulativeReturns.push(
        arrPortfolioValue[i] / arrPortfolioValue[i - 1] - 1,
      )
    }
    return arrCumulativeReturns
  })

  const securityData = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)))
    const data = monthlyReturn(range).map((entry) => entry)
    return data
  })
  
  const securityDataArr = securityData.map((el) =>
    el.map((entry) => entry.dates.date),
  )

  const pracsDate = securityData.map((el) =>
    el.map((entry) => entry.dates.map((item) => item.date)),
  )[securityData.length - 1]
  
  const pracsValue = securityData.map((el) =>
    el.map((entry) => entry.dates.map((item) => item.periodReturn)),
  )[securityData.length - 1]

  const options = securityData.map((el) =>
    el.map((entry, i) => {
      return { id: i, symbol: entry.symbol, image: entry.images }
    }),
  )[0]

  const dateArr = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)))
    const data = monthlyReturn(range).map((entry) =>
      entry.dates.map((el) => el.date),
    )[0]
    return data
  })

  const tableReturnsData = [
    dateArr[dateArr.length - 1],
    totalPortoflioValueReturn[totalPortoflioValueReturn.length - 1],
  ]
  
  const pracsTableReturnsData = [pracsDate[0], pracsValue[symbolId]]

  const finalTableOrg = (tableReturnsData) => {
    let result = []
    for (let i = 0; i < tableReturnsData[0].length; i++) {
      result.push({
        date: tableReturnsData[0][i],
        value: tableReturnsData[1][i],
      })
    }

    const returnsByYear = yearRange.map((year) =>
      result.slice(1).filter((entry) => entry.date.includes(year)),
    )
    yearRange.map((year, i) => returnsByYear[i].unshift(year))

    return returnsByYear
  }

  const seasonalBarChartData = (tableReturnsData) => {
    let result = []
    for (let i = 0; i < tableReturnsData[0].length; i++) {
      result.push({
        date: tableReturnsData[0][i],
        value: tableReturnsData[1][i],
      })
    }
    return result
  }

  const ytdData = [dateArr[0], spxValue[0], totalPortoflioValue[0]]

  const greaterNumberHandler = (e) => {
    setGreaterNumber(e.target.value)
  }
  const lessNumberHandler = (e) => {
    setLessNumber(e.target.value)
  }

  const dateTypeHandler = (e) => {
    if (e.target.value === 'portfolio') {
      setSymbol(e.target.value)
      setImage(portfolioIcon)
    } else if (e.target.value.symbol === 'SPY') {
      setSymbol(e.target.value)
      setImage(standardIcon)
      setSymbolId(e.target.value.id)
    } else {
      setSymbol(e.target.value.symbol)
      setImage(e.target.value.image)
      setSymbolId(e.target.value.id)
    }
  }

  finalTableOrg(tableReturnsData)
  const portfolioData = finalTableOrg(tableReturnsData)
  const securityDataPracs = finalTableOrg(pracsTableReturnsData)

  let dataNeeded, barChartdataNeeded
  if (symbol === 'portfolio') {
    dataNeeded = finalTableOrg(tableReturnsData)
    barChartdataNeeded = seasonalBarChartData(tableReturnsData)
  } else {
    dataNeeded = finalTableOrg(pracsTableReturnsData)
    barChartdataNeeded = seasonalBarChartData(pracsTableReturnsData)
  }

  const dataNeededPracs = finalTableOrg(pracsTableReturnsData)

  return (
    <Grid container spacing={3}>
      <Grid item sm={6}>
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
          <h1>Portfolio Monthly Returns Bar Chart(%)</h1>
          <Divider style={{ margin: '20px 0' }} />
          <SeasonalBarChart data={barChartdataNeeded} />
        </Paper>
      </Grid>
      <Grid item sm={6}>
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
          <h1>Portfolio Monthly Returns(%)</h1>
          <Divider style={{ margin: '20px 0' }} />
          <Box>
            <TextField
              className={classes.textField1}
              color="string"
              label="greater then(>)%"
              variant="filled"
              defaultValue={'5'}
              onChange={greaterNumberHandler}
            />
            <TextField
              className={classes.titleBox}
              color="secondary"
              label="Less then(<)%"
              variant="filled"
              onChange={lessNumberHandler}
              defaultValue={'-5'}
            />

            <FormControl className={classes.titleBox} style={{ minWidth: 200 }}>
              <InputLabel
                className={classes.titleBox}
                id="demo-simple-select-standard-label"
              >
                Investment Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                onChange={dateTypeHandler}
                className={classes.titleBox}
                value={symbol}
                label={symbol}
                full
                width
              >
                <MenuItem value={'portfolio'}>
                  <img
                    className={classes.titleBox}
                    src={portfolioIcon}
                    style={{ height: '20px', width: '20px' }}
                  />
                  Portfolio
                </MenuItem>
                <Divider style={{ margin: '20px 0' }} />
                {options?.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option}>
                      <img
                        className={classes.image}
                        src={option.image}
                        style={{ height: '20px', width: '20px' }}
                      />
                      {option.symbol ?? option.image}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>

            <img
              className={classes.image}
              src={image}
              alt="icon"
              height="50px"
            />
          </Box>
          <Divider style={{ margin: '20px 0' }} />

          <SeasonalAnalysisTable
            data={dataNeeded}
            lessNumber={lessNumber}
            greaterNumber={greaterNumber}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default SeasonalAnalysis
