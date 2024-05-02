import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ MENU_ITEMS }) => {
  const location = useLocation();

  return (
    <ul className="flex flex-col gap-5 my-10">
      {MENU_ITEMS.map((item) => {
        return (
          <li
            key={item.name}
            className={`w-full flex justify-start items-center gap-4 hover:bg-orange-500 p-2 rounded-lg
            ${location.pathname === item.link ? "bg-orange-500" : ""}
            `}
          >
            {item.icon}
            <Link to={item.link} className="w-full text-lg font-semibold">
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;
