import React, { useEffect, useState } from "react";
import './style.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/authcontext";
import Layout from "../components/Layout/Layout";

const Login = () => {
  const [auth, setauth] = useAuth();
  const baseurl = process.env.REACT_APP_BASE_URL;
  const [password, setpassword] = useState();
  const [email, setemail] = useState();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseurl}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res.data.success) {
        setauth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (error) {
     
    }
  }
  useEffect(()=>{
window.scrollTo({
  top:0,
  behavior:'instant'
})

  },[])
  return (
  <div className="initialbody ">
    <Layout>
      <div className="cont">
        <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
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
        <button>Login</button>
      </form></div>
     
    </Layout>
    </div>
  );
};

export default Login;
