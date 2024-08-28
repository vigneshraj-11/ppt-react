import React, { useState, useMemo, useRef, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import navItems from "./navItems.json";
import * as Icons from "lucide-react";
import "./layout.css";
import { Breadcrumb, Menu, Dropdown } from "antd";
import { PlaceholdersAndVanishInput } from "../../UIComponents/PlaceholdersAndVanishInput";

const Layout = ({ userRole, userName }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    `Hey ${userName}, type here`,
    "Navigate anywhere on Application",
  ];
  const searchInputRef = useRef(null);
  const location = useLocation();

  const [status, setStatus] = useState("active");

  const handleMenuClick = (e) => {
    setStatus(e.key);
  };

  const statusColor = {
    active: "bg-green-500",
    inactive: "bg-yellow-500",
    leave: "bg-red-500",
    outOfOffice: "bg-blue-500",
  }[status];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="active">Active</Menu.Item>
      <Menu.Item key="inactive" disabled>Inactive</Menu.Item>
      <Menu.Item key="leave" disabled>Leave</Menu.Item>
      <Menu.Item key="outOfOffice" disabled>Out of Office</Menu.Item>
    </Menu>
  );

  const handlePlaceholderChange = () => {
    setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
  };

  const [search, setSearch] = useState({});
  const [run, setRun] = useState(true);

  let typingTimer; // Timer identifier
  const typingDelay = 500; // Delay in milliseconds (adjust as needed)

  const handleChange = (e) => {
    clearTimeout(typingTimer); // Clear the previous timer
    const inputValue = e.target.value;
    setSearch(inputValue);
    typingTimer = setTimeout(() => {
      console.log(inputValue); // Log the full word after the delay
    }, typingDelay);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (search.toLowerCase().includes("dashboard")) {
      navigate("/app/dashboard");
    }
    if (
      search.toLowerCase().includes("doc") ||
      search.toLowerCase().includes("doc manage")
    ) {
      navigate("/app/document-details");
    }
    if (
      search.toLowerCase().includes("setting") ||
      search.toLowerCase().includes("profile")
    ) {
      navigate("/app/settings");
    }

    console.log("submitted");
  };

  useEffect(() => {
    const intervalId = setInterval(handlePlaceholderChange, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const filteredNavItems = useMemo(
    () => navItems.filter((item) => item.roles.includes(userRole)),
    [userRole]
  );

  // Find the current breadcrumb label based on the current path
  const currentNavItem = filteredNavItems.find((item) =>
    location.pathname.includes(item.path)
  );

  return (
    <>
      <div className="flex flex-row">
        <div
          className={`sidebar ${isExpanded ? "expanded" : "minimized"} fixed`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <div
            className="nav-item h-[60px]"
            style={{ borderBottom: "1px solid #c3c3c3", marginBottom: "10px" }}
          >
            <div className="icon-container">
              <Icons.Layers3 className="icon text-blue-500" />
            </div>
            <span className="text font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-orange-500">
              Project Support
            </span>
          </div>
          {filteredNavItems.map((item) => {
            const IconComponent = Icons[item.icon]; // Dynamically select the icon component

            return (
              <NavLink
                to={item.path}
                key={item.id}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""} `
                }
                style={{ fontSize: 14 }}
              >
                <div className="icon-container">
                  <IconComponent className="icon" /> {/* Render the icon */}
                </div>
                <span className="text">{item.label}</span>
              </NavLink>
            );
          })}
          <div
            className="nav-item"
            style={{
              position: "absolute",
              marginBottom: "10px",
              bottom: 0,
            }}
            onClick={handleLogout}
          >
            <div className="icon-container">
              <Icons.CircleChevronLeft className="icon text-red-500" />
            </div>
            <span className="text text-slate-500 font-semibold">Logout</span>
          </div>
        </div>
        <div className="main-content flex-grow">
          <div className={`search-container fixed mb-4`}>
            <h1 className="text-2xl p-1 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-orange-500 cursor-pointer ml-3">
              Project Support
            </h1>
            <input
              type="text"
              ref={searchInputRef}
              placeholder={placeholders[placeholderIndex]}
              className="search-input"
              onFocus={handlePlaceholderChange} // Change placeholder on focus
            />
            {/* <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            /> */}
            <div className={`flex flex-row ${isExpanded ? "mr-40" : ""}`}>
              <img
                src="https://www.ctdtechs.com/img/landingbanners/ctd%20logo.webp"
                alt="Logo"
                className="h-9 w-30 ml-2 mt-1 mr-5"
              />
              <div className="relative inline-block">
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  className="absolute top-0 left-0 mr-2"
                >
                  <div className="relative inline-block cursor-pointer">
                    <img
                      className="h-10 w-10 border rounded-full"
                      src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740"
                      // src="https://img.freepik.com/premium-photo/3d-avatar-cartoon-character_113255-94278.jpg?w=740"
                      alt="avatar"
                    />
                    <span
                      className={`absolute top-0 right-0 h-3 w-3 rounded-full border border-white ${statusColor}`}
                    />
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="p-5 border mt-20 border-slate-200 rounded-lg m-5 shadow-sm">
            <Breadcrumb
              items={[
                {
                  title: (
                    <>
                      <span className="text-gray-500">Project Support</span>
                    </>
                  ),
                },
                {
                  title: (
                    <>
                      <span className="text-blue-500 font-semibold cursor-pointer">
                        {currentNavItem ? currentNavItem.label : "Dashboard"}
                      </span>
                    </>
                  ),
                },
              ]}
            />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
