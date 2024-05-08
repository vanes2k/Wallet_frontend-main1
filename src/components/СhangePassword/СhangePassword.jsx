import {React, useState, useEffect} from "react";

import { 
  passwordErrorMessage,
  passwordCheckErrorMessage,
  oldPasswordCheck,
  newPassword,
  } from "../../utils/constants";

import Comfirmation from "../Popup/Confirmation/Confirmation";

function ChangePassword({
  isOk,
  submit,

  isOpened, 
  handleClose, 
  }) {

  const [page, setPage] = useState(0);

// возврат на предыдущую старичку попап-формы
  function handleBackPage() {
    if (page !== 0) {
     setPage(page - 1) 
    } else {
      handleClose()
    }
    }

  const [isValid, setIsValid] = useState(false)

  const [passwordData, setPasswordData] = useState({
    password: '',
    newPassword: '',
    newPasswordCheck: '',
  })

// ошибки
  const [passwordError, setPasswordError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('');
  const [newPasswordCheckError, setNewPasswordCheckError] =useState('')

  const testPass = 11111;

   // функция отправки формы 
    function handleSubmit(e) {
      e.preventDefault();
      // console.log(passwordData)
      submit(passwordData.password, passwordData.newPassword)
      setPage(page + 1)
    }
  
    function handleChange(e){
      const {name, value} = e.target;
      setPasswordData({
        ...passwordData,
        [name]: value
      })


      if (e.target.name==="password") {
        if(!e.target.validity.valid) {
          setPasswordError(passwordErrorMessage)
          setIsValid(false)
        } else {
          setPasswordError('')
        }
        setIsValid(e.target.form.checkValidity())

        if (e.target.value.length >=5) {
          if (e.target.value !== testPass.toString()) {
            setPasswordError(oldPasswordCheck)
          }
        }
       
      } 

      if (e.target.name ==="newPassword") {
        if(!e.target.validity.valid) {
          setNewPasswordError(passwordErrorMessage)
          setIsValid(false)
        } else {
          setNewPasswordError('')
        }
        setIsValid(e.target.form.checkValidity())

        if (e.target.value.length >=5) {
          if (e.target.value === passwordData.password) {
            setNewPasswordError(newPassword)
          }
        }
      }
    }
   
    function handleCloseChangePass() {
      setPage(0)
      handleClose()
    }
  
    useEffect(() => {
      if (passwordData.newPassword !== passwordData.newPasswordCheck) {
        setNewPasswordCheckError(passwordCheckErrorMessage)
        setIsValid(false)
      }     
      if (passwordData.newPasswordCheck!== '' && passwordData.newPassword === passwordData.newPasswordCheck) {
        setNewPasswordCheckError('')
        setIsValid(true)
      }
  }, [
      passwordData.newPassword,
      passwordData.newPasswordCheck
  ])

useEffect(() => {
console.log(page)
}, [page])
  return (
    <div className={isOpened ? "popup popup_opened" : "popup" }>

    <div className="popup__container">
     <div className="popup__header">
          <button className={page===1 && isOk ? "popup__go-back-button popup__go-back-button_none" : "popup__go-back-button"} onClick={handleBackPage}></button>
          <h3 className="title popup__title">
            <span className="card-icon reset"></span>
             Смена пароля
          </h3>
          {page===0 
          ? ( <p className="paragraph popup__paragraph">
              Ваш новый пароль должен отличаться от ранее используемого пароля.
            </p>)
          : <></>
          }
          <button className="close-button" onClick={handleCloseChangePass}></button>
        </div> 
      { page===0
        ? (
        <form name="changePassword" onSubmit={handleSubmit} className="form popup__form">
          <fieldset className="popup-fildset">
          <label className="form__label">Действующий пароль *
                <input 
                    type="password" 
                    className="form__input" 
                    name="password" 
                    placeholder="************"
                    onChange={handleChange}
                    value={passwordData.password}

                    required 
                    minLength="5" 
                    maxLength="200"   
                />
                <span className = "form__item-error email-input-error">{passwordError}</span>
                </label>
                <label className="form__label">Новый пароль *
                <input 
                    type="password" 
                    className="form__input" 
                    name="newPassword" 
                    placeholder="************"
                    onChange={handleChange}
                    value={passwordData.newPassword}

                    required 
                    minLength="5" 
                    maxLength="30"
                />
                <span className = "form__item-error password-input-error">{newPasswordError}</span>
                </label>
                <label className="form__label">Подтвердите пароль *
                <input 
                    type="password" 
                    className="form__input" 
                    name="newPasswordCheck" 
                    placeholder="************"
                    onChange={handleChange}
                    value={passwordData.newPasswordCheck}

                    required 
                    minLength="5" 
                    maxLength="30"
                />
                <span className = "form__item-error password-input-error">{newPasswordCheckError}</span>
                </label>
          </fieldset>
          <fieldset className="popup-fildset">

              <input type="submit" disabled={!isValid} className="orange-button button auth__orange-button" value="Изменить пароль"></input>

            <div className="page-wrapper page-wrapper_mini">
              <div className= "page-point  page-point_active"></div>
              <div className="page-point"></div>
            </div>
          </fieldset>
        </form>
      )
      :  page === 1 
      ? (<>
       <Comfirmation 
          isOk={isOk}
          handleClose={handleClose}

          page={page}
          setPage={setPage}
          type="changePass"
        />
        <div className="page-wrapper page-wrapper_mini">
          <div className="page-point"></div>
          <div className="page-point page-point_active"></div>
        </div>
        </>)
      : <></>
    }
  </div>
  </div>
  )
}

export default ChangePassword;
