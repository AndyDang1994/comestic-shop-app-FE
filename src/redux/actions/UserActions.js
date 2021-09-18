import { ActionTypes, AlertTypes } from "../contant/action-types";
import { userService } from "../service/UserService";
import { history } from "../../_helper/history";
import {getLoadingProcAction} from '../actions/ResultActionEpics'
import {alertActions} from './AlertActions'

function login(payload){
    return dispatch => {
        //dispatch(request(payload.username));
        dispatch(getLoadingProcAction(true))
            userService.login(payload)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.alertErrorAction(error.toString()));
                }
            );
    };
    //function request(user) { return { type: ActionTypes.LOGIN_PROCESS, payload : user } }
    function success(user) { return { type: ActionTypes.LOGIN_SUCCESS, payload : user } }
    function failure(error) { return { type: ActionTypes.LOGOUT_FAIL, payload : error } }
}

function logout(){
    return dispatch => {
        dispatch(success(''));
        history.push('/');
    };
    //function request(user) { return { type: ActionTypes.LOGIN_PROCESS, payload : user } }
    function success(user) { return { type: ActionTypes.LOGOUT_SUCCESS, payload : user } }
}

export const userActions ={
    login,
    logout
}
