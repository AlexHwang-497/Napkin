
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

// ! why would you need a .js here?
import postRoutes from './routes/posts.js';
import userRoutes from "./routes/user.js";
import portfolioRoutes from "./routes/portfolio.js";
const app = express()
dotenv.config()
// *we are setting up the body parser to send our requests
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// app.use(cors({origin: 'http://localhost:3000'}))
// ! carlos notes: 
app.use(cors({origin: ['https://portfoliobuildertool.herokuapp.com','http://localhost:3000']}))
// app.use(cors({origin: ['http://localhost:3000']}))


// *what we have done here is we have set up every route aka postRoutes will start with '/posts'
    // * /posts; we setup all the routes inside of this post
    // *hence we should see then .... localhost:5000/posts to all the routes in post.js
app.use('/posts', postRoutes);
// *this adds the routes for the user
app.use("/user", userRoutes);
app.use('/portfolio', portfolioRoutes);

// *this is suppose to go to heroku
app.get('/',(req,res)=>{
    res.send('Hello to memories API')
})



// *we will connect our server application with a real data base aka mongoDB/////////


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    // * if connection is succesfful
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    // *if connection is unnsuccessful
    .catch((error) => console.log(`${error} did not connect`));
    // * we include this so we don't get warnings in the console---
        // !we can't include the bottom it will crash the app  ask carlos if this has anything to do with it?
    // mongoose.set('useFindAndModify', false);