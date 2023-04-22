import { createContext, useEffect, useState } from "react";

export const blogContext = createContext();

const BlogContext = ({ children }) => {
  const [blogItems, setBlogItems] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    async function newFunction() {
      const res = await fetch("https://localhost:7191/api/Blogs");
      const data = await res.json();
      setBlogItems(data.reverse());
    }

    newFunction();

    return () => {};
  }, []);

  return (
    <blogContext.Provider value={{ blogItems, setBlogItems, token, setToken }}>
      {children}
    </blogContext.Provider>
  );
};

export default BlogContext;
