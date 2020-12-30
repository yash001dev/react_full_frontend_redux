import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Axios from 'axios';
import Select from '@material-ui/core/Select';
import {fetchCollectionsStartAsync} from '../../../redux/doctor/doctor.actions';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
  MenuItem
} from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className,fetchCollectionsStartAsync,getDoctorData,doctorData, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [number,setNumber]=useState('');
  const [area,setArea]=useState('');
  const [city,setCity]=useState('');
  const [selectDoctor,setSelectedDoctor]=useState('');

  useEffect(()=>{
    console.log("use Effect called...");
   getDoctorData();
  },[])

  const submitMr=()=>{
    Axios.post('http://localhost:3001/api/mr/insert',{
      name:name,
      email:email,
      number:number,
      area:area,
      city:city,
      doctor_id:selectDoctor,
    });

  }

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Add new Doctor"
          title="Doctor"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            type="text"
            variant="outlined"
            onChange={(e)=>setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            type="text"
            variant="outlined"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="number"
            margin="normal"
            name="number"
            type="text"
            variant="outlined"
            onChange={(e)=>setNumber(e.target.value)}
          />
          <TextField
            fullWidth
            label="area"
            margin="normal"
            name="area"
            type="text"
            variant="outlined"
            onChange={(e)=>setArea(e.target.value)}
          />
          <TextField
            fullWidth
            label="city"
            margin="normal"
            name="city"
            type="text"
            variant="outlined"
            onChange={(e)=>setCity(e.target.value)}
          />
          <Select
          id="select-label"
          fullWidth
          margin="normal"
          name="select_doctor"
          value={selectDoctor}
          variant="outlined"
          onChange={(e)=>setSelectedDoctor(e.target.value)}
          >
            {doctorData?doctorData.map((item)=>{
              return <MenuItem value={item.id}>{item.name}</MenuItem>
            }):<MenuItem value="">
            <em>None</em>
            </MenuItem>}
          </Select>
          
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={submitMr}
          >
            Submit
          </Button>
        </Box>
      </Card>
    </form>
  );
};

const mapDispatchToProps=dispatch=>({
  getDoctorData:()=>dispatch(fetchCollectionsStartAsync()),
})

const mapStateToProps=(state)=>({
  doctorData:state.doctor.collections
});

Password.propTypes = {
  className: PropTypes.string
};

export default connect(mapStateToProps,mapDispatchToProps)(Password);
