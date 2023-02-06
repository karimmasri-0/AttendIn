import './EditRoomreser.css';
import TextField from '@mui/material/TextField';
import { Button, Container, Typography } from '@mui/material';
import { KeyboardArrowRight } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const useStyles = makeStyles({
    root: {
        // input label when focused
        "& label.Mui-focused": {
            color: "#3ea175"
        },
        // focused color for input with variant='standard'
        "& .MuiInput-underline:after": {
            borderBottomColor: "#3ea175"
        },
        // focused color for input with variant='filled'
        "& .MuiFilledInput-underline:after": {
            borderBottomColor: "#3ea175"
        },
        // focused color for input with variant='outlined'
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#3ea175"
            }
        }
    }
});

const EditRoomreser = () => {
    const token = localStorage.getItem("token");
    const classes = useStyles();
    const navigate = useNavigate();
    const params = useParams();
    const [formValues, setFormValues] = useState({
        room: {
            value: '',
            error: false,
            errorMessage: 'You must enter a Room Name'
        },
        course: {
            value: '',
            error: false,
            errorMessage: 'You must enter a Course Name'
        },
        date: {
            value: '',
            error: false,
            errorMessage: 'You must enter a Date'
        },
        startTime: {
            value: '',
            error: false,
            errorMessage: 'You must enter a Start Time'
        },
        endTime: {
            value: '',
            error: false,
            errorMessage: 'You must enter a End Time'
        },
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: {
                ...formValues[name],
                value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formFields = Object.keys(formValues);
        let newFormValues = { ...formValues }

        for (let index = 0; index < formFields.length; index++) {
            const currentField = formFields[index];
            const currentValue = formValues[currentField].value;

            if (currentValue === '') {
                newFormValues = {
                    ...newFormValues,
                    [currentField]: {
                        ...newFormValues[currentField],
                        error: true
                    }
                }
            }

        }
        setFormValues(newFormValues)
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/roomReservations/${params.id}`, {
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
                setFormValues({
                    room: {
                        value: response.data.Room,
                        error: false,
                        errorMessage: 'You must enter a Room Name'
                    },
                    course: {
                        value: response.data.Course,
                        error: false,
                        errorMessage: 'You must enter a Course Name'
                    },
                    date: {
                        value: response.data.Date,
                        error: false,
                        errorMessage: 'You must enter a Date'
                    },
                    startTime: {
                        value: response.data.STime,
                        error: false,
                        errorMessage: 'You must enter a Start Time'
                    },
                    endTime: {
                        value: response.data.ETime,
                        error: false,
                        errorMessage: 'You must enter a End Time'
                    },
                })
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
    }, [token, params.id])

    const updateRoomreser = () => {
        axios.put(`http://localhost:8000/roomReservations/${params.id}`, {
            Name: formValues.roomName.value,
            Description: formValues.roomDescription.value,
            Capacity: formValues.roomCapacity.value,
        }, {
            headers: {
                "x-access-token": token
            }
        }).then((response) => {
            if (response.data.id) {
                updateNotify();
                setTimeout(() => {
                    navigate('/rooms')
                }, 2000)
            } else if (response.data.message === "Not found Room with id") {
                toast.error("Error updating Roomreservation with id", {
                    position: "top-right",
                    autoClose: 1000,
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
    }

    const updateNotify = () => toast.success('Roomreservation updated successfully!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    return (
        <div className="addRoomreser">
            <br />
            <Container className="container" >
                <form noValidate onSubmit={handleSubmit} >
                    <Typography
                        variant="h6">
                        Edit Room Reservation
                    </Typography>

                    <TextField
                        placeholder="Enter Room Name"
                        label="Room Name"
                        name="room"
                        variant="outlined"
                        className={classes.root}
                        fullWidth
                        required
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        value={formValues.room.value}
                        onChange={handleChange}
                        error={formValues.room.error}
                        helperText={formValues.room.error && formValues.room.errorMessage}
                    />
                    <TextField
                        placeholder="Enter Course Name"
                        label="Course Name"
                        name="course"
                        variant="outlined"
                        className={classes.root}
                        fullWidth
                        required
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        value={formValues.course.value}
                        onChange={handleChange}
                        error={formValues.course.error}
                        helperText={formValues.course.error && formValues.course.errorMessage}
                    />
                    <TextField
                        placeholder="Enter Date"
                        label="Date"
                        name="date"
                        variant="outlined"
                        className={classes.root}
                        fullWidth
                        required
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        value={formValues.date.value}
                        onChange={handleChange}
                        error={formValues.date.error}
                        helperText={formValues.date.error && formValues.date.errorMessage}
                    />
                    <TextField
                        placeholder="Enter Start Time"
                        label="Start Time"
                        name="startTime"
                        variant="outlined"
                        className={classes.root}
                        fullWidth
                        required
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        value={formValues.startTime.value}
                        onChange={handleChange}
                        error={formValues.startTime.error}
                        helperText={formValues.startTime.error && formValues.startTime.errorMessage}
                    />
                    <TextField
                        placeholder="Enter End Time"
                        label="End Time"
                        name="endTime"
                        variant="outlined"
                        className={classes.root}
                        fullWidth
                        required
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        value={formValues.endTime.value}
                        onChange={handleChange}
                        error={formValues.endTime.error}
                        helperText={formValues.endTime.error && formValues.endTime.errorMessage}
                    />

                    <Button
                        type="submit"
                        variant="outlined"
                        style={{
                            width: '100%',
                            marginTop: '10px',
                            backgroundColor: '#2C964A',
                            color: 'white',
                        }}
                        endIcon={<KeyboardArrowRight />}
                        onClick={updateRoomreser}
                    >
                        Edit
                    </Button>
                </form>
            </Container>
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
        </div>
    )
}

export default EditRoomreser;