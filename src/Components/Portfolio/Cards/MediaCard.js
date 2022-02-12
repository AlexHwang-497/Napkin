import {makeStyles} from '@material-ui/core/styles'
import { Card,CardActionArea, CardActions,CardContent,CardMedia,Button,Typography } from '@material-ui/core'


const useStyles = makeStyles({
    root:{
        maxWidth:345
    },
    media:{
        height:140,
    }
})

// interface Props{
//     image:String;
//     title:string;
//     description:String

// }


export default function MediaCards({image,title,description}){
    const classes =useStyles()
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia 
                    className={classes.media} 
                    image = '../../images/memoriesLogo.png' 
                    title ="Laptop Coffee"
                />
                <CardContent> 
                    <Typography gutterBottom variant="h5" component="h2">Laptop Coffee</Typography>
                    <Typography gutterBottom variant="body2" color="textSecondary" component="p">lorem impsumlorem impsumlorem impsumlorem impsumlorem impsum</Typography>

                </CardContent>
                    <CardActions>
                        <Button size ="small" color="primary">Share</Button>
                    </CardActions>
                    <CardActions>
                        <Button size ="small" color="primary">Learn More</Button>
                    </CardActions>

            </CardActionArea>
        </Card>
        
    )
}