import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { themeContext } from "../../context/ThemeContext";
import { blogContext } from "../../context/BlogContext";
import SearchBar from "../searchbar/SearchBar";

const Nav = () => {
  const linksHolder = useRef();
  const linksHolder2 = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { theme, setTheme } = useContext(themeContext);
  const { token, setToken } = useContext(blogContext);

  useEffect(() => {
    let links = linksHolder.current.querySelectorAll("li");
    let links2 = linksHolder2.current.querySelectorAll("li");
    for (let link of links) {
      if (
        link.querySelector("a").getAttribute("href") ===
        window.location.pathname
      ) {
        link.classList.add("active-link");
      } else {
        link.classList.remove("active-link");
      }
    }
    for (let link of links2) {
      if (
        link.querySelector("a").getAttribute("href") ===
        window.location.pathname
      ) {
        link.classList.add("active-link");
      } else {
        link.classList.remove("active-link");
      }
    }
  }, []);

  function handleOnLinkClick(e) {
    let links = linksHolder.current.querySelectorAll("li");
    let links2 = linksHolder2.current.querySelectorAll("li");
    for (let link of links) {
      if (link === e.currentTarget) {
        link.classList.add("active-link");
      } else {
        link.classList.remove("active-link");
      }
    }
    for (let link of links2) {
      if (
        link.querySelector("a").getAttribute("href") ===
        window.location.pathname
      ) {
        link.classList.add("active-link");
      } else {
        link.classList.remove("active-link");
      }
    }
  }

  function switchTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  return (
    <header className="bg-primary dark:bg-primary-dark border-b">
      <nav className="container mx-auto lg:px-40 p-2 flex relative items-center">
        <Link to="/">
          <h1 className="lg:text-2xl text-xl text-text dark:text-text-dark">
            Tom's Wildlife Wanderlust
          </h1>
        </Link>
        {/* Desktop nav */}
        <ul
          className="grow flex justify-end gap-4 text-primary-dark/70 dark:text-primary/70 max-sm:hidden"
          ref={linksHolder}
        >
          <SearchBar />
          <li onClick={handleOnLinkClick}>
            <Link to="/" className="hover:text-text dark:hover:text-text-dark">
              Home
            </Link>
          </li>
          <li onClick={handleOnLinkClick}>
            <Link
              to="/categories"
              className="hover:text-text dark:hover:text-text-dark"
            >
              Categories
            </Link>
          </li>
          <li onClick={handleOnLinkClick}>
            <Link
              to="about"
              className="hover:text-text dark:hover:text-text-dark"
            >
              About
            </Link>
          </li>
          <li onClick={handleOnLinkClick}>
            <Link
              to="contact"
              className="hover:text-text dark:hover:text-text-dark"
            >
              Contact
            </Link>
          </li>
          <div>
            {token ? (
              <button
                className="hover:text-text dark:hover:text-text-dark"
                onClick={() => {
                  setToken();
                  localStorage.removeItem("token");
                }}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="hover:text-text dark:hover:text-text-dark"
              >
                Login
              </Link>
            )}
          </div>
          {token && (
            <div>
              <Link
                to="/admin"
                className="hover:text-text dark:hover:text-text-dark"
              >
                Admin
              </Link>
            </div>
          )}
        </ul>
        {/* Menu nav */}
        <div className="lg:hidden grow justify-end items-center flex">
          <SearchBar />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="aspect-square p-3"
          >
            <Icon
              icon="ant-design:menu-outlined"
              className="text-xl mx-auto text-text dark:text-text-dark"
            />
          </button>
          <ul
            className={`absolute right-0 top-full left-0 z-10 text-center text-gray-500 bg-primary dark:bg-primary-dark border-b ${
              !isMenuOpen ? "scale-y-0" : "scale-y-100"
            } origin-top overflow-hidden transition-all`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ref={linksHolder2}
          >
            <li className="py-3" onClick={handleOnLinkClick}>
              <Link
                to="/"
                className="hover:text-text dark:hover:text-text-dark"
              >
                Home
              </Link>
            </li>
            <li className="py-3" onClick={handleOnLinkClick}>
              <Link
                to="/categories"
                className="hover:text-text dark:hover:text-text-dark"
              >
                Categories
              </Link>
            </li>
            <li className="py-3" onClick={handleOnLinkClick}>
              <Link
                to="about"
                className="hover:text-text dark:hover:text-text-dark"
              >
                About
              </Link>
            </li>
            <li className="py-3" onClick={handleOnLinkClick}>
              <Link
                to="contact"
                className="hover:text-text dark:hover:text-text-dark"
              >
                Contact
              </Link>
            </li>
            <div className="py-3">
              {token ? (
                <button
                  className="hover:text-text dark:hover:text-text-dark"
                  onClick={() => {
                    setToken();
                    localStorage.removeItem("token");
                  }}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="hover:text-text dark:hover:text-text-dark"
                >
                  Login
                </Link>
              )}
            </div>
            {token && (
              <div className="py-3">
                <Link
                  to="/admin"
                  className="hover:text-text dark:hover:text-text-dark"
                >
                  Admin
                </Link>
              </div>
            )}
          </ul>
        </div>
        <div>
          <button onClick={switchTheme} className="p-2">
            {theme === "light" ? (
              <Icon
                icon="mdi:theme-light-dark"
                className="text-2xl mx-auto text-text dark:text-text-dark"
              />
            ) : (
              <Icon
                icon="mdi:theme-light-dark"
                className="text-2xl mx-auto text-text dark:text-text-dark"
              />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
