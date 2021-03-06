import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../actions/posts";
import useStyles from "./styles";
import CommentSection from "./CommentSection";
import { getPortfolio, getPortfoliosBySearch } from "../../actions/portfolio";

const RecommendedPosts = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPortfolio(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPortfoliosBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => {
    history.push(`/posts/${_id}`);
    history.go(0);
  };

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  const recommendedPosts = posts
    .filter(({ _id }) => _id !== post._id)
    .slice(0, 6);

  return (
    <Paper>
      <div className={classes.card}>
        {!!recommendedPosts.length && (
          <div className={classes.section}>
            <Typography gutterBottom variant="h5">
              Similar Portfolios:
            </Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {recommendedPosts.map(
                ({ portfolioName, description, message, likes, _id }) => (
                  <div
                    style={{ margin: "20px", cursor: "pointer" }}
                    onClick={() => openPost(_id)}
                  >
                    <Typography gutterBottom variant="h6">
                      {portfolioName}
                    </Typography>
                    <Divider />
                    <Typography gutterBottom variant="subtitle2">
                      {description}
                    </Typography>
                    <Divider />

                    <Typography gutterBottom variant="subtitle1">
                      Likes: {likes.length}
                    </Typography>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </Paper>
  );
};
export default RecommendedPosts;
