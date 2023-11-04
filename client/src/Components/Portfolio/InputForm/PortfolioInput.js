import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { createPortfolio, updatePortfolio } from "../../../actions/portfolio";
import { useHistory } from "react-router-dom";



const PortfolioInputForm = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    userId: "",
    Assets: [],
    Ownership: [],
    DateCreated: "",
  });

  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(null);
    setPostData({ userId: "", assets: [], ownership: [], dateCreated: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentId) {
      dispatch(
        createPortfolio({ ...postData, name: user?.result?.name }, history)
      );
    } else {
      dispatch(
        updatePortfolio(currentId, { ...postData, name: user?.result?.name })
      );
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create an investment portfolio.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={7}>
      <form
        autoComplete="off"
        noValidate={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post.assets}"` : "Add a stock"}
        </Typography>
        <TextField
          name="assets"
          variant="outlined"
          label="Symbol"
          value={postData.assets}
          onChange={(e) => setPostData({ ...postData, assets: e.target.value })}
        />
        <TextField
          name="ownership"
          variant="outlined"
          label="% of Portfolio"
          value={postData.ownership}
          onChange={(e) =>
            setPostData({ ...postData, ownership: e.target.value })
          }
        />

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default PortfolioInputForm;
