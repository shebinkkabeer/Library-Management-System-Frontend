import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";

import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts();
  }, [reload]);

  // const loadAllProducts = () => {
  //   return isAutheticated()?   ( <div>
  //   <h2>Items In Your Cart </h2>
  //   {products.map((product, index) => (
  //     <Card
  //       key={index}
  //       product={product}
  //       removeFromCart={true}
  //       addtoCart={false}
  //       setReload={setReload}
  //       reload={reload}
  //     />
  //   ))}
  // </div>): (
  //   <Link to="/signin">
  //   <button className="btn-primary">Sign In to view your cart</button>
  //   </Link>
   
  //   );
  // };
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">loadAllProducts</div>
        <div className="col-6">
          
        </div>
      </div>
    </Base>
  );
};

export default Cart;
