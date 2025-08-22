import { BiMessageAdd, BiUser } from "react-icons/bi";
import { FaBookOpen, FaCog, FaHome, FaPlusCircle } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuth } from "../slice/authSlice";
import { clearKB } from "../slice/kbSlice";
import { clearTicket } from "../slice/ticketSlice";
import { clearConfig } from "../slice/configSlice";
import { LuLogOut } from "react-icons/lu";

function Aside() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, user } = useSelector((state) => state.auth);

  const navItems = [
    {
      name: "Create Ticket",
      icon: <BiMessageAdd />,
      path: "/user/create-ticket",
    },
    { name: "All Tickets", icon: <FaTicket />, path: "/user/all-tickets" },
  ];

  const agentNav = [
    {
      name: "Triage",
      icon: <BiMessageAdd />,
      path: "/agent/triage",
    },
    { name: "Suggestions", icon: <FaTicket />, path: "/agent/suggestions/234" },
    { name: "Review", icon: <FaTicket />, path: "/agent/review" },
  ];

  const admin = [
    {
      name: "Config",
      icon: <FaCog />,
      path: "/admin/config",
    },
    {
      name: "KB List",
      icon: <FaBookOpen />,
      path: "/admin/all-kb",
    },
    {
      name: "Add KB",
      icon: <FaPlusCircle />,
      path: "/admin/add-new-kb",
    },
  ];

  async function clearStore() {
    await dispatch(clearAuth());
    await dispatch(clearKB());
    await dispatch(clearTicket());
    await dispatch(clearConfig());
    navigate("/login");
  }

  return (
    <aside className="h-full w-full border-r border-gray-200 shadow-sm">
      <div className="p-5 bg-slate-200 md:border-b md:h-[10%] md:px-6">
        <h4 className="text-lg font-semibold text-gray-800">Help Desk</h4>
      </div>

      <div className="flex flex-col gap-5 items-center md:items-start px-4 py-6 h-[90%]">
        <div className="w-full">
          <h5 className="hidden md:block text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            Navigation
          </h5>
          <ul className="flex flex-row justify-center md:w-full md:flex-col md:items-start md:space-y-1">
            {role === "user" &&
              navItems.map((item, i) => <NavItem item={item} key={i} />)}
            {role === "admin" &&
              admin.map((item, i) => <NavItem item={item} key={i} />)}
            {role === "agent" &&
              agentNav.map((item, i) => <NavItem item={item} key={i} />)}
          </ul>
        </div>

        <div className="w-full flex flex-row items-end gap-4 md:block md:mt-auto  md:pt-4">
          <div className="w-[50%] md:w-full py-1 flex items-center justify-center gap-3 bg-gray-300 md:px-3 md:py-2 rounded-lg md:mb-3">
            <span className="text-2xl">
              <BiUser className="text-sm" />
            </span>
            <div>
              <h6 className="font-semibold text-gray-800 text-sm">
                {user?.name}
              </h6>
              <span className="hidden md:block text-xs text-gray-500 ">
                {role}
              </span>
            </div>
          </div>
          <button
            onClick={clearStore}
            className="w-[50%] md:w-full py-1 flex items-center justify-center gap-2 md:px-3 md:py-2 text-sm font-medium border border-gray-200 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            <LuLogOut /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ item }) {
  const location = useLocation();
  return (
    <li key={item.path} className="md:w-full">
      <Link
        to={item.path}
        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${
                    location.pathname === item.path
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
      >
        {item.icon}
        <span>{item.name}</span>
      </Link>
    </li>
  );
}

export default Aside;
