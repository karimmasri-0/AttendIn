import Auth from "./components/Auth/Auth";
import AdminSideBar from "./admin/components/AdminSideBar";
import TeacherNavBar from "./teacher/components/TeacherNavBar";
import Student from "./student";
import Students from "./admin/components/Students";
import Rooms from "./admin/components/Rooms";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/Auth/NavBar";
import Testnav from "./components/Auth/Testnav";
import Main from "./admin/components";
import AddStudent from "./admin/components/AddStudent";
import AddRoom from "./admin/components/AddRoom";
import NotFound from "./components/Auth/NotFound";

function App() {
  // const token = false;
  const token = true;
  const role = "admin";
  // const role = "teacher";
  // const role = "student";
  return (
    <div>
      {!token ? (
        <Auth />
      ) : role === "admin" ? (
        <>
          {/* <NavBar children={<Main />} /> */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/students" element={<Students />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* <Testnav /> */}
          {/* <AdminSideBar /> */}
        </>
      ) : role === "teacher" ? (
        <>
          <NavBar />
          <TeacherNavBar />
        </>
      ) : role === "student" ? (
        <>
          <NavBar />
          <Student />
        </>
      ) : null}
    </div>
  );
}

export default App;
