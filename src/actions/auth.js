import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

// ! explanation of how this works at 2:00:44
export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {///////
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};




// import { AUTH } from '../constants/actionTypes';
// import * as api from '../api/index.js';

// export const signin = (form, history) => async (dispatch) => {
//   try {
//     //   *this will login the user
//     const { data } = await api.signIn(form);

//     dispatch({ type: AUTH, data });

//     history.push('/');
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const signup = (formData, history) => async (dispatch) => {
//   try {
//     const { data } = await api.signUp(formData);

//     dispatch({ type: AUTH, data });

//     history.push('/');
//   } catch (error) {
    
//     console.log('this is the error in signup in client/actions/auth.js',error);
//     console.log(error);
//   }
// };
