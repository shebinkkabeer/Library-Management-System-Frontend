import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getInfo } from "./helper/adminapicall";
import axios from "axios";


const UpdateInfo = ({match} ) => {
  
  const tokrole = JSON.parse(localStorage.getItem("jwt"));
  const token = tokrole.access_token;

  const [values, setValues] = useState({
    from:"",
    to:"",
    type:"",
    description:"",
    newName: "",
    error: false,
    loading: false,
    getaRedirect: false,
  });

  const {
    from,
    to,
    type,
    description,
    newName,
    error,
    loading,
    getaRedirect,
  } = values;

  const preload = (productionId,informationId) => {

    getInfo(productionId,informationId,token).then((data) => {
  
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
       
        setValues({
          ...values,
          from:data.from,
          to:data.to,
          type:data.type,
          description:data.description
        });
      
      }
    });
    
    };
  

  useEffect(() => {
    preload(match.params.productionId,match.params.informationId);
  }, []);


  // console.log({token});
  // console.log(user._id);
  // console.log(match.params.categoryId);

  //TODO: work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    const informationId = match.params.informationId;

    const productionId = match.params.productionId;
    const tokrole = JSON.parse(localStorage.getItem("jwt"));
    const token = tokrole.access_token;

    let data = {
     
      from:from,
      to:to,
      type:type,
      description:description
    }
    console.log({production:productionId,_Id:informationId,from:from,
      to:to,
      type:type,
      description:description});

    axios
      .put(
        `${process.env.REACT_APP_BACKEND}/production/data/information/edit`,({production:productionId,_id:informationId,from:from,
          to:to,
          type:type,
          description:description}),
        
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then(data => {
        if (data.error!==undefined) {
          setValues({ ...values, error: data.error,loading:false});
        } else {
          setValues({
             ...values,
             error: "",
            from:"",
            to:"",
            type:"",
             description:"",
             loading:false,
            newName:true,
            });;
      }})
      .catch((err)=>{console.log(err.response)})
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: newName ? "" : "none" }}
    >
      <h4>Updation successfull</h4>
    </div>
  
  );

  
  

 const func=()=>{
   if(newName){
    if(window.confirm('Updation Successfull...!!! \nClick OK to go to Production Home')){
      return(
        <Redirect to={`/admin/production/${match.params.productionId}`} />
      )
    }
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

  const infoForm = () => (
    <form>
         <p className="text-center lead">Enter Information to Update</p>
      <div className="form-group">
        <p className="lead">From</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("from")}
          value={from}
          autoFocus
          required
          placeholder=""
          

        />

        <p className="lead">To</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("to")}
          value={to}
          required
          placeholder=""
        />
        

        <p className="lead">Material Transport</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("type")}
          value={type}
          required
          placeholder=""
        />
        
        <p className="lead">Description</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("description")}
          value={description}
          required
          placeholder=""
        />

        <button onClick={onSubmit} className="btn btn-outline-info">
          Update  Information
        </button>
      </div>
    </form>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to={`/admin/production/${match.params.productionId}`}>
        Back to Production Home
      </Link>
    </div>
  );

  return (
    <Base
      title={null}
      description={null}
      className="container bg-dark p-4"
    >
      <div className="row bg-light rounded">
        <div className="col-md-8 offset-md-2">
          {loadingMessage()}
          {successMessage()}
          {errorMessage()}
          {func()}
          {infoForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateInfo;
