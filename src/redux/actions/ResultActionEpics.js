import { ActionTypes } from "../contant/action-types"


const getErrorAction = (payload) =>{
    return {
        type : ActionTypes.ERROR_,
        payload : payload
    }
}


const getLoadingProcAction = (flag = false) =>{
    return {
        type : ActionTypes.LOADING_TOGGLE_ACTION,
        payload : flag
    }
}

const getStopLoadingProcAction = () =>{
    return {
        type : ActionTypes.STOP_LOADING_TOGGLE_ACTION,
        payload : false
    }
}

export {
    getErrorAction,
    getLoadingProcAction,
    getStopLoadingProcAction
}