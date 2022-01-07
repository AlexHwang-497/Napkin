import React, {useState} from 'react'
import { Grid, Card, Icon, Fab, Button,MenuItem,Menu,Select } from '@material-ui/core'
import SectorWeightingTable from './SectorWeightingTable'
import StatisticalSummaryHorizontalBarChart from '../Charts/StatiscialSummaryHorizontalBarChart'

const StatCards2 = ({benchmarkSectorWeighting,portfolioWeighting}) => {
    console.log('[StatisticalSummary.statCards2.sectorWeighting',benchmarkSectorWeighting)
    console.log('[StatisticalSummary.statCards2.portfolioWeighting',portfolioWeighting)
    
    const [portfolioWeightingType,setPortfolioWeightingType] = useState('')
    let portfolioObj ={}
    // let portfolioObjpercent =[]
    let intialObj ={}
    
    const uniquePortfolioWeightings = portfolioWeighting.forEach((el) => {
        if (portfolioObj.hasOwnProperty(el.sector)) {
          portfolioObj[el.sector] = portfolioObj[el.sector] + el.portfolioValue;
        } else {
          portfolioObj[el.sector] = el.portfolioValue;
        }
      })
      const portfolioTotal = Object.values(portfolioObj).reduce((a,b)=>a+b)


    var portfolioObjpercent = [];

    for (var prop in portfolioObj) {
        portfolioObjpercent.push({ sector: prop, value: (portfolioObj[prop]/portfolioTotal*100).toFixed(2)});
    }

    const uniquePortfolioWeightingsInitial = portfolioWeighting.forEach((el) => {
        if (intialObj.hasOwnProperty(el.sector)) {
          intialObj[el.sector] = intialObj[el.sector] + el.ownership;
        } else {
          intialObj[el.sector] = el.ownership;
        }
    });

      console.log('[StatisticalSummary.statCards2.uniquePortfolioWeightings',portfolioObj)
      console.log('[StatisticalSummary.statCards2.uniquePortfolioWeightingsInitial',intialObj)
      console.log('[StatisticalSummary.statCards2.portfolioObjpercent',portfolioObjpercent)
    const dateTypeHandler = (e) => {
        setPortfolioWeightingType(e.target.value)
    }
    console.log('[StatisticalSummary.statCards2.portfolioWeightingType',portfolioWeightingType)
    let portfolioDataNeeded
    if(portfolioWeightingType==='initial'){
        portfolioDataNeeded = intialObj
    } else {
        portfolioDataNeeded = portfolioObjpercent
    }
    

    
    return (
        <Grid container spacing={3} className="mb-6">
            <Grid item xs={12} md={6}>
                <Card elevation={3} className="p-4">
                    <div className="flex items-center">
                        <Fab
                            size="medium"
                            className="bg-light-green circle-44 box-shadow-none"
                        >
                            <Icon className="text-green">trending_up</Icon>
                        </Fab>
                        {/* <h5 className="font-medium text-green m-0 ml-3">
                            Active Users
                        </h5> */}
                    </div>
                    <div className="pt-4 flex items-center">
                        {/* <h2 className="m-0 text-muted flex-grow">10.8k</h2> */}
                        <div className="flex justify-center items-centerml-3 h-16 w-16 rounded bg-green text-white">
                            {/* <Icon className="text-14">expand_less</Icon> */}
                        </div>
                        {/* <span className="text-13 text-green ml-1"> (+21%)</span> */}
                    </div>
                    <Select
                // value={}
                onChange={dateTypeHandler}
                label="Date">
                <MenuItem value={'initial'}>Initial Investment</MenuItem>
                <MenuItem value={'currentPort'}>Current Value</MenuItem>
                
            </Select>
                    <SectorWeightingTable benchmarkSectorWeighting={benchmarkSectorWeighting} portfolioWeighting={portfolioDataNeeded}/>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card elevation={3}  className="p-4">
                    <div className="flex items-center">
                        <Fab
                            size="medium"
                            className="bg-light-error circle-44 box-shadow-none overflow-hidden"
                        >
                            <Icon className="text-error">star_outline</Icon>
                        </Fab>
                        <h5 className="font-medium text-error m-0 ml-3">
                            Transactions
                        </h5>
                    </div>
                    <StatisticalSummaryHorizontalBarChart benchmarkSectorWeighting={benchmarkSectorWeighting} portfolioWeighting={portfolioDataNeeded}/>
                    <div className="pt-4 flex items-center">
                        
                        <div className="flex justify-center items-centerml-3 h-16 w-16 rounded bg-error text-white">
                            {/* <Icon className="text-14">expand_less</Icon> */}
                        </div>
                        {/* <span className="text-13 text-error ml-1">(+21%)</span> */}
                    </div>
                </Card>
            </Grid>
        </Grid>
    )
}

export default StatCards2
