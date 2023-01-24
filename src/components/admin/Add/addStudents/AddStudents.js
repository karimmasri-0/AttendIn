import './AddStudents.css';
import TextField from '@mui/material/TextField';
import { Button, Container, Typography } from '@mui/material';
import { KeyboardArrowRight } from '@material-ui/icons';
import { useState } from 'react';



const AddStudents = () => {
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
        console.log(newFormValues);
        setFormValues(newFormValues)
    }
    return (
        <div className="addStudents">
            <br />
            <Container className="container" >
                <form noValidate onSubmit={handleSubmit} >
                    <Typography
                        variant="h6">
                        Add Students
                    </Typography>

                    <TextField
                        placeholder="Enter FirstName"
                        label="FirstName"
                        name="firstName"
                        variant="outlined"
                        fullWidth
                        required
                        style={{ marginTop: '10px',
                        marginBottom: '10px', }}
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
                        fullWidth
                        required
                        style={{ marginTop: '10px',
                        marginBottom: '10px', }}
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
                        fullWidth
                        required
                        style={{ marginTop: '10px',
                        marginBottom: '10px', }}
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
                        fullWidth
                        required
                        style={{ marginTop: '10px',
                        marginBottom: '10px', }}
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
                        fullWidth
                        required
                        style={{ marginTop: '10px',
                        marginBottom: '10px', }}
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
        </div>
    )
}

export default AddStudents;