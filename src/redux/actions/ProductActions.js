import { ActionTypes, AlertTypes } from "../contant/action-types"
import axios from "axios";
import { getErrorAction, getLoadingProcAction } from '../actions/ResultActionEpics';
import { productServices } from "../service/ProductService";
import { history } from "../../_helper/history";
import { alertActions } from './AlertActions'
import { cloudinarySerevice } from "../service/CloudinaryService";

function getAll() {

  return dispatch => {
    dispatch(getLoadingProcAction(true))
    dispatch(alertActions.alertClearAction())
    productServices.getAllProducts()
      .then(
        product => {
          dispatch(success(product));
          dispatch(getLoadingProcAction(false))

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
  function success(user) { return { type: ActionTypes.FETCH_PRODUCTS_SEC, payload: user } }
  //function failure(error) { return { type: ActionTypes.FETCH_PRODUCTS_FAIL, payload: error } }
}

function getProductByParams(inputParams) {

  return dispatch => {
    dispatch(getLoadingProcAction(true))
    dispatch(alertActions.alertClearAction())
    productServices.getProductByParams(inputParams)
      .then(
        product => {
          dispatch(success(product));
          dispatch(getLoadingProcAction(false))

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
  function success(user) { return { type: ActionTypes.FETCH_PRODUCTS_SEC, payload: user } }
  //function failure(error) { return { type: ActionTypes.FETCH_PRODUCTS_FAIL, payload: error } }
}

const editProduct = (payload, inputParams) => {
  return dispatch => {
    dispatch(getLoadingProcAction(true))
    dispatch(alertActions.alertClearAction())
    productServices.editProduct(payload, inputParams)
      .then(
        product => {
          dispatch(success(product));
          //dispatch(getLoadingProcAction(false))
          dispatch(alertActions.alertSuccessAction({
            type: AlertTypes.ALERT_SUCCESS, message: ''
          }))
          productServices.getProductByParams(inputParams)
            .then(
              product => {
                dispatch(getSuccess(product));
                dispatch(getLoadingProcAction(false))

              }
            )
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
  function success(user) { return { type: ActionTypes.EDIT_PRODUCT_SEC, payload: user } }
  function getSuccess(user) { return { type: ActionTypes.FETCH_PRODUCTS_SEC, payload: user } }
  //function failure(error) { return { type: ActionTypes.FETCH_PRODUCTS_FAIL, payload: error } }
}

const upLoadImageProduct = (payload, file) => {
  return dispatch => {
    console.log("Cloudinary  ")
    dispatch(getLoadingProcAction(true))
    dispatch(alertActions.alertClearAction())
    cloudinarySerevice.uploadPhoto(file)
      .then(
        res => {
          var thumb = []
          thumb = thumb.concat(payload.thumbnail)

          var str = 'v' + res.version + '/' + res.public_id + '.' + res.format
          console.log("Cloudinary res " + str)
          thumb.push(str)

          payload.thumbnail = thumb
          console.log("upLoadImageProduct  thumb " + thumb.toString())
          console.log("upLoadImageProduct " + JSON.stringify(payload))
          dispatch({ type: ActionTypes.UPLOAD_PHOTO_CLOUDINARY, payload: res.secure_url })
          productServices.editProduct(payload)
            .then(
              payload => {
                console.log("edit prod success")
                dispatch(getLoadingProcAction(false))
                dispatch(alertActions.alertSuccessAction({
                  type: AlertTypes.ALERT_SUCCESS, message: ''
                }))
              }
            )
            .catch(
              err => {
                console.log("edit prod error " + JSON.stringify(err))
                dispatch(getLoadingProcAction(false))
                dispatch(alertActions.alertErrorAction({
                  type: AlertTypes.ALERT_ERROR, message: err.exceptionMessage
                }))
              }
            )

        }
      )
      .catch(
        err => {
          console.log("upLoadImageProduct err " + JSON.stringify(err))
          dispatch(getLoadingProcAction(false))
          dispatch(alertActions.alertErrorAction({
            type: AlertTypes.ALERT_ERROR, message: err.exceptionMessage
          }))
        }
      )

  }
}

const deleteProduct = (payload,inputParams) => {
  return dispatch => {
    dispatch(getLoadingProcAction(true))
    dispatch(alertActions.alertClearAction())
    productServices.deleteProduct(payload)
      .then(
        res => {
          dispatch(getLoadingProcAction(false))
          dispatch(alertActions.alertSuccessAction({
            type: AlertTypes.ALERT_SUCCESS, message: ''
          }))
          productServices.getProductByParams(inputParams)
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
  function getSuccess(user) { return { type: ActionTypes.FETCH_PRODUCTS_SEC, payload: user } }
}

const selectedProduct = (product, history, setErrorHandler) => {
  return async (dispatch) => {
    try {
      console.log("fdsfds" + product.userName)
      const res = await axios.post("/authentication", product);
      const { data } = res;
      dispatch({ type: ActionTypes.SELECTED_PRODUCT, payload: data });
      history.push("/");
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.ERROR_,
          payload: error.response.data.message,
        });
      }
      setErrorHandler({ hasError: true, message: "error.response.data.message" });
    }

  }
}

const createProduct = (payload) => {
  return dispatch => {

    dispatch(getLoadingProcAction(true))
    dispatch(alertActions.alertClearAction())
    productServices.createProduct(payload)
      .then(
        product => {
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
  function success(user) { return { type: ActionTypes.CREATE_PRODUCT_SEC, payload: user } }
}

export const productActions = {
  getAll,
  selectedProduct,
  editProduct,
  getProductByParams,
  upLoadImageProduct,
  createProduct,
  deleteProduct
}