import Layout from "../Layout/Layout";
import React, { useState, useEffect } from "react";
import "./dashboardstyle.css";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../Context/authcontext";

const UserProfile = () => {
  const baseurl = process.env.REACT_APP_BASE_URL;
  const [auth, setauth] = useAuth();
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const update = { name, address, phone };

      const res = await fetch(
        `${baseurl}/api/v1/auth/update/${auth.user.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(update),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const result = await res.json();

      if (!res.ok) {
      } else {
        setauth({ ...auth, user: result.updatedUser, token: result.token });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = result.updatedUser;
        ls.token = result.token;
        localStorage.setItem("auth", JSON.stringify(ls));

        navigate("/dashboard/user/details");
      }
    } catch (error) {}
  };

  useEffect(() => {
    const { name, phone, address } = auth?.user;
    setname(name);
    setphone(phone);
    setaddress(address);
  }, [auth?.user]);
  return (
    <Layout>
      <div className="d-flex mt-5 vh-10">
        <div className="col-sm-3 ms-4 me-3 mt-5">
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
                aria-current="true"
              >
                Update Profile
              </NavLink>
              <NavLink to="/dashboard/user/orders" className="list-group-item ">
                Orders
              </NavLink>
            </div>
          </div>
        </div>
        <div className="w-75 mt-5 ms-5 me-5 ">
          <form onSubmit={handleSubmit}>
            <div className="updateform text-white">
              <h1 className="text-white">Update</h1>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="form-control"
                id="exampleFormControlInput"
                placeholder={auth.user.name}
              />
              <input
                type="number"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                className="form-control"
                id="exampleFormControlInput3"
                placeholder={auth.user.phone}
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                className="form-control"
                id="exampleFormControlInput4"
                placeholder={auth.user.address}
              />
              <button className="btn bg-white text-dark" type="submit">
                Update
              </button>{" "}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
