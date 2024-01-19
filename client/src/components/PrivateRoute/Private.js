import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/authcontext";
import { Outlet } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
  const baseurl = process.env.REACT_APP_BASE_URL;
  const [ok, setok] = useState(false);
  const [auth, setauth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${baseurl}/api/v1/auth/check-login`
      );
      if (res.data.ok) {
        setok(true);
      } else {
        setok(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <h1> wait for authentication</h1> : <Outlet />;
};

export default PrivateRoute;
