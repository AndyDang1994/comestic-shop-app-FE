

export default function ValidateInfor(values){
 
    console.log("username : " + values.username)
    console.log("password : " + values.password)
    let errors = {
    }
   
    if(!values.username){
        errors.username = "Username required"
    }

    if(!values.password){
        errors.password = "Password required"
    }

    if(values.password !== values.passwordConf){
        errors.passwordConf = "Password do not match"
    }

    if(!values.email){
        errors.email = "Email required"
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = "Email address is invalid"
    }

    return errors
}