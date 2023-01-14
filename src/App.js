import Auth from "./components/Auth/Auth";
import AdminSideBar from "./admin/components/AdminSideBar";
import TeacherNavBar from "./teacher/components/TeacherNavBar";
import Student from "./student";
import Display from "./admin/components/Display";

import "./App.css";
import { NavBar } from "./components/Auth/NavBar";

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
          <NavBar />
          {/* <AdminSideBar /> */}
          <Display />
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
