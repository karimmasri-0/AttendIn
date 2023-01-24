import React from 'react'
import './Login.css'

function Login() {
    return (
        <div className='appp'>
            <div className='login'>
                <img src={require("../assets/auth/AttendIn-logo-square.png")} alt="AttendIn Logo" />
                <label>EMAIL</label>
                <input type='text' placeholder='Enter Email' />
                <label>PASSWORD<span>Forgot password?</span></label>
                <input type='password' placeholder='Enter Password' />
                <button>Login</button>
            </div>
        </div>
    )
}

export default Login