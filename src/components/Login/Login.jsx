import {React, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

import { 
  PASSWORD,
  EMAIL,

  emailErrorMessage,
  passwordErrorMessage,
  } from "../../utils/constants";

import "./Login.css";

import RegisterSocial from "../RegisterSocial/RegisterSocial";


function Login({isLogin, setIsLogin, submit}) {

const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');

const [isValid, setIsValid] = useState(false);

  const [userData, setUserData] = useState({
    password: '',
    email: '',
  })

  function handleChange(e){
    const {name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value
    })

    if (name==="email") {
      if(EMAIL.test(e.target.value)) {
        setEmailError('')
      } else {
        setEmailError(emailErrorMessage)
        setIsValid(false) 
      }
    }

    if (name==="password") {
      if(!e.target.validity.valid) {
        setPasswordError(passwordErrorMessage)
        setIsValid(false)
      } else {
        setPasswordError('')
      }
      }
      setIsValid(e.target.form.checkValidity())
  }


  function handleSubmit(e) {
    e.preventDefault();
// вызываем функцию с запросом в App
    submit(userData.email, userData.password)
  }

  return (
    <>
      <h3 className="title">{"Вход"}</h3>
      <RegisterSocial 
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
      <form className="form login__form" name="login" onSubmit={handleSubmit}>
        <label className="form__label">Электронная почта 
        <input 
          type="email" 
          id="login-email-input"
          className="form__input" 
          name="email" 
          placeholder="Cash2000@bk.ru"
          value={userData.email}
          onChange={handleChange}

          required 
          minLength="4" 
          maxLength="200"

        />
        <span className = "form__item-error">{emailError}</span>
       </label>

        <label className="form__label">Пароль 
        <input 
          type="password" 
          id="login-password-input"
          className="form__input" 
          name="password" 
          placeholder="*****************"
          value={userData.password}
          onChange={handleChange}

          required 
          minLength="8"
          maxLength="30"
        />
        <span className = "form__item-error">{passwordError}</span>
      </label>
        <Link to="/reset" className="link link_reset">Забыли пароль? </Link>
        <button type="submut" className="button  orange-button auth__orange-button" onClick={handleSubmit} disabled={!isValid}>{"Войти"}<div className="button__icon"></div></button>
        <p className="paragraph paragraph_login">Нет акаунта? <a href="#" onClick={()=>setIsLogin(false)} className="link">Зарегистрироваться</a></p>
      </form>
    </>
  )
}

export default Login;