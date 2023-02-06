import './AddRoomreser.css';
import React from 'react'
import TextField from '@mui/material/TextField';
import { Button, Container, Typography } from '@mui/material';
import { KeyboardArrowRight } from '@material-ui/icons';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from "@material-ui/core/styles";
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';

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


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const rooms = [
    'Maths Room',
    'Phy Room',
    'Web Room',
    'Mobile Room',
    'Arabic Room',
    'Eng Room',
    'Cult Room',
];

const courses = [
    'CSCI250',
    'CSCI200',
    'Eng101',
    'Eng151',
    'Arab101',
    'Phy101',
    'CSCI390',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const AddRoomreser = () => {
    const classes = useStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
        const roomreser = { roomName, courseName, date, startTime, endTime };
        console.log(roomreser);
    }

    const theme = useTheme();
    const [roomName, setRoomName] = React.useState([]);
    const [courseName, setCourseName] = React.useState([]);
    const [date, setDate] = React.useState("");
    const [startTime, setStartTime] = React.useState("");
    const [endTime, setEndTime] = React.useState("");

    const handleChangeRoomSelector = (event) => {
        const {
            target: { value },
        } = event;
        setRoomName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeCourseSelector = (event) => {
        const {
            target: { value },
        } = event;
        setCourseName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeDate = (event) => {
        setDate(event.target.value);
    };

    const handleChangeStartTime = (event) => {
        setStartTime(event.target.value);
    };

    const handleChangeEndTime = (event) => {
        setEndTime(event.target.value);
    };

    return (
        <div className="addRoomreser">
            <br />
            <Container className="container" >
                <form noValidate onSubmit={handleSubmit} >
                    <Typography
                        variant="h6">
                        Add Roomreservation
                    </Typography>
                    <FormControl className={classes.root} fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <InputLabel id="demo-simple-select-label">Rooms</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={roomName}
                            label="rooms"
                            onChange={handleChangeRoomSelector}
                            MenuProps={MenuProps}
                        >
                            {rooms.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, roomName, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.root} fullWidth style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <InputLabel id="demo-simple-select-label">Courses</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={courseName}
                            label="courses"
                            onChange={handleChangeCourseSelector}
                            MenuProps={MenuProps}
                        >
                            {courses.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, roomName, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id="date"
                        label="Date"
                        type="date"
                        className={classes.root}
                        style={{
                            width: '100%',
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        defaultValue="2023-01-24"
                        onChange={handleChangeDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="time"
                        label="Start Time"
                        type="time"
                        defaultValue="07:30"
                        className={classes.root}
                        style={{
                            width: '100%',
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        onChange={handleChangeStartTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />
                    <TextField
                        id="time"
                        label="End Time"
                        type="time"
                        defaultValue="07:30"
                        className={classes.root}
                        style={{
                            width: '100%',
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                        onChange={handleChangeEndTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
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

export default AddRoomreser;