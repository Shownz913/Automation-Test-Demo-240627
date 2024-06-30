README
------

 [TOC] 

### Set up environment

+ Install node.js，check version `npm-v`

+ Install VSCode

+ Install TypeScript
  + install TypeScript  `npm install --save-dev typescript @types/node`，check version   `tsc -v`
    + Q1: cannot find the command  `tsc`  in VSCode , fixed by `set-ExecutionPolicy RemoteSigned`，and restart VSCode 
    
  + install axios  `npm install axios`
  
    

### Test Case Design

----

####  API  01:  `post /api/image`

#####  1. TC1_01

 + `TC Description` : post  image  successfully, the url in response can be accessed multiple times
 + `Steps`:  
   + request data: an .jpg image file A , file parameters are legal `name,type,size`  
   + catch the link in response message and access it 3 times 
 + `Expected Result` : 
   + response ： status : 200 ,  message : url of image A ` 
   + `id` and `filename` in the url are correct 
   + the url can be accessed successfully in 3 times 
 + `Check  Point` :
   + check the new added data  in  database table
   + try upload different types of image :  `.jpeg`  `.png`  `.gif`   `.bmp`  ,  etc.


##### 2. TC1_02

 + `TC Description` : post a doc file, response status should be 400
 + `Steps`:  
   + request data: a doc file B   
 + `Expected Result` : 
   + status : 400 , message : Only image files are allowed 
 + `Check  Point` :
   + try different type of files :  `.doc`  `.xlx`  `.pdf`  `.zip`   `.avi` `.wav`, etc.


#####  3. TC1_03

 + `TC Description` : post an image file with illegal parameter , response status should be 400
 + `Steps`:  
   + request data: a jpeg file C , size over the limit   
 + `Expected Result` : 
   + status : 400 , message : Size should be xxx.
 + `Check  Point` :
   + try different illegal parameters  
     + length of Name over limit  
     + invalid character type Name


##### 4. TC1_04

 + `TC Description` : post data is  None  , response status should be 400
 + `Steps`:  
   + request data: None   
 + `Expected Result` : 
   + status : 400 , message : No files uploaded 
 + `Check  Point` :


##### 5. TC1_05


 + `TC Description` : post data type is Not Formdata , response status should be 400
 + `Steps`:  
   + request type:x-www-form-urlencoded 
   + request data: json data   
 + `Expected Result` : 
   + status : 400 , message : No files uploaded 
 + `Check  Point` :

##### 6. TC1_06

 + `TC Description` : request body includes illegal parameter, response status should be 40x
 + `Steps`:  
   + request body:  image file:'a'; id:100;   
 + `Expected Result` : 
   + status : xxx , message : Undefined parameter
 + `Check  Point` :
   + should verify the illegal parameter in request body 


##### 7. TC1_07

 + `TC Description` : user authority is illegal , response status should be 40x
 + `Steps`:   
   + request data:  user A try to request the file of user B    
 + `Expected Result` : 
   + status : xxx , message : Permission denied
 + `Check  Point` :
   + should verify the user authority 


##### 8. TC1_08

 + `TC Description` : check the average response time  
 + `Steps`:  
   + request data:  post an image file ,the  size is as the Maximum boundary value , request for 10 times
   + calculate the average response time  
 + `Expected Result` : 
   + average response time is lower than xx second
 + `Check  Point` :
   + verify the normal response time




#### API 02:  ` post /api/zip`

##### 9. TC2_01

 + `TC Description` : post  zip file  successfully, the returned  links can be accessed multiple times
 + `Steps`:  
   + request data: a zip file G , file params are legal (name,type,size) ,image files in ZIP are illegal 
   + catch the links in response message and access each of them 3 times 
 + `Expected Result` : 
   + status : 200 , message : the exact urls of images included in the zip  
   + each link can be accessed successfully in 3 times
 + `Check  Point` :
   +  verify  the new data in  database according to the data storage method of this api, make sure the zip file and image files in the zip are saved correctly.
   +  try different legal type of  image :  `.jpeg`  `.png`  `.gif`   `.tif`  ,  etc .


##### 10. TC2_02

 + `TC Description` : post a image file, response status should be 400
 + `Steps`:  
   + request data: a jpeg file H   
 + `Expected Result` : 
   + status : 400 , message : Only ZIP files are allowed 
 + `Check  Point` :
   + try different type of files :  `.doc`  `.xlx`  `.pdf`    `.tif` `.flv` , etc.

#####  11. TC2_03

 + `TC Description` : post a zip file with illegal  parameter , response status should be 400
 + `Steps`:  
   + request data: a zip file N ,  file size over the limit   
 + `Expected Result` : 
   + status : 400 , message : File size should be  xxx.
 + `Check  Point` :
   + try different illegal parameters of the zip file  
     + length of Name over limit  
     + invalid character type of of Name


##### 12. TC2_04

 + `TC Description` : post a zip file which include illegal files , response status should be 400
 + `Steps`:  
   + request data: a zip file L , include Non-image type file like `.doc `, `.xlsx`, etc.  
 + `Expected Result` : 
   + status : 400 , message : Only image files are allowed in the ZIP.
 + `Check  Point`:
   + try different illegal parameters of the files in zip  
     + length of Name  over limit
     + invalid character type of of Name
     + image file size  in the zip  over limit 
     + quantity of file in the zip  over limit


##### 13. TC2_05

 + `TC Description` : request data is  None  , response status should be 400
 + `Steps`:  
   + request data: None   
 + `Expected Result` : 
   + status : 400 , message : No files uploaded 

##### 14. TC2_06

 + `TC Description` : request body includes illegal parameter, response status should be 40x
 + `Steps`:  
   + request body:  zip file:'a'; id:100;   
 + `Expected Result` : 
   + status : xxx , message : Undefined parameter
 + `Check  Point` :
   + should verify the illegal parameter in request body 

#####  15. TC2_07

 + `TC Description` : user authority is illegal , response status should be 40x
 + `Steps`:  
   + request data:  user A try to request the zip file of user B    
 + `Expected Result` : 
   + status : 40x , message : Permission denied
 + `Check  Point`:
   + should verify the user authority 


##### 16. TC2_08

  + `TC Description` : check the average response time of API 
  + `Steps`:  
    + request data:  post an zip file ,the  size is as the Maximum boundary value , request for 10 times
    + calculate the average response time  
  + `Expected Result` : 
    + average response time is lower than xx second



### Bug Collection


 + `post /api/zip`  upload an zip file response failed ,  status  `400`and message ` Only ZIP files are allowed`

  ![01](.\screenshot-1.png)

