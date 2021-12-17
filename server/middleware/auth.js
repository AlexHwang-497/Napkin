import jwt from "jsonwebtoken";

// todo:  how does this work?  let's say a user wants to like a post
  // todo:  click the button => auth middleware(next) => then calles the like controller


const secret = 'test';

//* next; this means do something and move onto the next thing
const auth = async (req, res, next) => {
  // if(!req.headers || req.headers.authorization){
  //   next()

  // }
  // console.log('[server/auth.req',req)
  try {
    console.log('this is the req.headers in auth of middleware/auth.js',req.headers)
    const token = req.headers.authorization.split(" ")[1];
    // *this will help us determine if this our own Auth or the google one
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, 'test');

      // * this is how we get our ID if we are working with our own token
      req.userId = decodedData?.id;
    } else {
      // *we just pass in the token because we don't need the secret aka test
      decodedData = jwt.decode(token);
      // *sub; is google's id for a specific google user.  it is what diffrentiates it
      req.userId = decodedData?.sub;
    }    
    next();
  } catch (error) {
    console.log(error);
  }
};

// *this will eventually get sent to routes/posts.js
export default auth;
