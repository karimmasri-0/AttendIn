import * as React from 'react';
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@material-ui/core';
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import QRCode from 'qrcode'
import axios from 'axios';

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#3ea175',
            darker: '#053e85',
        },
    },
});

const TeacherDashboard = () => {
    const token = localStorage.getItem('token');
    const [qr, setQr] = useState([]);
    const [loading, setLoading] = useState(false);
    const [countDown, setCountDown] = useState(60);
    const [rooms, setRooms] = useState([]);

    const countDownTime = () => {
        setTimeout(() => {
            setCountDown((countDown) => countDown - 1)
            countDownTime()
        }, 1000)
    }

    function stayQrCode() {
        setTimeout(() => {
            setQr([])
            setCountDown(60)
        }, 60000)
    }

    function GenerateQRCode(url, id) {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
        QRCode.toDataURL(url, {
            width: 500,
            margin: 3,
        }, (err, url) => {
            if (err) return console.error(err)
            setQr((qr) => [{ id, url }])
        })
    }

    useEffect(() => {
        axios.get("http://localhost:8000/teacher", {
                headers: {
                    "x-access-token": token
                }
            }).then((response) => {
                setRooms(response.data)
            })
    })
    return (
        <div style={{
            margin: '20px'
        }}>
            <Grid container spacing={2}>
                {
                    rooms.map((room) => (
                        <Grid item xs={12} md={4} sm={6} key={room.id}>
                            <Card sx={{ maxWidth: 390 }} style={{
                                borderRadius: '10px',
                                padding: '10px',
                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                            }}>
                                {
                                    loading ? (
                                        qr[0].id === room.id ? (
                                            <ThemeProvider theme={theme}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: '140px',
                                                    width: '100%'
                                                }}>
                                                    <CircularProgress color='primary' />
                                                </Box>
                                            </ThemeProvider>
                                        ) : null
                                    ) : (
                                        qr.map((qr) => (
                                            qr.id === room.id ? (
                                                <div key={qr.id}>
                                                    <CardMedia
                                                        component="img"
                                                        alt="qr code"
                                                        height="140"
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                        }}
                                                        image={qr.url}
                                                    />
                                                </div>
                                            ) : null
                                        ))
                                    )
                                }
                                <CardContent style={{
                                    textAlign: 'center',
                                }}>
                                    {
                                        qr[0]?.id === room.id ? (<Typography style={{
                                            fontWeight: 'bold',
                                            color: 'red',
                                            fontSize: '15px',
                                        }} gutterBottom variant="h6" component="div">
                                            {
                                                countDown === 0 ? null : countDown + '\'s Time Left'
                                            }
                                        </Typography>) : null
                                    }
                                    <Typography gutterBottom variant="h5" component="div">
                                        {room.Room}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {room.Course}
                                    </Typography>
                                    <Typography style={{
                                        marginTop: '5px',
                                    }} variant="body2" color="text.secondary">
                                        {"Date: " + 
                                        room.Date.slice(0, 10)
                                        }
                                    </Typography>
                                    <Typography style={{
                                        marginTop: '5px',
                                    }} variant="body2" color="text.secondary">
                                        {"Time: " + room.STime.slice(0,5)  + " - " + room.ETime.slice(0,5) }
                                    </Typography>
                                </CardContent>
                                <CardActions style={{
                                    justifyContent: 'center',
                                }}>
                                    <Button style={{
                                        backgroundColor: '#3ea175',
                                        color: 'white',
                                        padding: '10px 20px',
                                    }} onClick={() => {
                                        GenerateQRCode(JSON.stringify(room), room.id);
                                        stayQrCode();
                                        countDownTime();
                                    }} size="small"
                                        disabled={qr[0]?.id === room.id ? true : false}
                                    >Generate QR Code</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </div >
    );
}


export default TeacherDashboard;