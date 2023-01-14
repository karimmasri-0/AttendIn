import React from "react";
import { useState } from "react";
import { FaBars, FaUserCheck } from "react-icons/fa";
import SideBar from "./SideBar";
export const NavBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <div
        className="nav-left"
        style={{
          width: isOpen ? "300px" : "0px",
          paddingLeft: isOpen ? "20px" : "0px",
          display: isOpen ? "flex" : "none",
        }}
      >
        <h1 className="logo">Attendin</h1>
        <FaUserCheck size={30} className="my-1 ms-2" />
      </div>
      <div
        className="nav-right"
        style={{ paddingLeft: isOpen ? "300px" : "15px" }}
      >
        <div className="nav-icon">
          <FaBars size={20} onClick={toggle} />
        </div>
        <div className="nav-links">
          <img  src={require("../assets/admin.png")}  width={40}  height={40} className="admin-logo" />
          <span className="ms-3">Administrator</span>
        </div>
      </div>

      <SideBar open={isOpen} children={children} />
    </>
  );
};
