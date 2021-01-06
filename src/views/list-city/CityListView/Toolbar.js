import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Dialog,
  DialogActions,
} from '@material-ui/core';

import useForm from './useForm';
import { Search as SearchIcon } from 'react-feather';
import {connect} from 'react-redux';
import {fetchCollectionsStartAsync} from '../../../redux/city/city.actions';
import validateInfo from './validateInfo';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className,fetchCollectionsStart,...rest }) => {
  const {handleChange,values,errors,handleSubmit,open,handleClickOpen,handleClose}=useForm(validateInfo,fetchCollectionsStart);
  const classes = useStyles();

  return (

    <>
    
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add City</DialogTitle>
      <form onSubmit={handleSubmit} noValidate>
      <DialogContent>
        <DialogContentText>
        Add City According Your Requirements
        </DialogContentText>
     
      
        
          <TextField
            fullWidth
            label="city"
            margin="normal"
            error={errors.city && true}
            helperText={errors.city && errors.city}
            name="city"
            type="text"
            value={values.city}
            variant="outlined"
            onChange={handleChange}
          />
      </DialogContent>
      <DialogActions>
      <Button type="submit" color="primary">
            Submit
      </Button>
      <Button onClick={handleClose} color="primary" autoFocus>
            Close
        </Button>
      </DialogActions>
      </form>
    </Dialog>




    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        
        <Button
          color="primary"
          variant="contained"
          onClick={()=>handleClickOpen()}
        >
          Add City
        </Button>
      </Box>
      
    </div>
    </>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

const mapDispatchToProps=dispatch=>({
  fetchCollectionsStart:()=>(dispatch(fetchCollectionsStartAsync())),
});

export default connect(null,mapDispatchToProps)(Toolbar);
