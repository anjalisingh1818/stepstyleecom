import React, { useState } from "react";
import "./style.css";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../Context/authcontext";
import { useProduct } from "../Context/product";
import "./style.css";
import banner from "../../src/banner.png";
import { useCart } from "../Context/cartcontext";
import { NavLink, useNavigate } from "react-router-dom";
const HomePage = () => {

  const navigate = useNavigate();
  const [cart, setcart] = useCart();
  const [product] = useProduct();
  const [auth, setauth] = useAuth();
  return (
    <Layout>
      <div className="Banner">
        <div className="Banner-txt">
          <p className=" text-center Banner-p">
            {" "}
            upto <br />
            80% <br />
            off
          </p>
          <h3> New Arrivals</h3>
          <h1>
            Stylish <hr />
            comfortable <hr />
            Durable{" "}
          </h1>
          <h2>
            {" "}
            Stylish <hr />
            comfortable <hr />
            Durable{" "}
          </h2>
        </div>
        <div className="cir"></div>
        <div className="cir-2"></div>

        <img src={banner} />
      </div>
      <div className="d-flex flex-wrap ">
        {product ? (
          <div className="p">
            {product?.map((i) => {
              return (
                <div
                  className="card "
                  style={{
                    width: "19rem",
                    padding: "5px",
                    height: "26rem",
                    background: "black",
                  }}
                >
                  <img src={i.image} className="card-img-top" alt="..." />
                  <div className="card-body ">
                    <h5 className="card-title text-white">{i.name}</h5>
                    <div className="d-flex mb-0">
                      <h6
                        className="card-title card-price "
                        style={{ textDecoration: "line-through", color: "red" }}
                      >
                        &#8377;{i.oldprice}
                      </h6>
                      <h4 className="card-title text-white card-price">
                        &#8377; {i.newprice}
                      </h4>
                    </div>
                    <p className="card-text text-white" length={10}>
                      {i.description.substring(0, 60)}...
                    </p>
                    <div className=" d-flex  position-absolute bottom-0 align-self-sm-center gap-0">
                      <NavLink
                        className="btn btn-primary m-2 bg-info  "
                        to={`/product/${i._id}`}
                      >
                        Details
                      </NavLink>
                      <a
                        className="btn btn-success w-100  m-2  text-dark "
                        style={{ background: "yellow" }}
                        onClick={() => {
                          if (auth?.user) {
                            setcart([...cart, i]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, i])
                            );
                          } else {
                            navigate("/login");
                          }
                        }}
                      >
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div class="d-flex justify-content-center mt-5 mb-5">
            <strong>Loading...</strong>
            <div
              class="spinner-border ml-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
