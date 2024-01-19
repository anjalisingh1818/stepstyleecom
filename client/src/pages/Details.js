import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Context/cartcontext";
import "./style.css";
import { useProduct } from "../Context/product";
import { useAuth } from "../Context/authcontext";
const Details = () => {
  const baseurl = process.env.REACT_APP_BASE_URL;
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [product] = useProduct();
  const [cart, setcart] = useCart();
  const [pro, setpro] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const getProduct = async () => {
    try {
      setLoading(false);
      const res = await axios.get(`${baseurl}/api/v1/shoe/product/${id}`);

      setpro(res.data.productdata);
      setLoading(true);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);
  return (
    <Layout>
      {loading ? (
        <>
          <div className="detail-card">
            <div className="detail-img">
              <div className="detail-img-sm">
                <img src={pro?.image} />
                <img src={pro?.image} />
                <img src={pro?.image} />
                <img src={pro?.image} />
              </div>
              <img src={pro?.image} />
            </div>
            <div
              className="card me-4 ms-0 bg-dark text-white "
              style={{ width: "25rem", height: "28rem" }}
            >
              <div class="card-body ms-3 ">
                <h1 class="card-title mb-5 ">{pro?.name}</h1>
                <p class="card-text mt-2">{pro?.description}</p>
              </div>
              <h4 className="ms-4">Sizes</h4>
              <ul class="d-flex flex-row  ">
                <NavLink
                  class="btn  "
                  style={{
                    textDecoration: "none",
                    color: "white",
                    margin: "5px",
                    border: "2px solid yellow",
                    padding: "5px",
                  }}
                >
                  39
                </NavLink>
                <NavLink
                  class="btn  "
                  style={{
                    textDecoration: "none",
                    color: "white",
                    margin: "5px",
                    border: "2px solid yellow",
                    padding: "5px",
                  }}
                >
                  38
                </NavLink>
                <NavLink
                  class="btn  "
                  style={{
                    textDecoration: "none",
                    color: "white",
                    margin: "5px",
                    border: "2px solid yellow",
                    padding: "5px",
                  }}
                >
                  40
                </NavLink>
                <NavLink
                  class="btn  "
                  style={{
                    textDecoration: "none",
                    color: "white",
                    margin: "5px",
                    border: "2px solid yellow",
                    padding: "5px",
                  }}
                >
                  41
                </NavLink>
                <NavLink
                  class="btn  "
                  style={{
                    textDecoration: "none",
                    color: "white",
                    margin: "5px",
                    border: "2px solid yellow",
                    padding: "5px",
                  }}
                >
                  42
                </NavLink>
              </ul>
              <div class="card-body ms-4">
                <a
                  class="btn text-dark"
                  style={{ background: "yellow" }}
                  onClick={() => {
                    if (auth?.user) {
                      setcart([...cart, pro]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, pro])
                      );
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  Add to Cart
                </a>
              </div>
            </div>
          </div>
          <div>
            <h2 className="ms-4"> Related products...</h2>
            <div className="d-flex flex-wrap ms-4 ">
              {product
                .filter((p) => {
                  return p._id !== pro?._id;
                })
                .slice(0, 4)
                .map((i) => {
                  return (
                    <div
                      className="card m-2 bg-dark"
                      style={{
                        width: "18rem",
                        padding: "5px",
                        height: "26rem",
                        background: "black",
                      }}
                    >
                      <img
                        src={i.image}
                        className="card-img-top"
                        style={{ height: "12rem" }}
                        alt="image"
                      />
                      <div className="card-body  ">
                        <h5 className="card-title text-white">{i.name}</h5>
                        <div className="d-flex mb-0">
                          <h6
                            className="card-title card-price "
                            style={{
                              textDecoration: "line-through",
                              color: "red",
                            }}
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
                            className="btn btn-primary m-1 bg-info  "
                            to={`/product/${i._id}`}
                          >
                            details
                          </NavLink>
                          <a
                            className="btn btn-success w-100  m-1  text-dark "
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
          </div>
        </>
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
    </Layout>
  );
};

export default Details;
