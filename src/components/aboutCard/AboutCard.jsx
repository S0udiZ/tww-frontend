import { useContext, useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { blogContext } from "../../context/BlogContext";
import { Link } from "react-router-dom";

const AboutCard = ({ className }) => {
  const { blogItems, token } = useContext(blogContext);
  const [about, setAbout] = useState();
  useEffect(() => {
    async function getAbout() {
      const res = await fetch("https://localhost:7191/api/Profiles");
      const data = await res.json();
      setAbout(data[0]);
    }

    getAbout();
    return () => {};
  }, []);

  return (
    <div className={`${className} px-5 py-6 relative`}>
      {token && (
        <Link to="/admin/profile" className="absolute top-0 right-0 p-2">
          <Icon icon="fa:edit" className="text-text dark:text-text-dark" />
        </Link>
      )}
      <div className="flex flex-col items-center">
        <img src={about?.image} alt="Profile image" className="w-32 h-32 rounded-full" />
      </div>
      <p className="text-text dark:text-text-dark text-sm my-3">{about?.content}</p>
      <hr className="border-b-2 border-t w-24" />
      <div className="flex flex-col py-3 gap-4">
        <h2 className="font-medium text-text dark:text-text-dark">Featured Posts:</h2>
        {blogItems &&
          blogItems?.map(
            (blog, index) =>
              index < 2 && (
                <Link
                  key={blog.id}
                  to={`/blogs/${blog.id}`}
                  className="hover:text-text dark:hover:text-text-dark font-medium text-sm text-text/70 dark:text-text-dark/70"
                >
                  {blog.title} | {new Date(blog.date).toLocaleDateString()}
                </Link>
              )
          )}
      </div>
      <hr className="border-b-2 border-t w-24" />
      <div className="flex gap-4 py-3 text-text/70 dark:text-text-dark/70">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-text dark:hover:text-text-dark text-xl"
        >
          <Icon icon="fa:facebook-square" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-text dark:hover:text-text-dark text-xl"
        >
          <Icon icon="fa:instagram" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-text dark:hover:text-text-dark text-xl"
        >
          <Icon icon="fa:twitter" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-text dark:hover:text-text-dark text-xl"
        >
          <Icon icon="fa:linkedin" />
        </a>
      </div>
    </div>
  );
};

export default AboutCard;
