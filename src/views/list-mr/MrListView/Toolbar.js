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
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core';
import axios from 'axios';
import { Search as SearchIcon } from 'react-feather';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../../redux/mr/mr.actions';
import theme from 'src/theme';
import Input from '@material-ui/core/Input';


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
  const [selectDoctor, setSelectedDoctor] = useState([]);
  const [selectChemist, setSelectedChemist] = useState([]);
  const [fetchChemist, setFetchChemist] = useState('');
  const [fetchDoctor, setFetchDoctor] = useState('');
  // const [doctorId,setDoctorId]=useState();
  // const [chemistId,setChemistId]=useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    ChemistData();
  }, [])

  const DoctorData = async () => {
    const response = await axios('http://localhost:3001/api/doctor/get');
    if (response) {
      setFetchDoctor(response.data);
    }
    return null;
  }

  const ChemistData = async () => {
    const response = await axios('http://localhost:3001/api/chemist/get');
    if (response) {
      console.log("CHEMIST DATA:", response.data);
      setFetchChemist(response.data);
    }
    return null;
  }


  const handleSubmit = () => {
    console.log("Submit Button is Clicked");

    axios.post('http://localhost:3001/api/mr/insert', {
      name: name,
      email: email,
      number: contactNumber,
      area: area,
      city: city,
      doctor_id:selectDoctor,
      chemist_id:selectChemist,
    });

    setName('');

    setEmail('');
    setContactNumber('');
    setArea('');
    setCity('');
    setSelectedChemist([]);
    setSelectedDoctor([]);
    setOpen(false);
    fetchCollectionsStart();
    setFetch(true);
  };






  const classes = useStyles();

  return (

    <>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Mr</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add Mr According Your Requirements
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

          <InputLabel style={{ marginTop: theme.spacing(2) }} id="select-label">Select Doctor</InputLabel>

          <Select
            id="select-label"
            fullWidth
            multiple
            margin="normal"
            name="select_doctor"
            input={<Input/>}
            value={selectDoctor}
            style={{ marginTop: theme.spacing(1) }}
            renderValue={(selected)=>selected.join(', ')}
            MenuProps={MenuProps}
            variant="outlined"
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            {fetchDoctor ? fetchDoctor.map((item) => {
              return <MenuItem key={item.id} id={item.id} value={item.id}>
              <Checkbox checked={selectDoctor.indexOf(item.id) > -1} />
              <ListItemText primary={item.name} />
              </MenuItem>
          }) : <MenuItem value="">
              <em>None</em>
            </MenuItem>}
          </Select>

          <InputLabel style={{ marginTop: theme.spacing(2) }} id="select-label">Select Chemist</InputLabel>
          <Select
            id="select-label"
            fullWidth
            multiple
            margin="normal"
            name="select_chemist"
            value={selectChemist}
            style={{ marginTop: theme.spacing(1) }}
            input={<Input/>}
            renderValue={(selected)=>selected.join(', ')}
            MenuProps={MenuProps}
            variant="outlined"
            onChange={(e) => setSelectedChemist(e.target.value)}
          >
            {fetchChemist ? fetchChemist.map((item) => {
              return <MenuItem key={item.id} id={item.id} value={item.id}>
              <Checkbox checked={selectChemist.indexOf(item.id) > -1} />
              <ListItemText primary={item.name} />
              </MenuItem>
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
            Add Mr
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