import { API } from "../../backend";

const axios=require('axios');

export const signup = async(user) => {
  const {name,email,password,password2}=user;
  
   return await axios.post(`${API}/signup`,{name,email,password,password2},{headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }})
  .then(response=> {
   
   return (response.data);
  })
  .catch(error=>{ 
    return ({error:error.response.data.error});
  })};
  




export const signin = async(user) => {
const {email,password}=user;

 return await axios.post(`${API}/signin`,{email,password},{headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }})
.then(response=> {
 return(response.data); 
})
.catch(error=>{ 
  
  return{error:error.response.data.error};
})};


export const getUser = async() => {
  
  const local=JSON.parse(localStorage.getItem("jwt"));
 
   return await axios.get(`${API}/user/${local.user._id}`,{headers: {
      "Authorization":`Bearer ${local.token}`
    }})
  .then(response=> {
   return((response.data));
  })
  .catch(error=>{ 
    return{error:error.response.data.error};
  })};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", (JSON.stringify(data)));
    
    next();
  }
};

export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET"
    })
      .then(response => console.log("signout success"))
      .catch(err => console.log(err));
  }
};

export const isAutheticated = () => {
  
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    
    const user=( JSON.parse(localStorage.getItem("jwt")));
    
    return (user.user)
  } else {
    return false;
  }
};


// export const getUsers = async() => {
//   const tokrole=JSON.parse(localStorage.getItem("jwt"));
//   return await fetch(`${API}/user`, {
//     method: "GET",
//     headers: {
//       "auth-token": tokrole.access_token
//     }
//   })
//     .then(response => {
//       console.log(response.data.user);
//     })
//     .catch(err => console.log(err))};
