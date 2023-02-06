import "./TeacherNavbar.css";
import avatar from "../../../assets/avatar.svg";

const TeacherNavbar = ({ sidebarOpen, openSidebar}) => {
    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={() => openSidebar()}>
                <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
            <div className="navbar__left">
                <h2>
                    Teacher Dashboard
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

export default TeacherNavbar;