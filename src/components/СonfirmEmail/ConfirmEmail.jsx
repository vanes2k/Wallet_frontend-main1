import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { 
  passwordErrorMessage,
  } from "../../utils/constants";

import "./ConfirmEmail.css";

import { useState } from "react";

function ConfirmEmail() {

  const navigate = useNavigate()

  const [isValid, setIsValid] = useState(false);
  
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleChange(e){
    setPassword(e.target.value)
      if(!e.target.validity.valid) {
        setPasswordError(passwordErrorMessage)
        setIsValid(false)
      } else {
        setPasswordError('')
      }
      setIsValid(e.target.form.checkValidity())
  }


  function handleSubmit(e) {
    e.preventDefault();
    console.log(password)
  }

  return (
    <div className="auth-container auth-container_confirm">
      <h3 className="title">{"Введите пароль, который пришёл вам на почту"}</h3>
      <form className="form confirm__form" name="confirmEmail" onSubmit={handleSubmit}>
        <label className="form__label">Пароль
        <input 
          type="password" 
          className="form__input" 
          name="password" 
          placeholder="*****************"
          value={password}

          required 
          minLength="5"
          maxLength="30"
          onChange={handleChange}
        />
        <span className = "form__item-error">{passwordError}</span>
        </label>
        
        <button type="submut" className="button orange-button auth__orange-button" disabled={!isValid}>{"Подтвердить"}</button>
        <button type="button" className="button white-button auth__white-button" onClick={() => navigate('/reset')}>Запросить ссылку еще раз</button>

        <p className="paragraph paragraph_confirm">Вспомнили пароль? <Link to="/auth" className="link">Войти</Link></p>
      </form>
    </div>
  )
}

export default ConfirmEmail;