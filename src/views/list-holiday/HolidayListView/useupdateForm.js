import {useState,useEffect} from 'react';
import axios from 'axios';
const useUpdateForm=(validateInfo,getChemistData,deleteData,updateData,chemistData)=>{
    const [values,setValue]=useState({   
        holiday:'',
    })
    const [id,setId]=useState('');

    //For Delete Declaration
    const [deleteId,setDeleteId]=useState('');
    const [isSubmitting,setIsSubmitting]=useState(false)
     const [deleteopen,setDeleteOpen]=useState(false);
     const [fetch,setFetch]=useState(false);
     const [errors,setErrors]=useState({
    });

     const deleteHandleClickOpen=(data)=>{
        setDeleteOpen(true);
        setDeleteId(data);
      };
    
      const deleteHandleClickClose=()=>{
        setDeleteOpen(false);
      };

      const handleDelete=()=>{
        console.log("Delete Button is Called...");
        console.log("DELETED ID:",deleteId.holiday_id);
        axios.delete(`http://localhost:3001/api/holiday/delete/${deleteId.holiday_id}`);
        deleteData(deleteId.holiday_id);
        setDeleteOpen(false);
      }

    //End Delete Declaration


    const handleClickOpen=(data)=>{
    setOpen(true);
       setValue({
        id:data.holiday_id,
        holiday:data.holiday_name,
       })
    }

    const handleClose=()=>{
        setOpen(false);
    };

    //Handle Edit
    const handleEdit=e=>{
        console.log("Edit is called...");
        e.preventDefault();
        setErrors(validateInfo(values));
        setIsSubmitting(true);

    };

    useEffect(()=>{
        if(Object.keys(errors).length===0 && isSubmitting){
            console.log("UPDATE...",values);
            axios.put('http://localhost:3001/api/holiday/update',values);
            setValue({
                holiday:'',                

            })
            updateData(values);
            setOpen(false);
            setFetch(true);
        }
    },[errors])
    //End Edit
    
    // useEffect(()=>{
    //     async function fetching(){
    //       console.log("CALLED............");
    //       await getChemistData();
    //       setFetch(false);
    //     }
    //     fetching();
    // },[fetch])

   
    const [open,setOpen]=useState(false);

    
   

    const handleChange=e=>{
        const {name,value}=e.target
        setValue({
            ...values,
            [name]:value
        })
    }


    

    return {handleChange,values,errors,handleEdit,open,handleClickOpen,handleClose,handleEdit,deleteopen,deleteHandleClickOpen,deleteHandleClickClose,handleDelete};
}

export default useUpdateForm;