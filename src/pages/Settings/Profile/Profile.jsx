import "./Profile.css"
import {React, useState, useContext} from "react";
import DeleteAccount from "../../../components/DeleteConfirmation/DeleteAccount";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

import { 
  emptyFieldErrorMessage,
  emailErrorMessage,
  phoneErrorMessage 
} from "../../../utils/constants";
import { useEffect } from "react";

function Profile ({hendlerOpenModal, hendlerOpenChange, patchUser}) {

const {currentUser, setCurrentUser} = useContext(CurrentUserContext)

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  const [isValid, setIsValid] = useState(false);

  const [accountInfo, setAccountInfo] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
  })

  function handleChange(e){
    const {name, value} = e.target;
    setAccountInfo({
      ...accountInfo,
      [name]: value
    })

    if (name==="name") {
      if(!e.target.validity.valid) {
        setNameError(emptyFieldErrorMessage)
        setIsValid(false) 
      } else {
        setNameError('')
        setIsValid(true)
      }
    }
    if (name==="email") {
      if(!e.target.validity.valid) {
        setEmailError(emailErrorMessage)
        setIsValid(false) 
      } else {
        setEmailError('')
        setIsValid(true)
      }
    }
    if (name==="phone") {
      if(!e.target.validity.valid) {
        setPhoneError(phoneErrorMessage)
        setIsValid(false) 
      } else {
        setPhoneError('')
        setIsValid(true)
      }
    }
  }

  function editProfileSubmit(e) {
    e.preventDefault();
    patchUser(accountInfo)
    setCurrentUser( accountInfo)
    // console.log(accountInfo)
    // setAccountInfo({
    //   name: '',
    //   email: '',
    //   phone: '',
    // })
   
    setIsValid(false)
  }

  // useEffect(() => {
  //   if (nameError ==='' && emailError ==='' && phoneError==='') {
  //     setIsValid(true)
  //   }
  // }, [nameError,
  //     emailError,
  //     phoneError,
  //   ])

    return (
        <div className='profile'>
            <h2 className='profile__title'>Основное</h2>
                <form action="" onSubmit={editProfileSubmit} className="profile__form">

                    {/* <div className="form-flex-wraper"> */}
                        <label className="active-form__label margin-right"> Имя
                            <input 
                              type="text" 
                              className="form__input bg-white" 
                              name="name" 
                              placeholder="ФИО" 
                              value={accountInfo.name} 
                              onChange={handleChange}

                              minLength={4}
                              maxLength={50}
                            ></input>
                            <span className = "form__item-error">{nameError}</span>
                        </label>

                        <label className="active-form__label"> Электронная почта
                            <input type="email" className="form__input bg-white" name="email" placeholder="Email" value={accountInfo.email} onChange={handleChange} pattern="/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i"></input>
                            <span className = "form__item-error">{emailError}</span>
                        </label>
                    {/* </div> */}

                    {/* <div className="form-flex-wraper"> */}
                        {/* <label className="active-form__label margin-right"> Пароль
                            <input type="password" className="form__input bg-white" name="password" placeholder="*****************" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            <p className="link link-underline link-s float-right" onClick={hendlerOpenChange}>Сменить пароль</p>
                            <span className = "form__item-error"></span>
                        </label> */}

                        <label className="active-form__label"> Телефон
                            <input type="tel" className="form__input bg-white" name="phone" placeholder="+7(___)-___-__-__" value={accountInfo.phone} onChange={handleChange}  minLength={12} maxLength={12}></input>
                            <span className = "form__item-error">{phoneError}</span>
                        </label>
                    {/* </div> */}

                    {/* <div className="button-flex"> */}
                        <input type="submit" className="button orange-button button-l" disabled={!isValid} value='Сохранить изменения'></input>
                    {/* </div> */}
                </form>

              <div className="delete__account">
                <h2 className='profile__title '>Пароль</h2>
                <button className="button orange-button button-l" onClick={hendlerOpenChange}>Сменить пароль</button>
            </div>
            <div className="delete__account">
                <h2 className='profile__title '>Удаление аккаунта</h2>
                <p className='paragraph'>Внимание! После удаления аккаунта, вы больше не сможете войти в личный кабинет.</p>
                <button className="button orange-button button-l" onClick={hendlerOpenModal}>Удалить аккаунт</button>
            </div>
        </div>
    )
}

export default Profile