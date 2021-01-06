export default function validateInfo(values){
    let errors={}

   
    //City
    if(!values.city){
        errors.city="City should be required"
    }


    return errors;
}