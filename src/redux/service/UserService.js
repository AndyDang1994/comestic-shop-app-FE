import { authHeader } from '../../_helper/AuthenHeader';
import { getLoadingProcAction } from '../actions/ResultActionEpics';

const login = (payload) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    return fetch(`http://localhost:19191/api/authentication`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            getLoadingProcAction(false)
            return user;
        });
}

const logout=()=> {
    localStorage.removeItem('user');
}

const getAll=()=> {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost:19191/api/users`, requestOptions).then(handleResponse);
}

const getById=(payload)=> {
    var url = new URL(`http://localhost:19191/api/users`),
        params = {username:payload.username}
    Object.keys(params).forEach(key => url.searchParams.append(key,params[key]))
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url, requestOptions).then(handleResponse);
}

const register=(payload)=> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    return fetch(`http://localhost:19191/api/users/register`, requestOptions).then(handleResponse);
}

const update=(payload)=> {
    const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    return fetch(`http://localhost:19191/api/users`, requestOptions).then(handleResponse);
}

const deleteUser = (payload)=> {
    var url = new URL(`http://localhost:19191/api/users`),
        params = {username:payload.username}
    Object.keys(params).forEach(key => url.searchParams.append(key,params[key]))
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log("response data : " + JSON.stringify(data))
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    deleteUser
};