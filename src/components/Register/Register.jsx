import {React, useState, useEffect} from "react";

import "./Register.css";
import RegisterSocial from "../RegisterSocial/RegisterSocial";

import { 
  PASSWORD,
  EMAIL,

  emailErrorMessage,
  passwordErrorMessage,
  passwordCheckErrorMessage,
  } from "../../utils/constants";

function Register({isLogin, setIsLogin, submit}) {

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordCheckError, setPasswordCheckError] = useState('')

  const [isValid, setIsValid] = useState(false)

  const [userData, setUserData] = useState({
    password: '',
    passwordCheck: '',
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
      if(PASSWORD.test(e.target.value)) {
        setPasswordError('')
      } else {
        setPasswordError(passwordErrorMessage)
        setIsValid(false)
      }
      }

      setIsValid(e.target.form.checkValidity())
  }


  useEffect(() => {
    if (userData.password !== userData.passwordCheck) {
      setPasswordCheckError(passwordCheckErrorMessage)
      setIsValid(false)
    }     
    if (userData.passwordCheck!== '' && userData.password === userData.passwordCheck) {
      setPasswordCheckError('')
      setIsValid(true)
    }
}, [
    userData.password,
    userData.passwordCheck
])


  function handleSubmit(e) {
    e.preventDefault();
// вызываем функцию с запросом в App
    submit(userData.email, userData.password)
  }

  return (
    <>
      <h3 className="title">{"Регистрация"}</h3>
      <RegisterSocial 
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
      <form className="form register__form" name="register" onSubmit={handleSubmit}>
        <label className="form__label">Электронная почта
        <input 
          type="email" 
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

        <label className="form__label">Придумайте пароль
        <input 
          type="password" 
          className="form__input" 
          name="password" 
          placeholder="KFJNVLDFNVLDF"
          value={userData.password}
          onChange={handleChange}

          required 
          minLength="8" 
          maxLength="30"
        />
        <span className = "form__item-error">{passwordError}</span>
        </label>

        <label className="form__label">Подтвердите пароль
        <input 
          type="password" 
          className="form__input" 
          name="passwordCheck" 
          placeholder="KFJNVLDFNVLDF"
          value={userData.passwordCheck}
          onChange={handleChange}

          required 
          minLength="8" 
          maxLength="30"
        />
        <span className = "form__item-error">{passwordCheckError}</span>
        </label>

        <button type="submut" className="button orange-button auth__orange-button" disabled={!isValid}>{"Зарегистрироваться"}<div className="button__icon"></div></button>
        <p className="paragraph paragraph_register">Нажимая «Зарегистрироваться», вы принимаете 
          <a href="#" className="link link_m"> Условия пользовательского&nbsp;соглашения и обработки персональных данных</a>
        </p>
      </form>
    </>
  )
}

export default Register;