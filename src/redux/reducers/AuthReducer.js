import axios from "axios";
import { ActionTypes } from "../contant/action-types";

const authState = {
  isLoggedIn: false,
  user: {
    name: "",
    expires_at: "",
    jwttoken: "",
    authorities: [],
  },
};
const getAuthState = () => {
  const auth = localStorage.getItem("auth");
  try {
    const authobj = JSON.parse(auth);
    const { expires_at, jwttoken } = authobj.user;
    if (new Date(expires_at) > new Date()) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwttoken}`;
      return authobj;
    }
    return authState;
  } catch (error) {
    return authState;
  }
};
const newAuth = getAuthState();
const authreducer = (state = newAuth, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_SUCCESS:
      const newAuthState = {
        isLoggedIn: true,
        user: action.payload,
      };
      // axios.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${action.payload.jwttoken}`;
      // localStorage.setItem("auth", JSON.stringify(newAuthState));
      return newAuthState;

    case ActionTypes.LOGOUT_SUCCESS:
      //localStorage.removeItem("auth");
      return authState;

    case ActionTypes.LOGIN_SUCCESS:
      const loginAuthState = {
        isLoggedIn: true,
        user: action.payload.result,
      };
      // axios.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${action.payload.jwttoken}`;
      // localStorage.setItem("auth", JSON.stringify(loginAuthState));
      return loginAuthState;

    default:
      return state;
  }
};

export default authreducer;
