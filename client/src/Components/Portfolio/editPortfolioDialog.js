import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import DataTable from './CreatePortfolioTable';
import { useDispatch } from 'react-redux';
import PortfolioInputForm from './CreatePortfolioInputForm';
import InputForm from './InputForm/InputForm';
import PaginationTable from './PaginationTable';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { updatePortfolio } from '../../actions/portfolio';
import { useHistory } from 'react-router-dom';
import { useSelector} from 'react-redux'
import { Avatar,IconButton, styled, DialogTitle,Button, Paper, Grid, Typography, Container,Dialog, DialogActions, DialogContent, Divider, TextField} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './InputForm/styles'
import EditableTable from './EditableTable'

// import IconButton from '@material-ui/icons/Icon';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (

    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      

      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function EditCustomizedDialogs({currentId,post,openState}) {

  // console.log('this is the currentId in EditCustomizedDialogs of editPortoflioDialog.js',currentId)
  // console.log('this is the post in EditCustomizedDialogs of editPortoflioDialog.js',post)
  // console.log('this is the descriptoin in EditCustomizedDialogs of editPortoflioDialog.js',post.description)
  console.log('[EditCustomizedDialogs.openState',openState)
  const [open, setOpen] = useState(openState || false);
  const [description, setDescription] = useState([post.description]);
  const [portfolioName, setPortfolioName] = useState(post.portfolioName)
  const [assets, setAssets] = useState(post.assets || [])
  const [ownership, setOwnership] = useState(post.ownership || [])
  const [sector, setSector] = useState(post.sector || [])
  const [image, setImage] = useState(post.image || [])
  const dispatch = useDispatch();
  const history = useHistory(); //!


  const [symbol, setSymbol] = useState("");
  const [errorState, setErrorState] = useState("");
  const [val, setVal] = useState(0);
  const [stockList, editStockList] = useState([]);
  const [pct, editPct] = useState([]);
  const limit = 100;
  const classes = useStyles() //!

  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');


  const currentAllowance = ownership.reduce((acc, value) => acc + value, 0);
  // console.log("Current Allowance: ",currentId);


  const symbolLookup = () => {
    fetch(
      // `https://financialmodelingprep.com/api/v3/quote/${symbol.toUpperCase()}?apikey=${'f69c6a774b0cfb6186868a361929fd36'}`
      `https://financialmodelingprep.com/api/v3/profile/${symbol.toUpperCase()}?apikey=f69c6a774b0cfb6186868a361929fd36`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log('this is the data from symbolLookup ',data);
        if (data[0] && data[0].symbol) {
          setAssets(assets.concat([symbol]));  //!  //////////////
          console.log('this is the assets in symbolLookup',assets)
          setOwnership(ownership.concat([parseInt(val)]));   //!  //////////////
          // console.log('thisis the assets in symbolLookup',ownership)
          setSector(sector.concat(data[0].sector))
          setImage(image.concat(data[0].image))
          setSymbol("");
          setVal(0);
        } else {
          setErrorState("Please enter a valid stock symbol");
        }
      });
  };

  
  const invalidInput = () => !symbol || !val || val > limit - currentAllowance;

  const deleteEntry =(index) =>{
      setAssets(assets.filter((asset,i)=>i!==index))
      setOwnership(ownership.filter((o,i)=>i!==index))
      setSector(sector.filter((s,i)=>i!==index))
      setImage(image.filter((img,i)=>i!==index))    
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdatePortfolio =() => {
    dispatch(updatePortfolio(currentId, {assets, ownership, sector,image }));
    setOpen(false)
    // console.log('this is the handleUpdatePortfolio in pagTable',currentId, {sector,image })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    console.log('this is the currentID in handlesubmit', currentId)
    if (!currentId) {
        // console.log('this is the createPortfolio in inputForm.js',{assets:stockList,ownership:portfolioPercentage,portfolioName})
        
        
    } else {
        dispatch(updatePortfolio(currentId, {assets, ownership, sector,image }));
    }
    // clear()
  }

  
  const [postData, setPostData] = useState({
    userId: '',
    Assets:[],
    Ownership:[],
    DateCreated:''
});

  return (
    <div>
      <IconButton onClick={handleClickOpen}> 
      <MoreVertIcon />
      </IconButton>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Edit Portfolio 
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" >
          Update/Edit Portfolio
        </BootstrapDialogTitle>
        <DialogContent dividers>

        <TextField
      variant='outlined'
      placeholder='Please enter a portfolio name'
      label= 'Portfolio Name'
      required
      fullWidth
      onChange={(e)=>setPortfolioName(e.target.value)}
      value ={portfolioName}
    />
      <Divider style={{ margin: '20px 0' }} />
      <TextField fullWidth rows={4} variant="outlined" label="Portfolio Description" multiline  value={description} onChange={(e) => setDescription(e.target.value)}/>
      <Divider style={{ margin: '20px 0' }} />
      
        <ul style={{ listStyle: "none", padding: 0 }}>
          {stockList.map((stock, i) => (
            <li key={i}>
              {stock}: {pct[i]}% : ${100*pct[i]}
            </li>
          ))}
            <li><h4>cash: {limit - currentAllowance}% : ${100*[limit - currentAllowance]}</h4></li>
        </ul> 
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
        {/* <Paper>
          <Button className={classes.buttonSubmit} variant='contained' color='primary' size='small' type='submit' >Complete Portfolio</Button>
          
        </Paper> */}
      </form>

        <PaginationTable post={{assets,ownership,sector,image,deleteEntry}} currentId={currentId}/>
        {/* <EditableTable post={{assets,ownership,sector,image,deleteEntry}} currentId={currentId}/> */}
          
        </DialogContent>
        <DialogActions>
          <Button size='small' color='secondary' autoFocus onClick={handleUpdatePortfolio}>
            Edit Portfolio
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
export default  EditCustomizedDialogs