import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-dark text-light p-5 mt-1'>
        <h4 className='text-center mb-5'>
            All rights reserved &copy; STEPSTYLE
        </h4>

        <ul className='d-flex flex-row'  style={{gap:'460px'}}>
        <li className="d-flex "> <Link to ='/contact'  style={{  color: "white",listStyle:'none' ,fontSize:'20px'}}> Contact</Link></li>
         <li className="d-flex "> <Link to ='/policy'style={{  color: "white" ,listStyle:'none',fontSize:'20px'}}>Policy</Link></li>
        <li className="d-flex "> <Link to ='/about' style={{ color: "white",listStyle:'none',fontSize:'20px' }}>About Us</Link></li>

        </ul>
        </div>
  )
}

export default Footer