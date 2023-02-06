import './EditRooms.css';
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

const EditRooms = () => {
    const token = localStorage.getItem("token");
    const classes = useStyles();
    const navigate = useNavigate();
    const params = useParams();
    const [formValues, setFormValues] = useState({
        roomName: {
            value: '',
            error: false,
            errorMessage: 'You must enter a Room Name'
        },
        roomDescription: {
            value: '',
            error: false,
            errorMessage: 'You must enter a Room Description'
        },
        roomCapacity: {
            value: '',
            error: false,
            errorMessage: 'You must enter a Room Capacity'
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
        axios.get(`http://localhost:8000/rooms/${params.id}`,{
            headers: {
                "x-access-token": token
            }
        }).then((response) => {
            setFormValues({
                roomName: {
                    value: response.data.Name,
                    error: false,
                    errorMessage: 'You must enter a Room Name'
                },
                roomDescription: {
                    value: response.data.Description,
                    error: false,
                    errorMessage: 'You must enter a Room Description'
                },
                roomCapacity: {
                    value: response.data.Capacity,
                    error: false,
                    errorMessage: 'You must enter a Room Capacity'
                },
            })
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
    }, [token,params.id])

    const updateRoom = () => {
        axios.put(`http://localhost:8000/rooms/${params.id}`,{
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
            }else if(response.data.message === "Not found Room with id"){
                toast.error("Error updating Room with id", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }else if(response.data.message === "Token expired"){
                localStorage.removeItem("token");
                window.location.reload();
            }else if(response.data.message === "Not Allowed"){
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

    const updateNotify = () => toast.success('Room updated successfully!', {
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
        <div className="addStudents">
            <br />
            <Container className="container" >
                <form noValidate onSubmit={handleSubmit} >
                    <Typography
                        variant="h6">
                        Edit Rooms
                    </Typography>

                    <TextField
                        placeholder="Enter Room Name"
                        label="Room Name"
                        name="roomName"
                        variant="outlined"
                        className={classes.root}
                        fullWidth
                        required
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        value={formValues.roomName.value}
                        onChange={handleChange}
                        error={formValues.roomName.error}
                        helperText={formValues.roomName.error && formValues.roomName.errorMessage}
                    />
                    <TextField
                        placeholder="Enter Room Description"
                        label="Room Description"
                        name="roomDescription"
                        variant="outlined"
                        className={classes.root}
                        fullWidth
                        required
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        value={formValues.roomDescription.value}
                        onChange={handleChange}
                        error={formValues.roomDescription.error}
                        helperText={formValues.roomDescription.error && formValues.roomDescription.errorMessage}
                    />
                    <TextField
                        placeholder="Enter Room Capacity"
                        label="Room Capacity"
                        name="roomCapacity"
                        variant="outlined"
                        className={classes.root}
                        fullWidth
                        required
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        value={formValues.roomCapacity.value}
                        onChange={handleChange}
                        error={formValues.roomCapacity.error}
                        helperText={formValues.roomCapacity.error && formValues.roomCapacity.errorMessage}
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
                        onClick={updateRoom}
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

export default EditRooms;