import { ActionTypes } from "../contant/action-types";

const emptyProduct =
{
    id: '',
    name: "",
    quantity: '',
    thumnail: "",
    description: "",
    price: '',
    vote: '',
    commentID: '',
    subCateCode: ''
}
const initialState = {
    products: [{
    }],
    count: 0,
    response: {
        resStatus: "",
        resMsg: ""
    },
    loading: true,
    type: "",
    product: emptyProduct
}

export const ProductReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.FETCH_PRODUCTS_SEC:
            return {
                ...state, products: payload.result.data, count: payload.result.count, response: {
                    resStatus: payload.statusCode,
                    resMsg: payload.exceptionMessage
                }
            }
        case ActionTypes.SELECTED_PRODUCT:
            return {
                ...state, product: payload.result.data
            }
        case ActionTypes.EDIT_PRODUCT_SEC:
            return {
                ...state, response: {
                    resStatus: payload.statusCode,
                    resMsg: payload.exceptionMessage
                }
            }
        case ActionTypes.CREATE_PRODUCT_SEC:
            return {
                ...state, response: {
                    resStatus: payload.statusCode,
                    resMsg: payload.exceptionMessage
                }
            }
        case ActionTypes.DELETE_PRODUCT_SEC:
            return {
                ...state, response: {
                    resStatus: payload.statusCode,
                    resMsg: payload.exceptionMessage
                }
            }
        case ActionTypes.ERROR_:
            return {
                ...state, response: {
                    resStatus: (payload.statusCode == null ? '503' : payload.statusCode),
                    resMsg: (payload.exceptionMessage == null ? payload.message : payload.exceptionMessage)
                }
            }
        default:
            return state
    }

}