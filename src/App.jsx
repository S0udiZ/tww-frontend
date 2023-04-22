// Components
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import BlogDetail from "./pages/blogs/BlogDetail";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useContext } from "react";
import { blogContext } from "./context/BlogContext";
import Login from "./pages/Login";

// Admin
import Dashboard from "./pages/admin/Dashboard";
import AdminPosts from "./pages/admin/Posts";
import AdminProfile from "./pages/admin/Profile";
import AdminAbout from "./pages/admin/About";
import AdminCategories from "./pages/admin/Categories";

function App() {
  const { token } = useContext(blogContext);

  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="blogs" element={<Home />} />
      <Route path="blogs/:id" element={<BlogDetail />} />
      <Route path="categories" element={<Categories />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      {token && (
        <Route path="admin">
          <Route path="" element={<Dashboard />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="about" element={<AdminAbout />} />
        </Route>
      )}
      <Route
        path="*"
        element={
          <h2 className="text-8xl font-bold text-center text-text dark:text-text-dark">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 from-30% to-70% to-red-500">
              404
            </span>{" "}
            Not Found
          </h2>
        }
      />
    </Routes>
  );
}

export default App;
