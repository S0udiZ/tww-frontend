import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="bg-primary dark:bg-primary-dark border p-5 rounded-lg">
      <h1 className="text-text dark:text-text-dark text-4xl">Dashboard</h1>
      <ul className="text-text dark:text-text-dark py-7 flex flex-col">
        <li className="text-lg flex flex-col">
            <Link to="posts">Posts →</Link>
            <Link to="categories">Categories →</Link>
            <Link to="about">About →</Link>
            <Link to="profile">Profile →</Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
