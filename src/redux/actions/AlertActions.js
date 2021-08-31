import { AlertTypes } from "../contant/action-types";

function alertSuccessAction(message) {
    return { type: AlertTypes.ALERT_SUCCESS,payload: message };
}

function alertErrorAction(message) {
    return { type: AlertTypes.ALERT_ERROR,payload: message };
}

function alertClearAction() {
    console.log("alertClearAction")
    return { type: AlertTypes.ALERT_CLEAR };
}

export const alertActions = {
    alertSuccessAction,
    alertErrorAction,
    alertClearAction
};