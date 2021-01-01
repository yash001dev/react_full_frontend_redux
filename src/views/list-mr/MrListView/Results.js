import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {connect} from 'react-redux';
import {fetchCollectionsStartAsync,updateData,deleteData} from '../../../redux/mr/mr.actions';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  // Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';
import { AddShoppingCart, Delete, Update } from '@material-ui/icons';
// import getInitials from 'src/utils/getInitials';
import axios from 'axios';
import theme from 'src/theme';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, customers,mrData,updateData,deleteData,getChemistData,...rest }) => {
  
  //FormDialogs Declaration
  const [open,setOpen]=useState(false);
  const [id,setId]=useState('');
  const [name,setName]=useState('');
  // const [shop_name,setShopName]=useState('');
  const [email,setEmail]=useState('');
  const [contactNumber,setContactNumber]=useState('');
  const [area,setArea]=useState('');
  const [city,setCity]=useState('');
  const [deleteId,setDeleteId]=useState('');

  const [doctor_id,setDoctorId]=useState();
  const [chemist_id,setChemistId]=useState();

  //DeleteFormDialogs Declaration
  const [deleteopen,setDeleteOpen]=useState(false);


  const [selectDoctor, setSelectedDoctor] = useState('');
  const [selectChemist, setSelectedChemist] = useState('');
  const [fetchChemist,setFetchChemist]=useState('');
  const [fetchDoctor,setFetchDoctor]=useState('');

  const deleteHandleClickOpen=(data)=>{
    setDeleteOpen(true);
    setDeleteId(data);
  };

  const deleteHandleClickClose=()=>{
    setDeleteOpen(false);
  };

  const handleClickOpen=(data)=>{
    setId(data.id);
    setName(data.name);
    
    setEmail(data.email);
    setContactNumber(data.number);
    setArea(data.area);
    // setCity(data.city);
    setDoctorId(data.doctor_id);
    setChemistId(data.chemist_id);
    setOpen(true);
  };

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


  const handleClose=()=>{
    setOpen(false);
  };

const handleEdit=()=>{
  console.log("Edit Button is Clicked");

         axios.put('http://localhost:3001/api/mr/update',{
            id:id,
            name:name,
            email:email,
            number:contactNumber,
            area:area,
            doctor_id:selectDoctor,
            chemist_id:selectChemist,
          })
          updateData({id:id,name:name,email:email,city:city,area:area,number:contactNumber,doctor_id:selectDoctor,chemist_id:selectChemist});
          setOpen(false);
};

const handleDelete=()=>{
  console.log("Delete Button is Called...");
  console.log("DELETED ID:",deleteId.id);
  axios.delete(`http://localhost:3001/api/mr/delete/${deleteId.id}`);
  deleteData(deleteId.id);
  setDeleteOpen(false);
}

  //Normal Declaration
  const classes = useStyles();
   const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
   const [limit, setLimit] = useState(10);
  //  const [doctorList,setDoctorList]=useState([]);

   useEffect(()=>{
     console.log("use Effect called...");
    getChemistData();
   },[])

   useEffect(()=>{
    DoctorData();
    ChemistData();
   },[])
  
  return (
    <>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Chemist</DialogTitle>
      <DialogContent>
        <DialogContentText>
        Edit Mr According Your Requirements
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


          

      </DialogContent>
      <DialogActions>
      <Button onClick={handleEdit} color="primary">
            Edit
          </Button>
      <Button onClick={handleClose} color="primary" autoFocus>
            Close
        </Button>
      </DialogActions>
    </Dialog>


    
    <Dialog
        open={deleteopen}
        onClose={deleteHandleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Want to Delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteHandleClickClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>  
        </DialogActions>
      </Dialog>

    {mrData?
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Contact Number
                </TableCell>
                <TableCell>
                  Area
                </TableCell>
                <TableCell>
                  City
                </TableCell>
                <TableCell>
                  Assign Doctor
                </TableCell>
                <TableCell>
                  Assign Chemist
                </TableCell>
                <TableCell>
                  Operation
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mrData.slice(0, limit).map((data,index) => (
                <TableRow
                  hover
                  key={index}
                  selected={selectedCustomerIds.indexOf(data.id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      {/* <Avatar
                        className={classes.avatar}
                        src={customer.avatarUrl}
                      >
                        {getInitials(customer.name)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {data.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {data.email}
                  </TableCell>
                  <TableCell>
                    {data.number}
                    {/* {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`} */}
                  </TableCell>
                  <TableCell>
                    {data.area}
                  </TableCell>
                  <TableCell>
                    {data.city}
                  </TableCell>
                  <TableCell>
                      {data.doctor_id}
                  </TableCell>
                  <TableCell>
                      {data.chemist_id}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={()=>handleClickOpen(data)}>
                     <Update/>
                    </IconButton>
                    <IconButton onClick={()=>deleteHandleClickOpen(data)}>
                      <Delete/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>: <CircularProgress />}
  </>);
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

const mapDispatchToProps=dispatch=>({
  updateData:(item)=>dispatch(updateData(item)),
  deleteData:(item)=>dispatch(deleteData(item)),
  getChemistData:()=>dispatch(fetchCollectionsStartAsync()),
})

const mapStateToProps=(state)=>({
  mrData:state.mr.collections
});
export default connect(mapStateToProps,mapDispatchToProps)(Results);

