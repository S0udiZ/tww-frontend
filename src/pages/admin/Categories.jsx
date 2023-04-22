import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastContext } from "../../context/ToastContext";

const AdminCategories = () => {
  const [categories, setCategories] = useState();
  const [editCategory, setEditCategory] = useState();
  const [deleteCategory, setDeleteCategory] = useState();
  const { setToastStack } = useContext(toastContext);

  const navigate = useNavigate();

  async function addCategory(e) {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7191/api/Categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: e.target.title.value }),
      });
      const data = await response.json();
      if (response.status === 201) {
        setToastStack([{ type: "success", message: "Category created" }]);
        setCategories([...categories, data]);
        e.target.reset();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setToastStack([{ type: "error", message: error.message }]);
    }
  }

  async function handleEditCategory(e) {
    e.preventDefault();
    try {
      const data = {
        id: editCategory.id,
        title: e.target.title.value,
      }
      const res = await fetch(
        `https://localhost:7191/api/Categories/${editCategory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (res.status === 204) {
        setToastStack([{ type: "success", message: "Category updated" }]);
        setCategories(
          categories.map((category) =>
            category.id === editCategory.id ? data : category
          )
        );
        setEditCategory();
      } else {
        throw new Error();
      }
    } catch (error) {
      setToastStack([{ type: "error", message: "Something went wrong" }]);
    }
  }

  async function handleDeleteCategory() {
    try {
      const res = await fetch(
        `https://localhost:7191/api/Categories/${deleteCategory}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 204) {
        setToastStack([{ type: "success", message: "Category deleted" }]);
        setCategories(
          categories.filter((category) => category.id !== deleteCategory)
        );
        setDeleteCategory();
      } else {
        throw new Error();
      }
    } catch (error) {
      setToastStack([{ type: "error", message: "Something went wrong" }]);
    }
  }

  useEffect(() => {
    async function getCategories() {
      const response = await fetch("https://localhost:7191/api/Categories");
      const data = await response.json();
      setCategories(data);
    }

    getCategories();
  }, []);

  return (
    <div className="bg-primary dark:bg-primary-dark text-text dark:text-text-dark p-5 rounded-lg border flex flex-col gap-5">
      <div className="flex gap-2 pr-3.5">
        <button className="" onClick={() => navigate("../")}>
          <Icon icon="ic:round-keyboard-arrow-left" className="text-4xl" />
        </button>
        <h2 className="text-4xl">About</h2>
      </div>
      <div className="flex flex-col gap-2">
        {categories &&
          categories.map((category) => (
            <div
              className="border border-text dark:border-text-dark text-4xl flex justify-between items-center p-3 rounded-lg"
              key={category.id}
            >
              <p>{category.title}</p>
              <div className="flex flex-col gap-2">
                <button onClick={() => setEditCategory(category)}>
                  <Icon
                    icon="ic:baseline-edit"
                    className="text-4xl hover:bg-blue-500 dark:hover:bg-blue-500 border border-text dark:border-text-dark rounded-lg p-2"
                  />
                </button>
                <button onClick={() => setDeleteCategory(category.id)}>
                  <Icon
                    icon="ic:baseline-delete"
                    className="text-4xl hover:bg-red-500 dark:hover:bg-red-500 border border-text dark:border-text-dark rounded-lg p-2"
                  />
                </button>
              </div>
            </div>
          ))}
      </div>
      {/* Create Category */}
      <div className="border border-text dark:border-text-dark text-4xl flex flex-col gap-2 p-3 rounded-lg">
        <form onSubmit={addCategory} className="flex gap-3 items-center">
          <input
            type="text"
            name="title"
            placeholder="Category Title"
            className="grow"
          />
          <div className="">
            <button
              type="submit"
              className="bg-green-500 dark:bg-green-500 border border-text dark:border-text-dark rounded-lg p-4 hover:bg-green-500 dark:hover:bg-green-500 h-fit"
            >
              <Icon icon="ic:baseline-add" className="text-2xl" />
            </button>
          </div>
        </form>
      </div>
      {/* Edit Modal */}
      {editCategory && (
        <div className="fixed inset-0 flex justify-center items-center bg-primary-dark/70 dark:bg-primary/70 z-10">
          <div className="bg-primary dark:bg-primary-dark text-text dark:text-text-dark p-5 rounded-lg border flex flex-col gap-5">
            <form onSubmit={handleEditCategory}>
              <input
                type="text"
                name="title"
                defaultValue={editCategory.title}
                className="text-4xl"
              />
              <div className="flex justify-around">
                <button type="submit" className="p-2">
                  <Icon
                    icon="ic:baseline-save"
                    className="text-4xl border border-text dark:border-text-dark rounded-lg hover:bg-blue-500 dark:hover:bg-blue-500 text-text dark:text-text-dark"
                  />
                </button>
                <button
                  type="button"
                  className="p-2"
                  onClick={() => setEditCategory()}
                >
                  <Icon
                    icon="ic:baseline-close"
                    className="text-4xl border border-text dark:border-text-dark rounded-lg hover:bg-red-500 dark:hover:bg-red-500 text-text dark:text-text-dark"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Modal */}
      {deleteCategory && (
        <div className="fixed inset-0 flex justify-center items-center bg-primary-dark/70 dark:bg-primary/70 z-10">
          <div className="bg-primary dark:bg-primary-dark text-text dark:text-text-dark p-5 rounded-lg border flex flex-col gap-5">
            <p className="text-4xl">
              Are you sure you want to delete this category?
            </p>
            <div className="flex justify-around">
              <button className="p-2" onClick={handleDeleteCategory}>
                <Icon
                  icon="ic:baseline-check"
                  className="text-4xl border border-text dark:border-text-dark rounded-lg hover:bg-red-500 dark:hover:bg-red-500 text-text dark:text-text-dark"
                />
              </button>
              <button className="p-2" onClick={() => setDeleteCategory()}>
                <Icon
                  icon="ic:baseline-close"
                  className="text-4xl border border-text dark:border-text-dark rounded-lg hover:bg-blue-500 dark:hover:bg-blue-500 text-text dark:text-text-dark"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
