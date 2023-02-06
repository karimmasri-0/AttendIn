import './EditStudents.css';
import TextField from '@mui/material/TextField';
import { Button, Container, Typography } from '@mui/material';
import { KeyboardArrowRight } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
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

const EditStudents = () => {
    const token = localStorage.getItem("token");
    const classes = useStyles();
    const navigate = useNavigate();
    const params = useParams();
    const [formValues, setFormValues] = useState({
        firstName: {
            value: '',
            error: false,
            errorMessage: 'You must enter a firstName'
        },
        middleName: {
            value: '',
            error: false,
            errorMessage: 'You must enter a middleName'
        },
        lastName: {
            value: '',
            error: false,
            errorMessage: 'You must enter a LastName'
        },
        username: {
            value: '',
            error: false,
            errorMessage: 'You must enter an username'
        },
        newPassword: {
            value: '',
            error: false,
            errorMessage: 'You must enter a new password'
        },
        role: {
            value: 0,
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
        axios.get(`http://localhost:8000/users/students/${params.id}`,{
            headers: {
                "x-access-token": token
            }
        }).then((response) => {
            setFormValues({
                firstName: {
                    value: response.data.FirstName,
                    error: false,
                    errorMessage: 'You must enter a firstName'
                },
                middleName: {
                    value: response.data.MiddleName,
                    error: false,
                    errorMessage: 'You must enter a middleName'
                },
                lastName: {
                    value: response.data.LastName,
                    error: false,
                    errorMessage: 'You must enter a LastName'
                },
                username: {
                    value: response.data.Username,
                    error: false,
                    errorMessage: 'You must enter an username'
                },
                newPassword: {
                    value: "",
                    error: false,
                    errorMessage: 'You must enter an password'
                }
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
    }, [token, params.id])

    const updateStudent = () => {
        axios.put(`http://localhost:8000/users/students/update/${params.id}`,{
            FirstName: formValues.firstName.value,
            MiddleName: formValues.middleName.value,
            LastName: formValues.lastName.value,
            Username: formValues.username.value,
            Password: formValues.newPassword.value,
        }, {
                headers: {
                    "x-access-token": token
                }
        }).then((response) => {
            if (response.data.id) {
                updateNotify();
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            }else if(response.data.message === `Not found student with id ${
                jwt_decode(token).id
            }.`){
                toast.error(`Error updating Student with id ${
                    jwt_decode(token).id
                }`, {
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

    const updateNotify = () => toast.success('Student updated successfully!', {
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
                        Edit Students
                    </Typography>

                    <TextField
                        placeholder="Enter FirstName"
                        label="FirstName"
                        name="firstName"
                        variant="outlined"
                        className={classes.root}
                        fullWidth
                        required
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        value={formValues.firstName.value}
                        onChange={handleChange}
                        error={formValues.firstName.error}
                        helperText={formValues.firstName.error && formValues.firstName.errorMessage}
                    />
                    <TextField
                        placeholder="Enter MiddleName"
                        label="MiddleName"
                        name="middleName"
                        variant="outlined"
                        className={classes.root}
                        fullWidth
                        required
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        value={formValues.middleName.value}
                        onChange={handleChange}
                        error={formValues.middleName.error}
                        helperText={formValues.middleName.error && formValues.middleName.errorMessage}
                    />
                    <TextField
                        placeholder="Enter LastName"
                        label="LastName"
                        name="lastName"
                        variant="outlined"
                        className={classes.root}
                        fullWidth
                        required
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        value={formValues.lastName.value}
                        onChange={handleChange}
                        error={formValues.lastName.error}
                        helperText={formValues.lastName.error && formValues.lastName.errorMessage}
                    />
                    <TextField
                        placeholder="Enter username"
                        label="Username"
                        name="username"
                        variant="outlined"
                        className={classes.root}
                        fullWidth
                        required
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        value={formValues.username.value}
                        onChange={handleChange}
                        error={formValues.username.error}
                        helperText={formValues.username.error && formValues.username.errorMessage}
                    />
                    <TextField
                        placeholder="Enter New Password"
                        label="New Password"
                        name="newPassword"
                        variant="outlined"
                        className={classes.root}
                        fullWidth
                        required
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        value={formValues.newPassword.value}
                        onChange={handleChange}
                        error={formValues.newPassword.error}
                        helperText={formValues.newPassword.error && formValues.newPassword.errorMessage}
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
                        onClick={updateStudent}
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

export default EditStudents;