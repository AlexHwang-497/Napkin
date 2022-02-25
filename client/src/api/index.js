import axios from 'axios'

const API = axios.create({ baseURL: 'https://portfoliobuildertool-backend.herokuapp.com/' });  //this is the heroku


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
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const guestSignIn = () => API.post('/user/guest');

// *portfolio

export const createPortfolio = (newPortfolio) => API.post('/portfolio', newPortfolio);
export const fetchPortfolio = (id) => API.get(`/portfolio/${id}`);
export const fetchPortfolios = (page) => API.get(`/portfolio?page=${page}`);
export const fetchPortfoliosBySearch = (searchQuery) => API.get(`/portfolio/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}` );
export const commentPortfolio = (value, id) => API.post(`/portfolio/${id}/commentPortfolio`, { value });
export const likePortfolio = (id) => API.patch(`/portfolio/${id}/likePortfolio`);
export const updatePortfolio = (id, updatedPortfolio) => API.patch(`/portfolio/${id}`, updatedPortfolio);
export const deletePortfolio = (id) => API.delete(`/portfolio/${id}`);