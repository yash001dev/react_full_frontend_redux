import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(({
  root: {}
}));






const Password = ({ className, ...rest }) => {
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

  const submitDoctor=()=>{
    Axios.post('http://localhost:3001/api/doctor/insert',{
      name:name,
      email:email,
      number:number,
      area:area,
      city:city,
    });

  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

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
            onClick={submitDoctor}
          >
            Submit
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
