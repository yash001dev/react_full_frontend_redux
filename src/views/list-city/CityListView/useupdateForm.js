import {useState,useEffect} from 'react';
import axios from 'axios';
const useUpdateForm=(validateInfo,getChemistData,deleteData,updateData,chemistData)=>{
    const [values,setValue]=useState({   
        city:'',
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
        console.log("DELETED ID:",deleteId.city_id);
        axios.delete(`http://localhost:3001/api/city/delete/${deleteId.city_id}`);
        deleteData(deleteId.city_id);
        setDeleteOpen(false);
      }

    //End Delete Declaration


    const handleClickOpen=(data)=>{
    setOpen(true);
       setValue({
        id:data.city_id,
        city:data.city_name,
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
            axios.put('http://localhost:3001/api/city/update',values);
            setValue({
                city:'',                

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