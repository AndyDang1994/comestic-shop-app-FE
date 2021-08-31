import { ActionTypes, AlertTypes } from "../contant/action-types"
import { getLoadingProcAction } from '../actions/ResultActionEpics';
import { cloudinarySerevice } from "../service/CloudinaryService";
import { alertActions } from './AlertActions'

function uploadPhoto(file) {
    return dispatch => {
        dispatch(getLoadingProcAction(true))
        dispatch(alertActions.alertClearAction())
        cloudinarySerevice.uploadPhoto(file)
            .then(
                payload => {
                    dispatch(success(payload));
                    dispatch(getLoadingProcAction(false))
                }
            )
            .catch(
                err => {
                    dispatch(getLoadingProcAction(false))
                    dispatch(alertActions.alertErrorAction({
                        type: AlertTypes.ALERT_ERROR, message: err.exceptionMessage
                    }))
                }
            )
    }
    function success(payload) { return { type: ActionTypes.UPLOAD_PHOTO_CLOUDINARY, payload: payload } }
}


export const cloudinaryAction = {
    uploadPhoto
}