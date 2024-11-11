import { useClerk } from "@clerk/clerk-react";
import { Menu } from "lucide-react";
import { useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { dialog } from "../utils/handleDialog";

const Sidebar = () => {
  const drawerCheckboxRef = useRef(null);
  const { pathname } = useLocation();
  const { user } = useClerk();

  const routes = [
    {
      title: "All Tasks",
      path: "/",
    },
    {
      title: "Completed Tasks",
      path: "/completed",
    },
    {
      title: "Do It Now Tasks",
      path: "/not-completed",
    },
    {
      title: "Important Tasks",
      path: "/important",
    },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerCheckboxRef}
      />
      <div className="flex flex-col drawer-content bg-base-300">
        <nav className="flex items-center justify-between p-4 bg-base-100">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-circle swap swap-rotate lg:hidden"
          >
            <Menu />
          </label>
          <h1 className="hidden text-xl font-bold lg:inline">
            {pathname === "/completed"
              ? "Completed Tasks"
              : pathname === "/important"
              ? "Important Tasks"
              : pathname === "/not-completed"
              ? "Tasks Now"
              : "All Tasks"}
          </h1>
          <button className="capitalize btn" onClick={dialog(`Modal_Add`).open}>
            Add Task
          </button>
        </nav>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="grid content-between w-64 min-h-full p-2 bg-base-100">
          <ul className="flex flex-col gap-1 menu text-base-content">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  className={`cursor-pointer ${
                    pathname === route.path ? "bg-base-content/10" : ""
                  }`}
                >
                  {route.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 px-2">
            <UserButton />
            <span>{user?.fullName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
