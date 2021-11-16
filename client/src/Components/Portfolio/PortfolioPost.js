import React, { useState } from 'react';
import { Card, CardActions,Divider,styled, CardContent,Collapse, CardMedia, Button, Typography, ButtonBase, Avatar, CardHeader, IconButton, Table, TableHead,TableBody,TableRow,TableCell,  Icon ,TablePagination, ImageListItem  } from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';
import { useDispatch } from 'react-redux';
// import { deletePost, likePost } from '../../actions/posts';
import { deletePortfolio, likePortfolio } from '../../actions/portfolio';

import { useHistory } from 'react-router-dom';

import useStyles from './Styles'
import EditCustomizedDialogs from './editPortfolioDialog';
import { DEFAULT_GRID_PROPS_FROM_OPTIONS } from '@material-ui/data-grid';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// *<CardMedia className={classes.media} image={post.selectedFile} title={post.title} />; the posts here are taken from props
// *<Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>; this will tell us on our card like 5min or 5s ago
// * post.tags.map((tag) => `#${tag} `); we are looping through our tags and putting "#" on them
// *<Typography variant="h6">{post.name}</Typography>; this is now the id of the creator
const PortfolioPost = ({ post, setCurrentId }) => {
    
    const dispatch = useDispatch();
    const classes = useStyles()
    const [likes, setLikes] = useState(post?.likes);
    const [expanded, setExpanded] = useState(false);
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    console.log('this is user in client/portfolio/portfolioPost.js',user)
    console.log('this is post._id in client/portfolio/portfolioPost.js',post._id)
    const userId = user?.result.googleId || user?.result?._id;
    const hasLikedPost = post?.likes?.find((like) => like === userId);

    const handleLike = async () => {
      dispatch(likePortfolio(post._id));
      console.log('portfolio has been dispatch in handleLike of PortfolioPost.js')
  
      if (hasLikedPost) {
        setLikes(post.likes.filter((id) => id !== userId));
      } else {
        setLikes([...post.likes, userId]);
      }
    };

    const Likes = () => {
      if (post.likes.length > 0) {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = (e) => {
      history.push(`/posts/${post._id}`);
      // history.push(`/posts/${post._id}`);
    };
    const editPost =() => {
      // setCurrentId()
      <EditCustomizedDialogs currentId = {post._id}/>

    }
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
  }
  const handling =(event) =>{
      console.log('poop')
  }
  console.log('this is the post in portfolioPost',post)

    return (
      <Card raised elevation ={6} sx={{ maxWidth: 345 }}>
      <ButtonBase 
            component ="span" 
            name = "test" 
            className={classes.cardActions} 
            onClick={openPost}
          >        
      </ButtonBase>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={() => editPost}>
              <MoreVertIcon />
            </IconButton>
          }
          title={post.portfolioName}
          subheader={moment(post.dateCreated).fromNow()}
        />
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
        <Divider style={{ margin: '20px 0' }} />
        <Typography paragraph>Description:</Typography>
        <Typography variant="body2">
            {post.description}
      <EditCustomizedDialogs size='small'  currentId={post._id} post={post}/>
          </Typography>
        <Divider style={{ margin: '20px 0' }} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tags: #AAPL, #AMZN,#NFLX, # S&P500, #TECH
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePortfolio(post._id))}>
          <Likes/>
        </Button>
        <Button size="small" color="secondary" onClick={() => dispatch(deletePortfolio(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* <Typography paragraph>Securtities:</Typography>
          <Typography h6>
            {post.assets?post.assets.join(', '):''}
            <Divider style={{ margin: '20px 0' }} />
            <Typography paragraph>Portfolio%:</Typography>
            {post.ownership?post.ownership.join(', '):''}
          </Typography>
          <Typography h6>
            <Divider style={{ margin: '20px 0' }} />
          </Typography>  */}
            <Table className="whitespace-pre">
              <TableHead>
                <TableRow>
                  <TableCell className="px-0"></TableCell>
                  <TableCell className="px-0">Symbol</TableCell>
                  <TableCell className="px-0">Portfolio(%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow >
                  <TableCell>
                    <ImageListItem width="300" margin="auto">
                        <img src={post.image[0]}/>
                    </ImageListItem>
                  </TableCell>
                  <TableCell className="px-0 capitalize" align="left">{post.assets[0]}</TableCell>
                  <TableCell className="px-0 capitalize" align="left">{post.ownership[0]}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
        </CardContent>
      </Collapse>
    </Card>
      
      );
    };

export default PortfolioPost