export default function validateInfo(values){
    let errors={}

   
    //City
    if(!values.workplace){
        errors.workplace="WorkPlace should be required"
    }


    return errors;
}