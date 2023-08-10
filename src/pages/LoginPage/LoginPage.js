import React from 'react'
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {  useNavigate } from 'react-router-dom'; 
import  Toast  from 'react-hot-toast';
import { useState } from 'react'

const LoginPage = () => {


    const [formData, setFormData] = useState({
        Email_ID: '',
        Password: ''
    });
    const navigate = useNavigate();

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function submitHandler(event) {
        event.preventDefault();
        const { Email_ID, Password } = formData;
            
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, Email_ID, Password);
            Toast.success("Login Sucessfully")
            navigate('/UserDashboard');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    async function handleGoogleSignIn() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
    
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
    
            if (user) {
                Toast.success("Logged in with Google successfully");
                navigate('/UserDashboard'); 
                
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    }
    return (
        <div className="Login_Page_Container">

                <form onSubmit={submitHandler}>
                    <div className="loginPage_input">
                        <input type="email" name='Email_ID' className="form-control" onChange={changeHandler}  placeholder="Username" />
                    </div>
                    <div className="loginPage_input">
                        <input type="password" name='Password' className="form-control" onChange={changeHandler}  placeholder="Password" />
                    </div>
                    <button type="submit" className="user_login_btn ">LOGIN</button>
                    <div className="message">
                        <div><input type="checkbox" /> Remember ME</div>
                        <div></div>
                    </div>
                </form>
                <div className='OR-line'>
                    <div className='line'></div>
                    <p className='or'>OR</p>
                    <div className='line'></div>
                </div>

                <button className='user_login_btn google_btn' onClick={handleGoogleSignIn}>Sign In with Google</button>


        </div>
    )
}

export default LoginPage
