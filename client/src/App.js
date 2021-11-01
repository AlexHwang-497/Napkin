import React from 'react'
import {Container} from '@material-ui/core'
// *this will allow us to use LINK
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import FetchStockPrice from './StockData/FetchStockPrices';

import useStyles from './styles' 
import Navbar from './Navbar/Navbar';
import Home from '../src/Home/Home';
import Auth from './Auth/Auth';
import PostDetails from './Components/PostDetails/PostDetails';
import TreasuryRates from './StockData/TreasuryRates';
import CreatePortfolio from './Components/Portfolio/CreatePortfolioForm';

import CustomizedDialogs from './Components/Portfolio/Dialog';




// *<Grow>; provides simple animation
//*<Container maxWidth='xl'></Container>; changing this to xL will give us more posts on our page
// *<Route path="/" exact component={() => <Redirect to="/posts" />} />; what the redirect does here is, it is going to redirect us to '/posts'
const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Container maxWidth='xl'>
                <CustomizedDialogs/>
                {/* <TreasuryRates/> */}
                {/* <FetchStockPrice/> */}
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/posts" />} />
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" exact component={PostDetails} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}
export default App