import { useContext } from "react";
import { toastContext } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { blogContext } from "../context/BlogContext";

const Login = () => {
  const { setToastStack } = useContext(toastContext);
  const { setToken } = useContext(blogContext);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;
    if (!email.value || !password.value) {
      setToastStack([
        { type: "error", message: "Please fill out all the fields" },
      ]);
      return;
    }
    const emailRegex = /^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if (!emailRegex.test(email.value)) {
      setToastStack([{ type: "error", message: "Please enter a valid email" }]);
      return;
    }
    if (password.value.trim().length < 1) {
      setToastStack([
        { type: "error", message: "Please enter a valid password" },
      ]);
      return;
    }
    let details = {
      email: email.value,
      password: password.value,
    };
    try {
      const res = await fetch("https://localhost:7191/api/Login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setToastStack([{ type: "success", message: "Logged in" }]);
        e.target.reset();
        navigate("/");
      } else {
        throw new Error();
      }
    } catch (error) {
      setToastStack([{ type: "error", message: "Wrong password and email" }]);
    }
  }
  return (
    <div className="bg-primary dark:bg-primary-dark border rounded-lg p-5">
      <h2 className="text-4xl font-bold text-text dark:text-text-dark">
        Login
      </h2>
      <form className="flex flex-col gap-5 py-5" onSubmit={handleSubmit}>
        <label htmlFor="email" className="flex flex-col">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            required
            pattern="^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$"
            className="border rounded-lg p-2"
          />
        </label>
        <label htmlFor="password" className="flex flex-col">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
            minLength={1}
            className="border rounded-lg p-2"
          />
        </label>
        <button className="bg-blue-500 text-white rounded-lg p-3 px-6 w-fit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
