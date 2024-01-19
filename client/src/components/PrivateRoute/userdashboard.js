import React from "react";
import Layout from "../Layout/Layout";
import { useAuth } from "../../Context/authcontext";
import { NavLink } from "react-router-dom";
import "./dashboardstyle.css";

const Userdashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="d-flex mt-5 vh-10">
        <div className="col-sm-3 ms-4 me-3 mt-5">
          <div className="text-center dashboard-menu">
            <div className="list-group">
              <h4>Dashboard</h4>
              <NavLink
                to="/dashboard/user"
                className="list-group-item  "
                aria-current="true"
              >
                Account
              </NavLink>
              <NavLink
                to="/dashboard/user/profile"
                className="list-group-item  "
              >
                Update Profile
              </NavLink>
              <NavLink
                to="/dashboard/user/orders"
                className="list-group-item  "
              >
                Orders
              </NavLink>
            </div>
          </div>
        </div>
        <div className="card  w-75 m-5 p-1 ms-5 bg-dark">
          <div className="divi ">
            <h1 className="text-center p-5"> Your Account Details</h1>
            <br />
            <div className="ms-5">
              <p>
                Name- <b>{auth?.user?.name}</b>
              </p>
              <p>
                Email- <b>{auth?.user?.email}</b>
              </p>
              <p>
                Phone-<b> {auth?.user?.phone}</b>
              </p>
              <p>
                Address- <b>{auth?.user?.address}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Userdashboard;
