import axios from 'axios'; //axios module offers functions for API request and resonde 
import { openAsBlob } from 'node:fs'; // 'fs' module offers functions for file object
import { OpenAsBlobOptions } from 'node:fs';

const options:OpenAsBlobOptions = {
    type: 'image/png'
}
const attachPicture  = async () => {
    // define request body type  as FormData
    const param = new FormData();
    // define mime type as image/png

    // get a image file and save as a const param 
    const picture = await openAsBlob('C:/Users/90751/Desktop/TypeScript/demo/screenshot-1.png', options);
    // append the picture into the request body
    param.append('files', picture, 'screenshot-1.png');
    // create aN API request instance
    axios({
        // request header settings
        headers: {
            // 'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
        },
        // request settings
        method: 'post',
        url: 'https://test-image-api.starworks.cc:88/api/image',
        data: param
    }).then(response => {
        // operation when response succeed
        console.log("Response data: ", response.data);
        // get the image url message in the response body 
        var links:string[] = response.data;
        const link = links[0];
        // try multiple times to access the image url
        var tryCnt:number = 3; 
        var i:number; 
        var successCnt:number = 0;
        for(i = tryCnt;i>0;i--) {
            // request the image url
            axios({
                method: 'get',
                url: link
            }).then(response => {
                // count the susccessful requests
                successCnt++;
                if (successCnt == tryCnt) {
                    console.log('The image has a permanent link!');
                    return true;
                }
            }).catch(error => {
                // handling exceptions while accessing the image url
                // is 'axios' error 
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log('Access Image responde error, response status: ',error.response.status);
                        console.log('Access Image responde error, response headers: ',error.response.headers);
                        console.log('Access Image responde error, response data: ', error.response.data);
                        
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log('Failed to request the image', error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Unknown axios error: ', error.message);
                    }
                } else {
                    console.log('Unknown error: ', error);
                }
                // failed when request the image url
                
                console.log('Access the image failed,this is not a permant link!');
                return false;
            });
        }
        
    // handling exceptions while request for attachPicture  
    }).catch(error => { 
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('Error response status: ',error.response.status);
                console.log('Error response headers: ',error.response.headers);
                console.log('Error response data: ', error.response.data);
                
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('Error request', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Unknown axios error: ', error.message);
            }
        } else {
            console.log('Unknown error: ', error);
            return false;
        }
    });
}


attachPicture();
