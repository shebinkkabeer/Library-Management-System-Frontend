import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getBook} from "../admin/helper/adminapicall";
import { API } from "../backend";
import axios from "axios";






const SelectBook=()=>{


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

    const redirect=()=>{
      
        if(window.confirm('Book selected successfully...!!! \nClick OK to see the selected books')){
            
             return( window.location = "/user/view/books" )
            
          }
    }
    const SelectBook=(token,book)=>{
            const data=book.book;
            axios.post(`${API}/user/add/book/${userId}`,(data),{headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${token}`
               }})
               .then(response=> {
                    redirect();
               })
               .catch(error=>{ 
                 window.alert("Book selection failed...")
               //return {error:error.response.data.error};     
               })

    }

 return(
    <Base title="Select Books here.." description="" className="container p-4">
      <Link className="btn btn-info" to={`/user/dashboard`}>
        <span className="">User Home</span>
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
                <div className="row text-center">
                    <div className="col-12 ">
               <button onClick={()=>SelectBook(token,{book})} className="btn btn-block btn-primary">
                   Select Book
               </button>
                    </div>
                    </div>
            
      
                 
                 </div>
                 </div>
               
                 </div>

               )})}
               </div>
                    </Base>

 )
}

export default SelectBook;