import axios from "axios";


function callApi(endPoint, method = 'GET', data){
    
    axios({
        method : method,
        url : `localhost:19191/${endPoint}`,
        data : data
    }).then(res =>{
        console.log("reponse : " + res)
    }).catch(err =>{
        console.log(err)
    })
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log("response data : " + JSON.stringify(data))
        if (!response.ok) {
           
            const error = (data && data.exceptionMessage) || response.statusText;
            return Promise.reject(data);
        }

        return data;
    });
}

export const  CommonUtils ={
    handleResponse
}