import react, { useState, useEffect, createContext, useContext } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setauth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedata = JSON.parse(data);
      setauth({
        ...auth,
        user: parsedata.user,
        token: parsedata.token,
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <authContext.Provider value={[auth, setauth]}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => {
  return useContext(authContext);
};

export { useAuth, AuthProvider };
