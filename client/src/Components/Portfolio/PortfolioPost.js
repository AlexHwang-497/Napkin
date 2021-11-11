import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../actions/posts';
import { deletePortfolio, likePortfolio } from '../../actions/portfolio';

import { useHistory } from 'react-router-dom';

import useStyles from './Styles'
import EditCustomizedDialogs from './editPortfolioDialog';
import { DEFAULT_GRID_PROPS_FROM_OPTIONS } from '@material-ui/data-grid';

// *<CardMedia className={classes.media} image={post.selectedFile} title={post.title} />; the posts here are taken from props
// *<Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>; this will tell us on our card like 5min or 5s ago
// * post.tags.map((tag) => `#${tag} `); we are looping through our tags and putting "#" on them
// *<Typography variant="h6">{post.name}</Typography>; this is now the id of the creator
const PortfolioPost = ({ post, setCurrentId }) => {
    
    const dispatch = useDispatch();
    const classes = useStyles()
    const [likes, setLikes] = useState(post?.likes);
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log('this is user in client/portfolio/portfolioPost.js',user)
    console.log('this is post._id in client/portfolio/portfolioPost.js',post._id)
    

    const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post?.likes?.find((like) => like === userId);

    const handleLike = async () => {
      dispatch(likePost(post._id));
  
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

    return (
        <Card className={classes.card} raised elevation={6}>
          <ButtonBase component ="span" name = "test" className={classes.cardActions} onClick={openPost}>
            <CardMedia classesName ={classes.media} title ={post._id}/>
            <div className={classes.overlay}>
              {/* <Typography variant="h6">{post._id}</Typography> */}
              
              <Typography className={classes.title} variant="body2">{moment(post.dateCreated).fromNow()}</Typography>
              <Typography className={classes.title} variant="body2" color="textSecondary" component="p">{post.assets?post.assets.join(', '):''}</Typography>
              <Typography className={classes.title} variant="body2" color="textSecondary" component="p">{post.ownership?post.ownership.join(', '):''}</Typography>
            </div>

            <div className={classes.overlay2}>
              <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
            </div>

            <div className={classes.details}>
              <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.portfolioName}</Typography>
            <CardContent>
            </CardContent>
          </ButtonBase>
          <CardActions className={classes.cardActions}>
            `<Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
              <Likes/>
            </Button>

            <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize="small" /> Delete
            </Button>

            <EditCustomizedDialogs currentId={post._id} post={post}/>

          </CardActions>

            <p>
              {/* {post._id}
              {post.assets?post.assets.join(', '):''}
              {post.ownership?post.ownership.join(', '):''}
              {post.dateCreated} */}
            </p>
      
        </Card>
      );
    };

export default PortfolioPost