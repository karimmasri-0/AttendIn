import * as React from 'react';
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import axios from 'axios';

const Monitoring = () => {
    const token = localStorage.getItem("token");
    const [rooms, setRooms] = useState([]);


    const getRooms = async () => {
        await axios.get('http://localhost:8000/roomReservations', {
            headers: {
                "x-access-token": token
            }
        }).then((response) => {
            setRooms(
                response.data.map((room) => {
                    return {
                        ...room,
                        capacity: 0,
                        maxCapacity: 30,
                        changed: false,
                        isfull: false,
                        teacher: 'Not Available'
                    }
                })
            )
        })
    }

    // create function reused self to update the capacity of the rooms after 5 seconds

    const updateStudents = async () => {
        rooms.map(async (room) => {
            await axios.get(`http://localhost:8000/monitoring/${room.id}`, {
                headers: {
                    "x-access-token": token
                }
            }).then((response) => {
                if (room.id === response.data.data[0].Roomreserid) {
                    if (room.capacity !== response.data.data[0].Students) {
                        room.changed = true;
                    }
                    room.capacity = response.data.data[0].Students;
                    room.teacher = response.data.data[0].Teacher;
                    setTimeout(() => {
                        room.changed = false;
                    }, 1000);
                    setRooms([...rooms]);
                } else {
                    room.capacity = 0;
                    room.changed = false;
                    room.teacher = 'Not Available';
                    setRooms([...rooms]);
                }
            })
        })
    }

    useEffect(() => {
        
        getRooms();

        const interval = setInterval(() => {
            updateStudents();
        }, 5000);

        return () => clearInterval(interval);

    }, [token])


    // function to sum all capacity in rooms and calculate the percentage

    function sumCapacity(rooms) {
        let sum = 0;
        rooms.forEach(room => {
            sum += room.capacity;
        });
        return sum;
    }

    // function to calculate the percentage of the capacity

    function percentage(rooms) {
        let sum = sumCapacity(rooms);
        let percentage = (sum / 200) * 100;
        return percentage;
    }

    return (
        <div style={{
            margin: '0px 20px 20px 20px'
        }}>
            <div style={{
                width: '100%',
                height: '50px',
                margin: '10px 0px',
                textAlign: 'left',
                fontSize: '30px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                <h2 style={{
                    fontWeight: 'bold',
                    fontSize: '30px',
                }}>
                    Total Statistics:
                </h2>
                <div style={
                    percentage(rooms) > 20 ? {
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#FE2E2E',
                        display: 'inline-block',
                        margin: '0px 10px',
                    }
                        : {
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: '#494949',
                            display: 'inline-block',
                            margin: '0px 10px',
                        }
                }></div>
                <div style={
                    percentage(rooms) > 30 ? {
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#FF0000',
                        display: 'inline-block',
                        margin: '0px 10px',
                    }
                        : {
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: '#494949',
                            display: 'inline-block',
                            margin: '0px 10px',
                        }
                }></div>
                <div style={
                    percentage(rooms) > 50 ? {
                        width: '25px',
                        height: '25px',
                        borderRadius: '50%',
                        backgroundColor: '#81F781',
                        display: 'inline-block',
                        margin: '0px 10px',
                    } : {
                        width: '25px',
                        height: '25px',
                        borderRadius: '50%',
                        backgroundColor: '#494949',
                        display: 'inline-block',
                        margin: '0px 10px',
                    }
                }></div>
                <div style={
                    percentage(rooms) > 60 ? {
                        width: '25px',
                        height: '25px',
                        borderRadius: '50%',
                        backgroundColor: '#58FA58',
                        display: 'inline-block',
                        margin: '0px 10px',
                    } : {
                        width: '25px',
                        height: '25px',
                        borderRadius: '50%',
                        backgroundColor: '#494949',
                        display: 'inline-block',
                        margin: '0px 10px',
                    }
                }></div>
                <div style={
                    percentage(rooms) > 80 ? {
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: '#2EFE2E',
                        display: 'inline-block',
                        margin: '0px 10px',
                    } : {
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: '#494949',
                        display: 'inline-block',
                        margin: '0px 10px',
                    }
                }></div>
                <div style={
                    percentage(rooms) >= 100 ? {
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: '#F4FA58',
                        display: 'inline-block',
                        margin: '0px 10px',
                    } : {
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: '#494949',
                        display: 'inline-block',
                        margin: '0px 10px',
                    }
                }></div>
                <div style={
                    percentage(rooms) > 110 ? {
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        backgroundColor: '#F7FE2E',
                        display: 'inline-block',
                        margin: '0px 10px',
                    } : {
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        backgroundColor: '#494949',
                        display: 'inline-block',
                        margin: '0px 10px',
                    }
                }></div>
                <div style={
                    percentage(rooms) > 120 ? {
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFF00',
                        display: 'inline-block',
                        margin: '0px 10px',
                    } : {
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        backgroundColor: '#494949',
                        display: 'inline-block',
                        margin: '0px 10px',
                    }
                }></div>
            </div>
            <Grid container spacing={2}>
                {
                    rooms.map((room) => (
                        <Grid item xs={12} md={4} sm={6} key={room.id}>
                            <Card sx={{ maxWidth: 390 }} style={
                                room.changed ? {
                                    border: '5px solid #3ea175',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                } : {
                                    borderRadius: '10px',
                                    padding: '10px',
                                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                }
                            }>
                                <div style={{
                                    textAlign: 'center',
                                    fontSize: '50px',
                                }}>
                                    <i className="fa fa-users" aria-hidden="true"></i>
                                </div>
                                <CardContent style={{
                                    textAlign: 'center',
                                }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {room.Room}
                                    </Typography>
                                    <Typography style={{
                                        marginBottom: '10px',
                                    }} variant="body2" color="text.secondary">
                                        {room.Course}
                                    </Typography>
                                    <Typography style={{
                                        marginBottom: '10px',
                                        fontWeight: 'bold'
                                    }} gutterBottom variant="body2" component="div">
                                        {"Teacher: " + room.teacher}
                                    </Typography>
                                    <Typography style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        transition: 'all 2s ease-in-out',
                                    }} variant="body2" color="text.secondary">
                                        <button style={{
                                            width: '30%',
                                            height: '25px',
                                            backgroundColor: '#494949',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '5px',
                                            marginTop: '3px',
                                            outline: 'none',
                                        }}>{room.capacity + " Students"}</button>
                                        <div style={
                                            room.changed ? {
                                                width: '5%',
                                                marginLeft: '10px',
                                                height: '15px',
                                                borderRadius: '50%',
                                                backgroundColor: '#3ea175',
                                            } : {
                                                width: '5%',
                                                marginLeft: '10px',
                                                height: '15px',
                                                borderRadius: '50%',
                                                backgroundColor: '#494949',
                                            }
                                        }></div>
                                    </Typography>
                                    {
                                        room.isfull ? (<Button variant="contained" style={{
                                            width: '100%',
                                            marginTop: '20px',
                                            backgroundColor: '#3ea175',
                                            color: 'white',
                                        }}>
                                            Download Excel Sheet
                                        </Button>) : null
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
};

export default Monitoring;