import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import DataTable from './CreatePortfolioTable';
import { useDispatch } from 'react-redux';
import PortfolioInputForm from './CreatePortfolioInputForm';
import InputForm from './InputForm/InputForm';
import PaginationTable from './PaginationTable';



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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        <InputForm/>
        <PaginationTable post={post} currentId={currentId}/>
          
          
          
          
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Edit Portfolio
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
export default  EditCustomizedDialogs