import axios from "axios";
import { useState, useEffect } from "react";

const LoginForm = (validate) =>{
    const [values,setValues] = useState({
        userName : '',
        password : ''
    })
    
    const initialClassNames = {
        userName: "border-danger",
        password: "border-danger"
    };

    const [classNames, setClassNames] = useState(initialClassNames);
    const [errors, setErrors] = useState({})
    useEffect(()=>{
        if (values.userName) {
            setClassNames((prevState) => {
              return { ...prevState, userName: (prevState.userName = "border-success") };
            });
          } else {
            setClassNames((prevState) => {
              return { ...prevState, userName: (prevState.userName = "border-danger") };
            });
          }
      
          // validate age
          if (values.password) {
            setClassNames((prevState) => {
              return { ...prevState, password: (prevState.password = "border-success") };
            });
          } else {
            setClassNames((prevState) => {
              return { ...prevState, password: (prevState.password = "border-danger") };
            });
          }
    }, [values.userName, values.password])

    const inputFields = [
        {
          inputName: "userName",
          inputValue: values.userName,
          type : "text",
          inputClassName: classNames.userName
        },
        {
          inputName: "password",
          inputValue: values.password,
          type : "password",
          inputClassName: classNames.password
        }
      ];
    const loginState = {
        userName : values.userName,
        password : values.password
    }
    const handleChange = e =>{
        const{name,value} = e.target

        setValues({
            ...values,
            [name] : value
            
        })
        
    }

    return {handleChange, values, inputFields, loginState}

}

export default LoginForm