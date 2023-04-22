import { useContext, useEffect, useState } from "react";
import { blogContext } from "../context/BlogContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { blogItems } = useContext(blogContext);
  const [ammount, setAmmount] = useState(5);

  function setContent(content) {
    // Check for script tags
    if (content.includes("<script")) {
      const beforeScript = content.split("<script")[0];
      const afterscript = content.split("</script>");
      content = beforeScript[0] + afterscript[1];
    }
    const paragraph = content.split("</p>");
    return paragraph[0].split("<p>")[1];
  }

  function morePosts() {
    setAmmount(ammount + 5);
  }

  useEffect(() => {
    const cards = document.querySelectorAll(".block-card");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active-card");
        } else {
          entry.target.classList.remove("active-card");
        }
      });
    });
    cards.forEach((card) => {
      observer.unobserve(card);
      observer.observe(card);
    });
    return () => {
      observer.disconnect();
    };
  }, [blogItems, ammount]);

  return (
    <div className="grid lg:gap-8 gap-4">
      {blogItems &&
        blogItems?.map(
          (blog, index) =>
            index < ammount && (
              <div key={blog.id}>
                <div className={`block-card`}>
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="hover:opacity-70 lg:col-span-3"
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="lg:aspect-square aspect-video object-cover lg:rounded-md rounded-sm mx-0"
                    />
                  </Link>
                  <div className="lg:col-span-9">
                    <Link to={`/blogs/${blog.id}`}>
                      <h2 className="text-2xl font-medium text-text dark:text-text-dark">
                        {blog.title}
                      </h2>
                    </Link>
                    <p className="text-text/70 dark:text-text-dark/70 text-sm my-3">
                      {new Date(blog.date).toDateString()} |{" "}
                      <Link
                        to={`/categories?category=${blog.category.title}`}
                        className="hover:text-text dark:hover:text-text-dark"
                      >
                        {blog.category.title}
                      </Link>
                    </p>
                    <p className="text-text/70 dark:text-text-dark/70">
                      {setContent(blog.content)}{" "}
                      <Link
                        to={`/blogs/${blog.id}`}
                        className="underline font-medium hover:text-text dark:hover:text-text-dark"
                      >
                        Read more...
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            )
        )}
      <button
        className={`bg-text/50 dark:bg-text-dark/30 text-text-dark hover:text-text dark:text-text dark:hover:text-text-dark rounded-lg p-3 px-5 my-10 w-fit ${
          ammount < blogItems?.length ? "visible" : "invisible"
        }`}
        onClick={morePosts}
      >
        More posts →
      </button>
    </div>
  );
};

export default Home;
