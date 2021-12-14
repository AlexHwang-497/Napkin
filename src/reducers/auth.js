import {AUTH, LOGOUT} from '../constants/actionTypes'
// import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      console.log('this is the actionType.AUTH of action.data in reducers/auth.js:',action?.data)
      console.log('this is the actionType.AUTH of state in reducers/auth.js:',state)
      // *we are setting all the data for the login in local storage      
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data};
      // return { ...state, authData: action.data, loading: false, errors: null };

    case LOGOUT:
      // *this will clear out our Id in the application/localstorage:3000 tab in inspect window
      localStorage.clear();
      return { ...state, authData: null};
      // return { ...state, authData: null, loading: false, errors: null };

    default:
      return state;
  }
};

export default authReducer;




// const authReducer = (state = { authData: null }, action) => {
//   switch (action.type) {
//     case AUTH:
//       console.log('this is the actionType.AUTH of action.data in reducers/auth.js:',action?.data)
//       return state

//       // *we aer setting all the data for the login in local storage
//       // localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
//       // return { ...state, authData: action?.data};
//       // return { ...state, authData: action.data, loading: false, errors: null };
//     // case LOGOUT:
//       // localStorage.clear();

//       // return { ...state, authData: null, loading: false, errors: null };
//     default:
//       return state;
//   }
// };

// export default authReducer;
