import React, { useState, useEffect } from 'react';
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
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import axios from 'axios';
import { Search as SearchIcon } from 'react-feather';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../../redux/senior/senior.actions';
import theme from 'src/theme';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, fetchCollectionsStart, ...rest }) => {


  const [fetch, setFetch] = useState(false);
  //Form Input
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [selectMr, setSelectedMr] = useState('');
  // const [selectChemist, setSelectedChemist] = useState('');
  const [fetchMr, setFetchMr] = useState('');
  // const [fetchDoctor, setFetchDoctor] = useState('');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetching() {
      console.log("CALLED............");
      await fetchCollectionsStart();
      setFetch(false);
    }
    fetching();
  }, [fetch])

  useEffect(() => {
    DoctorData();
    
  }, [])

  const DoctorData = async () => {
    const response = await axios('http://localhost:3001/api/mr/get');
    if (response) {
      setFetchMr(response.data);
    }
    return null;
  }

  // const ChemistData = async () => {
  //   const response = await axios('http://localhost:3001/api/senior/get');
  //   if (response) {
  //     console.log("SENIOR DATA:", response.data);
  //     setFetchChemist(response.data);
  //   }
  //   return null;
  // }


  const handleSubmit = () => {
    console.log("Submit Button is Clicked");

    axios.post('http://localhost:3001/api/senior/insert', {
      name: name,
      email: email,
      number: contactNumber,
      area: area,
      city: city,
      mr_id:selectMr,

    });

    setName('');

    setEmail('');
    setContactNumber('');
    setArea('');
    setCity('');
    setSelectedMr('');
    setOpen(false);
    fetchCollectionsStart();
    setFetch(true);
  };


  const classes = useStyles();

  return (

    <>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Chemist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add Senior According Your Requirements
        </DialogContentText>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            type="text"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            type="email"
            value={email}
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="number"
            margin="normal"
            name="number"
            type="text"
            value={contactNumber}
            variant="outlined"
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <TextField
            fullWidth
            label="area"
            margin="normal"
            name="area"
            type="text"
            value={area}
            variant="outlined"
            onChange={(e) => setArea(e.target.value)}
          />
          <TextField
            fullWidth
            label="city"
            margin="normal"
            name="city"
            type="text"
            value={city}
            variant="outlined"
            onChange={(e) => setCity(e.target.value)}
          />

          <InputLabel style={{ marginTop: theme.spacing(2) }} id="select-label">Select Mr</InputLabel>

          <Select
            id="select-label"
            fullWidth
            margin="normal"
            name="select_doctor"
            value={selectMr}
            style={{ marginTop: theme.spacing(1) }}
            variant="outlined"
            onChange={(e) => setSelectedMr(e.target.value)}
          >
            {fetchMr ? fetchMr.map((item) => {
              return <MenuItem id={item.id} value={item.id}>{item.name}</MenuItem>
            }) : <MenuItem value="">
                <em>None</em>
              </MenuItem>}
          </Select>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Submit
      </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
        </Button>
        </DialogActions>
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
            onClick={() => handleClickOpen()}
          >
            Add Senior
        </Button>
        </Box>

      </div>
    </>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => (dispatch(fetchCollectionsStartAsync())),
});

export default connect(null, mapDispatchToProps)(Toolbar);
