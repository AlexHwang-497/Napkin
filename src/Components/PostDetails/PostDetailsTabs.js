import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Holdings from "..//Portfolio/Holdings/Holdings";
import TotalReturn from "../Portfolio/TotalReturn/TotalReturn";
import SeasonalAnalysis from "../Portfolio/SeasonalAnalysis/SeasonalAnalysis";
import StatisticalSummary from "../Portfolio/StatisticalSummary/StatisticalSummary";
import PortfolioOverview from "../Portfolio/PortfolioOverview/PortfolioOverview";
import { useParams, useHistory } from "react-router-dom";
import { Box, Tab,Grid, Typography, Tabs, TextField, AppBar, SwipeableDrawer, FormControl, MenuItem, InputLabel,Select, Card  } from "@material-ui/core";
import RecommendedPosts from "./RecommendedPosts";
// import {DesktopDatePicker} from '@material-ui/lab/DesktopDatePicker'
import SwipeableTemporaryDrawer from "./tutorial/SwipeableTemporaryDrawer";
import PostDetails from "./PostDetails";
import { useDispatch, useSelector } from "react-redux";
import FetchStockPrices from "../../StockData/FetchStockPrices";
import config from "../../StockData/config";
import { NFLX, TEAM, SPY } from "../../Utilities/sampleData";

import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue } from "../../Utilities";
import {fetchPortfolio,fetchPost} from '../../api/index'

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const { portfolios, isLoading } = useSelector((state) => state.portfolio);

  const { id } = useParams();
  console.log('[BasicTabs.id',id)

  

  const [value, setValue] = useState(0);
  let selectedPortfolio = portfolios.find(
    (portfolio) => portfolio._id === id
  );
  // console.log('[postDetailTabs.selectedPortfolio',selectedPortfolio)
  console.log('[BasicTabs.selectedPortfolio',selectedPortfolio)
  console.log('[BasicTabs.portfolios',portfolios)
  console.log()
  const [assets, setAssets] = useState(selectedPortfolio?.assets || []);
  const [ownership, setOwnership] = useState(
    selectedPortfolio?.ownership || []
  );
  const [portfolioName, setPortfolioName] = useState(
    selectedPortfolio?.portfolioName || []
  );
  const [sector, setSector] = useState(selectedPortfolio?.sector || []);
  const [image, setImage] = useState(selectedPortfolio?.image || []);
  const [arrForStartingDate, setArrForStartingDate] = useState([]);
  const history = useHistory();
  const [stockData, editStockData] = useState([]);
  const [dummyStockData, editDummyStockData] = useState([]);
  const [data, setData] = useState([]);
  const [pracData, setPracData] = useState([])
  const [yearRange,setYearRange] = useState([])
  const [dateArr,setDateArr] = useState([])
  const [sectorWeighting,setSectorWeighting] = useState()
  const [dateSelect,setDateSelect] = useState('ttm')
  let currentDate = new Date().toISOString().slice(0, 10)
 
  useEffect(()=>{
    console.log('[PostDetailsTabs.useEffect.assets',id)
    if(assets.length===0){
      // fetchPost(id).then((data)=>console.log('[PostDetailsTabs.useEffect.data',data))
      fetchPortfolio(id).then(({data})=>{
        selectedPortfolio=data
          setAssets(data.assets)
        setOwnership(data.ownership);
        setSector(data.sector);
        setImage(data.image);
      })
        // console.log('[PostDetailsTabs.useEffect.assets',data.assets)
      // fetchPortfolio(id).then((res)=>console.log('[PostDetailsTabs.useEffect.data',res.data))

    }

  },[])
  

  const [endDate, setEndDate] = useState(currentDate)
  const [startDate,setStartDate] = useState('2009-11-01')

  // const startDate = "2011-11-01";
  // const endDate = "2021-12-01";
  const apiKey = config.FMP_API_KEY_ID;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


