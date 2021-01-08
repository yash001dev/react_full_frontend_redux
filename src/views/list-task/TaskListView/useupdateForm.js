import {useState,useEffect} from 'react';
import axios from 'axios';
const useUpdateForm=(validateInfo,getChemistData,updateData,chemistData,getAppendData,deleteCollection,deleteCollection2)=>{
    const [values,setValue]=useState({   
        city:'',
    })
    const [id,setId]=useState('');
    
    //For Delete Declaration
    const [deleteId,setDeleteId]=useState('');
    const [isSubmitting,setIsSubmitting]=useState(false)
     const [deleteopen,setDeleteOpen]=useState(false);
     const [deleteopen2,setDeleteOpen2]=useState(false);
     const [fetch,setFetch]=useState(false);
     const [errors,setErrors]=useState({
    });

     const deleteHandleClickOpen=(data)=>{
        setDeleteOpen(true);
        setDeleteId(data);

      };

      const deleteHandleClickOpen2=(data)=>{
        setDeleteOpen2(true);
        setDeleteId(data);
      };

      const deleteHandleClickClose2=()=>{
        setDeleteOpen2(false);
      };
    
      const deleteHandleClickClose=()=>{
        setDeleteOpen(false);
      };

      const handleDelete=()=>{
          console.log("DELETE::",deleteId);
        console.log("Delete Button is Called...");
        console.log("DELETED ID:",deleteId.mr_id);
        const {mr_id,doctor_id}=deleteId
        axios.delete('http://localhost:3001/api/task/doctor/delete/',{
            select_mr:mr_id,
            doctor_id:doctor_id,
        });
        
        deleteCollection({mr_id,doctor_id});
        setDeleteOpen(false);
      }

      const handleDelete2=()=>{
        console.log("Delete Button2 is Called...");
        console.log("DELETED ID:",deleteId.city_id);
        axios.delete('http://localhost:3001/api/task/chemist/delete/',{
            select_mr:deleteId.mr_id,
            chemist_id:chemist_id,
        });
        const {select_mr,chemist_id}=deleteId
        deleteCollection2({select_mr,chemist_id});
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

    useEffect(()=>{
        getChemistData()
       
    },[]);
    useEffect(()=>{
        console.log("GET APPEND DATA CALLLED...");
        getAppendData();
    },[])
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


    

    return {handleChange,values,errors,handleEdit,open,handleClickOpen,handleClose,handleEdit,deleteopen,deleteHandleClickOpen,deleteHandleClickOpen2,deleteHandleClickClose,deleteHandleClickClose2,handleDelete,handleDelete2};
}

export default useUpdateForm;