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

export default (
  state = { isLoading: true, portfolios: [{ assets: [] }] },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        portfolios: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, portfolios: action.payload };

    case FETCH_POST:
      return { ...state, portfolio: action.payload.portfolio };
    case CREATE:
      return { ...state, portfolios: [...state.portfolios, action.payload] };
    case UPDATE:
      return {
        ...state,
        portfolios: state.portfolios.map((portfolio) =>
          portfolio._id === action.payload._id ? action.payload : portfolio
        ),
      };
    case DELETE:
      return {
        ...state,
        portfolios: state.portfolios.filter(
          (portfolio) => portfolio._id !== action.payload
        ),
      };
    case LIKE:
      return {
        ...state,
        portfolios: state.portfolios.map((portfolio) =>
          portfolio._id === action.payload._id ? action.payload : portfolio
        ),
      };
    case COMMENT:
      return {
        ...state,
        posts: state.portfolios.map((portfolio) => {
          if (portfolio._id === action.payload._id) {
            return action.payload;
          }
          return portfolio;
        }),
      };
    default:
      return state;
  }
};
