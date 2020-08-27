import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getCompany, getaBook, updateBook } from "./helper/adminapicall";

const UpdateCompany = ({ match }) => {
  const local = JSON.parse(localStorage.getItem("jwt"));
  const token = local.token;
  const userId=local.user._id

  const [values, setValues] = useState({
    name: "",
    author:"",
    genre:"",
    publication:"",
    isbn:"",
    stock:"",
    newName: "",
    error: false,
    loading: false,
    getaRedirect: false,
  });

  const {
    name,
    stock,
    author,
    publication,
    genre,
    isbn,
    newName,
    error,
    loading,
    getaRedirect,
  } = values;

  const preload = (bookId) => {
    getaBook(token, bookId).then((data) => {
  
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
       
        setValues({
          ...values,
          name:data.name,
          author:data.author,
          genre:data.genre,
          publication:data.publication,
          isbn:data.isbn,
          description:data.description,
          stock:data.stock
        
        });
      
      }
    });
  };

  useEffect(() => {
    preload(match.params.bookId);
  }, []);
  // console.log({token});
  // console.log(user._id);
  // console.log(match.params.categoryId);

  //TODO: work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
   
    updateBook(match.params.bookId,userId, token, {
      name,
      author,
      genre,
      publication,
      isbn,
      stock
   
    }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error,loading:"" });
      } else {
        setValues({
          ...values,
          name:"",
          author:"",
          genre:"",
          publication:"",
          isbn:"",
          description:"",
          loading:"",
          newName: true,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "",newName:"", [name]: event.target.value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: newName ? "" : "none" }}
    >
      <h4>Updation successfull</h4>
    </div>
  
  );

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
   if(newName){
    if(window.confirm('Updation Successfull...!!! \nClick OK to go to Company Home')){
      return(
        <Redirect to="/admin/manage/book" />
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

  const myCategoryForm = () => (
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
          Update Book
        </button>
      </div>
    </form>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/manage/book">
        Go Back
      </Link>
    </div>
  );

  return (
   
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {loadingMessage()}
          {successMessage()}
          {errorMessage()}
          {func()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
  
  );
};

export default UpdateCompany;
