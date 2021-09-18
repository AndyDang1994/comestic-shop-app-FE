import { authHeader } from '../../_helper/AuthenHeader';
import { CommonUtils } from '../../utils/apiCallerUtils';


const getAll=()=> {
    const requestOptions = {
        method: 'GET',
        //headers: authHeader()
    };

    return fetch(`http://localhost:19191/api/meta`, requestOptions)
    .then(CommonUtils.handleResponse)
    .then(
        payload => {
            console.log("metaDataService")
            return payload
        }
    )
}

export const metaDataService = {
    getAll
}