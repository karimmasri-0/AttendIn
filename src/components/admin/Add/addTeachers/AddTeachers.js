import './AddTeachers.css';
import TextField from '@mui/material/TextField';
import { Button, Container, Typography } from '@mui/material';
import { KeyboardArrowRight } from '@material-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import { makeStyles } from "@material-ui/core/styles";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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

const AddTeachers = () => {
    const token = localStorage.getItem('token');
    const classes = useStyles();
    const navigate = useNavigate();
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
        password: {
            value: '',
            error: false,
            errorMessage: 'You must enter an password'
        },
        role: {
            value: 1,
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

    const addTeacher = (e) => {
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
        axios.post(`http://${process.env.REACT_APP_SERVER_NAME}:8000/users/createAccount`, {
            FirstName: formValues.firstName.value,
            MiddleName: formValues.middleName.value,
            LastName: formValues.lastName.value,
            Username: formValues.username.value,
            Password: formValues.password.value,
            Role: formValues.role.value,
        }, {
            headers: {
                "x-access-token": token
            }
        }).then((response) => {
            if (response.data.message === "Account Created Successfully") {
                notify();
                setTimeout(() => {
                    navigate('/teachers');
                }, 2000);
            }else if(response.data.message === "Token expired"){
                localStorage.removeItem("token");
                window.location.reload();
                navigate('/');
            }else if(response.data.message === "Not Allowed"){
                localStorage.removeItem("token");
                window.location.reload();
                navigate('/');
            }else{
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 1000,
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
    }
    const notify = () => toast.success('Teacher Created Successfully!', {
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
        <div className="addTeachers">
            <br />
            <Container className="container" >
                <form noValidate onSubmit={addTeacher} >
                    <Typography
                        variant="h6">
                        Add Teachers
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
                        placeholder="Enter Password"
                        label="Password"
                        name="password"
                        variant="outlined"
                        className={classes.root}
                        fullWidth
                        required
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        value={formValues.password.value}
                        onChange={handleChange}
                        error={formValues.password.error}
                        helperText={formValues.password.error && formValues.password.errorMessage}
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
                    >
                        Add
                    </Button>
                </form>
            </Container>
            <ToastContainer
                position="top-right"
                autoClose={2000}
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

export default AddTeachers;