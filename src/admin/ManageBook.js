import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getBook, deleteBook} from "./helper/adminapicall";

const ManageBook = () => {
  const [books, setBooks] = useState([]);
  
  
  const local=JSON.parse(localStorage.getItem("jwt"));
  const userId=local.user._id;
  const token=local.token;
  const preload = () => {
    getBook(token).then(data => {
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


  const deleteThisBook = (token,bookId,userId) => {
  
    
    deleteBook(token,bookId,userId).then(data => {
      if (data.error) {
        

        console.log(data.error);
      } else {
        preload();
      }
    });
  };
 
  return (
    <Base title="Manage Books here" description="" className="container p-4">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h6 className="my-4 text-light lead" >Total {books.length} Books:</h6>

      <div className="row">
     
          {books.map((book, index) => {
            return (

          <div key={index} className="col-lg-4 text-dark">
          <div key={index} className=" card bg-light border border-success my-3 ">
          <div className="card-header   text-center ">{book.name}</div>
          <div className="card-body  text-left">
          <h5 className="">Written by : {book.author}</h5>
          <h5>Genre : {book.genre}</h5>
          <h5>Published by : {book.publication}</h5>
          
      

           
           </div>
           
            <div className="row ">
            
              <div className="col-4">
              <Link
                      className="btn btn-block btn-primary"
                      to={`/admin/company/update/${book._id}`}
                      
                    ><i className="fa fa-pencil-square fa-1x" aria-hidden="true"></i>
                      
                    </Link> 
              </div>
              <div className="col-4">           
             <Link
            className="btn btn-block  btn-success"
            to={`/admin/book/dashboard/${book._id}`}
            
          ><i className="fa fa-eye fa-1x" aria-hidden="true"></i>
            
          </Link> </div>


              <div className="col-4">
              <button onClick={() => {if(window.confirm('Are you sure to delete this Book?')){deleteThisBook(
              token,book._id,userId
            )};}} className="btn btn-block btn-danger">
              
              
              <i className="fa fa-trash fa-1x" aria-hidden="true"></i>     
              </button>
              </div>
            </div>
          </div>
       




          </div> 


        //   <div key={index} className="col-lg-5 col-md-4 col-sm-6 col-xs-12" >
        //   <div className="my-2 mx-4 py-2 px-4 bg-light border border-primary rounded">
        //     <h3 className="mt-4">{book.name}</h3>
        //     <p>Name of the author</p>
        //     <i>ISBN Number</i>
        //     <div className="row mt-4 mb-4 text-center">
        //       <div className="col-4">
        //         <button className="btn btn-primary">
        //           <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        //         </button>
        //       </div>
        //       <div className="col-4">
        //         <button className="btn btn-success">
        //           <i className="fa fa-eye" aria-hidden="true"></i>
        //         </button>
        //       </div>
        //       <div className="col-4">
        //         <button className="btn btn-danger">
        //           <i className="fa fa-trash-o" aria-hidden="true"></i>
        //         </button>
        //       </div>
        //     </div>
        //   </div>
        // </div>
              
           )
          
          })}
      </div>


    </Base>
  );
};

export default ManageBook;
