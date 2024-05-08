import {React, useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { 
  EMAIL,
  emailErrorMessage,
  } from "../../utils/constants";

import "./ResetPass.css";

function ResetPass() {

  const navigate = useNavigate()

  const [emailError, setEmailError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const [email, setEmail] = useState('')

  function handleChange(e){
    setEmail(e.target.value)

    if(EMAIL.test(e.target.value)) {
      setEmailError(emailErrorMessage)
      setIsValid(false) 
    } else {
      setEmailError('')
    }
    setIsValid(e.target.form.checkValidity())
  }
  

  function submit(e) {
    e.preventDefault();
    navigate('/confirmPass')
  }
    return (
      <div className="auth-container auth-container_reset">
        <h3 className="title">{"Восстановление пароля"}</h3>
        <form className="form reset__form" name="reset" onSubmit={submit}>
            <label className="form__label">Электронная почта
            <input 
              type="email" 
              className="form__input" 
              name="email" 
              placeholder="Cash2000@bk.ru"
              value={email}

              required 
              minLength="5" 
              maxLength="200"
              onChange={handleChange}
            />
            <span className = "form__item-error">{emailError}</span>
            </label>
            
            <button type="submut" className="button orange-button auth__orange-button" disabled={!isValid}>{"Отправить ссылку"}</button>
            <p className="paragraph paragraph_reset">Вспомнили пароль? <Link to="/auth" className="link">Войти</Link></p>
        </form>
      </div>
    )
}

export default ResetPass;