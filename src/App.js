import Auth from "./components/Auth/Auth";
import AdminNavBar from "./admin/components/AdminNavBar";
import TeacherNavBar from "./teacher/components/TeacherNavBar";
import Student from "./student";
import Display from "./admin/components/Display";

import "./App.css";

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
          <AdminNavBar />
          <Display />
        </>
      ) : role === "teacher" ? (
        <>
          <TeacherNavBar />
        </>
      ) : role === "student" ? (
        <>
          <Student />
        </>
      ) : null}
    </div>
  );
}

export default App;
