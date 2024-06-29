import axios from 'axios';
import { openAsBlob } from 'node:fs';

const attachPicture  = async () => {
    const param = new FormData();
    const picture = await openAsBlob('C:/Users/90751/Pictures/Saved Pictures/1.jpg');
    param.append('files', picture, '1.jpg');
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
    }).then(response => {// operation for response 
        console.log("Response data: ", response.data);
        // get the image url message in the response body 
        const link = response.data[0];
        // try multiple times to access the image url
        var tryCnt:number = 3; 
        var i:number; 
        var successCnt:number = 0;
        for(i = tryCnt;i>0;i--) {
            axios({
                method: 'get',
                url: link
            }).then(response => {
                // count the susccessful requests    
                successCnt++;
            }).catch(error => {
                // catch error when access the image url
                // is 'axios' error 
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
                }
            });
        }
        // while the successCnt is less than tryCnt, it means the url is not a permanent link. 
        if (successCnt < tryCnt) {
            console.log("Not a permanent link!");
        }
    }).catch(error => { //catch error when request fail
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
        }
    });
}


attachPicture();
