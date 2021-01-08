import {useState,useEffect} from 'react';
import axios from 'axios';
const useForm=(validateInfo,fetchCollectionsStart,fetchMrCollectionsStart,fetchChemistCollectionsStart,fetchDoctorCollectionsStart)=>{
    const [values,setValue]=useState({
        task:'',       
        variable_id:'',
        select_mr:'',
        doctor_name:'',
        data_range:''
    })
    const [fetch,setFetch]=useState(false);
    const [open,setOpen]=useState(false);
    const [time, setTime] = useState('');
    const [person, setPerson] = useState('');
    const [doctor, setDoctor] = useState('');
    const [mr,setMr]=useState('');
    const [errors,setErrors]=useState({
    })
    const [isSubmitting,setIsSubmitting]=useState(false)

    const handleChange=e=>{
        const {name,value}=e.target
        console.log("VALUE:",value);
        setValue({
            ...values,
            [name]:value
        })
    }
    console.log("useUPDATEFROMDATA:",values);

    const selectMr=e=>{
        console.log("E:",e);
        setMr(e.target.value);

    }

    const handleSubmit=e=>{
        console.log("BUTTON IS CALLED...");
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

    const timeChange=(event)=>{
        setTime(event.target.value);
    };
    const personChange=(event)=>{
        setPerson(event.target.value);
    };

    
    const doctorChange=(event)=>{
        setDoctor(event.target.value);
    };
    
    useEffect(()=>{
        if(Object.keys(errors).length===0 && isSubmitting){
            if(values.variable_id=='Doctor'){
            axios.post('http://localhost:3001/api/task/doctor/insert',values);
            setValue({
                task:'',       
                variable_id:'',
                select_mr:'',
                doctor_name:'',
                data_range:''

            })
        }

        if(values.variable_id=='Chemist'){
                axios.post('http://localhost:3001/api/task/chemist/insert',values);
                setValue({
                    task:'',       
                    variable_id:'',
                    select_mr:'',
                    doctor_name:'',
                    data_range:''
    
            })
        }
            setFetch(true);
            setOpen(false);
    }},[errors])

    useEffect(()=>{
        async function fetching(){
            console.log("MR FETCHED....");
            await fetchMrCollectionsStart();
            console.log("MR COMPLETED...");
        }
        fetching();
    },[])

    useEffect(()=>{
        async function fetching(){
          console.log("CALLED............");
          await fetchCollectionsStart();
          setFetch(false);
        }
        fetching();
    },[fetch])

    useEffect(()=>{
        console.log("THIS IS CALLLED...");
        if(values.variable_id=='Doctor'){
            async function fetching(){
                console.log("Doctor FETCH CALLED....");
                await fetchDoctorCollectionsStart();
            }
            fetching();
        }
        if(values.variable_id=='Chemist'){
            async function fetching(){
                console.log("Person FETCH CALLED...");
                await fetchChemistCollectionsStart();
            }
            fetching();
        }
    }
    ,[values.variable_id])

    return {handleChange,values,errors,handleSubmit,open,handleClickOpen,handleClose,time,timeChange,mr,selectMr,person,personChange,doctor,doctorChange};
}

export default useForm;