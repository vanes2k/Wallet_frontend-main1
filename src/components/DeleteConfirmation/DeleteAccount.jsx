import {React} from "react";

import './DeleteConfirmation.css'

function DeleteAccount ({submit, isOpened, isClose}) {

    function handleClose () {
        isClose()
    }

    return (
            <div className={isOpened ? "popup popup_opened delete-confirm" : "popup delete-confirm" }>
                <div className="popup__container">
                    <div className="popup__header">
                        <button className="popup__go-back-button popup__go-back-button_none" onClick={handleClose}></button>
                        <h3 className="title popup__title">

                            <span className={"card-icon trash"}></span>
                            Удалить аккаунт ?
                        </h3>
                        <button className="close-button" onClick={handleClose}></button>
                    </div>

                    <div className="delete-message">
                        <p className="paragraph delete-text">Вы уверены, что хотите удалить аккаунт?</p>
                        <p className="paragraph delete-text">Личный кабинет «Capital Control» будет недоступен.</p>
                        <p className="paragraph delete-text">Вы больше не сможете войти или зарегистрировать  новый аккаунт с той же почты.</p>
                    </div>

                    <div className="form-flex-wraper">
                        <button type="button" className="button white-button button-s" onClick={handleClose} >{"Отменить"}</button>
                        <button type="button" className="button orange-button button-s" onClick={submit}>{"Да, удалить"}</button>
                    </div>
                </div>
            </div>


    )

}

export default DeleteAccount