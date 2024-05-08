import React from "react";
import "./RegisterSocial.css";

function RegisterSocial({isLogin, setIsLogin}) {

    function registerClick() {
        setIsLogin(false);
      }
      function loginClick() {
        setIsLogin(true);
      }
      
    return (
        <>
            <div className="swing-button__container swing-button__container_login">
                <button className={isLogin ? "button swing-button swing-button_signin" : "button swing-button swing-button_signin swing-button_disabled"} onClick={loginClick} >{"Вход"}</button>
                <button className={!isLogin ? "button swing-button swing-button_signup" :"button swing-button swing-button_disabled swing-button_signup"} onClick={registerClick} >{"Регистрация"}</button>
            </div>    
            <p className="paragraph paragraph_social-info">Используйте социальные сети, чтобы войти</p>
            <div className="login__icon-contaner"> 
                <div className="login__icon login__icon_ya"></div>
                <div className="login__icon login__icon_mail"></div>
            </div>
        </>
    )
}

export default RegisterSocial;