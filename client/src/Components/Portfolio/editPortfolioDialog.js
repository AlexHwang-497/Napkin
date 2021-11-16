import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import DataTable from './CreatePortfolioTable';
import { useDispatch } from 'react-redux';
import PortfolioInputForm from './CreatePortfolioInputForm';
import InputForm from './InputForm/InputForm';
import PaginationTable from './PaginationTable';
import { TextField } from '@material-ui/core';
import { updatePortfolio } from '../../actions/portfolio';
import { useHistory } from 'react-router-dom';
import { useSelector} from 'react-redux'

import { Avatar,IconButton, styled, DialogTitle,Button, Paper, Grid, Typography, Container,Dialog, DialogActions, DialogContent } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
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

function EditCustomizedDialogs({currentId,post}) {
  console.log('this is the currentId in EditCustomizedDialogs of editPortoflioDialog.js',currentId)
  console.log('this is the post in EditCustomizedDialogs of editPortoflioDialog.js',post)
  console.log('this is the descriptoin in EditCustomizedDialogs of editPortoflioDialog.js',post.description)
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState([post.description]);
  const [portfolioName, setPortfolioName] = useState(post.portfolioName)
  const [assets, setAssets] = useState(post.assets || [])
  const [ownership, setOwnership] = useState(post.ownership || [])
  const [sector, setSector] = useState(post.sector || [])
  const [image, setImage] = useState(post.image || [])
  const dispatch = useDispatch();
  const history = useHistory(); //!
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
    console.log('this is the handleUpdatePortfolio in pagTable',currentId, {sector,image })
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Portfolio
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Exit 
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



        <TextField fullWidth rows={4} variant="outlined" label="Portfolio Description" multiline  value= {description} onChange={(e) => setDescription(e.target.value)}></TextField>
        <PaginationTable post={{assets,ownership,sector,image,deleteEntry}} currentId={currentId}/>
          
          
          
          
          
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