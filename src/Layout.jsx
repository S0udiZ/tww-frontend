import AboutCard from "./components/aboutCard/AboutCard";
import Nav from "./components/nav/Nav";
import Toast from "./components/toast/Toaster";

const Layout = ({ children }) => {
  return (
    <div className="bg-secondary dark:bg-secondary-dark min-h-screen">
      <Nav />
      <div className="container mx-auto grid grid-cols-12 lg:gap-8 gap-4 py-8 lg:px-40 max-sm:p-4 h-fit relative">
        <div className="lg:col-span-3 col-span-full max-sm:hidden">
          <AboutCard className="w-full bg-primary dark:bg-primary-dark rounded-lg border sticky top-8" />
        </div>
        <div className="lg:col-span-9 col-span-full w-full">{children}</div>
        <AboutCard className="lg:col-span-3 col-span-full w-full bg-primary dark:bg-primary-dark rounded-lg border lg:hidden" />
      </div>
      <Toast />
    </div>
  );
};

export default Layout;
