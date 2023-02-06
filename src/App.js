import { Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import { useEffect, useState } from 'react';
import Navbar from './components/admin/navbar/Navbar';
import Sidebar from './components/admin/sidebar/Sidebar';
import Students from './components/admin/students/Students';
import Teachers from './components/admin/teachers/Teachers';
import Rooms from './components/admin/rooms/Rooms';
import Roomreser from './components/admin/roomreservation/Roomreser';
import AddStudents from './components/admin/Add/addStudents/AddStudents';
import AddTeachers from './components/admin/Add/addTeachers/AddTeachers';
import AddRooms from './components/admin/Add/addRooms/AddRooms';
import AddRoomreser from './components/admin/Add/addRoomreser/AddRoomreser';
import EditStudents from './components/admin/Edit/EditStudents/EditStudents';
import EditTeachers from './components/admin/Edit/EditTeachers/EditTeachers';
import EditRooms from './components/admin/Edit/EditRooms/EditRooms';
import EditRoomreser from './components/admin/Edit/EditRoomreservation/EditRoomreser';
import TeacherNavbar from './components/teachers/navbar/TeacherNavbar';
import TeacherSidebar from './components/teachers/sidebar/TeacherSidebar';
import TeacherDashboard from './components/teachers/TeacherDashboard';
import Monitoring from './components/admin/monitoring/Monitoring';
import jwt_decode from "jwt-decode";
import './App.css';

function App() {
  const [token, setToken] = useState();
  const [role, setRole] = useState()
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    if (token) {
      const decoded = jwt_decode(token);
      setRole(decoded.Role);
    }
  }, [token]);


  return (
    <>
      {
        token ? ( role === 0 ? (
          <div className='container'>
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
            <Routes>
              <Route path="/" element={<Students />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/roomreservation" element={<Roomreser />} />
              <Route path="/addstudents" element={<AddStudents />} />
              <Route path="/addteachers" element={<AddTeachers />} />
              <Route path="/addrooms" element={<AddRooms />} />
              <Route path="/addroomreservation" element={<AddRoomreser />} />
              <Route path="/editstudents/:id" element={<EditStudents />} />
              <Route path="/editteachers/:id" element={<EditTeachers />} />
              <Route path="/editrooms/:id" element={<EditRooms />} />
              <Route path="/editroomreservation/:id" element={<EditRoomreser />} />
            </Routes>
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
          </div>
        ): role === 1 ? (
          <div className='container'>
            <TeacherNavbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
            <Routes>
              <Route path="/" element={<TeacherDashboard />} />
            </Routes>
            <TeacherSidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
          </div>
        ): null ) : (
          <Routes>
            <Route path="/" exact element={<Login />} />
          </Routes>
        )
      }
    </>
  );
}

export default App;
