import './AddRooms.css';
import TextField from '@mui/material/TextField';
import { Button, Container, Typography } from '@mui/material';
import { KeyboardArrowRight } from '@material-ui/icons';
import { useState } from 'react';



const AddRooms = () => {
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
        console.log(newFormValues);
        setFormValues(newFormValues)
    }
    return (
        <div className="addRooms">
            <br />
            <Container className="container" >
                <form noValidate onSubmit={handleSubmit} >
                    <Typography
                        variant="h6">
                        Add Rooms
                    </Typography>

                    <TextField
                        placeholder="Enter RoomName"
                        label="RoomName"
                        name="roomName"
                        variant="outlined"
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
                    >
                        Add
                    </Button>
                </form>
            </Container>
        </div>
    )
}

export default AddRooms;