import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastContext } from "../../context/ToastContext";

const AdminProfile = () => {
  const [profile, setProfile] = useState();
  const {setToastStack} = useContext(toastContext)

  const navigate = useNavigate();

  function handleChange(e) {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
        const res = await fetch(`https://localhost:7191/api/Profiles/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(profile),
    });
    if (res.status === 204) {
        setToastStack([{type: "success", message: "Profile updated"}])
    } else {
        throw new Error();
    }
    } catch (error) {
        setToastStack([{type: "error", message: "Something went wrong"}])   
    }
  }

  useEffect(() => {
    async function getProfile() {
      const res = await fetch("https://localhost:7191/api/Profiles");
      const data = await res.json();
      setProfile(data[0]);
    }

    getProfile();
  }, []);

  return (
    <div className="bg-primary dark:bg-primary-dark border rounded-lg p-5">
      <div className="flex gap-2 text-text dark:text-text-dark">
        <button className="" onClick={() => navigate("../")}>
          <Icon icon="ic:round-keyboard-arrow-left" className="text-4xl" />
        </button>
        <h2 className="text-4xl">Profile</h2>
      </div>
      <form className="grid lg:grid-cols-12 py-5 gap-5" onChange={handleChange} onSubmit={handleSubmit}>
        <div className="lg:col-span-4 relative group rounded-full overflow-hidden h-fit">
          <img
            src={profile?.image}
            className="w-full aspect-square object-cover"
            alt=""
          />
          <div className="absolute inset-0 opacity-0 hover:opacity-70 bg-primary dark:bg-primary-dark group-hover:opacity-70 flex justify-center items-center">
            <p className="text-2xl">Change Image</p>
          </div>
          <input type="file" name="image" className="absolute inset-0 opacity-0 cursor-pointer" />
        </div>
        <div className="col-span-8 flex justify-end items-start max-sm:hidden text-text dark:text-text-dark">
            <button type="submit">
                <Icon icon="ic:round-save" className="text-4xl text-text- dark-text-text-dark hover:text-blue-500 dark:hover:text-blue-500" />
            </button>
        </div>
        <textarea
          name="content"
          rows="10"
          defaultValue={profile?.content}
          className="lg:col-span-full"
        ></textarea>
        <button type="submit" className="p-2 px-5 bg-blue-500 text-text dark:text-text-dark hover:text-text-dark dark:hover:text-text rounded-lg border lg:hidden">Save</button>
      </form>
    </div>
  );
};

export default AdminProfile;
