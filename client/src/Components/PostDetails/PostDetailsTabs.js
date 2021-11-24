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
  // console.log('[DEBUG]', selectedPortfolio);
  const [assets, setAssets ] = useState(selectedPortfolio?.assets || []);
  const [ownership, setOwnership ] = useState(selectedPortfolio?.ownership || [])
  const [portfolioName, setPortfolioName ] = useState(selectedPortfolio?.portfolioName || [])
  const [sector, setSector ] = useState(selectedPortfolio?.sector || [])
  const [image, setImage ] = useState(selectedPortfolio?.image || [])
  const [stockData,editStockData] = useState([])
  const startDate='2011-11-01'
  const endDate='2021-11-01'
  const apiKey = config.FMP_API_KEY_ID

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    Promise.all(
    assets.map((stock) =>
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
        editStockData(editedStocks);
        
    })
    );
  }, [assets]);

  console.log('this is the stockData in postDetailTab',stockData)
  
  useEffect(()=>{
    let aggCompanyDates=[]
    for(let j=0;j<stockData.length;j++){
      let companyDates=[]
      // console.log(this is)
      let historicalDates =stockData[j]?.results?.reverse() || []
      for(let i=0; i<historicalDates.length;i++){
        companyDates.push(historicalDates[i].formated.split(' ')[0])
      }
      aggCompanyDates.push(companyDates)
      console.log('this is the companyDates in fetchStockPrices',companyDates)
    }
    aggCompanyDates.sort()
    let dateArrayNeeded =aggCompanyDates[0] 

    console.log('this is the aggCompanyDates  postDetailTabs',aggCompanyDates)
    // console.log('this is the starting date in postDetailTabs',dateArrayNeeded[dateArrayNeeded.length-1])

    
    
    
  },[handleChange])

  
  useEffect(()=>{
    // console.log('this is the stockData in postDetailTab',stockData)
    fetchDateRange('2019-01-01')
  },[stockData])

  const fetchDateRange=(startingDate)=>{
    if(stockData.length===0)return;
    const start=Date.parse(startingDate)
    const filteredDate=stockData.map((entry)=>entry.dates.filter((s)=>Date.parse(s.formated)>start))
    console.log('filteredDate:',filteredDate)
    return filteredDate
    
  }

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
        <PortfolioOverview stockData={stockData} assets={assets} currentId={id} ownership={ownership} portfolioName={portfolioName} sector={sector} image={image}/>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Holdings stockData={fetchDateRange('2021-01-01')} image={image}assets={assets} currentId={id} ownership={ownership} portfolioName={portfolioName} sector={sector}/>
        
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
