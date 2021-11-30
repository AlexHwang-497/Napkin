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
import { NFLX, TEAM } from "../../Utilities/sampleData";
import { OrganizeData, monthlyReturn,subSet,getStandardDeviation } from "../../Utilities";


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
  const startDate = "2011-11-01";
  const endDate = "2021-11-01";
  const apiKey = config.FMP_API_KEY_ID;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   Promise.all(
  //   [...assets,'SPY'].map((stock) =>
  //   fetch(
  //   `https://financialmodelingprep.com/api/v4/historical-price-adjusted/${stock}/1/month/${startDate}/${endDate}?apikey=${apiKey}`)))
  //   .then((results) =>
  //       Promise.all(results.map((res) => res.json())).then((stocks) => {
  //         if(!stocks) return;
  //         let editedStocks=stocks.map((stock,i)=>({
  //           symbol:stock.symbol,
  //           dates:stock.results,
  //           ownership:ownership[i],
  //           image:image[i],
  //           sector:sector[i]
  //         }))
  //       editDummyStockData(stocks)
  //       editStockData(editedStocks)
  //     }))
  // }, [assets]);

  useEffect(() => {
    const fakeAssets = ["NFLX", "TEAM"];
    const fakeOwnership = [50, 30];
    const fakeResults = [NFLX, TEAM];
    const data = OrganizeData(fakeResults, fakeAssets, fakeOwnership);
    console.log('[monthlyReturn]',monthlyReturn(data))
    console.log('[monthlyReturn.STD]',getStandardDeviation(data))
    const ytd=subSet(data,'2021-01-01')
    // console.log('[monthlyReturn.ytd]',ytd)
    const startingDat='2020-01-01'
    let arr = []

    const praca=data.map((entry)=>entry.dates.reverse())
    const filtered = data.map((entry)=>entry.dates.filter((s)=>s.date>'2020-01-01'))
  //   const praca =data.map((entry) =>
  //   entry.dates.filter((s) => Date.parse(s.formated) > starting)
  // );
  // console.log("[data]", data);
  // console.log("[praca]", praca);
  // // console.log("[praca.filter]", data.map((entry)=>entry.dates.filter((s)=>s.date>'2020-01-01')))
  // console.log("[praca.filter]", filtered)
  // console.log("[DEBUG]", data.map((entry)=>entry.dates));
  // console.log("[praca.reduce]", data.map(entry => entry.dates.reduce((acc, {price}) => acc += price, 0)))
  // console.log("[praca.filter.reduce]", data.map(entry => entry.dates.filter((s)=>s.date>'2020-01-01').reduce((acc, {price}) => acc += price, 0)))
  // console.log("[praca.filter.reduce 10k shares]", data.map(entry => entry.dates.filter((s)=>s.date>'2020-01-01')
  //                                                                   .reduce((acc, {price}) => {
  //                                                                       acc.push(10000/price)
  //                                                                       return acc
  //                                                                   },[])))
                                                                   
                                                                    
  // console.log("[praca.filter.reduce cumulative ]", data.map(entry => entry.dates.filter((s)=>s.date>'2020-01-01')
  //                                                                   .reduce((acc, {price},i) => {
  //                                                                       arr.push(price)
  //                                                                       return arr
  //                                                                   },[])))
  // console.log('[filtered]',filtered.reduce((acc,{price}=>{arr.push(price) return arr})))
  
  
  
  
  
  }, [assets]);

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
          priceData={data}
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
          stockData={stockData}
          assets={assets}
          currentId={id}
          ownership={ownership}
          portfolioName={portfolioName}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SeasonalAnalysis
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
