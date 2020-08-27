import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import SelectBook from "./user/SelectBook";
import ViewBook from "./user/ViewBook";
import AdminDashBoard from "./user/AdminDashBoard";
import AddBook from "./admin/AddBook";
import ManageBook from "./admin/ManageBook";
import UpdateBook from "./admin/UpdateBook";
import Cart from "./core/Cart";
import BookDashBoard from "./user/BookDashBoard";
import HomePage from "./admin/Home"


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <PrivateRoute path="/user/select/books" exact component={SelectBook} />
        <PrivateRoute path="/user/view/books" exact component={ViewBook} />
       <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute path="/admin/create/book" exact component={AddBook} />
        <AdminRoute path="/admin/manage/book" exact component={ManageBook} />
        <AdminRoute
          path="/admin/book/dashboard/:bookId"
          exact
          component={BookDashBoard}
        />
        <AdminRoute
          path="/admin/company/update/:bookId"
          exact
          component={UpdateBook}
        />
        </Switch>
    </BrowserRouter>
  );
}
