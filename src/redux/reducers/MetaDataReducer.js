import { ActionTypes } from "../contant/action-types";

const initialState = {
    subCategoryMeta: []
}

export const MetaDataReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.FETCH_METADATA_ACTION_SEC:
            return {
                ...state, subCategoryMeta: payload.result.subCategoryMeta
            }
        case ActionTypes.FETCH_METADATA_ACTION_FAIL:
            return state
        default:
            return state
    }
}