import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts';
import { commentPortfolio } from '../../actions/portfolio';
import useStyles from './styles';
import { useSelector } from 'react-redux';


const CommentSection = ({post,currentId}) => {
  // const { post, posts, isLoading } = useSelector((state) => state.posts);
    console.log('[CommentSection.post',post)
    console.log('[CommentSection.currentId',currentId)
    const user = JSON.parse(localStorage.getItem('profile'));
    // const user = currentId
    console.log('[CommentSection.user',user)
    // console.log('this is the user in commentSection',user)

    const dispatch = useDispatch();
    // const [comments, setComments] = useState(user.comments);
    const [comments, setComments] = useState(post?.comments);
    const classes = useStyles();
    const commentsRef = useRef();
    const [comment, setComment] = useState('');

    const handleComment = async () => {
        const finalComment = () => `${user.result.name}:${comment}`
        // dispatch(commentPost(finalComment,post._id))
        console.log('[CommentSection.finalComment', finalComment)
        console.log('[CommentSection.user.result.name', user.result.name)
        // console.log('[CommentSection.finalComment.user?.result?.name', user?.result?.name)
        // console.log('CommentSection.finalComment.comment', comment)
        const newComments = await dispatch(commentPortfolio(`${user?.result?.name}: ${comment}`, post._id));
        // const newComments = await dispatch(commentPortfolio(`${user}: ${comment}`, post._id));
        console.log('[CommentSection.newComments',newComments)
        setComment('');
        setComments(newComments);
    
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
      };

    // *{/* <strong>{c.split(': ')[0]}</strong> */}{/* {c.split(':')[1]} */};  we neeed to fix this part to get the comments to pop up
    
    return (
      <div>
        <div className={classes.commentsOuterContainer}>
          <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant="h6">Comments</Typography>
            {post && post.comments?.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong>{c.split(': ')[0]}</strong>
                {c.split(':')[1]}
              </Typography>
            ))}
            <div ref={commentsRef} />
          </div>
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h6">Write a comment</Typography>
            <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
            <br />
            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
              Comment
            </Button>
          </div>
        </div>
      </div>
    );
  };
    
    export default CommentSection;
    