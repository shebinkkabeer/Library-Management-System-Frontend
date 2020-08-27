import React, { useState, useEffect } from "react";
import { getUserBook} from "../admin/helper/adminapicall";
import { signout } from "../auth/helper";
import { useHistory , Link, withRouter} from "react-router-dom";



const ViewBook=()=>{

 const [books, setBooks] = useState([]);

 const local=JSON.parse(localStorage.getItem("jwt"));
 const userId=local.user._id;
 const token=local.token;
 const preload = () => {
    getUserBook(token,userId).then(data => {
     if (data.error) {
       console.log(data.error);
     } else {
       setBooks(data);
     }
   });
 };

 useEffect(() => {
   preload();
 }, []);
   const nav=()=>{
       return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <h1 className="navbar-brand">
          Library Management System
        </h1>
        <div className="ml-auto">
          <ul className="navbar-nav">
            
            <li className="nav-item">
              <a className="nav-link" href="/user/dashboard">User Dashboard</a>
            </li>
            
          </ul>
        </div>
      </nav>
       )
   }

   const body=()=>{
       return(
        <div className="jumbotron bg-white">
        <h1 className="mx-4 pl-4">Total  {books.length} books</h1>
        <span className="mx-4 pl-4">
          <Link className="btn btn-sm btn-outline-primary" to="/user/select/books">
            Add Book
          </Link>
        </span>

        <div className="row p-4">
            {books.map((book,index)=>{
                return(
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                    <div className="my-2 mx-4 py-2 px-4 bg-light border border-primary rounded">
                <h3 className="mt-4">{book.name}</h3>
                <p>Author : {book.author}</p>
                <p>Publication : {book.publication}</p>

                <i>Genre : {book.genre}</i>
                     </div>
                  </div>
             
                )
            })}
        

       </div>
      </div>
       )
   }

    return(
        <div id="color">
      {nav()}
        {body()}
        

        </div>

    )
}



export default ViewBook;