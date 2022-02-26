import React, { useState } from "react";
import {
  Grid,
  InputLabel,
  Box,
  Card,
  Icon,
  Fab,
  Button,
  MenuItem,
  Menu,
  Select,
  Divider,
} from "@material-ui/core";
import SectorWeightingTable from "./SectorWeightingTable";
import StatisticalSummaryHorizontalBarChart from "./StatiscialSummaryHorizontalBarChart";

const StatCards2 = ({ benchmarkSectorWeighting, portfolioWeighting }) => {
  const [portfolioWeightingType, setPortfolioWeightingType] =
    useState("currentPort");
  let portfolioObj = {};
  // let portfolioObjpercent =[]
  let intialObj = {};

  const uniquePortfolioWeightings = portfolioWeighting.forEach((el) => {
    if (portfolioObj.hasOwnProperty(el.sector)) {
      portfolioObj[el.sector] = portfolioObj[el.sector] + el.portfolioValue;
    } else {
      portfolioObj[el.sector] = el.portfolioValue;
    }
  });
  const portfolioTotal = Object.values(portfolioObj).reduce((a, b) => a + b);

  let portfolioObjpercent = [];

  for (var prop in portfolioObj) {
    portfolioObjpercent.push({
      sector: prop,
      value: ((portfolioObj[prop] / portfolioTotal) * 100).toFixed(2),
    });
  }

  const uniquePortfolioWeightingsInitial = portfolioWeighting.forEach((el) => {
    if (intialObj.hasOwnProperty(el.sector)) {
      intialObj[el.sector] = intialObj[el.sector] + el.ownership;
    } else {
      intialObj[el.sector] = el.ownership;
    }
  });

  let initialObjpercent = [];

  for (var prop in intialObj) {
    initialObjpercent.push({ sector: prop, value: intialObj[prop].toFixed(2) });
  }

  const dateTypeHandler = (e) => {
    setPortfolioWeightingType(e.target.value);
  };

  let portfolioDataNeeded;
  if (portfolioWeightingType === "initial") {
    portfolioDataNeeded = initialObjpercent;
  } else {
    portfolioDataNeeded = portfolioObjpercent;
  }

  return (
    <Grid container spacing={3} className="mb-6">
      <Grid item xs={12} md={6}>
        <Card elevation={3} className="p-4">
          <div className="pt-4 flex items-center">
            <h1 className="m-0 text-muted flex-grow">
              Portfolio vs BenchMark Sector Weightings
            </h1>
            <Divider style={{ margin: "20px 0" }} />
          </div>

          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            <InputLabel id="demo-simple-select-standard-label">
              Data Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={portfolioWeightingType}
              onChange={dateTypeHandler}
              label="Data Type"
            >
              <MenuItem value={"initial"}>Initial Investment</MenuItem>
              <MenuItem value={"currentPort"}>Current Value</MenuItem>
            </Select>
          </Box>

          {/* </Grid> */}
          <Divider style={{ margin: "20px 0" }} />
          <SectorWeightingTable
            benchmarkSectorWeighting={benchmarkSectorWeighting}
            portfolioWeighting={portfolioDataNeeded}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card elevation={3} className="p-4">
          <h1 className="m-0 text-muted flex-grow">
            Portfolio vs BenchMark Sector Weightings Graph
          </h1>
          <Divider style={{ margin: "20px 0" }} />

          <StatisticalSummaryHorizontalBarChart
            benchmarkSectorWeighting={benchmarkSectorWeighting}
            portfolioWeighting={portfolioDataNeeded}
          />
          <div className="pt-4 flex items-center">
            <div className="flex justify-center items-centerml-3 h-16 w-16 rounded bg-error text-white"></div>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatCards2;
