import React, { useState, useEffect } from 'react';
import PropTypes, { func } from 'prop-types';
import clsx from 'clsx';
import Axios from 'axios';
import Select from '@material-ui/core/Select';
import { fetchCollectionsStartAsync } from '../../../redux/doctor/doctor.actions';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { connect } from 'react-redux';
import theme from 'src/theme';
import { fetchCollectionsStart as fetchChemistData } from './../../../redux/chemist/chemist.actions';
import axios from 'axios';

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, fetchCollectionsStartAsync, getDoctorData, doctorData, chemistData,getChemistData, ...rest }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [selectDoctor, setSelectedDoctor] = useState('');
  const [selectChemist, setSelectedChemist] = useState('');
  const [fetchChemist,setFetchChemist]=useState('');
  const [fetchDoctor,setFetchDoctor]=useState('');
  
  const submitMr = () => {
    Axios.post('http://localhost:3001/api/mr/insert', {
      name: name,
      email: email,
      number: number,
      area: area,
      city: city,
      doctor_id: selectDoctor,
      chemist_id:selectChemist,
    });
    console.log("Button is clicked...");
  }

  useEffect(()=>{
    DoctorData();
    ChemistData();
  },[])

  const DoctorData=async ()=>{
    const response=await axios('http://localhost:3001/api/doctor/get');
    if(response){
      setFetchDoctor(response.data);
    }
    return null;
  }

  const ChemistData=async ()=>{
    const response=await axios('http://localhost:3001/api/chemist/get');
    if(response){
      console.log("CHEMIST DATA:",response.data);
      setFetchChemist(response.data);
    }
    return null;
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
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            type="text"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="number"
            margin="normal"
            name="number"
            type="text"
            variant="outlined"
            onChange={(e) => setNumber(e.target.value)}
          />
          <TextField
            fullWidth
            label="area"
            margin="normal"
            name="area"
            type="text"
            variant="outlined"
            onChange={(e) => setArea(e.target.value)}
          />
          <TextField
            fullWidth
            label="city"
            margin="normal"
            name="city"
            type="text"
            variant="outlined"
            onChange={(e) => setCity(e.target.value)}
          />
          <InputLabel style={{ marginTop: theme.spacing(2) }} id="select-label">Select Doctor</InputLabel>

          <Select
            id="select-label"
            fullWidth
            margin="normal"
            name="select_doctor"
            value={selectDoctor}
            style={{ marginTop: theme.spacing(1) }}
            variant="outlined"
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            {fetchDoctor ? fetchDoctor.map((item) => {
              return <MenuItem id={item.id} value={item.id}>{item.name}</MenuItem>
            }) : <MenuItem value="">
                <em>None</em>
              </MenuItem>}
          </Select>

          <InputLabel style={{ marginTop: theme.spacing(2) }} id="select-label">Select Chemist</InputLabel>
          <Select
            id="select-label"
            fullWidth
            margin="normal"
            name="select_chemist"
            value={selectChemist}
            style={{ marginTop: theme.spacing(1) }}
            variant="outlined"
            onChange={(e) => setSelectedChemist(e.target.value)}
          >
            {fetchChemist? fetchChemist.map((item) => {
              return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            }) : <MenuItem value="">
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



const mapStateToProps = (state) => ({
  doctorData: state.doctor.collections,
  chemistData: state.chemist.collections
});

// const mapDispatchToProps = dispatch => ({
//   getDoctorData: () => dispatch(fetchCollectionsStartAsync()),
//   getChemistData:()=>dispatch(fetchChemistData())
// });
Password.propTypes = {
  className: PropTypes.string
};

export default connect(mapStateToProps)(Password);
