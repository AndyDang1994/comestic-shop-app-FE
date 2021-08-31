
import React, { useState } from "react";
import { connect } from "react-redux";
import LoginForm from './LoginForm';
import  validate  from '../../containers/ValidateInfor';
import { Link, useHistory } from "react-router-dom";
import { userActions } from "../../redux/actions/UserActions";
import { LoginAuthAction } from "../../redux/actions/AuthAction";


function Login(props) {
    const { login } = props;
    const history = useHistory();
    const {handleChange, values, inputFields, loginState} = LoginForm(validate)
    const [errorHandler, setErrorHandler] = useState({
        hasError: false,
        message: "",
    });
    return (
            <div>
                <div role="document" className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 id="login-modalLabel" className="modal-title">Customer Login</h4>
                            <button type="button" data-dismiss="modal" aria-label="Close" className="close"><span
                                aria-hidden="true">×</span></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                login(loginState, history, setErrorHandler);
                            }}>

                                {inputFields.map((f,i)=>{
                                    return(
                                        <div className="form-group" key={i}>
                                            <input 
                                            name={f.inputName}
                                            id={`${f.inputName}${i}`} 
                                            type={f.type}
                                            placeholder="Enter your username" 
                                            className={`form-control ${f.inputClassName}`}
                                            value={f.inputValue} onChange = {handleChange}/>
                                        </div>)
                                })}
                                <p className="text-center">
                                    <button className="btn btn-template-outlined" type="submit"><i className="fa fa-sign-in"></i> Log in</button>
                                </p>
                            </form>

                            <p className="text-center text-muted">Not registered yet?</p>
                            <p className="text-center text-muted"><a href="customer-register.html"><strong>Register now</strong></a>! It is
                            easy and done in 1 minute and gives you access to special discounts and much more!</p>
                        </div>
                    </div>
                </div>

            </div>
            
        );
    
}

const mapStateToProps = (state) => {
    return {
        user: state,
    };
};
  
// const mapDispatchToProps = (dispatch) => {
//     return {
//         login: (loginState, history, setErrorHandler) => {
//         dispatch(LoginAuthAction(loginState, history, setErrorHandler));
//         },
//     };
// };

const mapDispatchToProps =  {
    login : userActions.login
    // return {
    //     login: (loginState, history, setErrorHandler) => {
    //     dispatch(LoginAuthAction(loginState, history, setErrorHandler));
    //     },
    // };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);