import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Holdings from "..//Portfolio/Holdings/Holdings";
import TotalReturn from "../Portfolio/TotalReturn/TotalReturn";
import SeasonalAnalysis from "../Portfolio/SeasonalAnalysis/SeasonalAnalysis";
import StatisticalSummary from "../Portfolio/StatisticalSummary/StatisticalSummary";
import PortfolioOverview from "../Portfolio/PortfolioOverview/PortfolioOverview";
import { useParams, useHistory } from "react-router-dom";
import { Box, Tab, Typography, Tabs } from "@material-ui/core";
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
  console.log('[postDetailTabs.selectedPortfolio',selectedPortfolio)
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
  const startDate = "2011-11-01";
  const endDate = "2021-11-01";
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
      [...assets, "SPY"].map((stock) =>
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
    }, [assets]);
  // useEffect(() => {
  //   const fakeAssets = ['SPY',"NFLX", "TEAM"];
  //   const fakeOwnership = [0,60, 40];
  //   const fakeResults = [SPY,NFLX, TEAM];
  //   const fakeImages = ["https://financialmodelingprep.com/image-stock/SPY.png","https://financialmodelingprep.com/image-stock/NFLX.png","https://financialmodelingprep.com/image-stock/TEAM.png"]
  //   const fakeSector = ['INDEX','Communication Services','Technology']
    
  //   const data = OrganizeData(fakeResults, fakeAssets, fakeOwnership,fakeImages,fakeSector);
  //   setPracData(data)
    
  //   // console.log('[monthlyReturn.ytd]',ytd)
  //   const startingDat='2020-01-01'
  
  // }, [assets]);

  // ! this is utilized to calculate our proper date range for filtering
  useEffect(() => {
    let aggCompanyDates = [];
    for (let j = 0; j < dummyStockData.length; j++) {
      let companyDates = [];
      let historicalDates = dummyStockData[j]?.results?.reverse() || [];
      for (let i = 0; i < historicalDates.length; i++) {
        companyDates.push(historicalDates[i].formated.split(" ")[0]);
      }
      aggCompanyDates.push(companyDates);
    }
    aggCompanyDates.sort();
    if (aggCompanyDates.length === 0) return;
    let dateArrayNeeded = aggCompanyDates[0];
    setArrForStartingDate(dateArrayNeeded);
    let dateNeeded = dateArrayNeeded[dateArrayNeeded.length - 1];
    if (!dateArrayNeeded) {
      return;
    }
    fetchDateRange(dateNeeded);
  }, [stockData, dummyStockData]);

  // setStartingDate()
  useEffect(() => {
    // setBegDate(arrForStartingDate[0])
    // console.log('this isthe arrforStartingDate[0]',arrForStartingDate[0])
    // fetchDateRange(arrForStartingDate[0])
    // let fetchStartingdateNeeded=dateArrayNeeded[0]
    // console.log('fetchStartingdateNeeded',fetchStartingdateNeeded)
    // fetchDateRange("2015-12-01")
  }, [stockData]);

  const fetchDateRange = (startingDate) => {
    let finalFetchedArr = [];
    if (stockData.length === 0) return;
    stockData.reverse();
    const start = Date.parse(startingDate);
    const filteredDate = stockData.map((entry) =>
      entry.dates.filter((s) => Date.parse(s.formated) > start)
    );
    console.log('[fiteredDate]',filteredDate)
    // const openPrices
    let pricesNeeded = filteredDate.map((arr) => arr.map((e) => e.o));
    let dateRangeNeeded = filteredDate.map((arr) =>
      arr.map((e) => e.formated)
    )[0];
    let finalDataNeeded = [dateRangeNeeded, ...pricesNeeded];
    setData(finalDataNeeded);

    // return finalFetchedArr.push([arrForStartingDate,filteredDate])
  };

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
    </Box>
  );
}
