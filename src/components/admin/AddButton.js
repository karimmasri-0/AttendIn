import React from 'react'
import { Link } from 'react-router-dom';

function AddButton({ title, path }) {
    return (
        <div style={{
            backgroundColor: '#F7F8FC', width: '100%', height: '100px',
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <Link to={path} style={{
                backgroundColor: '#2C964A', width: '20%', height: '50px',
                borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                textDecoration: 'none'
            }}>
            <i  class="fa fa-plus" style={{ color: 'white', fontSize: '20px', marginLeft: '10px' }}></i>
            <p  style={{ color: 'white', fontSize: '15px', marginRight: '10px', marginLeft: '10px'}}>{title}</p>
            </Link>
        </div>
    )
}

export default AddButton;