import React from 'react'
import {Grid, Paper,Card, Icon, Fab, Select, MenuItem, FormControl, InputLabel, Box} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import CollapsibleTable from '../CollapsableTable'
import VerticalBar from '../Charts/BarChart'
import BarGraph from '../Charts/BarGraph'
import LineGraph from '../Charts/LineGraph'
import { Line } from 'react-chartjs-2'
import DoughnutChart from '../Charts/DoughnutChart'
import SectorTable from './SectorTable'
import {useDispatch, useSelector} from 'react-redux'
import ApexTreeChart from '../PortfolioOverview/ApexTreeMap'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'


function Holdings({sector,assets,ownership, portfolioName,image, stockData,priceData}) {
    const {portfolios, isLoading} = useSelector((state) => state.portfolio);
    
    console.log('[holdings.pricedata]',priceData)

const dateLabels = ['1yr', '3yr', '5yr'];
  const dates = dateLabels.map(label => {
    const yearNumber = parseInt(label.split('yr')[0]);
    return generateHistoricalDate(yearNumber);
  });
  const calculations = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
    // const annualizedReturn = calculateAnnualizedReturn(totalPortfolioValue(monthlyReturn(range)));
    // const standardDeviation = getStandardDeviation(range);
    const monReturn = monthlyReturn(range)
    return monReturn
    // const assetCov = calcCovariance(monReturn)
    // return [dateLabels[index], annualizedReturn, standardDeviation, 24]
    // return [dateLabels[index], Number.parseFloat(annualizedReturn*100).toPrecision(4), Number.parseFloat(standardDeviation).toPrecision(2), 24]
    // return [dateLabels[index], annualizedReturn.toFixed(2), standardDeviation.toFixed(2), 24]
  })
  console.log('[holdings.calculations]',calculations)
    return (
        <Grid container>
            <Grid item xs={6}>
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                    <SectorTable ownership={ownership} assets={assets} sector={sector} image={image}/>
                </Paper>

            </Grid>

            <Grid item xs={6} >
                <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Date</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={'age'}
                        onChange={'portfolioOverviewHandler'}
                        label="Date"
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={''}>ytd</MenuItem>
                        <MenuItem value={''}>3yr</MenuItem>
                        <MenuItem value={''}>5yr</MenuItem>
                        </Select>
                    </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">DataType</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={'age'}
                        onChange={'portfolioOverviewHandler'}
                        label="Date"
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={''}>ytd</MenuItem>
                        <MenuItem value={''}>3yr</MenuItem>
                        <MenuItem value={''}>5yr</MenuItem>
                        </Select>
                    </FormControl>
                    <ApexTreeChart priceData ={priceData}/>
            
                </Paper>
            </Grid>

            
            
        </Grid>
        
    )
}

export default Holdings
