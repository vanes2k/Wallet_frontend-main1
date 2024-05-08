import {React, useState} from "react";

import './Confirmation.css';

function Comfirmation({handleClose, setActiveCategory, setPage, type, isOk}) {
   
  function goBack() {
    console.log('F&')
    setActiveCategory('');
    setPage(-1);
  }

  function handleCloseConfirm() {
    setPage(0)
    handleClose()
  }
  // ручной переключатель ответа
  // const [isOk, setIsOk] = useState(true)
  const okMessage={
    title: 'Поздравляем!',
    info: 'Теперь Ваш актив будет отображаться на главной странице. Можно следить за его статистикой и т.д.',
    backButton: 'Добавить еще',

    changePassInfo: 'Ваш пароль успешно изменен! Теперь вы можете войти в свой аккаунт, используя новый пароль',
    // changePassButton: 'Вернуться в личный кабинет',
  }
  const errorMessage={
    title: 'Что-то пошло не так :(',
    info: 'К сожалению, нам не удалось добавить Ваш актив, попробуйте снова.',
    backButton: 'Попробовать еще',

    changePassInfo: 'Что-то пошло не так, попробуйте сменить пароль позже.',
    // changePassButton: 'Вернуться в личный кабинет',
  }

  return (
    <>
    {type==="changePass" 
    ?  (<div className="confirmation confirmation_change-password">
          <div>
          <div className={isOk ? "confirm confirm_change-password" : "confirm confirm_error"}></div>
          <p className="paragraph confirm_paragraph">{isOk ? okMessage.changePassInfo : errorMessage.changePassInfo}</p>
          </div>
         <button className="orange-button button" onClick={handleCloseConfirm} >Вернуться в личный кабинет</button>
        </div>
      )


    : ( <>
      <div>
        <div className={isOk ? "confirm confirm_ok" : "confirm confirm_error"}></div>
        <h3 className=" title title_s popup__title">{isOk ? okMessage.title : errorMessage.title}</h3>
        <p className="paragraph confirm_paragraph">{isOk ? okMessage.info : errorMessage.info}</p>
      </div>
       <div className="form-flex-wraper confirmation__form-flex-wraper">
          <button className="white-button button button-s" onClick={goBack}>{isOk ? okMessage.backButton : errorMessage.backButton}</button>
          <button className="orange-button button button-s" onClick={handleClose} >Перейти на главную</button>
        </div>   
        </> 
      )
    }
    </>
  )
}

export default Comfirmation;