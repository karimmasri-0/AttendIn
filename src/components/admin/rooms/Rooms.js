import './Rooms.css';
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
    roomDes,
    roomCap,
) {
    return { roomName, roomDes, roomCap };
}

const rows = [
    createData('Maths224', "Maths room", 25),
    createData('Phy151', "Physics room", 20),
    createData('Eng101', "English room", 15),
    createData('CSCI200', "Web room", 32),
    createData('Arab101', "Arabic room", 45),
    createData('CSCI390', "Web Advanced room", 23),
];

const Rooms = () => {
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
            <AddButton title="Add Rooms" path="/addrooms" />
            <div className='rooms' style={{ backgroundColor: '#FFFFFF' }}>
                <h2>All Rooms</h2>
                <br />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: '#9FA2B4' }}>Rooms Name</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }} align="right">Rooms Description</TableCell>
                                <TableCell style={{ color: '#9FA2B4' }} align="right">Rooms Capacity</TableCell>
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
                                    <TableCell align="right">{row.roomDes}</TableCell>
                                    <TableCell align="right">{row.roomCap}</TableCell>
                                    <TableCell align="right">
                                        <Link to="/editrooms">
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
                    {"Are you sure you want to delete this Room?"}
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

export default Rooms;