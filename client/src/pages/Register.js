import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
const Login = () => {
  const [name, setname] = useState();
  const [password, setpassword] = useState();
  const [address, setaddress] = useState();
  const [phone, setphone] = useState();
  const [email, setemail] = useState();
  const navigate = useNavigate();
  const baseurl = process.env.REACT_APP_BASE_URL;
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseurl}/api/v1/auth/register`, {
        name,
        email,
        password,
        address,
        phone,
      });
      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {}
  }

  return (
    <div className="initialbody ">
      <Layout>
        <div className="cont">
          <h1>SIGNUP</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Your name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Your email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
              />
              <input
                type="number"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                placeholder="Phone"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                placeholder="Address"
              />
              <button>Register</button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
