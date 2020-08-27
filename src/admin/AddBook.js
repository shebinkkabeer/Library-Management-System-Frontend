import React, { useState } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link,Redirect } from "react-router-dom";
import { createBook } from "./helper/adminapicall";

const AddBook = () => {
  const [values, setValues] = useState({
    name: "",
    author:"",
    genre:"",
    publication:"",
    isbn:"",
    stock:"",
    error: false,
    success: false,
    loading:false
  });

  const { name,
    stock,
    author,
    publication,
    genre,
    isbn,
    loading,
    
    error, success } = values;

  const local=JSON.parse(localStorage.getItem("jwt"));
  const userId=local.user._id
  const token=local.token;
  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  
  const handleChange = name => event => {
    setValues({ ...values, error: "",success:"", [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "",loading:true});

    
    

    //backend request fired
    createBook(userId,token, { name,
      author,
      genre,
      publication,
      isbn,
      stock
      }).then(data => {
      if (data.error!==undefined) {
        setValues({ ...values, error: data.error});
      } else {
        setValues({
           ...values,
           error: "",
           name:"",
           author:"",
           genre:"",
           publication:"",
           isbn:"",
           stock:"",
          success:true,
          });;
      }
    }).catch(()=>{console.log("Book creation request Failed")});
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Book added successfully
           
          </div>
        </div>
      </div>
    );
  };
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };
 
  const func=()=>{
    if(success){
     if(window.confirm('Book added Successfull...!!! \nClick OK to go to Dashboard')){
       return(
         <Redirect to={`/admin/dashboard`} />
       )
     }
    }
  }  

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

  const myBookForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter Book Name</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("name")}
          value={name}
          autoFocus
          required
          placeholder=""
          

        />

        <p className="lead">Enter Author</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("author")}
          value={author}
          required
          placeholder=""
        />
        

        <p className="lead">Enter Genre</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("genre")}
          value={genre}
          required
          placeholder=""
        />
        
        <p className="lead">Enter Publication</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("publication")}
          value={publication}
          required
          placeholder=""
        />

        <p className="lead">Enter ISBN</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("isbn")}
          value={isbn}
          required
          placeholder=""
        />


       <p className="lead">Enter Stock</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("stock")}
          value={stock}
          required
          placeholder=""
        />

      
        <button onClick={onSubmit} className="btn btn-outline-info">
          Add Book
        </button>
      </div>
    </form>
  );

  return (
   
      <div className="bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {loadingMessage()}
          {successMessage()}
          {errorMessage()}
   
          {myBookForm()}
          {goBack()}
        </div>
      </div>
 
  );
};

export default AddBook;
