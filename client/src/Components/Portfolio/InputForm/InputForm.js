import React, {useState,useEffect,Fragment} from "react";
import { nanoid } from 'nanoid'
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux'
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import useStyles from './styles'
import { createPost,updatePost } from "../../../actions/posts";
import Inputs from "../../../Auth/Input";
import { createPortfolio,updatePortfolio } from "../../../actions/portfolio";
import config from "../../../StockData/config";

// !! you need to copy the funciton of form.js to get this to work.  
  // * in  the original fomr.js sends it into post.js

function InputForm({currentId,setCurrentId}) {
  const apiKey=config.FMP_API_KEY_ID
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null)); //!
  
  // const [contacts, setContacts] = useState([]);
  // const [stockList, setStockList] = useState([])
  // const [stockLists, editStockList] = useState([]);
  // const [portfolioPercentage, setPortfolioPercentage] = useState([])
  // const [portfolioName, setPortfolioName] = useState('')
  // const [symbol,setSymbol] = useState([])
  // const [errorState, setErrorState] = useState("");
  // const [val, setVal] = useState(0);
  // // const [stockList, editStockList] = useState([]);
  // const [pct, editPct] = useState([]);
  // const limit = 100;

  const [symbol, setSymbol] = useState("");
  const [errorState, setErrorState] = useState("");
  const [val, setVal] = useState(0);
  const [stockList, editStockList] = useState([]);
  const [pct, editPct] = useState([]);
  const limit = 100;
  const [portfolioPercentage, setPortfolioPercentage] = useState([])
  const [portfolioName, setPortfolioName] = useState('')
  

  //! carlos code //////////////////////////////////////////////////////////////
  const symbolLookup = () => {
    fetch(
      `https://financialmodelingprep.com/api/v3/quote/${symbol.toUpperCase()}?apikey=${'f69c6a774b0cfb6186868a361929fd36'}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data[0] && data[0].symbol) {
          editStockList(stockList.concat([symbol]));
          editPct(pct.concat([parseInt(val)]));
          setSymbol("");
          setVal(0);
        } else {
          setErrorState("Please enter a valid stock symbol");
        }
      });
  };

  const currentAllowance = pct.reduce((acc, value) => acc + value, 0);
  console.log(
    "Current Allowance: ",
    pct.reduce((acc, value) => acc + value, 0)
  );
  const invalidInput = () => !symbol || !val || val > limit - currentAllowance;

  //!  /// /////////////// taken from portfolioInput          ////////////////////////
  const classes = useStyles() //!
  const history = useHistory(); //!
  const dispatch = useDispatch() //!
  const user = JSON.parse(localStorage.getItem('profile')); //!


  const [postData, setPostData] = useState({
    userId: '',
    Assets:[],
    Ownership:[],
    DateCreated:''
});
  const clear = () =>{
    setCurrentId(null)
    setPostData({ userId: '',assets:[],ownership:[],dateCreated:''});
}



const handleSubmit = async(e) =>{
  e.preventDefault()
  console.log('this is the currentID in handlesubmit', currentId)
  if (!currentId) {
      // console.log('this is the createPortfolio in inputForm.js',{assets:stockList,ownership:portfolioPercentage,portfolioName})
      dispatch(createPortfolio({assets:stockList,ownership:val,portfolioName}, history));
      
  } else {
      dispatch(updatePortfolio(currentId, { ...postData, name: user?.result?.name }));
  }
  clear()
}



  return (
    <div className="App">
      <h1>Stock Portfolio Builder</h1>
      <TextField
      variant='outlined'
      placeholder='Please enter a portfolio name'
      label= 'Portfolio Name'
      required
      fullWidth
      onChange={(e)=>setPortfolioName(e.target.value)}
      value ={portfolioName}
    />
      {stockList.length ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {stockList.map((stock, i) => (
            <li key={i}>
              {stock}: {pct[i]}% : ${100*pct[i]}
            </li>
          ))}
            <li>cash: {limit - currentAllowance}% : ${100*[limit - currentAllowance]}</li>
        </ul>
      ) : (
        <p>Portfolio is empty</p>
      )}
      <div>
        <input
          type="text"
          placeholder="Enter Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          onFocus={() => setErrorState("")}
        />
        <input
          type="number"
          placeholder="Enter percentage amount"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          min={1}
          max={limit - currentAllowance}
        />
        <button disabled={invalidInput()} onClick={symbolLookup}>
          Add
        </button>
        <p style={{ marginTop: 0, color: "red" }}>
          {errorState ? errorState : ""}
        </p>
      </div>
      <form autoComplete='off' noValidate={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Paper>
          <Button className={classes.buttonSubmit} variant='contained' color='primary' size='small' type='submit' >Complete Portfolio</Button>
          
        </Paper>
      </form>
    </div>
  );
    
    
};


export default InputForm
