import { createContext, useEffect, useState } from "react";

export const themeContext = createContext();

const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme])

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <main className={theme}>{children}</main>
    </themeContext.Provider>
  );
};

export default ThemeContext;
