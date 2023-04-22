import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogContext } from "../../context/BlogContext";

import PostModal from "../../components/modal/PostsModal";
import { toastContext } from "../../context/ToastContext";
import AddPostModal from "../../components/modal/AddPostsModal";

const AdminPosts = () => {
  const newPostTemplate = {
    title: "",
    content: "",
    date: new Date().toISOString(),
    image: "",
    googleMapsCoordinates: "",
    categoryId: "",
    };
  const { blogItems, setBlogItems, token } = useContext(blogContext);
  const { setToastStack } = useContext(toastContext);
  const [blogToEdit, setBlogToEdit] = useState();
  const [newBlog, setNewBlog] = useState(newPostTemplate);
  const [createBlog, setCreateBlog] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [categories, setCategories] = useState();
  const navigate = useNavigate();


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

  function onChange(e) {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogToEdit({ ...blogToEdit, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setBlogToEdit({ ...blogToEdit, [e.target.name]: e.target.value });
    }
  }

  function onNewChange(e) {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog({ ...newBlog, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
    }
  }

  function close() {
    setBlogToEdit();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://localhost:7191/api/Blogs/${blogToEdit?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(blogToEdit),
        }
      );
      if (res.status === 204) {
        setToastStack([{ type: "success", message: "Blog updated" }]);
        updateList();
        setBlogToEdit();
      } else {
        throw new Error();
      }
    } catch (error) {
      setToastStack([{ type: "error", message: error.message }]);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const res = await fetch("https://localhost:7191/api/Blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBlog),
      });
      const data = await res.json();
      if (res.status === 201) {
        setToastStack([{ type: "success", message: "Blog created" }]);
        updateList();
        setCreateBlog(false);
        setNewBlog(newPostTemplate);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setToastStack([{ type: "error", message: error.message }]);
    }
  }

  async function handleDelete() {
    try {
      const res = await fetch(`https://localhost:7191/api/Blogs/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 204) {
        setToastStack([{ type: "success", message: "Blog deleted" }]);
        setBlogItems(blogItems.filter((blog) => blog.id !== deleteId));
        setDeleteId();
      } else {
        throw new Error();
      }
    } catch (error) {
      setToastStack([{ type: "error", message: error.message }]);
    }
  }

  async function updateList() {
    const res = await fetch("https://localhost:7191/api/Blogs");
    const data = await res.json();
    setBlogItems(data.reverse());
  }

  useEffect(() => {
    async function getCategories() {
      const res = await fetch("https://localhost:7191/api/Categories");
      const data = await res.json();
      setCategories(data);
    }

    getCategories();

    return () => {};
  }, []);

  useEffect(() => {
    if (!blogItems) return;
  }, [blogItems]);

  return (
    <>
      <div
        className={`bg-primary dark:bg-primary-dark p-5 border rounded-lg ${
          blogToEdit ? "overflow-scroll" : ""
        }`}
      >
        <div className="flex items-center text-text dark:text-text-dark">
          <button className="" onClick={() => navigate("../")}>
            <Icon icon="ic:round-keyboard-arrow-left" className="text-4xl" />
          </button>
          <h2 className="text-4xl">Posts</h2>
          <div className="flex items-center justify-end grow">
            <button className="bg-primary dark:bg-primary-dark border border-text dark:border-text-dark rounded-lg p-2 hover:bg-green-500 dark:hover:bg-green-500" onClick={() => setCreateBlog(true)}>
              <Icon icon="ic:baseline-add" className="text-2xl" />
            </button>
            <h3 className="text-2xl">Add Post</h3>
          </div>
        </div>
        {blogItems?.map((blog) => (
          <div
            key={blog.id}
            className="grid lg:grid-cols-12 border border-text dark:border-text-dark rounded-lg p-5 my-5 gap-3 text-text dark:text-text-dark"
          >
            <img
              className="w-full aspect-square object-cover lg:col-span-3"
              src={blog.image}
              alt={blog.title}
            />
            <div className="lg:col-span-8">
              <h3 className="text-2xl">{blog.title}</h3>
              <p className="text-text/70 dark:text-text-dark/70 text-sm my-3 flex">
                {new Date(blog.date).toDateString()} | {blog.category.title}
              </p>
              <p className="text-text dark:text-text-dark after:content-['...']" dangerouslySetInnerHTML={{__html: setContent(blog.content)}} >
              </p>
            </div>
            <div className="flex lg:flex-col max-sm:justify-around gap-4 items-center my-auto">
              <div className="flex items-center">
                <button
                  className="bg-primary dark:bg-primary-dark hover:bg-blue-500 dark:hover:bg-blue-500 border border-text dark:border-text-dark rounded-lg p-2"
                  onClick={() => setBlogToEdit(blog)}
                >
                  <Icon icon="ic:baseline-edit" className="text-2xl" />
                </button>
              </div>
              <div className="flex items-center">
                <button
                  className="bg-primary dark:bg-primary-dark hover:bg-red-500 dark:hover:bg-red-500 border border-text dark:border-text-dark rounded-lg p-2"
                  onClick={() => setDeleteId(blog.id)}
                >
                  <Icon icon="ic:baseline-delete" className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {blogToEdit && (
          <PostModal
            _data={blogToEdit}
            _categories={categories}
            _onChange={onChange}
            _close={close}
            _submit={handleSubmit}
          />
        )}
        {createBlog ? (
          <AddPostModal
            _data={newBlog}
            _categories={categories}
            _onChange={onNewChange}
            _close={() => {setCreateBlog(false); setNewBlog(newPostTemplate);}}
            _submit={handleCreate}
          />
        ) : (
          <></>
        )}
      </div>
      {deleteId && (
        <div className="fixed inset-0 w-full h-full flex justify-center items-center bg-primary-dark/70 dark:bg-primary/70">
          <div className="bg-primary dark:bg-primary-dark p-5 border rounded-lg text-text dark:text-text-dark">
            <h2 className="text-4xl">Delete Post</h2>
            <p className="text-text dark:text-text-dark">
              Are you sure you want to delete this post?
            </p>
            <div className="flex justify-around">
              <div className="flex flex-col-reverse items-center justify-end grow">
                <button
                  className="bg-primary dark:bg-primary-dark border border-text dark:border-text-dark rounded-lg p-2 dark:hover:bg-blue-500 hover:bg-blue-500"
                  onClick={() => setDeleteId()}
                >
                  <Icon icon="ic:baseline-cancel" className="text-2xl" />
                </button>
                <h3 className="text-2xl">Cancel</h3>
              </div>
              <div className="flex flex-col-reverse items-center justify-end grow">
                <button
                  className="bg-primary dark:bg-primary-dark border border-text dark:border-text-dark rounded-lg p-2 dark:hover:bg-red-500 hover:bg-red-500"
                  onClick={handleDelete}
                >
                  <Icon icon="ic:baseline-delete" className="text-2xl" />
                </button>
                <h3 className="text-2xl">Delete</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPosts;
