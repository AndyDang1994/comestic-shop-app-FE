import { AlertTypes } from "../contant/action-types";

const initialState = {
    type: null,
    message: ''
}

export const AlertReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case AlertTypes.ALERT_SUCCESS:
            return {
                ...state, type :payload.type, message : payload.message
            };
        case AlertTypes.ALERT_ERROR:
            return {
                ...state, type :payload.type, message : payload.message
            };
        case AlertTypes.ALERT_CLEAR:
            return {
                ...state, type :null, message : ''
            };
        default:
            return state;
    }
}