import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

    const admin="admin@gmail.com"
    const pass="admin123"
    const navigate=useNavigate();

    const [adminLogin,setAdminLogin]=useState([
      
    ])

    function changeHandler(event) {
        const { name, value } = event.target;
        setAdminLogin((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function submitHandler(event){
        event.preventDefault();
        if(adminLogin.Email_ID == admin && adminLogin.Password == pass){
            navigate('/AdminDashboard')
        }
    }
    

   
    return (
        <div className="Login_Page_Container">
                <form onSubmit={submitHandler}>
                    <div className="loginPage_input">
                        <input type="email" name='Email_ID' className="form-control" onChange={changeHandler} placeholder="Username" value={adminLogin.Email_ID} />
                    </div>
                    <div className="loginPage_input">
                        <input type="password" name='Password' className="form-control" onChange={changeHandler} value={adminLogin.Password} placeholder="Password" />
                    </div>
                    <button type="submit" className="user_login_btn">LOGIN</button>
                    <div className="message">
                        <div><input type="checkbox" /> Remember ME</div>
                        <div></div>
                    </div>
                </form>
        </div>
    )
}

export default AdminLogin
