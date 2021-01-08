import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {connect} from 'react-redux';
import {fetchCollectionsStartAsync,updateData,deleteData1,deleteData2,fetchCollectionsAppendStartAsync} from '../../../redux/task/task.actions';
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

const Results = ({ className,secondData, customers,chemistData,updateData,deleteCollection,deleteCollection2,getChemistData,mrData,getAppendData,...rest }) => {
  
  const {handleChange,values,errors,handleSubmit,open,handleClickOpen,handleClose,handleEdit,deleteopen,deleteHandleClickOpen,deleteHandleClickClose,handleDelete,handleClickOpen2,deleteHandleClickOpen2}=useUpdateForm(validateInfo,getChemistData,updateData,chemistData,getAppendData,deleteCollection,deleteCollection2)

 
  const classes = useStyles();
   const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
   const [limit, setLimit] = useState(10);
  //  const [doctorList,setDoctorList]=useState([]);

    const mr_Name=(id)=>{
      const data=mrData.filter((item)=>item.id==id)
    //  console.log("MRDATA",data[0].name);
      return data[0].name?data[0].name:0;
      
    }


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
        
         <TableRow>

         
          <TextField
            fullWidth
            label="Add Task"
            margin="normal"
            error={errors.task && true}
            helperText={errors.task && errors.task}
            name="task"
            type="text"
            value={values.task}
            variant="outlined"
            onChange={handleChange}
          />
          
          </TableRow>
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
                
                <TableCell>
                  MR Name
                </TableCell>
                <TableCell>
                  Doctor Name
                </TableCell>
                <TableCell>
                  Chemist Name
                </TableCell>
                <TableCell>
                  Task 
                </TableCell>
                <TableCell>
                  Duration 
                </TableCell>
                
                
                {/* <TableCell>
                  Operation
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {chemistData.slice(0, limit).map((data,index) => (
                <TableRow
                  hover
                  
                  key={index}
                  selected={selectedCustomerIds.indexOf(data.mr_id) !== -1}
                >
                  
                  <TableCell width="90%">
                    {mr_Name(data.mr_id)}
                  </TableCell>
                  <TableCell>
                    {data.doctor_id?data.doctor_id:'-'}
                  </TableCell>
                  <TableCell>
                    {data.chemist_id?data.chemist_id:'-'}
                  </TableCell>
                  <TableCell>
                    {data.task}
                    </TableCell>
                    <TableCell>
                    {data.date_range}
                    </TableCell>
                    
                {/* <TableCell width="10%"> */}
                    {/* <IconButton onClick={()=>handleClickOpen(data)}>
                     <Update/>
                    </IconButton> */}
                    {/* <IconButton onClick={()=>deleteHandleClickOpen(data)}>
                      <Delete/>
                    </IconButton> */}
                  {/* </TableCell> */}
                </TableRow>
              ))}


                {secondData.slice(0, limit).map((data,index) => (
                <TableRow
                  hover
                  
                  key={index}
                  selected={selectedCustomerIds.indexOf(data.mr_id) !== -1}
                >
                  
                  <TableCell width="90%">
                  {mr_Name(data.mr_id)}
                  </TableCell>
                  <TableCell>
                    {data.doctor_id?data.doctor_id:'-'}
                  </TableCell>
                  <TableCell>
                    {data.chemist_id?data.chemist_id:'-'}
                  </TableCell>
                  <TableCell>
                    {data.task}
                    </TableCell>
                    <TableCell>
                    {data.date_range}
                    </TableCell>
                  {/* <TableCell width="10%"> */}
                    {/* <IconButton onClick={()=>handleClickOpen2(data)}>
                     <Update/>
                    </IconButton> */}
                    {/* <IconButton onClick={()=>deleteHandleClickOpen2(data)}>
                      <Delete/>
                    </IconButton> */}
                  {/* </TableCell> */}
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
  getChemistData:()=>dispatch(fetchCollectionsStartAsync()),
  getAppendData:()=>dispatch(fetchCollectionsAppendStartAsync()),
  deleteCollection:(item)=>dispatch(deleteData1(item)),
  deleteCollection2:(item)=>dispatch(deleteData2(item))
})

const mapStateToProps=(state)=>({
  mrData:state.mr.collections,
  chemistData:state.task.collections,
  secondData:state.task.collections2,
});
export default connect(mapStateToProps,mapDispatchToProps)(Results);

