import { authHeader } from '../../_helper/AuthenHeader';
import { getLoadingProcAction } from '../actions/ResultActionEpics';
import { CommonUtils } from '../../utils/apiCallerUtils';

const getAllProducts=()=>{

    const requestOptions = {
        method: 'GET',
        //headers: authHeader()
    };

    return fetch(`http://localhost:19191/api/products`, requestOptions)
    .then(CommonUtils.handleResponse)
    .then(payload => {
        
        return payload;
    });

}

const getProductByParams=(inputParams)=>{
    var url = new URL(`http://localhost:19191/api/products`),
        params = {username:inputParams.username}
    Object.keys(params).forEach(key => url.searchParams.append(key,params[key]))
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(url, requestOptions).then(CommonUtils.handleResponse);
}

const editProduct = (payload, inputParams)=>{
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    return fetch(`http://localhost:19191/api/products`, requestOptions)
        .then(CommonUtils.handleResponse)
        .then(product => {
            return product
            //return getProductByParams(inputParams);
        });
}

const createProduct = (payload)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    return fetch(`http://localhost:19191/api/products`, requestOptions)
        .then(CommonUtils.handleResponse)
        .then(product => {
            return product
            //return getProductByParams(inputParams);
        });
}

const deleteProduct = (payload)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    return fetch(`http://localhost:19191/api/productsdel`, requestOptions)
        .then(CommonUtils.handleResponse)
        .then(product => {
            return product
            //return getProductByParams(inputParams);
        });
}

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         console.log("response data : " + JSON.stringify(data))
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 //location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }

export const productServices ={
    getAllProducts,
    editProduct,
    getProductByParams,
    createProduct,
    deleteProduct
}