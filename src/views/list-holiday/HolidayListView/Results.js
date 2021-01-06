import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {connect} from 'react-redux';
import {fetchCollectionsStartAsync,updateData,deleteData} from '../../../redux/holiday/holiday.actions';
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
  Button
} from '@material-ui/core';
import { AddShoppingCart, Delete, Update } from '@material-ui/icons';
// import getInitials from 'src/utils/getInitials';
import Axios from 'axios';
import useUpdateForm from './useupdateForm';
import validateInfo from './validateInfo';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, customers,chemistData,updateData,deleteData,getChemistData,...rest }) => {
  
  const {handleChange,values,errors,handleSubmit,open,handleClickOpen,handleClose,handleEdit,deleteopen,deleteHandleClickOpen,deleteHandleClickClose,handleDelete,}=useUpdateForm(validateInfo,getChemistData,deleteData,updateData,chemistData)

  //FormDialogs Declaration
//   const [open,setOpen]=useState(false);
//   const [id,setId]=useState('');
//   const [name,setName]=useState('');
//   const [shop_name,setShopName]=useState('');
//   const [email,setEmail]=useState('');
//   const [contactNumber,setContactNumber]=useState('');
//   const [area,setArea]=useState('');
//   const [city,setCity]=useState('');
//   const [deleteId,setDeleteId]=useState('');

//   //DeleteFormDialogs Declaration
//   const [deleteopen,setDeleteOpen]=useState(false);

//   const deleteHandleClickOpen=(data)=>{
//     setDeleteOpen(true);
//     setDeleteId(data);
//   };

//   const deleteHandleClickClose=()=>{
//     setDeleteOpen(false);
//   };

//   const handleClickOpen=(data)=>{
//     setId(data.id);
//     setName(data.name);
//     setShopName(data.shop_name);
//     setEmail(data.email);
//     setContactNumber(data.number);
//     setArea(data.area);
//     setCity(data.city);
//     setOpen(true);
//   };

//   const handleClose=()=>{
//     setOpen(false);
//   };

// const handleEdit=()=>{
//   console.log("Edit Button is Clicked");

//          Axios.put('http://localhost:3001/api/doctorReducer/update',{
//             id:id,
//             name:name,
//             email:email,
//             number:contactNumber,
//             area:area,
//             city:city,
//             shop_name:shop_name
//           })
//           updateData({id:id,name:name,shop_name:shop_name,email:email,city:city,area:area,number:contactNumber});
//           setOpen(false);
// };

// const handleDelete=()=>{
//   console.log("Delete Button is Called...");
//   console.log("DELETED ID:",deleteId.id);
//   Axios.delete(`http://localhost:3001/api/doctorReducer/delete/${deleteId.id}`);
//   deleteData(deleteId.id);
//   setDeleteOpen(false);
// }

  //Normal Declaration
  const classes = useStyles();
   const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
   const [limit, setLimit] = useState(10);
  //  const [doctorList,setDoctorList]=useState([]);

   useEffect(()=>{
     console.log("use Effect called...");
    getChemistData();
   },[])
  
  return (
    <>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleEdit} noValidate>
      <DialogTitle id="form-dialog-title">Edit Chemist</DialogTitle>
      <DialogContent>
        <DialogContentText>
        Edit Chemist According Your Requirements
        </DialogContentText>
        {/* <TextField
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
          /> */}
          {/* <TextField
            fullWidth
            error
            helperText={'Please Fill Data'}
            label="area"
            error={errors.area && true}
            helperText={errors.area && errors.area}
            margin="normal"
            name="area"
            type="text"
            value={values.area}
            variant="outlined"
            onChange={handleChange}
          /> */}
          <TextField
            fullWidth
            label="holiday"
            margin="normal"
            error={errors.holiday && true}
            helperText={errors.holiday && errors.holiday}
            name="holiday"
            type="text"
            value={values.holiday}
            variant="outlined"
            onChange={handleChange}
          />
      </DialogContent>
      <DialogActions>
      <Button type="submit" color="primary">
            Edit
          </Button>
      <Button onClick={handleClose} color="primary" autoFocus>
            Close
        </Button>
      </DialogActions>
      </form>
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










    
    {chemistData?
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                
                {/* <TableCell>
                  Shop Name
                </TableCell> */}
                
               
                
                <TableCell width="90%">
                Holiday
                </TableCell>
                <TableCell width =  "10%">
                  Operation
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chemistData.slice(0, limit).map((data,index) => (
                <TableRow
                  hover
                  
                  key={index}
                  selected={selectedCustomerIds.indexOf(data.holiday_id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell> */}
                  
                  {/* <TableCell>
                    {data.shop_name}
                  </TableCell> */}
                  
                  
                 
                  <TableCell width="90%">
                    {data.holiday_name}
                  </TableCell>
                  <TableCell width="10%">
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
  chemistData:state.holiday.collections
});
export default connect(mapStateToProps,mapDispatchToProps)(Results);

