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
import Axios from 'axios';
import { Search as SearchIcon } from 'react-feather';
import {connect} from 'react-redux';
import {fetchCollectionsStartAsync} from '../../../redux/doctor/doctor.actions';

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


  const [fetch,setFetch]=useState(false);
  //Form Input
  const [open,setOpen]=useState(false);
  const [name,setName]=useState('');
  
  const [email,setEmail]=useState('');
  const [contactNumber,setContactNumber]=useState('');
  const [area,setArea]=useState('');
  const [city,setCity]=useState('');
 
  const handleClickOpen=()=>{
    setOpen(true);
  };

  const handleClose=()=>{
    setOpen(false);
  };

  useEffect(()=>{
    async function fetching(){
      console.log("CALLED............");
      await fetchCollectionsStart();
      setFetch(false);
    }
    fetching();
  },[fetch])

const handleSubmit=()=>{
  console.log("Submit Button is Clicked");
        
         Axios.post('http://localhost:3001/api/doctor/insert',{
            name:name,
            email:email,
            number:contactNumber,
            area:area,
            city:city,
           
          });
          
          setName('');
         
          setEmail('');
          setContactNumber('');
          setArea('');
          setCity('');
          setOpen('');
          setOpen('');
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
        Add Doctor According Your Requirements
        </DialogContentText>
        <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            type="text"
            variant="outlined"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            type="email"
            value={email}
            variant="outlined"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="number"
            margin="normal"
            name="number"
            type="text"
            value={contactNumber}
            variant="outlined"
            onChange={(e)=>setContactNumber(e.target.value)}
          />
          <TextField
            fullWidth
            label="area"
            margin="normal"
            name="area"
            type="text"
            value={area}
            variant="outlined"
            onChange={(e)=>setArea(e.target.value)}
          />
          <TextField
            fullWidth
            label="city"
            margin="normal"
            name="city"
            type="text"
            value={city}
            variant="outlined"
            onChange={(e)=>setCity(e.target.value)}
          />
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
        {/* <Button className={classes.importButton}>
          Importimport { fetchCollectionsStart } from './../../../redux/doctor/doctor.actions';
import { connect } from 'react-redux';

        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button> */}
        <Button
          color="primary"
          variant="contained"
          onClick={()=>handleClickOpen()}
        >
          Add Doctor
        </Button>
      </Box>
      {/* <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box> */}
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
