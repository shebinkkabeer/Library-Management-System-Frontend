import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getProduction, getaBook } from "../admin/helper/adminapicall";
import fileDownload from "js-file-download";
import Axios from "axios";

const BookDashBoard = ({ match }) => {
  const local = JSON.parse(localStorage.getItem("jwt"));
  const token = local.token;

  const [book, setBook] = useState([]);
  const [error, setError] = useState("");
  const preload = (bookId) => {
    getaBook(token, bookId).then((data) => {
  
      if (data.error) {
        setError(data.error)
      } else {
       
       setBook(data)
       
      
      }
    });
  };


  useEffect(() => {
    preload(match.params.bookId);
  }, []);



 

 console.log(book);
  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-outline-light " to="/admin/manage/book">
        Go Back
      </Link>
    </div>
  );
  const card=()=>(
    <div  className=" card bg-light border border-dark my-3" >
          <div className="card-header   text-center ">{book.name}</div>
          <ul class="list-group list-group-flush">
  <li class="list-group-item">Book id : {book._id}</li>

  <li class="list-group-item">Written by : {book.author}</li>
  <li class="list-group-item">Genre : {book.genre}</li>
  <li class="list-group-item">Published by :  {book.publication}</li>
  <li class="list-group-item">ISBN : {book.isbn}</li>

  <li class="list-group-item">Current Stock : {book.stock}</li>
  <li class="list-group-item">Created at : {book.createdAt}</li>
  <li class="list-group-item">Last Updated on : {book.updatedAt}</li>


  




  </ul>
           </div>
  )

  const nav=()=>(
    <nav className="navbar navbar-expand navbar-dark bg-primary">
    <h1 className="navbar-brand">
      Library Management System
    </h1>
    <div className="ml-auto">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#">Sign Up</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Sign In</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Signout</a>
        </li>
      </ul>
    </div>
  </nav>
  )
 
  return (
 <Base title="" description="" className="container p-auto bg-dark">
   {goBack()}
   {card()}
 </Base>
   
  );
};

export default BookDashBoard;
