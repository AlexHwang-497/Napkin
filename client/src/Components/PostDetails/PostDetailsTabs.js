import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Holdings from "..//Portfolio/Holdings/Holdings";
import TotalReturn from "../Portfolio/TotalReturn/TotalReturn";
import SeasonalAnalysis from "../Portfolio/SeasonalAnalysis/SeasonalAnalysis";
import StatisticalSummary from "../Portfolio/StatisticalSummary/StatisticalSummary";
import PortfolioOverview from "../Portfolio/PortfolioOverview/PortfolioOverview";
import { useParams, useHistory } from "react-router-dom";
import { Box, Tab, Typography, Tabs, TextField, AppBar  } from "@material-ui/core";
import RecommendedPosts from "./RecommendedPosts";
// import {DesktopDatePicker} from '@material-ui/lab/DesktopDatePicker'

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
  const selectedPortfolio = portfolios.find(
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
  let currentDate = new Date().toISOString().slice(0, 10)
 
  useEffect(()=>{
    console.log('[PostDetailsTabs.useEffect.assets',id)
    if(assets.length===0){
      // fetchPost(id).then((data)=>console.log('[PostDetailsTabs.useEffect.data',data))
      fetchPortfolio(id).then((data)=>console.log('[PostDetailsTabs.useEffect.data',data))

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




  useEffect(() => {
    if (!selectedPortfolio) return;
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
        // console.log('[postDetailTabs.portfolioData.pracs',portfolioData[0].dates.map((el)=>el.date))
    })
      );
    }, [assets,endDate]);



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
    // console.log('[postDetailTabs.yearArr',yearArr)
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
  
  return (
    
    <Box sx={{ width: "100%", bgcolor:'#EEEEEE' }}>
        <Box>          
            {/* <RecommendedPosts  onClick={() => openPost(id)}/> */}
        </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
    <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >

          <Tab label="Portfolio Overview" {...a11yProps(0)} />
          <Tab label="Holdings" {...a11yProps(1)} />
          <Tab label="Total Return" {...a11yProps(2)} />
          <Tab label="Seasonal Analysis" {...a11yProps(3)} />
          <Tab label="Statistical Summary" {...a11yProps(4)} />
          <FetchStockPrices assets={assets} ownership={ownership} />

        </Tabs>
    </AppBar>  
        <Box>

      <TextField id="date" label="End Date" onChange={endDateHandler} type="date" defaultValue={currentDate} sx={{ width: 220 }} InputLabelProps={{shrink: true, }}/>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
      
        <PortfolioOverview
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
          yearArr={yearArr}
          priceData={pracData}
          assets={assets}
          currentId={id}
          ownership={ownership}
          portfolioName={portfolioName}
        />
      </TabPanel>

    </Box>
    
    
  );
}
