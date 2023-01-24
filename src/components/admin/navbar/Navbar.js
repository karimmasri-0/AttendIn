import "./Navbar.css";
import avatar from "../../../assets/avatar.svg";
import { useLocation } from "react-router-dom";

const Navbar = ({ sidebarOpen, openSidebar}) => {
    const location = useLocation();
    let title = location.pathname.split('/')[1];
    if (title === '' || title === "addstudents" || title === "editstudents") {
        title = 'Students';
    } else if (title === 'teachers' || title === "addteachers" || title === "editteachers") {
        title = 'Teachers';
    } else if (title === 'rooms' || title === "addrooms" || title === "editrooms") {
        title = 'Rooms';
    } else if (title === 'roomreservation' || title === "addroomreservation" || title === "editroomreservation") {
        title = 'Room Reservation';
    } else {
        title = 'Students';
    }
    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={() => openSidebar()}>
                <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
            <div className="navbar__left">
                <h2>
                    {title}
                </h2>
            </div>
            <div className="navbar__right">
                <a href="#!">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </a>
                <a href="#!">
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                </a>
                <a href="#!">
                    <img className="admin__logo" width="30" src={avatar} alt="avatar" />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;