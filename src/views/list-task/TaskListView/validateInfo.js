export default function validateInfo(values){
    let errors={}


    if(!values.task){
        errors.task="Task should be required"
    }
    //City

    if(!values.variable_id){
        console.log("THIS IS CALLED...........hey");
        errors.variable_id="You should select one from this"
    }

    if(!values.select_mr){
        errors.select_mr="Mr Name should be required"
    }

    if(!values.doctor_name){
        errors.doctor_name="Doctor Name should be required"
    }
    if(!values.data_range){
        errors.data_range="Date Range should be required"
    }



    return errors;
}