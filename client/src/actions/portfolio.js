import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH,START_LOADING,END_LOADING, FETCH_POST,COMMENT } from '../constants/actionTypes';
// *   import*; this means we import everything from the actions
import * as api from '../api/index'

// ?these are the action creators below; action creators are functions that return actions

// *getPosts = () => async(dispatch); the async(dispatch) is what thunk allows us to do 
export const getPortfolios = (page) => async (dispatch) => {
    try{
        dispatch({ type: START_LOADING });
        // *requesting all the data from the API
        const { data } = await api.fetchPortfolios(page);
        console.log('this is the data that is given from getPortfolios in action/portfolio.js:', data)
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });


    } catch(error){
        console.log('this is the error message in actions/portfolio.js',error.message)

    }
    // *an action is an object that has a type and payload
        // *payload; it is usually the data where we store all of our posts
        // *dispatch is an action btw
    // const action = {type:'FETCH_ALL', payload:[]}
}

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
    console.log('[Home.getPortfoliosBySearch.searchQuery',searchQuery)
    dispatch({ type: START_LOADING });
    const { data:{data}} = await api.fetchPortfoliosBySearch(searchQuery);
    console.log('[Home.portfolio.getPortfoliosBySearch.data',data)
    // const res = await api.fetchPostsBySearch(searchQuery);
    // console.log('this is the searchQuery in getPortfolioBySearch in client/actions/portfolio.js',searchQuery)
    // console.log('this is the data for getPostsBySearch in client/actions/posts.js:',data)

    // dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: FETCH_BY_SEARCH, payload:  data  });
    // console.log('[Home.posts.getPortfoliosBySearch.fetchPortfoliosBySearch.data',data)
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPortfolio = (portfolio, history) => async (dispatch) => {
    try{
        dispatch({ type: START_LOADING });
        // *this is making a backend post to our server
        const {data} = await  api.createPortfolio(portfolio)

        dispatch({type: CREATE, payload:data})
        
        history.push(`/portfolio/${data._id}`);
    } catch(error){
        console.log('this is the error in createPortfolio of actions/portfolio.js:',error.message)

    }   
}

export const updatePortfolio = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.updatePortfolio(id, post);
      console.log('this is the data from updatePortfolio in actions/portfolio.js:',data)
  
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
    
      console.log(error);
      console.log('this is the error message from updatePortfolio in actions/posts.js',error.message);
    }
  };


  export const deletePortfolio = (id) => async (dispatch) => {
    try {
      await api.deletePortfolio(id);
  
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log('this is the error message from deletePortfolio',error)  
      console.log(error.message);
    }
  };

  export const likePortfolio = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePortfolio(id);
      console.log('this is the data from likePortfolio in actions/posts.js:',data)
  
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error.message);
      console.log('this is the error message from likePortfolio',error)  
    }
  };

// *similar to like post
// *dispatch(commentPost(finalComment,post._id)); this is what is getting passed into value and id
  export const commentPortfolio = (value, id) => async (dispatch) => {
    try {
      // ! 
      // const { data } = await api.comment(value, id);
      const { data } = await api.commentPortfolio(value, id);
      console.log('this the data from commentPortfolio in actions/posts',data)
  
      dispatch({ type: COMMENT, payload: data });
      // *this means that we are returning the latest comments coming in
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };