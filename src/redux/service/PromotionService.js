import { authHeader } from '../../_helper/AuthenHeader';
import { CommonUtils } from '../../utils/apiCallerUtils';

const getPromotionsByParams=(inputParams)=>{
    var url = new URL(`http://localhost:19191/api/promotion`)

    Object.keys(inputParams).forEach(key => url.searchParams.append(key,inputParams[key]))
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(url, requestOptions)
    .then(CommonUtils.handleResponse)
    .then(payload => {
        
        return payload;
    });
}

const createPromotion=(payload)=>{
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };

    return fetch(`http://localhost:19191/api/promotion`, requestOptions)
        .then(CommonUtils.handleResponse)
        .then(product => {
            return product
        });
}

const updatePromotion=(payload)=>{
    const requestOptions = {
        method: 'PATCH',
        mode: 'cors',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };

    return fetch(`http://localhost:19191/api/promotion`, requestOptions)
        .then(CommonUtils.handleResponse)
        .then(product => {
            return product
        });
}

const daletePromotion=(payload)=>{
    const requestOptions = {
        method: 'DELETE',
        mode: 'cors',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };

    return fetch(`http://localhost:19191/api/promotion`, requestOptions)
        .then(CommonUtils.handleResponse)
        .then(product => {
            return product
        });
}


export const promotionService ={
    getPromotionsByParams,
    createPromotion,
    daletePromotion,
    updatePromotion
}