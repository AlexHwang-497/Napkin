import {Grid, Paper} from '@material-ui/core'
import PostDetails from '../PostDetails/PostDetails'
import VerticalBar from './Charts/BarChart'
import CollapsibleTable from './CollapsableTable'

function SeasonalAnalysis() {
    return (
        <Grid container>
            <Grid item xs={8} >
                <Paper>
                    <VerticalBar/>
                </Paper>
            </Grid>
            
            <Grid item xs={8} >
                <Paper>
                    <CollapsibleTable/>
                </Paper>
            </Grid>

        </Grid>
        
    )
}

export default SeasonalAnalysis
