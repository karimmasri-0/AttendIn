import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const login = () => {
        if (email === '' && password === '') {
            toast.error('Please enter your email and password!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            axios.post('http://localhost:8000/login', {
                Username: email,
                Password: password
            }).then((response) => {
                if (response.data.message === true) {
                    if (response.data.data.Role === 0) {
                        localStorage.setItem('token', response.data.access_token);
                        loginNotify();
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } else if (response.data.data.Role === 1) {
                        localStorage.setItem('token', response.data.access_token);
                        loginNotify();
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } else {
                        notify();
                    }
                } else if (response.data.message === "Password dosn't Match") {
                    toast.error('Password dosn\'t Match!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else if (response.data.message === "Incorrect Username") {
                    toast.error('Incorrect Username!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })
        }
    }

    const notify = () => toast.warning('You are not allowed to login as a student!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const loginNotify = () => toast.success('Login Successful!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    return (
        <>
            <div className='appp'>
                <div className='login'>
                    <img src={require("../assets/auth/AttendIn-logo-square.png")} alt="AttendIn Logo" />
                    <label className='label'>EMAIL</label>
                    <input className='input' type='text' onChange={handleEmail} placeholder='Enter Email' />
                    <label className='label'>PASSWORD<span className='span'>Forgot password?</span></label>
                    <input className='input' type='password' onChange={handlePassword} placeholder='Enter Password' />
                    <button className='button' onClick={login}>Login</button>
                </div>
            </div>
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
        </>
    )
}

export default Login