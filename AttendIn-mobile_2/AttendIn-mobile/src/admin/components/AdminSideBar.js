import React from "react";
import { MdSchedule } from "react-icons/md";
import { BiSpreadsheet } from "react-icons/bi";
import { FaTh, FaUserAlt, FaChalkboardTeacher } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminSidebar = ({ children, open }) => {
  const sidebarItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />,
    },

    {
      path: "/students",
      name: "Students",
      icon: <FaUserAlt />,
    },
    {
      path: "/teachers",
      name: "Teachers",
      icon: <FaChalkboardTeacher />,
    },
    {
      path: "/rooms",
      name: "Reserve Room",
      icon: <MdSchedule />,
    },

    {
      path: "/attendance",
      name: "Attendance Sheet",
      icon: <BiSpreadsheet />,
    },
  ];
  return (
    <>
      <div className="sd-container">
        <div style={{ width: open ? "300px" : "50px" }} className="sidebar">
          {sidebarItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassname="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: open ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default AdminSidebar;
