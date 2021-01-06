import {useState,useEffect} from 'react';
import axios from 'axios';
const useForm=(validateInfo,fetchCollectionsStart)=>{
    const [values,setValue]=useState({
        name:'',

        city:'',
        area:'',
        email:'',
        
        number:'',

    })
    const [fetch,setFetch]=useState(false);
    const [open,setOpen]=useState(false);

    const [errors,setErrors]=useState({
    })
    const [isSubmitting,setIsSubmitting]=useState(false)

    const handleChange=e=>{
        const {name,value}=e.target
        setValue({
            ...values,
            [name]:value
        })
    }

    const handleSubmit=e=>{
        e.preventDefault();
        setErrors(validateInfo(values));
        setIsSubmitting(true);

    };

    const handleClickOpen=()=>{
        setOpen(true);
      };
    
      const handleClose=()=>{
        setOpen(false);
    };
    
    useEffect(()=>{
        if(Object.keys(errors).length===0 && isSubmitting){
            axios.post('http://localhost:3001/api/doctor/insert',values);
            setValue({
                name:'',
                
                city:'',
                area:'',
                email:'',
                
                number:'',
            })
            setFetch(true);
            setOpen(false);
        }
    },[errors])

    useEffect(()=>{
        async function fetching(){
          console.log("CALLED............");
          await fetchCollectionsStart();
          setFetch(false);
        }
        fetching();
    },[fetch])

    return {handleChange,values,errors,handleSubmit,open,handleClickOpen,handleClose};
}

export default useForm;