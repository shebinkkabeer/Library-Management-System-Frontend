import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated, getUser } from "../auth/helper/index";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    books:""
  });

  const { name, email ,books} = values;

  const preload = () => {
    getUser()
      .then((response) => {
        setValues({ ...values, name: response.name, email: response.email ,books:response.books.length});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    preload();
  }, []);

  const userLeftSide = () => {
    return (
     
        <div className="card">
          <h4 className="card-header bg-dark text-white">User Navigation</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <Link
                to="/user/select/books"
                className="nav-link text-info"
              >
                Select Book 
              </Link>
            </li>
            <li className="list-group-item">
              <Link
                to="/user/view/books"
                className="nav-link text-info"
              >
                View My Books
              </Link>
            </li>
         
          </ul>
        </div>
 
 
    );
  };

  const userRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header bg-dark text-white">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className=" mr-2">Name : </span>
            {name}
          </li>
          <li className="list-group-item">
            <span className=" mr-2">Email : </span>
            {email}
          </li>
          <li className="list-group-item">
          <span className=" mr-2">Total Books Taken : </span>
          
            {books}
          </li>

          
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome User!!!"
      description=""
      className="container-fluid bg-info  p-5"
    >
      <div className="row">
        <div className="col-md-5 w-100 order-1 order-lg-1 mx-auto mb-5">{userLeftSide()}</div>
        <div className="col-md-7 w-100 order-2 order-lg-2 mx-auto my-auto">{userRightSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
