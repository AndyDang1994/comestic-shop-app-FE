import { ActionTypes } from "../contant/action-types";

const initialState = {
    secure_url : ''
}

export const cloudinaryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.UPLOAD_PHOTO_CLOUDINARY:
            return {
                ...state, secure_url: payload
            }
    
        default:
            return state
    }
}
    