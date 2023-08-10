import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; 
import Toast  from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {
    const navigate=useNavigate();

    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        Email_ID: "",
        Password: ""
    });
    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }


    async function submitHandler(event) {
        event.preventDefault();
        const { FirstName, LastName, Email_ID, Password } = formData;
    
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, Email_ID, Password);
            const user = userCredential.user;
    
            const res = await fetch(`https://car-parking-reservation-100ae-default-rtdb.firebaseio.com/users/${user.uid}.json`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    FirstName,
                    LastName,
                    Email_ID,
                    Password
                })
            });
    
            if (res.ok) {
                setFormData({
                    FirstName: '',
                    LastName: '',
                    Email_ID: '',
                    Password: ''
                });
    
                Toast.success("Registered Successfully");
                navigate('/UserDashboard');
            } else {
                Toast.error("Error in Submitting the data.");
            }
        } catch (error) {
            Toast.error("Error in Submitting the data.");
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
                        <input required type="text" name='FirstName' value={formData.FirstName} onChange={changeHandler} className="form-control" placeholder="First Name" />
                    </div>


                    <div className="loginPage_input">
                        <input required type="text" name='LastName' value={formData.LastName} onChange={changeHandler} className="form-control" placeholder="Last Name" />
                    </div>


                    <div className="loginPage_input">
                        <input required type="text" name='Email_ID' value={formData.Email_ID} onChange={changeHandler} className="form-control" placeholder="Email ID" />
                    </div>
                    <div className="loginPage_input">

                        <input required type="text" name='Password' value={formData.Password} onChange={changeHandler} className="form-control" placeholder="Password" />
                    </div>
                    <button type="submit" className="user_login_btn">Sign Up</button>
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

export default SignUpPage
