import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const [about, setAbout] = useState();

  function generateContent(content) {
    if (content.includes("<script")) {
      const beforeScript = content.split("<script")[0];
      const afterscript = content.split("</script>");
      content = beforeScript[0] + afterscript[1];
    }
    content = content
      .replaceAll(".</p>", "")
      .replaceAll(". </p>", "")
      .replaceAll("<p>", "");
    content = content.trim();
    const array = content.split(".");
    for (let i = 0; i < array.length - 1; i++) {
      array[i] = array[i].trim();
      if (array[i].startsWith("╗")) {
        array[i] = array[i].replace("╗", "");
        array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
        array[i] = "╗" + array[i];
      } else {
        array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
      }

      if (i % 2 != 0) {
        array[i] = array[i] + ". </p> <br />";
      } else {
        array[i] = "<p>" + array[i] + ". ";
      }
    }
    content = array.join(" ");
    return content;
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://localhost:7191/api/Abouts");
      const data = await res.json();
      setAbout(data);
    }

    fetchData();

    return () => {};
  }, []);
  return (
    <div className="bg-primary dark:bg-primary-dark border rounded-lg p-5">
      <h2 className="text-text dark:text-text-dark text-4xl">About me</h2>
      {about &&
        about?.map((about) => (
          <p
            dangerouslySetInnerHTML={{ __html: generateContent(about.content) }}
            className="text-base text-text dark:text-text-dark"
            key={about.id}
          ></p>
        ))}
      <Link to="/contact" className="bg-text/50 dark:bg-text-dark/30 text-text-dark hover:text-text dark:text-text dark:hover:text-text-dark rounded-lg p-3 px-5 mt-4 w-fit block">
          Get in touch
      </Link>
    </div>
  );
};

export default About;
