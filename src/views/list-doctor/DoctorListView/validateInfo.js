export default function validateInfo(values){
    let errors={}

    //Name
    if(!values.name){
        errors.name="Name required"
    }

    //Email
    if(!values.email){
        errors.email="Email required"
    }else if(!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(values.email)){
        errors.email="Email address is invalid"
    }

    //Phone number
    if(!values.number){
        errors.number="Contact Number must be required"
    }else if(!/^\d{10}$/i.test(values.number)){
        errors.number="Phone number is invalid"
    }


    //City
    if(!values.city){
        errors.city="City should be required"
    }

    //Area
    if(!values.area){
        errors.area="area should be required"
    }
    return errors;
}