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
import {fetchCollectionsStartAsync} from '../../../redux/doctor/doctor.actions';
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
      <DialogTitle id="form-dialog-title">Add Doctor</DialogTitle>
      <form onSubmit={handleSubmit} noValidate>
      <DialogContent>
        <DialogContentText>
        Add Doctor According Your Requirements
        </DialogContentText>
        <TextField
            fullWidth
            label="Name"
            error={errors.name && true}
            helperText={errors.name && errors.name}
            margin="normal"
            name="name"
            type="text"
            variant="outlined"
            value={values.name}
            onChange={handleChange}
          />
      
          <TextField
            fullWidth
            label="Email"
            error={errors.email && true}
            helperText={errors.email && errors.email}
            margin="normal"
            name="email"
            type="email"
            value={values.email}
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="number"
            margin="normal"
            error={errors.number && true}
            helperText={errors.number && errors.number}
            name="number"
            type="text"
            value={values.number}
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="area"
            margin="normal"
            error={errors.area && true}
            helperText={errors.area && errors.area}
            name="area"
            type="text"
            value={values.area}
            variant="outlined"
            onChange={handleChange}
          />
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
          Add Doctor
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
