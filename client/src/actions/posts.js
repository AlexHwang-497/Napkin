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
} from '../constants/actionTypes'

import * as api from '../api/index'

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    // *requesting all the data from the API
    const { data } = await api.fetchPosts(page)

    dispatch({ type: FETCH_ALL, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log('this is the error message in actions/posts.js', error.message)
  }
}

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })

    const { data } = await api.fetchPost(id)

    dispatch({ type: FETCH_POST, payload: { post: data } })
  } catch (error) {
    console.log(error)
  }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery)
    // const res = await api.fetchPostsBySearch(searchQuery);
    console.log(
      'this is the searchQuery in getPostsBySearch in client/actions/posts.js',
      searchQuery,
    )

    dispatch({ type: FETCH_BY_SEARCH, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    // *this is making a backend post to our server
    const { data } = await api.createPost(post)
    dispatch({ type: CREATE, payload: data })

    history.push(`/posts/${data._id}`)
  } catch (error) {
    console.log(error.message)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post)

    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error)
    console.log(
      'this is the error message from updatePost in actions/posts.js',
      error.message,
    )
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)

    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.log(error.message)
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id)

    dispatch({ type: LIKE, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id)

    dispatch({ type: COMMENT, payload: data })

    return data.comments
  } catch (error) {
    console.log(error)
  }
}
