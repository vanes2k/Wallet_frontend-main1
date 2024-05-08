
import {useRef, React, useState} from "react";

import './FeedBack.css'

import { 
  emptyFieldErrorMessage,
  emailErrorMessage,
  phoneErrorMessage 
} from '../../utils/constants';
import { useEffect } from "react";

function FeedBackForm ({isOpened, isClose, submit}) {

    const [isChecked, setIsChecked] = useState(false)

    function handleChangeCheckbox() {
        setIsChecked(!isChecked)
        setFeedback({
          ...feedback,
          'agree': !isChecked
        })
    }

    function handleClose () {
        isClose();
    }

    const [namePhoto, setNamePhoto] = useState('Placeholder');
    const inputRef = useRef();

    const [feedback, setFeedback] = useState({
      name: '',
      phone: '',
      message: '',
      agree: isChecked,
    })
    
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [messageError, setMessageError] = useState(null);

  const [isValid, setIsValid] = useState(false);

    function handleChange(e){
      const {name, value} = e.target;

      // if (e.target.files) {
      //   console.log(e.target.files[0])
      // }
      setFeedback({
        ...feedback,
        [name]: value
      })
  
      if (name==="name") {
        if(!e.target.validity.valid) {
          setNameError(emptyFieldErrorMessage)
          setIsValid(false) 
        } else {
          setNameError('')
        }
      }
      if (name==="email") {
        if(!e.target.validity.valid) {
          setEmailError(emailErrorMessage)
          setIsValid(false) 
        } else {
          setEmailError('')
        }
      }
      if (name==="phone") {
        if(!e.target.validity.valid) {
          setPhoneError(phoneErrorMessage)
          setIsValid(false) 
        } else {
          setPhoneError('')
        }
      }
      if (name==="message") {
        if(!e.target.validity.valid) {
          setMessageError(emptyFieldErrorMessage)
          setIsValid(false) 
        } else {
          setMessageError('')
        }
      }
    }


    // const [selectedFile, setSelectedFile] = useState(null);
    const [file, setFile] =useState('')

    const handleFileChange = (event) => {
      // setSelectedFile(event.target.files[0]);
      setFile(event.target.files[0])
    };

     
    function handleSubmit(e) {
      e.preventDefault();
      // console.log(feedback)

console.log(feedback)
      submit(feedback)
      setFeedback({
        name: '',
        email: '',
        phone: '',
        message: '',
        agree: isChecked,
      })
      setIsValid(false)
    }


    useEffect(() => {
      setFeedback({...feedback, 'file': file})
    }, [file])



    
    useEffect(() => {
      if (emailError==='' && nameError==='' && messageError==='') {
        if (feedback.agree === true) {
          setIsValid(true)  
        } else {
          setIsValid(false) 
        }
      }
    }, [emailError, nameError, messageError, feedback.agree])



    return (
        <div className="feedback">
            <div className={isOpened ? "popup popup_opened" : "popup" }>
                <div className="popup__container popup__container_feedback ">
                    <div className="popup__header">
                        <button className="close-button" onClick={handleClose}></button>
                        <h3 className="feedback-title popup__title_large">Обратная связь</h3>
                    </div>

                    <form name="feedback" onSubmit={handleSubmit} className="popup__form popup__form-feedback">
                        <div className="form__control-main">
                            <div className="form__control-left">
                                <label className="active-form__label"> Как я могу к вам обращаться *
                                    <input type="text" name="name" className="form__input" placeholder="Placeholder" value={feedback.name} onChange={handleChange} required minLength={4} maxLength={30}></input>
                                    <span className = "form__item-error email-input-error">{nameError}</span>
                                </label>

                                <label className="active-form__label"> Телефон
                                    <input type="tel" name="phone" className="form__input" placeholder="+7(___)-___-__-__" value={feedback.phone} onChange={handleChange} pattern='/^[\d\+][\d\(\)\ -]{4,14}\d$/' minLength={11} maxLength={11}></input>
                                    <span className = "form__item-error email-input-error">{phoneError}</span>
                                </label>
                            </div>

                            <div className="form__control-right">
                                <label className="active-form__label"> Email *
                                    <input type="email" name="email" className="form__input" placeholder="Placeholder" value={feedback.email} onChange={handleChange} pattern="/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i" required></input>
                                    <span className = "form__item-error email-input-error">{emailError}</span>
                                </label>

                                <label className="active-form__label"> Прикрепить файл
                                    <input type="file" name='file' id="form__file" className="form__file"  ref={inputRef }
                                           onChange={(e)=>{
                                              handleFileChange(e)
                                               setNamePhoto(inputRef.current.files[0].name)
                                           }}></input>
                                    <label htmlFor="form__file" className="form__file-label">
                                        <div className="form__file-text" id="form__file-text">{namePhoto}</div>
                                        <div className='attach'></div>
                                    </label>
                                    <span className = "form__item-error email-input-error"></span>
                                </label>
                            </div>
                        </div>

                        <div className="form__control-bottom">
                            <label className="active-form__label"> Сообщение *
                                <textarea type="text" name="message" className="form__input form__input_textarea " placeholder="Placeholder" value={feedback.message} onChange={handleChange} minLength={4} maxLength={2000} ></textarea>
                            </label>
                        </div>
                            <div className="dropdown-input checkbox-label">
                                    <input
                                        type="checkbox"
                                        id="agree-checkbox"
                                        className="checkbox-dropdown"
                                        name="agree"
                                        isChecked={isChecked}
                                        onChange={handleChangeCheckbox}
                                    />
                                  <label htmlFor="agree-checkbox" className="dropdown-label feedback-drop">Нажимая на кнопку “отправить”, я даю согласие на <a href="#" className="link link-m">обработку персональных данных</a></label>
                            </div>
                        <div className="feedback-button">
                            <input type="submit" className="button orange-button button-s" disabled={!isValid} value='Отправить'></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default FeedBackForm