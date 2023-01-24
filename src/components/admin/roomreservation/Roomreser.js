import './Roomreser.css';
import React from 'react';
import AddButton from '../AddButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';



function createData(
    roomName,
    coursesName,
    date,
    startTime,
    endTime,
) {
    return { roomName, coursesName, date, startTime, endTime };
}

const rows = [
    createData('Maths224', "Maths room", "25/2/2022", "10:00 AM", "12:00 PM"),
    createData('Phy151', "Physics room", "10/2/2022", "1:00 PM", "3:00 PM"),
    createData('Eng101', "English room", "25/1/2023", "9:00 AM", "12:00 PM"),
    createData('CSCI200', "Web room", "25/1/2023", "9:00 AM", "12:00 PM"),
    createData('Arab101', "Arabic room", "25/1/2023", "9:00 AM", "12:00 PM"),
    createData('CSCI390', "Web Advanced room", "25/1/2023", "9:00 AM", "12:00 PM"),
];

const Roomreser = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        console.log('Delete');
        setOpen(false);
    };
    return (
        <>
            <AddButton title="Add Roomreservation" path="/addroomreservation" />
            <div className='rooms' style={{ backgroundColor: '#FFFFFF' }}>
                <h2>All Roomreservation</h2>
                <br />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: '#9FA2B4' }}>Rooms Name</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }} align="right">Courses Name</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }} align="right">Date</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }} align="right">Start Time</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }} align="right">End Time</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }} align="right">Edit</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }} align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.roomName}
                                    </TableCell>
                                    <TableCell align="right">{row.coursesName}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">{row.startTime}</TableCell>
                                    <TableCell align="right">{row.endTime}</TableCell>
                                    <TableCell align="right">
                                        <Link to="/editroomreservation">
                                            <i style={{ color: "#75F94C", fontSize: "22px" }} class="fa fa-pencil" aria-hidden="true"></i>
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        <i onClick={handleClickOpen} style={{ color: "red", fontSize: "22px", cursor: 'pointer' }} class="fa fa-trash" aria-hidden="true"></i>
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
                    {"Are you sure you want to delete this Roomreservation?"}
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
        </>
    )
}

export default Roomreser;