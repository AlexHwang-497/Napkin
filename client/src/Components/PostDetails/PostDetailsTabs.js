import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Holdings from "..//Portfolio/Holdings/Holdings";
import TotalReturn from "../Portfolio/TotalReturn/TotalReturn";
import SeasonalAnalysis from "../Portfolio/SeasonalAnalysis/SeasonalAnalysis";
import StatisticalSummary from "../Portfolio/StatisticalSummary/StatisticalSummary";
import PortfolioOverview from "../Portfolio/PortfolioOverview/PortfolioOverview";
import { useParams, useHistory } from "react-router-dom";
import { Box, Tab, Typography, Tabs, TextField  } from "@material-ui/core";
// import {DesktopDatePicker} from '@material-ui/lab/DesktopDatePicker'

import PostDetails from "./PostDetails";
import { useDispatch, useSelector } from "react-redux";
import FetchStockPrices from "../../StockData/FetchStockPrices";
import config from "../../StockData/config";
import { NFLX, TEAM, SPY } from "../../Utilities/sampleData";
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation, totalPortfolioValue } from "../../Utilities";


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
  const [value, setValue] = useState(0);
  const selectedPortfolio = portfolios.find(
    (portfolio) => portfolio._id === id
  );
  // console.log('[postDetailTabs.selectedPortfolio',selectedPortfolio)
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
  const [begDate, setBegDate] = useState();
  const [stockData, editStockData] = useState([]);
  const [dummyStockData, editDummyStockData] = useState([]);
  const [data, setData] = useState([]);
  const [pracData, setPracData] = useState([])
  const [endDate, setEndDate] = useState("2021-12-01")
  const startDate = "2011-11-01";
  // const endDate = "2021-12-01";
  const apiKey = config.FMP_API_KEY_ID;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   Promise.all(
  //   ['SPY',...assets].map((stock) =>
  //   fetch(
  //   `https://financialmodelingprep.com/api/v4/historical-price-adjusted/${stock}/1/month/${startDate}/${endDate}?apikey=${apiKey}`)))
  //   .then((results) =>
  //       Promise.all(results.map((res) => res.json())).then((stocks) => {
  //         if(!stocks) return;
  //         const processedData = OrganizeData(stocks,assets,[0,...selectedPortfolio.ownership],['INDEX',...selectedPortfolio.sector],["https://financialmodelingprep.com/image-stock/SPY.png",...selectedPortfolio.image]);
  //         console.log('[postDetailTabs.processsedData',processedData)
  //         console.log('[postDetailTabs.selectedPortfolio',selectedPortfolio.ownership)
  //         setPracData(processedData)
  //       editDummyStockData(stocks)
  //       // editStockData(editedStocks)
  //       const ytd=subSet(data,'2021-01-01')
  //     }))
  // }, [assets]);
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
        console.log('[postDetailTabs.portfolioData',portfolioData)
    })
      );
    }, [assets,endDate]);

    const endDateHandler = (e) => {
      setEndDate(e.target.value)
    };
  
    console.log('[postDetailTabs.pracData',pracData)
    console.log('[postDetailTabs.endDate',endDate)
  

  
  
  return (
    
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
        <Box>

      <TextField id="date" label="End Date" onChange={endDateHandler} type="date" defaultValue="" sx={{ width: 220 }} InputLabelProps={{shrink: true, }}/>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
      
        <PortfolioOverview
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
          assets={assets}
          currentId={id}
          ownership={ownership}
          portfolioName={portfolioName}
        />
      </TabPanel>
      <TabPanel >
        
          {/* <TextField id="date" label="End Date" type="date" defaultValue="2017-05-24" sx={{ width: 220 }} InputLabelProps={{shrink: true, }}/> */}
      </TabPanel>
    </Box>
  );
}
