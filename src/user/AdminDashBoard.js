import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated, getUser } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const { name, email } = values;

  const preload = () => {
    getUser()
      .then((response) => {
        setValues({ ...values, name: response.name, email: response.email });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    preload();
  }, []);

  const adminLeftSide = () => {
    return (
     
        <div className="card">
          <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <Link
                to="/admin/create/book"
                className="nav-link text-success"
              >
                Add Book
              </Link>
            </li>
            <li className="list-group-item">
              <Link
                to="/admin/manage/book"
                className="nav-link text-success"
              >
                Manage Book
              </Link>
            </li>
         
          </ul>
        </div>
 
 
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span>
            {email}
          </li>

          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to admin area"
      description=""
      className="container-fluid bg-info  p-5"
    >
      <div className="row">
        <div className="col-md-5 w-100 order-1 order-lg-1 mx-auto mb-5">{adminLeftSide()}</div>
        <div className="col-md-7 w-100 order-2 order-lg-2 mx-auto my-auto">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
