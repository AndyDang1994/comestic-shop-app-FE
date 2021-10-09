import { ActionTypes, AlertTypes } from "../contant/action-types"
import { getErrorAction, getLoadingProcAction } from '../actions/ResultActionEpics';
import { alertActions } from './AlertActions'
import { promotionService } from "../service/PromotionService";

const getPromotionsByParams = (inputParams) =>{

    return dispatch => {
        dispatch(getLoadingProcAction(true))
        dispatch(alertActions.alertClearAction())
        promotionService.getPromotionsByParams(inputParams)
          .then(
            prom => {
              dispatch(success(prom));
              dispatch(getLoadingProcAction(false))
              dispatch(alertActions.alertSuccessAction({
                type: AlertTypes.ALERT_SUCCESS, message: ''
              }))
            },
    
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
      function success(user) { return { type: ActionTypes.FETCH_PROMOTION_SEC, payload: user } }

}

const createPromotion = (payload)=>{

}
const deletePromotion = (payload,inputParams)=>{

  return dispatch => {
    dispatch(getLoadingProcAction(true))
    dispatch(alertActions.alertClearAction())
    promotionService.deletePromotion(payload)
      .then(
        res => {
          dispatch(getLoadingProcAction(false))
          dispatch(alertActions.alertSuccessAction({
            type: AlertTypes.ALERT_SUCCESS, message: ''
          }))
          promotionService.getPromotionsByParams(inputParams)
            .then(
              product => {
                dispatch(getSuccess(product));

              }
            )
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
  function getSuccess(user) { return { type: ActionTypes.FETCH_PROMOTION_SEC, payload: user } }

}

const updatePromotion = (payload)=>{

}

export const promotionAction = {
    getPromotionsByParams,
    createPromotion,
    deletePromotion,
    updatePromotion
}