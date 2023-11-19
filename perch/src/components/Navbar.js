import React, {useState}from 'react'
import {Link} from  'react-router-dom'

function Navbar() {
  return (
    <>
        <nav className='navbar'>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" style={{color:'blue'}}>
                    Perch <FontAwesomeIcon icon="fa-solid fa-feather-pointed" style={{color: "#f5f7fa",}} />
                </Link>
            </div>
        </nav>
    
    
    
    </>
  )
}

export default Navbar
