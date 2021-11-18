import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import { getPortfolio, getPortfoliosBySearch } from '../../actions/portfolio';
import useStyles from './styles';
import CommentSection from './CommentSection';



const RecommendedPosts = () => {
    // const { post, posts, isLoading } = useSelector((state) => state.posts);
    const { portfolio, portfolios, isLoading } = useSelector((state) => state.portfolios);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPortfolio(id));
      }, [id]);
    
      useEffect(() => {
        if (portfolio) {
          dispatch(getPortfoliosBySearch({ search: 'none', tags: portfolio?.tags.join(',') }));
        }
      }, [portfolio]);

      if (!portfolio) return null;
      const openPost = (_id) => history.push(`/portfolios/${_id}`);

      if (isLoading) {
        return (
          <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
          </Paper>
        );
      }


    const recommendedPortfolios = portfolios.filter(({ _id }) => _id !== portfolio._id);


    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div className={classes.card}>
            {!!recommendedPortfolios.length && (
            <div className={classes.section}>
                <Typography gutterBottom variant="h5">You might also like:</Typography>
                <Divider />
                <div className={classes.recommendedPosts}>
                {recommendedPortfolios.map(({ title, name, message, likes, selectedFile, _id }) => (
                    <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                    <Typography gutterBottom variant="h6">{title}</Typography>
                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                    <Typography gutterBottom variant="subtitle2">{message}</Typography>
                    <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                    
                    </div>
                ))}
                </div>
            </div>
            )}
        </div>
      </Paper>
    )
}
export default RecommendedPosts