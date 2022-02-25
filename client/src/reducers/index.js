import { combineReducers } from 'redux'

import posts from './posts'
import auth from './auth'
import portfolio from './portfolio'

export const reducers = combineReducers({ posts, auth, portfolio })
