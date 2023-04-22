import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { blogContext } from "../context/BlogContext";

const Categories = () => {
  const [categories, setCategories] = useState();
  const [visibleBlogItems, setVisibleBlogItems] = useState(null);
  const [ammount, setAmmount] = useState(5);
  const { blogItems } = useContext(blogContext);
  const [searchParams, setSearchParams] = useSearchParams();

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
    async function fetchCategories() {
      const response = await fetch("https://localhost:7191/api/Categories");
      const data = await response.json();
      setCategories(data);
    }

    fetchCategories();

    return () => {};
  }, []);

  useEffect(() => {
    if (!blogItems) return;
    if (!categories) return;
    setAmmount(5);
    const params = searchParams.get("category");
    if (params === null) {
      setVisibleBlogItems(blogItems);
      return;
    }
    const parameters = params.split(",");
    const blogItemsToSet = parameters.map((param) => {
      const categoryId = categories.find((category) => category.title == param);
      console.log("🚀 ~ file: Categories.jsx:51 ~ blogItemsToSet ~ categoryId:", categoryId)
      const filteredBlogItems = blogItems.filter(
        (blog) => blog.categoryId == categoryId.id
      );
      return filteredBlogItems;
    });
    setVisibleBlogItems(blogItemsToSet[0]);

    return () => {};
  }, [searchParams, blogItems, categories]);

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
  }, [visibleBlogItems, ammount]);

  return (
    <div>
      <h2 className="text-text dark:text-text-dark text-4xl bg-primary dark:bg-primary-dark border rounded-lg p-4">
        Categories
      </h2>
      <ul className="flex gap-4 lg:my-8 my-4">
        {categories?.map((category) => (
          <li key={category.id} className="">
            <Link to={`/categories?category=${category.title}`} className="">
              <p className="text-text dark:text-text-dark text-base bg-primary dark:bg-primary-dark border rounded-lg p-4">
                {category.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="grid lg:gap-8 gap-4">
        {visibleBlogItems &&
          visibleBlogItems?.map(
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
          className={`bg-text/50 dark:bg-text-dark/30 text-text-dark hover:text-text dark:text-text dark:hover:text-text-dark rounded-lg p-3 px-5 text-primary my-10 w-fit ${
            ammount < visibleBlogItems?.length ? "visible" : "invisible"
          }`}
          onClick={morePosts}
        >
          More posts →
        </button>
      </div>
    </div>
  );
};

export default Categories;
