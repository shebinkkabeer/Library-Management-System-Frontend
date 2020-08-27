import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../auth/helper";
import { NotificationManager, NotificationContainer } from "react-notifications";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    error: "",
    success: false,
    redirect:false,
    loading:false
  });

 

  
  const { name, email, password, password2, error, success,redirect,loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false,loading:true });
    signup({ name, email, password, password2 })
      .then((data) => {
        if (data.error !== undefined) {
        
          setValues({ ...values, error: data.error,loading:false, success: false ,redirect:false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            password2: "",
            error: "",
            loading:false,
            success: true,
            redirect:true
          });

        }
      })
      .catch(() => {

        console.log("SignUp request Failed");
      });
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Verify Password</label>
              <input
                onChange={handleChange("password2")}
                className="form-control"
                type="password"
                value={password2}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
     
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
               <Link to="/signin">Login here</Link>
          
          </div>
        </div>
        
      </div>
     

    
    
    ) }

    const performRedirect=()=>{
      if (redirect) {
        return(
        (
            window.confirm(
              "SignUp Successfull...!!! \nClick OK to SignIn"
            )
          ) ?( <Redirect
            to={`/signin`}
          />):window.location.reload(false) 
        )
            
            }
    }
  
    const loadingMessage = () => {
      return (
        loading && (
          <div className="alert alert-info">
            <h2>Loading...</h2>
          </div>
        )
      );
    };



  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Sign up page"
      description="A page for user to sign up!"
      className="container-fluid p-4"
    >
   
      {successMessage()}
      {errorMessage()}
      {loadingMessage()}
      {signUpForm()}
      {performRedirect()}

      


    </Base>
  );
};

export default Signup;