import {Grid, Paper, TextField,Box,Divider, FormControl, InputLabel,Select, MenuItem} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import VerticalBar from '../Charts/BarChart'
import CollapsibleTable from '../CollapsableTable'
import ReturnsTable from './ReturnsTable'
import React, {useEffect, useState} from 'react';
import config from '../../../StockData/config'
import { useDispatch, useSelector } from "react-redux"
import SeasonalBarChart from './SeasonalBarChart'
import HeatMapChart from '../Charts/HeatMapChart'
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue, calculateAnnualizedReturn,calcCovariance,totalPortfolioValueReturns } from "../../../Utilities";
import {generateHistoricalDate} from '../../../Utilities/DateRanges'
import PortfolioPostTable from '../Charts/PortfolioPostTable'
import SeasonalAnalysisTable from '../Charts/SeasonalAnalysisTable'
import PortfolioStepper from '../PortfolioStepper'
import useStyles from './styles'
import napkinsIcon from '../../../images/portfolioIcon.png'
function SeasonalAnalysis({assets,ownership,portfolioName,title,priceData,yearArr,SeasonalAnalysisYearArr}) {
    let cov = require( 'compute-covariance' );
    var Finance = require('financejs');
    const classes = useStyles();
    var finance = new Finance();
    const apiKey = config.FMP_API_KEY_ID
    const [stockList, setStockList] = useState([...assets] || ['AAPL'])
    const [stockData,editStockData] = useState([])
    const [stockWeight,setStockWeight]=useState([...ownership] || [0])
    const [greaterNumber,setGreaterNumber] = useState('5')
    const [lessNumber,setLessNumber] = useState('-5')
    
    const [aggregatePortfolio,setAggregatePortfolio]=useState([])
    // const [aggPortfolio,setAggPortfolio]=useState([])
    const [returnsTableData,setReturnsTableData] = useState([])
  
    const [labels,setLabels]=useState([])
    const [data,setData]=useState([])
    const [spx,setSpx]=useState([])
    const [ndx,setNdx]=useState([])
    const startDate ='2019-01-01'
    const endDate ='2021-11-01'
    console.log('[SeasonalAnalysis.SeasonalAnalysisYearArr',SeasonalAnalysisYearArr)
    console.log('[SeasonalAnalysis.priceData',priceData)
    
    const yearRange = SeasonalAnalysisYearArr

      
      if(yearArr.length===0 || !yearArr) return []
      // const dateLabels = ['1yr', '3yr', '5yr'];
      const dateLabels =  yearArr.slice(1);
          const dates = dateLabels.map(label => {
              const yearNumber = parseInt(label.split('yr')[0]);
              return generateHistoricalDate(yearNumber);
          });
          console.log('[SeasonalAnalysis.dates',dates)
      
        
          const spxValue = dates.map((date, index) => {
              const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
              const data = monthlyReturn(range).map((entry)=>entry.securityGrowthValue)[0]
              console.log('[SeasonalAnalysis.spxValue.monReturn',data)
              return data
          })
          const totalPortoflioValue = dates.map((date, index) => {
            const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
            const aggPortfolioValue = totalPortfolioValue(monthlyReturn(range))  
            return aggPortfolioValue
          })
          const monthlyData = dates.map((date, index) => {
            const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
            return  monthlyReturn(range)
            // return aggPortfolioValue
          })
          const totalPortoflioValueReturn = dates.map((date, index) => {
              // console.log('[SeasonalAnalysis.totalPortoflioValueReturn.date',date)
            const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
            const arrPortfolioValue = totalPortfolioValue(monthlyReturn(range))
        
            let arrCumulativeReturns=[1]
            for(let i=1;i<arrPortfolioValue.length;i++){
                arrCumulativeReturns.push((arrPortfolioValue[i]/arrPortfolioValue[i-1])-1)
            }  
            return arrCumulativeReturns
        })

        const securityData = dates.map((date, index) => {
          const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
          const data = monthlyReturn(range).map((entry)=>entry)
          console.log('[SeasonalAnalysis.securityData.data/monthlyReturn',data)
          // console.log('[PortfolioOverview.pracsValue.monReturn',data)
          return data
      })
      console.log('[SeasonalAnalysis.securityData',securityData.map((el)=>el.map((entry)=> {return {symbol:entry.symbol,image:entry.images}})))
      const securityDataArr = securityData.map((el)=>el.map((entry)=> entry.dates.date))
      // const securityDataArr = securityData.map((el)=>el.map((entry)=> entry.dates.date))
      const pracsDate = securityData.map((el)=>el.map((entry)=> entry.dates.map((item)=>item.date)))[securityData.length-1]
      const pracsValue = securityData.map((el)=>el.map((entry)=> entry.dates.map((item)=>item.periodReturn)))[securityData.length-1]
      const pracsSymbol = securityData.map((el)=>el.map((entry)=> {return {symbol:entry.symbol,image:entry.images}}))[0]
      

      // console.log('[SeasonalAnalysis.securityDataArr',securityDataArr)
      console.log('[SeasonalAnalysis.pracsDate',pracsDate[0])
      console.log('[SeasonalAnalysis.pracsValue',pracsValue)
      console.log('[SeasonalAnalysis.pracsSymbol',pracsSymbol)
        
          const dateArr = dates.map((date, index) => {
            const range = JSON.parse(JSON.stringify(subSet(priceData, date)));
            const data = monthlyReturn(range).map((entry)=>entry.dates.map((el)=>el.date))[0]
            return data
          })
        
          
          
          // console.log('[seasonalAnalysis.totalPortoflioValue',totalPortoflioValue)
          // console.log('[seasonalAnalysis.totalPortoflioValueReturn.final',totalPortoflioValueReturn[2])
          console.log('[SeasonalAnalysis.dateArr',dateArr)
          console.log('[SeasonalAnalysis.totalPortoflioValueReturn',totalPortoflioValueReturn)
          
          const tableReturnsData = [dateArr[dateArr.length-1],totalPortoflioValueReturn[totalPortoflioValueReturn.length-1]]
          const pracsTableReturnsData = [pracsDate[0],pracsValue[2]]
          console.log('[SeasonalAnalysis.pracsTableReturnsData',pracsTableReturnsData)

        const  finalTableOrg = (tableReturnsData)=> {
            let result=[]
            for(let i=0;i<tableReturnsData[0].length;i++){
                result.push({date:tableReturnsData[0][i],value:tableReturnsData[1][i]})
            }
            
            const returnsByYear=yearRange.map((year)=>(
              result.slice(1).filter((entry)=>entry.date.includes(year))
              ))
              yearRange.map((year,i)=>returnsByYear[i].unshift(year))

            return returnsByYear
            
          }
          console.log('[SeasonalAnalysis.finalTableOrg.',finalTableOrg)
          console.log('[SeasonalAnalysis.tableReturnsData.',tableReturnsData)


        const  seasonalBarChartData = (tableReturnsData)=> {
            let result=[]
            for(let i=0;i<tableReturnsData[0].length;i++){
                result.push({date:tableReturnsData[0][i],value:tableReturnsData[1][i]})
            }
            // setSeasonalBarChartData(result)
            // console.log('[seasonalAnalysis.finalTableOrg.result',result)
            return result
            
            
          }
          // finalTableOrg(tableReturnsData)
          const dataNeeded =finalTableOrg(tableReturnsData)
          const dataNeededPracs = finalTableOrg(pracsTableReturnsData)
          const barChartdataNeeded =seasonalBarChartData(tableReturnsData)

        console.log('[SeasonalAnalysis.dataNeeded',dataNeeded)
        console.log('[SeasonalAnalysis.dataNeededPracs',dataNeededPracs)
        // console.log('[seasonalAnalysis.seasonalBarchartData',barChartdataNeeded)

        
    
        
        
        const ytdData = [dateArr[0],spxValue[0],totalPortoflioValue[0]]

        const greaterNumberHandler = (e) => {
          setGreaterNumber(e.target.value)
          console.log('[SeasonalAnalysis.greaterNumber',e.target.value)
        }
        const lessNumberHandler = (e) => {
          setLessNumber(e.target.value)
          
        }
        
        console.log('[SeasonalAnalysis.greaterNumber',greaterNumber)
        console.log('[SeasonalAnalysis.lessNumber',lessNumber)

    return (
        <Grid container spacing={3} >
        <Grid item sm={6} >
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <h1>Portfolio Monthly Returns Bar Chart(%)</h1>
            <Divider style={{ margin: '20px 0' }} />
            <SeasonalBarChart data={barChartdataNeeded}/>
            </Paper>
        </Grid>
        <Grid item sm={6} >
          <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
          <h1>Portfolio Monthly Returns(%)</h1>
            <Divider style={{ margin: '20px 0' }} />
            <Box >

                <TextField className={classes.textField1}   
                  color='string' 
                  label="greater then(>)%" 
                  variant="filled"
                  defaultValue = {'5'}
                  onChange={greaterNumberHandler}
                />
                <TextField  className={classes.titleBox}
                  color='secondary' 
                  label="Less then(<)%" 
                  variant="filled" 
                  onChange={lessNumberHandler}
                  defaultValue = {'-5'}
                />

                  <FormControl  className={classes.titleBox} style={{minWidth: 200}}>
                            <InputLabel id="demo-simple-select-standard-label">DataType</InputLabel>
                                <Select>{
                                  
                                }


                                </Select>
                        </FormControl>
            
                        <img className={classes.image} src={napkinsIcon} alt="icon" height="75px" />
            </Box>
            <Divider style={{ margin: '20px 0' }} />
            
            <SeasonalAnalysisTable data={dataNeeded} lessNumber={lessNumber} greaterNumber={greaterNumber}/>
          </Paper>
        </Grid>
    </Grid>
        
    )
}

export default SeasonalAnalysis
