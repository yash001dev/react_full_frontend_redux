import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            type="text"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="number"
            margin="normal"
            name="number"
            type="text"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="area"
            margin="normal"
            name="area"
            type="text"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="city"
            margin="normal"
            name="city"
            type="text"
            variant="outlined"
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
