import {React, useState} from "react";
import { useNavigate } from "react-router-dom";

import "./Authorization.css";

import Login from "../Login/Login";
import Register from "../Register/Register";

function Authorization({isLogin, setIsLogin, handleLogin, handleRegister}) {

    const navigate = useNavigate();    

    const goBack = () => {
      navigate('/');
    };

    return (
        <div className="auth-container">
            <button className="go-back-button" onClick={goBack}></button>
            {isLogin ? 
                <Login 
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                submit={handleLogin}
                />
                : 
                <Register 
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                submit={handleRegister}
                />
            }
        </div>
   
    )
}

export default Authorization;