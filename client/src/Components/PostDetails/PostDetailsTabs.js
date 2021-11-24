import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Holdings from '..//Portfolio/Holdings/Holdings';
import TotalReturn from '../Portfolio/TotalReturn/TotalReturn';
import SeasonalAnalysis from '../Portfolio/SeasonalAnalysis/SeasonalAnalysis';
import StatisticalSummary from '../Portfolio/StatisticalSummary/StatisticalSummary';
import PortfolioOverview from '../Portfolio/PortfolioOverview/PortfolioOverview';
import { useParams, useHistory } from 'react-router-dom';
import {Box, Tab, Typography,Tabs} from '@material-ui/core'
import PostDetails from './PostDetails';
import {useDispatch, useSelector} from 'react-redux'
import FetchStockPrices from '../../StockData/FetchStockPrices';
import config from '../../StockData/config'



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const {portfolios, isLoading} = useSelector((state) => state.portfolio);
  
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const selectedPortfolio = portfolios.find(portfolio => portfolio._id === id);
  console.log('[DEBUG]selectedPortfolio', selectedPortfolio);
  const [assets, setAssets ] = useState(selectedPortfolio?.assets || []);
  const [ownership, setOwnership ] = useState(selectedPortfolio?.ownership || [])
  console.log('[DEBUG]ownership', ownership);
  const [portfolioName, setPortfolioName ] = useState(selectedPortfolio?.portfolioName || [])
  const [sector, setSector ] = useState(selectedPortfolio?.sector || [])
  const [image, setImage ] = useState(selectedPortfolio?.image || [])
  const [arrForStartingDate, setArrForStartingDate ] = useState([])
  const [begDate, setBegDate ] = useState()
  const [stockData,editStockData] = useState([])
  const [dummyStockData,editDummyStockData] = useState([])
  const [data,setData] = useState([])
  const startDate='2011-11-01'
  const endDate='2021-11-01'
  const apiKey = config.FMP_API_KEY_ID

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    Promise.all(
    [...assets,'SPY'].map((stock) =>
    fetch(
    `https://financialmodelingprep.com/api/v4/historical-price-adjusted/${stock}/1/month/${startDate}/${endDate}?apikey=${apiKey}`)))
    .then((results) =>
        Promise.all(results.map((res) => res.json())).then((stocks) => {
          if(!stocks) return;
          let editedStocks=stocks.map((stock,i)=>({
            symbol:stock.symbol,
            dates:stock.results,
            ownership:ownership[i],
            image:image[i],
            sector:sector[i] 
          }))
        editDummyStockData(stocks)
        editStockData(editedStocks)
      }))
  }, [assets]);

  console.log('this is the dummyStockData ',dummyStockData)
// ! this is utilized to calculate our proper date range for filtering
  useEffect(() => {
    
    
    let aggCompanyDates=[]
    for(let j=0;j<dummyStockData.length;j++){
      let companyDates=[]
      let historicalDates =dummyStockData[j]?.results?.reverse() || []
      for(let i=0; i<historicalDates.length;i++){
        companyDates.push(historicalDates[i].formated.split(' ')[0])
      }
      aggCompanyDates.push(companyDates)
      
    }
    aggCompanyDates.sort()
    if(aggCompanyDates.length===0) return
    let dateArrayNeeded = aggCompanyDates[0]
    console.log('aggCompanyDates',aggCompanyDates)
    console.log('dateArrayNeeded',dateArrayNeeded)
    setArrForStartingDate(dateArrayNeeded)
    let dateNeeded = dateArrayNeeded[dateArrayNeeded.length-1]
    console.log('dateNeeded',dateNeeded)
    if(!dateArrayNeeded){
      return
    } 
    fetchDateRange(dateNeeded)
  }, [stockData,dummyStockData])
  
  // setStartingDate()
  console.log('arrForStartingDate',arrForStartingDate)
  console.log('startingDate',begDate)
  useEffect(()=>{
    // setBegDate(arrForStartingDate[0])
    
    // console.log('this isthe arrforStartingDate[0]',arrForStartingDate[0])
    // fetchDateRange(arrForStartingDate[0])
    
    // let fetchStartingdateNeeded=dateArrayNeeded[0] 
    // console.log('fetchStartingdateNeeded',fetchStartingdateNeeded)
    
    // fetchDateRange("2015-12-01")
  },[stockData])

  const fetchDateRange=(startingDate)=>{
    let  finalFetchedArr=[]
    if(stockData.length===0)return;
    stockData.reverse()
    const start=Date.parse(startingDate)
    const filteredDate=stockData.map((entry)=>entry.dates.filter((s)=>Date.parse(s.formated)>start))
    console.log('filteredDate',filteredDate)
    console.log('filteredDates.o',filteredDate.map((arr)=>arr.map((e)=>e.o)))
    console.log('filteredDates.formated',filteredDate.map((arr)=>arr.map((e)=>e.formated)))
    // const openPrices
    let pricesNeeded=filteredDate.map((arr)=>arr.map((e)=>e.o))
    let dateRangeNeeded =filteredDate.map((arr)=>arr.map((e)=>e.formated))[0]

    console.log('pricesNeeded:',pricesNeeded)
    console.log('dateRangeNeeded:',dateRangeNeeded)
    let finalDataNeeded = [dateRangeNeeded,...pricesNeeded]
    console.log('finalDataNeeded:',finalDataNeeded)
    setData(finalDataNeeded)


    // console.log('filteredDate:',filteredDate)
    // return finalFetchedArr.push([arrForStartingDate,filteredDate])
    // console.log('finalFetchedArr:',finalFetchedArr)
    console.log('this is the filter/stockData',stockData)    
  }
  // console.log('this is the stockData[0].dates in postDetailTab',stockData[0].dates)


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Portfolio Overview" {...a11yProps(0)} />
          <Tab label="Holdings" {...a11yProps(1)} />
          <Tab label="Total Return" {...a11yProps(2)} />
          <Tab label="Seasonal Analysis" {...a11yProps(3)} />
          <Tab label="Statistical Summary" {...a11yProps(4)} />
          <FetchStockPrices assets={assets} ownership={ownership}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PortfolioOverview priceData={data} assets={assets} currentId={id} ownership={ownership} portfolioName={portfolioName} sector={sector} image={image}/>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Holdings stockData={''} image={image} assets={assets} currentId={id} ownership={ownership} portfolioName={portfolioName} sector={sector}/>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TotalReturn stockData={stockData} assets={assets} currentId={id} ownership={ownership} portfolioName={portfolioName}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SeasonalAnalysis stockData={stockData} assets={assets} currentId={id} ownership={ownership} portfolioName={portfolioName}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <StatisticalSummary assets={assets} currentId={id} ownership={ownership} portfolioName={portfolioName}/>
      </TabPanel>
    </Box>
  );
}
