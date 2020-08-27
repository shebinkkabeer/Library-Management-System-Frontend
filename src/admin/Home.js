import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link,Redirect } from "react-router-dom";

import { isAutheticated } from "../auth/helper";
const HomePage=()=>{

  
  const func=()=>{
   

  if(isAutheticated()){
    if(isAutheticated().role==1){
      return(
        <Link to={"/admin/dashboard"} className="btn btn-lg btn-primary">Go to Admin Dashboard</Link>
      
      )
    }
    else{
      return (
      <Link to={"/user/dashboard"} className="btn  btn-primary">Go to User Dashboard</Link>
     )
    }
  }
  else{
       return  (  
      <Link to={"/signin"} className="btn  btn-success">Let's Sign In</Link>)
      
  }
        
}

const nav=()=>{
  return(
   <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
   <h1 className="navbar-brand">
     Library Management System
   </h1>
   
 </nav>
  )
}

  return(


     



<div id="home" className="container-fluid">


    <div className="row vh-100">
      <div className="col-lg-6 my-auto">
        <img  className="my-auto" src="https://image.freepik.com/free-vector/people-library-flat-vector-illustration_74855-6607.jpg" alt="image">
       </img>
       </div>
      <div className="col-lg-6 p4 my-auto">
        <h3 className="text-center">
          <i>'If you are a man of learning, read something classic, a history of the human struggle and don't settle for mediocre verse'</i>
         
        </h3>
        <h3 className="text-center"> <i>-Rumi</i></h3>
        <h1 class="text-center my-auto">
          {func()}
        </h1>
      </div>
    </div>
  </div>

     

     
        
 
  )

  
  }
export default HomePage;