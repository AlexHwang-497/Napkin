import * as React from 'react';
import PropTypes from 'prop-types';
import DataTable from './CreatePortfolioTable';
import PortfolioInputForm from './CreatePortfolioInputForm';
import InputForm from './InputForm/InputForm';



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

export default function CustomizedDialogs() {
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
        Create Portfolio
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
          
          
          
          
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Create Portfolio
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
