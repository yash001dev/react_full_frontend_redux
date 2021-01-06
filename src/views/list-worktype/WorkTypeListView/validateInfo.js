export default function validateInfo(values){
    let errors={}

   
    //City
    if(!values.worktype){
        errors.worktype="WorkType should be required"
    }


    return errors;
}