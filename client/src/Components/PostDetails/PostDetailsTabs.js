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
  ;
  // console.log('[DEBUG] portfolio assets: ',assets );
  // console.log('[DEBUG] portfolio ownership: ',ownership );
  // console.log('[DEBUG] portfolio portfolioName: ',portfolioName );
  // console.log('[DEBUG] portfolio sector: ',sector );
  // console.log('[DEBUG] portfolio image: ',image );
  // console.log('this is the selectedPortfolios in BasicTabs',selectedPortfolio)
  // console.log('this is id in basicTabs',id)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Portfolio Overview" {...a11yProps(0)} />
          <Tab label="Holdings" {...a11yProps(1)} />
          <Tab label="Total Return" {...a11yProps(2)} />
          <Tab label="Seasonal Analysis" {...a11yProps(3)} />
          <Tab label="Statistical Summary" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PortfolioOverview assets={assets} currentId={id} ownership={ownership} portfolioName={portfolioName} sector={sector} image={image}/>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Holdings image={image}assets={assets} currentId={id} ownership={ownership} portfolioName={portfolioName} sector={sector}/>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TotalReturn assets={assets} currentId={id} ownership={ownership} portfolioName={portfolioName}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SeasonalAnalysis assets={assets} currentId={id} ownership={ownership} portfolioName={portfolioName}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <StatisticalSummary assets={assets} currentId={id} ownership={ownership} portfolioName={portfolioName}/>
      </TabPanel>
    </Box>
  );
}
