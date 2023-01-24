import { Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import { useState } from 'react';
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
import './App.css';

function App() {
  const [logged, setLogged] = useState(true);
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <>
      {
        logged ? (
          <div className='container'>
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar}/>
            <Routes>
              <Route path="/" element={<Students />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/roomreservation" element={<Roomreser />} />
              <Route path="/addstudents" element={<AddStudents />} />
              <Route path="/addteachers" element={<AddTeachers />} />
              <Route path="/addrooms" element={<AddRooms />} />
              <Route path="/addroomreservation" element={<AddRoomreser />} />
              <Route path="/editstudents" element={<EditStudents />} />
              <Route path="/editteachers" element={<EditTeachers />} />
              <Route path="/editrooms" element={<EditRooms />} />
              <Route path="/editroomreservation" element={<EditRoomreser />} />
            </Routes>
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
          </div>
        ) : (
          <Routes>
            <Route path="/" exact element={<Login />} />
          </Routes>
        )

      }
    </>
  );
}

export default App;
