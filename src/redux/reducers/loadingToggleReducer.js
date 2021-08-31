import { ActionTypes } from "../contant/action-types"


const initialState = {
    isShow: false
}

export const LoadingReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ActionTypes.LOADING_TOGGLE_ACTION:
            return {
                ...state, isLocked: payload
            }
        case ActionTypes.STOP_LOADING_TOGGLE_ACTION:
            return {
                ...state, isLocked: payload
            }
        default:
            return state
    }

}