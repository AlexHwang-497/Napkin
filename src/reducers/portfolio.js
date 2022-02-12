import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING,FETCH_POST,COMMENT } from '../constants/actionTypes';
// *action.payload are our actual posts from dispatch({type:'FETCH_ALL', payload:[]})
export default (state = { isLoading: true, portfolios: [{assets:[]}] }, action) => {
    switch(action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            console.log('inside portfolio reducer this is data',action.payload.data)
            return {
                ...state,
                portfolios: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
              };
        case FETCH_BY_SEARCH:
            return { ...state, portfolios: action.payload };
            // console.log('this is the action.palyload of FETCH_BY_SEARCH in reducer/postsaction.payload',action.payload.data)
            // return action.payload.data;
            // return action.payload;
        case FETCH_POST:
            return { ...state, portfolio: action.payload.portfolio };
        case CREATE:
            return { ...state, portfolios: [...state.portfolios, action.payload] };
        case UPDATE:
            // *if the post._id is === the action.payload._id(whicih is the updatedd post); then we return the action.payload
                // *action.payload is the newly updated post
            // return state.map((post) => (post._id === action.payload._id ? action.payload : post));
            return { ...state, portfolios: state.portfolios.map((portfolio) => (portfolio._id === action.payload._id ? action.payload : portfolio)) };
        case DELETE:
            // *we are first going to get all the state then we are going to filter out what we plan on  deleting
            //* post._id !== action.payload; we will then remove it
            return { ...state, portfolios: state.portfolios.filter((portfolio) => portfolio._id !== action.payload) };
        case LIKE:
            console.log('this is the LIKE in reducers/portfolio.js')
            return { ...state, portfolios: state.portfolios.map((portfolio) => (portfolio._id === action.payload._id ? action.payload : portfolio)) };
        case COMMENT:
            return {
                ...state,
                posts: state.portfolios.map((portfolio) => {
                    // *return all other posts normally
                    // *change the post that just received  a comment
                    
                if (portfolio._id === action.payload._id) {
                
                    console.log('[CommentSection.reducer.action.payload',action.payload)        
                    console.log('[CommentSection.reducer.state',state)        
                    return action.payload;
                    
                }
                return portfolio;
            }),
            // console.log('[CommentSection.reducer.action.payload',action.payload._id)
            // console.log('[CommentSection.reducer.portfoilio',portfolio)
            };
        default:
            return state;
    }
}




