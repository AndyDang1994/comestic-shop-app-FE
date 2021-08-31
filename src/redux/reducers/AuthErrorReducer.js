import { ActionTypes } from "../contant/action-types";

const authError = {
  message: "",
};

const authErrorReducer = (state = authError, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_FAIL:
      return { message: action.payload };
    case ActionTypes.LOGOUT_FAIL:
      return { message: action.payload };
    case ActionTypes.LOGIN_FAIL:
      return { message: action.payload };
    default:
      return state;
  }
};

export default authErrorReducer;
