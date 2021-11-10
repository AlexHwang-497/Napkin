import {combineReducers} from 'redux'

import posts from './posts'
import auth from './auth'
import portfolio from './portfolio'
import SecuritiesPriceReducer from './SecuritiesPriceReducer'


export const reducers=combineReducers({posts,auth,SecuritiesPriceReducer,portfolio})
