import { useContext, useState } from "react";
import { toastContext } from "../context/ToastContext";

const Contact = () => {
  const { setToastStack } = useContext(toastContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, email, content } = e.target.elements;
    if (!name.value || !email.value || !content.value) {
      setToastStack([
        { type: "error", message: "Please fill out all the fields" },
      ]);
      return;
    }
    const nameRegex = /^[a-zA-Z]{2,}$/;
    const emailRegex = /^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if (!nameRegex.test(name.value)) {
      setToastStack([{ type: "error", message: "Please enter a valid name" }]);
      return;
    }
    if (!emailRegex.test(email.value)) {
      setToastStack([{ type: "error", message: "Please enter a valid email" }]);
      return;
    }
    if (content.value.trim().length < 10) {
      setToastStack([
        { type: "error", message: "Please enter a valid message" },
      ]);
      return;
    }
    let details = {
      name: name.value,
      email: email.value,
      content: content.value,
    };
    try {
      const res = await fetch("https://localhost:7191/api/Messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      if (res.status === 201) {
        setToastStack([
          { type: "success", message: "Thank you for your message!" },
        ]);
        e.target.reset();
      } else {
        throw new Error("Something went wrong try again later");
      }
    } catch (error) {
      setToastStack([
        { type: "error", message: "Something went wrong try again later" },
      ]);
    }
  }

  async function emailSignup(e) {
    e.preventDefault();
    const { email } = e.target.elements;
    if (!email.value) {
      setToastStack([
        { type: "error", message: "Please enter a valid email address" },
      ]);
      return;
    }
    const emailRegex = /^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if (!emailRegex.test(email.value)) {
      setToastStack([{ type: "error", message: "Please enter a valid email" }]);
      return;
    }
    // Chack if email already exists
    try {
      const res = await fetch("https://localhost:7191/api/Newsletters");
      const data = await res.json();
      if (res.status === 200) {
        const exists = data.find((item) => item.email === email.value);
        if (exists) {
          setToastStack([
            { type: "error", message: "Email allready opt'in to newsletter" },
          ]);
          return;
        }
      } else {
        throw new Error("Something went wrong try again later");
      }
    } catch (error) {
      setToastStack([{ type: "error", message: error.message }]);
    }
    // Else add to database
    try {
      const res = await fetch("https://localhost:7191/api/Newsletters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.value }),
      });
      if (res.status === 201) {
        setToastStack([
          { type: "success", message: "Thank you for signing up!" },
        ]);
        e.target.reset();
      } else {
        throw new Error("Something went wrong try again later");
      }
    } catch (error) {
      setToastStack([
        { type: "error", message: "Something went wrong try again later" },
      ]);
    }
  }

  return (
    <>
      <div className="bg-primary dark:bg-primary-dark border p-6 rounded-lg">
        <h2 className="text-4xl text-text dark:text-text-dark">Get in touch</h2>
        <div className="text-base text-text dark:text-text-dark my-3">
          <p>
            Thank you for visiting my blog! If you have any questions, comments,
            or would like to work together on a project, please feel free to
            contact me using the form below. I'll do my best to get back to you
            as soon as possible.
          </p>
          <br />
          <p>
            I'm always happy to hear from fellow nature and wildlife
            enthusiasts, so don't hesitate to drop me a line. Let's connect and
            share our love for the natural World!
          </p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            pattern="^[a-zA-Z]{2,}$"
          />
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            pattern="^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$"
          />
          <label htmlFor="message">Message</label>
          <textarea
            name="content"
            rows="5"
            placeholder="Enter your message"
            required
            minLength={10}
          />
          <button
            type="submit"
            className="bg-text/50 dark:bg-text-dark/30 text-text-dark hover:text-text dark:text-text dark:hover:text-text-dark rounded-[5px] p-3 px-6 mt-4 w-fit block border border-primary-dark dark:border-primary"
          >
            Submit
          </button>
        </form>
      </div>
      <form
        className="bg-primary dark:bg-primary-dark border p-6 rounded-lg mt-8 flex flex-col gap-5"
        onSubmit={emailSignup}
      >
        <h2 className="text-4xl text-text dark:text-text-dark">
          Sign up for the newsletter
        </h2>
        <label className="flex items-center gap-2">
          <input
            type="email"
            placeholder="Enter your email address"
            name="email"
            required
            className="border rounded-lg p-3 flex-grow"
            pattern="^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$"
          />
          <button
            type="submit"
            className="bg-text/50 dark:bg-text-dark/30 text-text-dark hover:text-text dark:text-text dark:hover:text-text-dark rounded-[5px] p-3 px-6 w-fit border border-primary-dark dark:border-primary"
          >
            Submit
          </button>
        </label>
      </form>
    </>
  );
};

export default Contact;
