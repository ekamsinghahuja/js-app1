import React, { useState, useEffect, useContext } from 'react';
import './loginp.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/SStoreContext';
import axios from 'axios';

const Loginp = ({ setSL }) => {
    const { Url, setToken } = useContext(StoreContext);

    const [curr, setCurrState] = useState('Sign Up');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = Url;
        if (curr === "Log In") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }
        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                const token = response.data.token;
                setToken(token);
                localStorage.setItem("token", token);
                setSL(false);
                document.body.classList.remove('login-popup-active');
                window.location.reload(); // Refresh the page after login
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong");
        }
    };

    const onChangeh = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        console.log(curr);
    }, [curr]);

    useEffect(() => {
        document.body.classList.add('login-popup-active');
        return () => {
            document.body.classList.remove('login-popup-active');
        };
    }, []);

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{curr}</h2>
                    <img onClick={() => {
                        setSL(false);
                        document.body.classList.remove('login-popup-active');
                    }} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {curr === "Sign Up" && <input name="name" onChange={onChangeh} type="text" placeholder='Your Name' required />}
                    <input name="email" onChange={onChangeh} type="email" placeholder='Your email' required />
                    <input name="password" onChange={onChangeh} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{curr === "Sign Up" ? "Create Account" : "Log In"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing I agree to the terms of use and privacy policy</p>
                </div>
                {curr === "Sign Up"
                    ? <p>Already have an account? <span onClick={() => setCurrState('Log In')} className="blue-text">Login here</span></p>
                    : <p>Create a new account? <span onClick={() => setCurrState('Sign Up')} className="blue-text">Click here</span></p>}
            </form>
        </div>
    );
};

export default Loginp;
