import React from "react";

import { useCart } from "../Context/cartcontext";
import { useAuth } from "../Context/authcontext";
import { NavLink, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
const Cart = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const findTotal = () => {
    var tot = 0;
    cart?.map((item) => (tot = tot + Number(item?.newprice)));
    return tot;
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
     
    }
  };
 
  
  const baseurl = process.env.REACT_APP_BASE_URL;
  const handleCheckout = async () => {
    try {
      const response = await axios.post(`${baseurl}/api/v1/shoe/checkout/${auth.user.id}`, { cart });
    
      setCart([])
      localStorage.removeItem('cart')
      navigate('/dashboard/user/orders')
    } catch (error) {
   
    
    }
  };
    
        
  

  return (
    <Layout>
      <div className="cart-page bg-white" >
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-dark p-2 mb-1"style={{fontFamily:'cursive',color:'white'}}>
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name} !!`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row m-1" style={{border:'2px solid black'}} key={p?._id}>
                  <div className="col ">
                    <img
                      src={p?.image}
                      className="card-img-top"
                      alt={p?.name}
                      width="100%"
                      height={"150px"}
                    />
                  </div>
                  <div className="col-md-3 mt-4 ms-2">
                    <p>{p?.name}</p>
                    <p>Price : &#8377; {p?.newprice}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn mt-5 ms-5">
                    <button
                      className="btn btn-danger "
                      onClick={() => removeCartItem(p?._id)}
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))}
            </div>
            {(cart?.length>0) && (<>
              <div className="col-md-5 mb-4 cart-summary bg-dark ">
                <div className="text-center mt-5 mb-5 text-white">
                  <h2>CART SUMMARY</h2>
                  <hr />
                  <h4>Quantity:{cart?.length}</h4>
                  <h4>Delivery Charges: &#8377; {0}</h4>
                  <h4>Platform Charges: &#8377; {0}</h4>
                  <h3>Cart Total : &#8377; {findTotal().toFixed(2)}</h3>
                 {auth?.user &&<p>Address: {auth.user.address}<br/><NavLink style={{color:'red'}} to='/dashboard/user/profile '> Change Address</NavLink></p>}
                  <button
                    className="btn text-center  btn-success  ps-5 pe-5 "
                    onClick={handleCheckout}
                  >
                    Order
                  </button>
                </div>
              </div></>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;



