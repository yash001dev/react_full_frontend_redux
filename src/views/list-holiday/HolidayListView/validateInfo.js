export default function validateInfo(values){
    let errors={}

   
    //Holiday
    if(!values.holiday){
        errors.holiday="Holiday should be required"
    }


    return errors;
}