import react, { useState, useEffect, createContext, useContext } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const baseurl = process.env.REACT_APP_BASE_URL;
  const [product, setproduct] = useState([]);

  const getProducts = async () => {
    try {
      console.log(baseurl);
      const response = await fetch(`${baseurl}/api/v1/shoe/products`);
      const result = await response.json();

      setproduct(result.pro);
    } catch (error) {}
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={[product, setproduct]}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => {
  return useContext(ProductContext);
};

export { useProduct, ProductProvider };
