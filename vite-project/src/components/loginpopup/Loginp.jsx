import React, { useState, useEffect } from 'react';
import './loginp.css';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { StoreContext } from '../../context/SStoreContext';
import axios from 'axios'

const Loginp = ({ setSL }) => {
    const { Url,setToken, } = useContext(StoreContext)

   
    
    const [curr, setCurrState] = useState('Sign Up');
    const [data, setData] = useState({
        name: "",
        email: "", 
        password: "",
    });
    const onLogin= async (event)=>{
        event.preventDefault();
        let newUrl = Url;
        if(curr=="Log In"){
            newUrl = "http://localhost:4000/api/user/login";
        }
        else{
            newUrl += "/api/user/register";
        }
        const response = await axios.post(newUrl,data);

        if(response.data.success){
            console.log(response.data)

            const token = response.data.token;

            setToken(token); // Update token state/context
            localStorage.setItem("token", token); // Store token in local storage
            setSL(false);
        }
        else{
            console.error("Login error:", error);
        }
    }

    const onChangeh = (event) => {
        const name = event.target.name; 
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        console.log(curr);
    }, [curr]);

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{curr}</h2>
                    <img onClick={() => setSL(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {curr === "Sign Up" && <input name="name" onChange={onChangeh} type="text" placeholder='Your Name' required />}
                    <input name="email" onChange={onChangeh} type="email" placeholder='Your email' required />
                    <input name="password" onChange={onChangeh} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{curr === "Sign Up" ? "Create Account" : "Log In"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" />
                    <p>By continuing I agree to the terms of use and privacy policy</p>
                </div>
                {curr === "Sign Up"
                    ? <p>Already have an account? <span onClick={() => setCurrState('Log In')} className="blue-text">Login here</span></p>
                    : <p>Create a new account? <span onClick={() => setCurrState('Sign Up')} className="blue-text">Click here</span></p>}
            </form>
        </div>
    );
}

export default Loginp;
