import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Holdings from "..//Portfolio/Holdings/Holdings";
import TotalReturn from "../Portfolio/TotalReturn/TotalReturn";
import SeasonalAnalysis from "../Portfolio/SeasonalAnalysis/SeasonalAnalysis";
import StatisticalSummary from "../Portfolio/StatisticalSummary/StatisticalSummary";
import PortfolioOverview from "../Portfolio/PortfolioOverview/PortfolioOverview";
import { useParams, useHistory } from "react-router-dom";
import {
  Box,
  Tab,
  Grid,
  Typography,
  Tabs,
  TextField,
  AppBar,
  SwipeableDrawer,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Card,
} from "@material-ui/core";
import RecommendedPosts from "./RecommendedPosts";

import PostDetails from "./PostDetails";
import { useDispatch, useSelector } from "react-redux";
import config from "../../StockData/config";
import useStyles from "./styles";
import {
  OrganizeData,
  monthlyReturn,
  subSet,
  getStandardDeviation,
  totalPortfolioValue,
} from "../../Utilities";
import { fetchPortfolio, fetchPost } from "../../api/index";

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
  const classes = useStyles();
  let selectedPortfolio = portfolios.find((portfolio) => portfolio._id === id);
  const [value, setValue] = useState(0);
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
  const [pracData, setPracData] = useState([]);
  const [yearRange, setYearRange] = useState([]);
  const [dateArr, setDateArr] = useState([]);
  const [sectorWeighting, setSectorWeighting] = useState();
  const [dateSelect, setDateSelect] = useState("ttm");
  let currentDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (assets.length === 0) {
      fetchPortfolio(id).then(({ data }) => {
        selectedPortfolio = data;
        setAssets(data.assets);
        setOwnership(data.ownership);
        setSector(data.sector);
        setImage(data.image);
      });
    }
  }, []);

  const [endDate, setEndDate] = useState(currentDate);
  const [startDate, setStartDate] = useState("2009-11-01");

  const apiKey = config.FMP_API_KEY_ID;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let sectorWeightingUrl = `https://financialmodelingprep.com/api/v3/etf-sector-weightings/SPY?apikey=${apiKey}`;
  useEffect(() => {
    if (!pracData) return;
    fetch(sectorWeightingUrl)
      .then((results) => results.json())
      .then((data) => {
        setSectorWeighting(data);
      });
  }, [pracData]);
  const fetchPortfolioData = (selectedPortfolio) => {
    Promise.all(
      ["SPY", ...assets].map((stock) =>
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
        setDateArr(portfolioData[0].dates.map((el) => el.date));
      })
    );
  };

  useEffect(() => {
    if (!selectedPortfolio) {
      fetchPortfolio(id).then(({ data }) => fetchPortfolioData(data));
      return;
    }
    fetchPortfolioData(selectedPortfolio);
  }, [assets, endDate]);

  const endDateHandler = (e) => {
    setEndDate(e.target.value);
  };

  let dateObj = {
    0: "ytd",
    1: "1yr",
    2: "2yr",
    3: "3yr",
    4: "4yr",
    5: "5yr",
    6: "6yr",
    7: "7yr",
    8: "8yr",
    9: "9yr",
    10: "10yr",
  };

  const ytdMonth = endDate.split("-")[1];
  const ytd = dateArr.slice(ytdMonth - 1, ytdMonth);
  const ttm = dateArr.slice(11, 12);
  const twoYear = dateArr.slice(23, 24);
  const threeYear = dateArr.slice(35, 36);
  const fourYear = dateArr.slice(47, 48);
  const fiveYear = dateArr.slice(59, 60);
  const sixYear = dateArr.slice(71, 72);
  const sevenYear = dateArr.slice(83, 84);
  const eightYear = dateArr.slice(95, 96);
  const nineYear = dateArr.slice(107, 108);
  const tenYear = dateArr.slice(119, 120);
  const combinedDatesArr = [
    ...ytd,
    ...ttm,
    ...twoYear,
    ...threeYear,
    ...fourYear,
    ...fiveYear,
    ...sixYear,
    ...sevenYear,
    ...eightYear,
    ...nineYear,
    ...tenYear,
  ];
  const SeasonalAnalysisYearArr = combinedDatesArr
    .map((el) => el.split("-")[0])
    .sort();

  const yearForSelection = (arr) => {
    let obj = {};
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      // obj[i] = dateObj[i]
      result.push(dateObj[i]);
    }
    // return obj
    return result;
  };

  let yearArr = yearForSelection(combinedDatesArr);

  let firstLabel, secondLabel, thirdLabel, fourthLabel;
  if (yearArr.length <= 5) {
    fourthLabel = yearArr.length - 1;
    thirdLabel = fourthLabel - 1;
    secondLabel = thirdLabel - 1;
  } else {
    fourthLabel = yearArr.length - 1;
    thirdLabel = 5;
    secondLabel = 3;
  }

  const openPost = (_id) => history.push(`/posts/${_id}`);

  const dateTypeHandler = (e) => {
    setDateSelect(e.target.value);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "#EEEEEE" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <AppBar position="static" style={{ background: "#2E3B55" }}>
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
      <Box></Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <Card
          className={classes.dataDateEndTextCard}
          style={{ width: "200px", height: "50%" }}
        >
          <TextField
            id="date"
            label="Data End Date"
            onChange={endDateHandler}
            type="date"
            style={{ width: "20em", height: "50%" }}
            defaultValue={currentDate}
            InputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ shrink: true, style: { fontSize: 20 } }}
          />
        </Card>

        {(value === 0 || value === 4) && (
          <Card className={classes.dateTextBox}>
            <FormControl style={{ width: "200px", height: "50%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Date
              </InputLabel>
              <Select
                value={dateSelect}
                onChange={dateTypeHandler}
                label="Date"
                className={classes.selectLabel}
              >
                <MenuItem value={"ttm"}>
                  <Typography variant="h6" align={"left"}>
                    TTM
                  </Typography>
                </MenuItem>
                <MenuItem value={"3yr"}>
                  <Typography variant="h6" align={"left"}>
                    {secondLabel}-Yr
                  </Typography>
                </MenuItem>
                <MenuItem value={"5yr"}>
                  <Typography variant="h6" align={"left"}>
                    {thirdLabel}-Yr
                  </Typography>
                </MenuItem>
                <MenuItem value={`${yearArr.length - 1}yr`}>
                  <Typography variant="h6" align={"left"}>
                    {fourthLabel}-Yr
                  </Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Card>
        )}
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
          sectorWeighting={sectorWeighting}
        />
      </TabPanel>
    </Box>
  );
}
