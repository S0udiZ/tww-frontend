import { Icon } from "@iconify/react";
import { useContext, useState } from "react";
import { blogContext } from "../../context/BlogContext";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const { blogItems } = useContext(blogContext);
  const [searchResults, setSearchResults] = useState([]);

  function beginSearch() {
    const searchBar = document.getElementsByClassName("searchBar");
    const searchForm = document.getElementsByClassName("searchForm");
    setSearchResults([]);
    for (let i = 0; i < searchForm.length; i++) {
      searchForm[i].reset();
      searchForm[i].classList.toggle("animate-searchForm");
    }
    for (let i = 0; i < searchBar.length; i++) {
      searchBar[i].classList.toggle("animate-searchBar");
    }
  }

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

  function search(e) {
    const { value } = e.target;
    const results = blogItems.filter((blog) =>
      blog.title.toLowerCase().includes(value.toLowerCase())
    );
    if (results.length > 0) {
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }

  function handleClick() {
    beginSearch();
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    //TODO: Add search functionality if time permits
  }

  return (
    <div>
      <button
        className="border-2 border-text dark:border-text-dark rounded-full p-1 text-text dark:text-text-dark hover:text-text-dark hover:bg-text dark:hover:text-text dark:hover:bg-text-dark"
        onClick={beginSearch}
      >
        <Icon icon="fa:search" className="text-xs" />
      </button>
      <div className="searchBar">
        <div
          className={`p-1 flex flex-col gap-4 h-screen ${
            searchResults?.length > 0
              ? "bg-primary-dark/70 dark:bg-primary/70"
              : ""
          }`}
        >
          <form
            action=""
            className="searchForm"
            onSubmit={handleSearchSubmit}
            onChange={search}
          >
            <button
              type="button"
              className="border-2 border-r-0 border-text dark:border-text-dark rounded-l-full p-2 text-text dark:text-text-dark hover:text-text-dark hover:bg-red-500 dark:hover:text-text dark:hover:bg-red-500 bg-primary dark:bg-primary-dark"
              onClick={beginSearch}
            >
              <Icon icon="fa:close" className="text-2xl" />
            </button>
            <input
              type="text"
              className="border-x-0 border-2 valid:border-text rounded-none dark:valid:border-text-dark font-bold grow"
              name="value"
              placeholder="Begin searching..."
            />
            <button
              type="submit"
              className="border-2 border-l-0 border-text dark:border-text-dark rounded-r-full p-2 text-text dark:text-text-dark hover:text-text-dark hover:bg-text dark:hover:text-text dark:hover:bg-text-dark bg-primary dark:bg-primary-dark"
            >
              <Icon icon="fa:search" className="text-2xl" />
            </button>
          </form>
          <div className="searchResults">
            {searchResults?.length > 0 ? (
              searchResults?.map((blog) => (
                <div key={blog.id} onClick={handleClick}>
                  <div className={`block-card-search`}>
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
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
