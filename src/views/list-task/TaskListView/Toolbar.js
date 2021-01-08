import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  DialogContentText,
  DialogContent,
  Dialog,
  DialogActions,
} from '@material-ui/core';

import useForm from './useForm';
import { Search as SearchIcon } from 'react-feather';
import {connect} from 'react-redux';
import {fetchCollectionsStartAsync} from '../../../redux/city/city.actions';
import {fetchCollectionsStartAsync as fetchMr} from '../../../redux/mr/mr.actions';
import {fetchCollectionsStartAsync as fetchDoctor} from '../../../redux/doctor/doctor.actions';
import {fetchCollectionsStartAsync as fetchChemist} from '../../../redux/chemist/chemist.actions';
import validateInfo from './validateInfo';
import theme from 'src/theme';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
PaperProps: {
  style: {
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    width: 250,
  },
},
};

const Toolbar = ({ className,doctorData,chemistData,fetchCollectionsStart,mrData,fetchMrCollectionsStart,fetchDoctorCollectionsStart,fetchChemistCollectionsStart,...rest }) => {
  
  const {handleChange,values,errors,handleSubmit,open,handleClickOpen,handleClose,time,timeChange,mr,selectMr,person,personChange,doctor,doctorChange}=useForm(validateInfo,fetchCollectionsStart,fetchMrCollectionsStart,fetchChemistCollectionsStart,fetchDoctorCollectionsStart);
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  return (
    <>
    {console.log("E:",values)}
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
      <form onSubmit={handleSubmit} noValidate>
      <DialogContent>
      <InputLabel id ="select-mr">Select Mr</InputLabel>
      <FormControl variant="outlined" className={classes.formControl} style={{width: 100+"%",marginBottom:15,paddingTop:5}}>
        
      <InputLabel style={{ marginTop: theme.spacing(2) }} id="select-label">Select Mr</InputLabel>
          <Select
            id="select-label"
            fullWidth
            margin="normal"
            name="select_mr"
            error={errors.name && true}
            helperText={errors.name && errors.name}
            value={values.select_mr}
            style={{ marginTop: theme.spacing(1) }}
            MenuProps={MenuProps}
            variant="outlined"
            onChange={handleChange}
          >
            {mrData ? mrData.map((item) => {
              return <MenuItem key={item.id} id={item.id} value={item.id}>
                {item.name}
                </MenuItem>
            }) : <MenuItem value="">
                <em>None</em>
              </MenuItem>}
          </Select>

     
      
      </FormControl>
      <InputLabel id ="add-task-field">Choose Role.</InputLabel>
      <FormControl variant="outlined" className={classes.formControl} style={{width: 100+"%",marginTop:5,marginBottom:15,paddingTop:5}}>
      
        <Select
          id="add-task-field"   
          value={values.variable_id}
          error={errors.variable_id && true}
          helperText={errors.variable_id && errors.variable_id}
          onChange={handleChange}
          name="variable_id"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Doctor'}>Doctor</MenuItem>
          <MenuItem value={'Chemist'}>Chemist</MenuItem>
          
        </Select>
        </FormControl>
        <InputLabel id ="choose-doctor-chemist">Choose Particular Doctor or Chemist.</InputLabel>
           <FormControl variant="outlined" className={classes.formControl} style={{width: 100+"%",marginTop:5,marginBottom:10}}>
       
        <Select
          maxwidth
          labelId="choose-doctor-chemist"
          id="choose-doctor-chemist"
          error={errors.doctor_name && true}
          helperText={errors.doctor_name && errors.doctor_name}
          name='doctor_name'
          onChange={handleChange}
          value={values.doctor_name}
        >
         
          {console.log("DOCTORID:",doctorData)}
         {values.variable_id=='Doctor'? doctorData.map((item)=>{
            return  <MenuItem value={item.name}>{item.name}</MenuItem>
          }): chemistData.map((item)=>{
            return  <MenuItem value={item.name}>{item.name}</MenuItem>
          })}
        </Select>
        
        </FormControl>
     <InputLabel id ="add-task-field-option" >Enter no of times Mr visit to doctor or chemist.</InputLabel>
     <FormControl variant="outlined" className={classes.formControl} style={{width: 100+"%",marginTop:5,marginBottom:15}}>
       
           <TextField
            id ="add-task-field-option"
            label="Add Task"
            
            labelId ="add-task-field-option"
            error={errors.task && true}
            helperText={errors.task && errors.task}
            name="task"
            type="text"
            value={values.task}
            variant="outlined"
            onChange={handleChange}
          />
          </FormControl>
          <InputLabel id ="add-date-range">Select Date Range.</InputLabel>
           <FormControl variant="outlined" className={classes.formControl} style={{width: 100+"%",marginTop:5}}>
      
        <Select
          maxwidth
          labelId="add-date-range"
          id="add-date-range"
          error={errors.data_range && true}
          helperText={errors.data_range && errors.data_range}
          value={values.data_range}
          onChange={handleChange}
          name="data_range"
        >
          <MenuItem value={'Per Week'}>Per Week</MenuItem>
          <MenuItem value={'Per Month'}>Per Month</MenuItem>
          <MenuItem value={'Per Year'}>Per Year</MenuItem>
          
        </Select>
        
        </FormControl>
     
         
          </DialogContent>
      <DialogActions>
      <Button type="submit"  color="primary">
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
          Add Task
        </Button>
      </Box>
      
    </div>
    </>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

const mapStateToProps=state=>({
  mrData:state.mr.collections,
  doctorData:state.doctor.collections,
  chemistData:state.chemist.collections,
})
Toolbar.propTypes = {
  className: PropTypes.string
};
const mapDispatchToProps=dispatch=>({
  fetchCollectionsStart:()=>(dispatch(fetchCollectionsStartAsync())),
  fetchMrCollectionsStart:()=>(dispatch(fetchMr())),
  fetchDoctorCollectionsStart:()=>(dispatch(fetchDoctor())),
  fetchChemistCollectionsStart:()=>(dispatch(fetchChemist())),
  
});

export default connect(mapStateToProps,mapDispatchToProps)(Toolbar);
         