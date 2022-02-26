import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT,
} from "../constants/actionTypes";
import * as api from "../api/index";

export const getPortfolios = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPortfolios(page);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    // console.log('this is the error message in actions/portfolio.js',error.message)
    console.log(error);
  }
};

export const getPortfolio = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPortfolio(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getPortfoliosBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPortfoliosBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPortfolio = (portfolio, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPortfolio(portfolio);

    dispatch({ type: CREATE, payload: data });

    history.push(`/portfolio/${data._id}`);
  } catch (error) {
    // console.log('this is the error in createPortfolio of actions/portfolio.js:',error.message)
    console.log(error);
  }
};

export const updatePortfolio = (id, post) => async (dispatch) => {
  console.log("[updatePortfolio.post", post);
  try {
    const { data } = await api.updatePortfolio(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    // console.log('this is the error message from updatePortfolio in actions/posts.js',error.message);
    console.log(error);
  }
};

export const deletePortfolio = (id) => async (dispatch) => {
  try {
    await api.deletePortfolio(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    // console.log('this is the error message from deletePortfolio',error)
    console.log(error.message);
  }
};

export const likePortfolio = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePortfolio(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    // console.log('this is the error message from likePortfolio',error)
    console.log(error.message);
  }
};

export const commentPortfolio = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.commentPortfolio(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
