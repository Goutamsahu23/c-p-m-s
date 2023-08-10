import React from 'react'

import logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className='Header'>
      <div >
        <img className='img' src={logo} alt='Parking Service' width={100} />
      </div>

      <div className='btns'>
        <button><NavLink to={'/AdminLogin'}>Admin Login</NavLink></button>
        <button><NavLink to={'/LoginPage'}>Login</NavLink></button>
        <button><NavLink to={'/SignUpPage'}>Sign Up</NavLink></button>
      </div>
    </div>
  )
}

export default Header