let sectorWeightingUrl = `https://financialmodelingprep.com/api/v3/etf-sector-weightings/SPY?apikey=${apiKey}`
useEffect(()=>{
  if(!pracData) return
  fetch(sectorWeightingUrl)
  .then((results)=>results.json())
  .then((data)=>{
    console.log('[postDetailTabs.sectorWeighting',data)
    setSectorWeighting(data)
  })
  console.log('[postDetailTabs.sectorWeighting.useState',sectorWeighting)

},[pracData])
const fetchPortfolioData = (selectedPortfolio) => {
  Promise.all(
    ["SPY",...assets].map((stock) =>
      fetch(
        `https://financialmodelingprep.com/api/v4/historical-price-adjusted/${stock}/1/month/${startDate}/${endDate}?apikey=${apiKey}`
      )
    )
  ).then((results) =>
    Promise.all(results.map((res) => res.json())).then((stocks) => {
      const portfolioData = OrganizeData(
        stocks,
        ["SPY", ...assets.map((e) => e.toUpperCase())],
        ["", ...selectedPortfolio.ownership],
        ["", ...selectedPortfolio.image],
        ["", ...selectedPortfolio.sector]
      );
      setPracData(portfolioData);
      setDateArr(portfolioData[0].dates.map((el)=>el.date))
      console.log('[postDetailTabs.portfolioData',portfolioData)
      console.log('[postDetailTabs.dateArr',dateArr)
      // console.log('[postDetailTabs.portfolioData.pracs',portfolioData[0].dates.map((el)=>el.date))
  })
    );

}

  useEffect(() => {
    if (!selectedPortfolio) {
      fetchPortfolio(id).then(({data})=>fetchPortfolioData(data))
      return
    }
      
    
    fetchPortfolioData(selectedPortfolio)
  }, [assets,endDate]);
  
  
  // if (!selectedPortfolio) return;

    const endDateHandler = (e) => {
      setEndDate(e.target.value)      
    };

    let dateObj = {
      '0':'ytd',
      '1':'1yr',
      '2':'2yr',
      '3':'3yr',
      '4':'4yr',
      '5':'5yr',
      '6':'6yr',
      '7':'7yr',
      '8':'8yr',
      '9':'9yr',
      '10':'10yr'
  }

  // console.log('[postDetailTabs.endDatefuck',endDate.split('-')[1])
    const ytdMonth  = endDate.split('-')[1]
    const ytd = dateArr.slice(ytdMonth-1,ytdMonth)
    const ttm = dateArr.slice(11,12)
    const twoYear = dateArr.slice(23,24)
    const threeYear = dateArr.slice(35,36)
    const fourYear = dateArr.slice(47,48)
    const fiveYear = dateArr.slice(59,60)
    const sixYear = dateArr.slice(71,72)
    const sevenYear = dateArr.slice(83,84)
    const eightYear = dateArr.slice(95,96)
    const nineYear = dateArr.slice(107,108)
    const tenYear = dateArr.slice(119,120)
    const combinedDatesArr = [...ytd,...ttm,...twoYear,...threeYear,...fourYear,...fiveYear,...sixYear,...sevenYear,...eightYear,...nineYear,...tenYear]
    const SeasonalAnalysisYearArr =combinedDatesArr.map((el)=>el.split('-')[0]).sort()

    const yearForSelection = (arr) => {
      let obj ={}
      let result = []
      for(let i=0;i<arr.length;i++){
          // obj[i] = dateObj[i]
          result.push(dateObj[i])

      }
      // return obj
      return result
  }

    let yearArr = yearForSelection(combinedDatesArr)
    // console.log('[postDetailTabs.ytdMonth',ytdMonth)
    // console.log('[postDetailTabs.ytd',ytd)
    // console.log('[postDetailTabs.ttm',ttm)
    // console.log('[postDetailTabs.twoYear',twoYear)
    // console.log('[postDetailTabs.twoYear',threeYear)
    // console.log('[postDetailTabs.fourYear',fourYear)
    // console.log('[postDetailTabs.fiveYear',fiveYear)
    // console.log('[postDetailTabs.sixYear',sixYear)
    // console.log('[postDetailTabs.sevenYear',sevenYear)
    // console.log('[postDetailTabs.eightYear',eightYear)
    // console.log('[postDetailTabs.nineYear',nineYear)
    // console.log('[postDetailTabs.tenYear',tenYear)
    // console.log('[postDetailTabs.combinedDatesArr',combinedDatesArr)
    // console.log('[postDetailTabs.combinedDatesArr2',SeasonalAnalysisYearArr)
    console.log('[postDetailTabs.yearArr',yearArr)
    
    // console.log('[postDetailTabs.pracData',pracData)
    // console.log('[postDetailTabs.endDate',endDate)
    // console.log('[postDetailTabs.startDate',startDate)
    // console.log('[postDetailTabs.pracsDates',pracsDates)
    // console.log('[postDetailTabs.distinctYears',distinctYears)
    // console.log('[postDetailTabs.yearArray',yearArray)
  

  // ****recommended posts
  // const recommendedPosts = selectedPortfolio.filter(({ _id }) => _id !== selectedPortfolio._id);
  // const openPost = console.log('openPost.id',id)
  const openPost = (_id) => history.push(`/posts/${_id}`);

  const dateTypeHandler = (e) => {
    // setSelectedLineChartData(e.target.value)
    setDateSelect(e.target.value)
}
console.log('[postDetailsTabs.dateSelect',dateSelect)
  return (
    <Box sx={{ width: "100%", bgcolor:'#EEEEEE' }}>
        <Box>          
            {/* <RecommendedPosts  onClick={() => openPost(id)}/> */}
        </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
    <AppBar position='static' style={{ background: '#2E3B55' }} >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >

          <Tab label="Portfolio Overview" {...a11yProps(0)} />
          <Tab label="Holdings" {...a11yProps(1)} />
          <Tab label="Total Return Graphs" {...a11yProps(2)} />
          <Tab label="Seasonal Analysis" {...a11yProps(3)} />
          <Tab label="Statistical Summary" {...a11yProps(4)} />
          
          

        </Tabs>
    </AppBar>  
      </Box>
      <Grid   container direction="row" justifyContent="space-between" alignItems="baseline">

        <Card  sx={{ maxWidth: 100 }}>
          <TextField id="date" label="Data End Date" onChange={endDateHandler} type="date" defaultValue={currentDate}  InputLabelProps={{shrink: true, }}/>
          
        </Card>
        <Card>
        
        {/* {(value===0 || value===4)  && <FormControl sx={{ m: 1, width: 300 }}> */}
        {(value===0 || value===4)  && <FormControl style={{minWidth: 300}}>
          <InputLabel size='large' align={"right"} id="demo-simple-select-standard-label">Date</InputLabel>
          <Select
              value={dateSelect}
              onChange={dateTypeHandler}
              label={
                <Typography variant="h5">Date</Typography>
                
                }
              >
              <MenuItem value={'ttm'}><Typography variant='h6' align={"center"}>TTM</Typography></MenuItem>
              <MenuItem value={'3yr'}><Typography variant='h6' align={"center"}>3-Yr</Typography></MenuItem>
              <MenuItem value={'5yr'}><Typography variant='h6' align={"center"}>5-Yr</Typography></MenuItem>
              <MenuItem value={`${yearArr.length-1}yr`}><Typography variant='h6' align={"center"}>{yearArr.length-1}-Yr</Typography></MenuItem>
          </Select>
      </FormControl>}

        </Card>
      </Grid>

      <TabPanel value={value} index={0}>
      
      
      
        <PortfolioOverview
          dateSelect={dateSelect}
          yearArr={yearArr}
          priceData={pracData}
          assets={assets}
          currentId={id}
          ownership={ownership}
          portfolioName={portfolioName}
          sector={sector}
          image={image}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Holdings
          yearArr={yearArr}
          priceData={pracData}
          stockData={""}
          image={image}
          assets={assets}
          currentId={id}
          ownership={ownership}
          portfolioName={portfolioName}
          sector={sector}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TotalReturn
          yearArr={yearArr}
          priceData={pracData}
          stockData={stockData}
          assets={assets}
          currentId={id}
          ownership={ownership}
          portfolioName={portfolioName}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SeasonalAnalysis
          yearArr={yearArr}
          SeasonalAnalysisYearArr={SeasonalAnalysisYearArr}
          priceData={pracData}
          stockData={stockData}
          assets={assets}
          currentId={id}
          ownership={ownership}
          portfolioName={portfolioName}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <StatisticalSummary
          dateSelect={dateSelect}
          yearArr={yearArr}
          priceData={pracData}
          assets={assets}
          currentId={id}
          ownership={ownership}
          portfolioName={portfolioName}
          sectorWeighting = {sectorWeighting}
        />
      </TabPanel>

    </Box>
    
    
  );
}
