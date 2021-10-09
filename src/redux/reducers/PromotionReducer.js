import { ActionTypes } from "../contant/action-types";

const emptyPromotion =
{
    "promoteId": 0,
    "promoteName": "",
    "promoteStatus": "",
    "startAplTime": "",
    "endAplTime": "",
    "volume": 0,
    "type": "",
    "productPromoteInfors": null
}
const initialState = {
    promotions: [{
    }],
    count: 0,
    promotion: emptyPromotion
}

export const PromotionReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ActionTypes.FETCH_PROMOTION_SEC:
            return {
                ...state, promotions: payload.result.data, count: payload.result.count
            }
        case ActionTypes.UPDATE_PROMOTION_SEC:
            return {
                ...state, response: {
                    resStatus: payload.statusCode,
                    resMsg: payload.exceptionMessage
                }
            }
        default:
            return state
    }

}