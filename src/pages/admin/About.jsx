import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastContext } from "../../context/ToastContext";

const AdminAbout = () => {
  const [about, setAbout] = useState();
  const { setToastStack } = useContext(toastContext);

  const navigate = useNavigate();

  function handleChange(e) {
    setAbout({ ...about, [e.target.name]: e.target.value });
  }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const res = await fetch(`https://localhost:7191/api/Abouts/${about.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(about),
        });
        if (res.status === 204) {
            setToastStack([{type: "success", message: "About updated"}])
        } else {
            throw new Error();
        }
        } catch (error) {
            setToastStack([{type: "error", message: "Something went wrong"}])   
        }
    }

  useEffect(() => {
    async function getAbout() {
      const res = await fetch("https://localhost:7191/api/Abouts");
      const data = await res.json();
      setAbout(data[0]);
    }

    getAbout();
  }, []);
  return (
    <div className="bg-primary dark:bg-primary-dark border p-5 rounded-lg">
      <div className="flex gap-2 text-text dark:text-text-dark">
        <button className="" onClick={() => navigate("../")}>
          <Icon icon="ic:round-keyboard-arrow-left" className="text-4xl" />
        </button>
        <h2 className="text-4xl">About</h2>
      </div>
      <form className="pt-5 flex flex-col gap-5" onChange={handleChange} onSubmit={handleSubmit}>
        <textarea name="content" rows="20" defaultValue={about?.content}></textarea>
        <button
          type="submit"
          className="bg-blue-500 border rounded-lg p-2 px-5 text-text dark:text-text-dark hover:text-text-dark dark:hover:text-text w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AdminAbout;
