import * as React from 'react';
import PropTypes from 'prop-types';
import Holdings from '../Portfolio/Holdings';
import TotalReturn from '../Portfolio/TotalReturn';
import SeasonalAnalysis from '../Portfolio/SeasonalAnalysis';
import StatisticalSummary from '../Portfolio/StatisticalSummary';

import {Box, Tab, Typography,Tabs} from '@material-ui/core'
import PostDetails from './PostDetails';


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
  const [value, setValue] = React.useState(0);

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
        <PostDetails/>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Holdings/>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TotalReturn/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SeasonalAnalysis/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <StatisticalSummary/>
      </TabPanel>
    </Box>
  );
}
