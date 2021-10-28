import axios from 'axios'

// *we are creating this base URL with axios

const API = axios.create({ baseURL: 'http://localhost:5000' });


// *this is going to be a function that happens on each one of our requests
  // *we need this so our back end and middleware can actually verify that we are logged in
  API.interceptors.request.use((req) => {
  // *if this exists....
  if (localStorage.getItem('profile')) {
  // * then we want to add req.headers 
    //* which we take from the middleware/auth.js const token = req.headers.authorization.split(" ")[1];
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    console.log('this is the API Interceptor request in api/index.js',req.headers.Authorization)
  }
  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}` );

export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// *this might be form here instead of formData
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
