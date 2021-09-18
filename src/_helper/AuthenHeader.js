import store from "../_helper/store";

export function authHeader() {
    // return authorization header with jwt token
    let userState =  store.getState();
    let user = userState.authState.user

    if (user && user.token) {
        return { 'Content-Type': 'application/json',
                 'Access-Control-Allow-Origin':'*',
                 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}