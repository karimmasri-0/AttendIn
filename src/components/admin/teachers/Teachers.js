import './Teachers.css';
import React from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddButton from '../AddButton';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Teachers = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [open, setOpen] = React.useState(false);
    const [teachers, setTeacher] = React.useState([]);
    const [teacherID, setTeacherID] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/users/delete/${teacherID}`, {
            headers: {
                "x-access-token": token
            }
        }).then((response) => {
            if (response.data.message === "User was deleted successfully!") {
                deleteNotify();
                setTeacher(teachers.filter((teacher) => teacher.id !== teacherID));
            } else if (response.data.message === "Not found User") {
                toast.error('Not found User', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }else {
                toast.error('Could not delete User.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }).catch((error) => {
            if (error.response.data.message === "Token expired") {
                localStorage.removeItem("token");
                window.location.reload();
                navigate('/');
            } else if (error.response.data.message === "Not Allowed") {
                localStorage.removeItem("token");
                window.location.reload();
                navigate('/');
            }
        })
        setOpen(false);
    };

    useEffect(() => {
        axios.get('http://localhost:8000/users/teachers', {
            headers: {
                "x-access-token": token
            }
        }).then((response) => {
            if (response.data.message === "Some error occurred while retrieving Teachers.") {
                toast.error('Some error occurred while retrieving Teachers.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (response.data.message === "Token expired") {
                localStorage.removeItem("token");
                window.location.reload();
            } else if (response.data.message === "Not Allowed") {
                localStorage.removeItem("token");
                window.location.reload();
            } else {
                setTeacher(response.data);
            }
        }).catch((error) => {
            if (error.response.data.message === "Token expired") {
                localStorage.removeItem("token");
                window.location.reload();
                navigate('/');
            } else if (error.response.data.message === "Not Allowed") {
                localStorage.removeItem("token");
                window.location.reload();
                navigate('/');
            }
        })
    }, [token]);

    const deleteNotify = () => toast.success('Teacher was deleted successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    return (
        <>
            <AddButton title="Add Teachers" path="/addteachers" />
            <div className='app' style={{ backgroundColor: '#FFFFFF' }}>
                <h2>All Teachers</h2>
                <br />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: '#9FA2B4' }}>Teachers FirstName</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }}>Teachers LastName</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }} align="right">Teachers Username</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }} align="right">Edit</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }} align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teachers.map((teacher) => (
                                <TableRow
                                    key={teacher.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {teacher.FirstName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {teacher.LastName}
                                    </TableCell>
                                    <TableCell align="right">{teacher.Username}</TableCell>
                                    <TableCell align="right">
                                        <Link to={`/editteachers/${teacher.id}`}>
                                            <i style={{ color: "#2C964A", fontSize: "22px" }} className="fa fa-pencil" aria-hidden="true"></i>
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        <i onClick={() => {
                                            handleClickOpen();
                                            setTeacherID(teacher.id);
                                        }} style={{ color: "red", fontSize: "22px", cursor: 'pointer' }} className="fa fa-trash" aria-hidden="true"></i>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this Teacher?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}
                        style={{ backgroundColor: 'red', color: "white" }}
                    >Cancel</Button>
                    <Button onClick={handleDelete} autoFocus
                        style={{ backgroundColor: '#2C964A', color: "white" }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Teachers;