import {Grid, Paper} from '@material-ui/core'
import PostDetails from '../../PostDetails/PostDetails'
import VerticalBar from '../Charts/BarChart'
import CollapsibleTable from '../CollapsableTable'
import ReturnsTable from './ReturnsTable'

function SeasonalAnalysis() {
    return (
        <Grid container >
        <Grid item xs={6} >
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <VerticalBar/>
            </Paper>
        </Grid>
        <Grid item xs={6} >
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <ReturnsTable/>
            </Paper>
        </Grid>

    </Grid>
        
    )
}

export default SeasonalAnalysis
