import { API } from "../../backend";
import axios from "axios";

//Book calls
export const createBook = async(userId,token, book) => {
const data=JSON.stringify(book);

return await axios.post(`${API}/book/create/${userId}`,(data),{headers: {
 "Content-Type": "application/json",
 "Authorization":`Bearer ${token}`
}})
.then(response=> {
return((response.data));
})
.catch(error=>{ 
  
return {error:error.response.data.error};     
})};
     

//get all Books

export const getBook = async(token) => {
  
  return await axios.get(`${API}/books`,{headers: {
    "Authorization":`Bearer ${token}`
  }})
  .then(response=> {
  return((response.data));
  })
  .catch(error=>{ 
  return( {error:error.response.data.error});   
  })};

 //getaBook

 export const getaBook = async(token,bookId) => {
  
  return await axios.get(`${API}/book/${bookId}`,{headers: {
    "Authorization":`Bearer ${token}`
  }})
  .then(response=> {
   
  return(response.data);
  })
  .catch(error=>{ 
    
   return( {error:error.response.data.error});   
  })};


  //getUserBook
  export const getUserBook = async(token,userId) => {
  
    return await axios.get(`${API}/user/books/${userId}`,{headers: {
      "Authorization":`Bearer ${token}`
    }})
    .then(response=> {
    return((response.data));
    })
    .catch(error=>{ 
    return( {error:error.response.data.error});   
    })};




 
//update Book
export const updateBook = async(bookId,userId,token, book) => {
 
 
  return await axios.put(`${API}/book/${bookId}/${userId}`,(book),{headers: {
   "Content-Type": "application/json",
   "Authorization":`Bearer ${token}`
  }})
  .then(response=> {
  return(response.data);
  })
  .catch(error=>{ 
  return({error:error.response.data.error}); 
   
  })};




//deleteCompany

export const deleteBook = (token,bookId,userId) => {
  //const id=JSON.stringify(token);
  
  return axios.delete(`${API}/book/${bookId}/${userId}`,{headers: {
    Accept:"application/json",
    "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
  
   
  }})
  .then(response=> {
  return(response.data);
  })
  .catch(error=>{ 
    
  console.log( {error:error.response.data.error});   
  })};



         
