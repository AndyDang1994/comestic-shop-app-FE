import { ActionTypes } from "../contant/action-types";
import { metaDataService } from "../service/MetaDataService";

function getAll(){
    console.log("metaDataService")
    return dispatch =>{
        metaDataService.getAll()
        .then(
            payload =>{
                dispatch(success(payload))
            }
        )
        .catch(
            err =>{
                dispatch(failure(err))
            }
        )
    }

    function success(payload) { return { type: ActionTypes.FETCH_METADATA_ACTION_SEC, payload : payload } }
    function failure(error) { return { type: ActionTypes.FETCH_METADATA_ACTION_FAIL, payload : error } }
}

export const metaDataAction ={
    getAll
}