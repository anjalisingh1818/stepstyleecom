import React, { useEffect, useState } from "react";
import "./dashboardstyle.css";
import Layout from "../Layout/Layout";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/authcontext";
import { useCart } from "../../Context/cartcontext";
const Orders = () => {
  const baseurl = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [purchasedItem, setpurchasedItem] = useState([]);
  const [auth] = useAuth();
  const [cart, setcart] = useCart();
  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${baseurl}/api/v1/shoe/Orders/${auth.user.id}`
      );
    

      setpurchasedItem(res.data.purchasedItems);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout>
      <div className="d-flex mt-5 vh-10">
        <div className="col-sm-3 ms-4 me-3 mt-5">
          <div className="dash">
            <div className="text-center dashboard-menu">
              <div className="list-group">
                <h4>Dashboard</h4>
                <NavLink
                  to="/dashboard/user/details"
                  className="list-group-item "
                >
                  Account
                </NavLink>
                <NavLink
                  to="/dashboard/user/profile"
                  className="list-group-item "
                >
                  Update Profile
                </NavLink>
                <NavLink
                  to="/dashboard/user/orders"
                  className="list-group-item active"
                  aria-current="true"
                >
                  Orders
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div class="d-flex align-items-center">
            <strong>Loading...</strong>
            <div
              class="spinner-border ml-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        ) : (
          <>
            <div className="d-block">
              <h1 className="text-center mb-4">Previous Orders </h1>
              <div className="d-flex flex-wrap mb-4 mt-5">
                <br />
                {purchasedItem.map((i) => (
                  <div
                    key={i._id}
                    className="card m-2 mt-2 ms-4"
                    style={{
                      width: "24rem",
                      padding: "5px",
                      height: "28rem",
                      background: "black",
                    }}
                  >
                    <img
                      src={i.image}
                      className="card-img-top  "
                      alt="..."
                      style={{ height: "15rem" }}
                    />
                    <div className="card-body ">
                      <h5 className="card-title text-white">{i.name}</h5>
                      <div className="d-flex mb-0">
                        <h4 className="card-title text-white card-price">
                          &#8377; {i.newprice}
                        </h4>
                      </div>
                      <a className="btn btn-primary m-2 p-2 " href={`/product/${i._id}`}>
                       
                        Product Details
                      </a>
                      <a
                        className="btn btn-success p-2 mb-0"
                        onClick={() => {
                          setcart([...cart, i]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, i])
                          );
                        }}
                      >
                        Buy Again
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
