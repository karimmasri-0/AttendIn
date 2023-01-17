import React from "react";
import { FaBars, FaUserCheck } from "react-icons/fa";

export default function Testnav() {
  return (
    <div>
      <div className="d-flex justify-content-between attendin-btn px-5 py-3 align-items-center">
        <div className="d-flex justify-content-center">
          <div className="nav-icon align-self-center pr-5">
            <FaBars
              size={20}
              // onClick={toggle}
            />
          </div>
          <h1>Attendin</h1>
        </div>
        <div className="">icon</div>
      </div>
    </div>
  );
}
