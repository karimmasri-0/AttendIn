import './Rooms.css';
import { useEffect } from 'react';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import AddButton from '../AddButton';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Rooms = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [open, setOpen] = React.useState(false);
    const [rooms, setRooms] = React.useState([]);
    const [roomsID, setRoomsID] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        axios.delete(`http://${process.env.REACT_APP_SERVER_NAME}:8000/rooms/${roomsID}`, {
            headers: {
                "x-access-token": token
            }
        }).then((response) => {
            if (response.data.message === "Room was deleted successfully!") {
                deleteNotify();
                setRooms(rooms.filter((student) => student.id !== roomsID));
            }else {
                toast.error('Could not delete Room with id!', {
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
            console.log(error.response.data.message);
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
        axios.get(`http://${process.env.REACT_APP_SERVER_NAME}:8000/rooms`, {
            headers: {
                "x-access-token": token
            }
        }).then((response) => {
            if (response.data.message === "Token expired") {
                localStorage.removeItem("token");
                window.location.reload();
            } else if (response.data.message === "Not Allowed") {
                localStorage.removeItem("token");
                window.location.reload();
            } else {
                setRooms(response.data);
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

    const deleteNotify = () => toast.success('Room was deleted successfully!', {
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
            <AddButton title="Add Rooms" path="/addrooms" />
            <div className='rooms' style={{ backgroundColor: '#FFFFFF' }}>
                <h2>All Rooms</h2>
                <br />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: '#9FA2B4' }}>Rooms Name</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }}>Rooms Description</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }} align="right">Rooms Capacity</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }} align="right">Edit</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }} align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rooms.map((room) => (
                                <TableRow
                                    key={room.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {room.Name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {room.Description}
                                    </TableCell>
                                    <TableCell align="right">{room.Capacity}</TableCell>
                                    <TableCell align="right">
                                        <Link to={`/editrooms/${room.id}`}>
                                            <i style={{ color: "#2C964A", fontSize: "22px" }} className="fa fa-pencil" aria-hidden="true"></i>
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        <i onClick={() => {
                                            handleClickOpen();
                                            setRoomsID(room.id);
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
                    {"Are you sure you want to delete this room?"}
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

export default Rooms;