import axios from "axios";
import { ActionTypes } from "../contant/action-types";

// const AuthActionType = {
//   REGISTER_SUCCESS: "REGISTER_SUCCESS",
//   REGISTER_FAIL: "REGISTER_FAIL",
//   LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
//   LOGOUT_FAIL: "LOGOUT_FAIL",
//   LOGIN_SUCCESS: "LOGIN_SUCCESS",
//   LOGIN_FAIL: "LOGIN_FAIL",
// };

const RegisterAuthAction = (userState, history, setErrorHandler) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/register", userState);
      const { data } = res;
      dispatch({ type: ActionTypes.REGISTER_SUCCESS, payload: data });
      history.push("/");
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.REGISTER_FAIL,
          payload: error.response.data.message,
        });
        setErrorHandler({
          hasError: true,
          message: error.response.data.message,
        });
      }
    }
  };
};

const LoginAuthAction = (loginState, history, setErrorHandler) => {
  return async (dispatch) => {
    try {
      console.log("fdsfds" +  loginState.userName)
      const res = await axios.post("/authentication", loginState);
      const { data } = res;
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: data });
      history.push("/");
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.LOGIN_FAIL,
          payload: error.response.data.message,
        });
      }
      setErrorHandler({ hasError: true, message: "error.response.data.message" });
    }
  };
};

const LogOutAuthAction = (history) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/logout");
      const { data } = res;
      dispatch({
        type: ActionTypes.LOGOUT_SUCCESS,
        payload: data.message,
      });
      history.push("/");
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ActionTypes.LOGOUT_FAIL,
          payload: error.response.data.message,
        });
      }
    }
  };
};

export {
  RegisterAuthAction,
  ActionTypes,
  LogOutAuthAction,
  LoginAuthAction,
};
