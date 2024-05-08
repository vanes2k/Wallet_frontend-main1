import {React, useState} from "react";

import Trash from "../../images/active-icon/trash.svg"
import './DeleteConfirmation.css'


function DeleteAsset ({isOpened,handleClose}) {

    const [page, setPage] = useState(1);

    function ConfirmPage () {
        setPage(2);
    }

    if (page === 1) {
        return (
            <div className="delete-active">
                <div className={isOpened ? "popup popup_opened" : "popup"}>
                    <div className="popup__container">
                        <div className="popup__header">
                            <button className="close-button"></button>
                            <h3 className="title popup__title margin-top">Подтвердите действие</h3>
                        </div>

                        <div className="delete-message">
                            <p className="paragraph delete-text">Вы хотите удалить актив? </p>
                        </div>

                        <div className="form-flex-wraper button-delete">
                            <button type="button" className="button white-button button-s">{"Отменить"}</button>
                            <button type="button" className="button orange-button button-s" onClick={ConfirmPage} >{"Удалить"}</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
        else if (page === 2){
        return (
            <div className="delete-active">
                <div className={isOpened ? "popup popup_opened" : "popup" }>
                    <div className="popup__container delete-box">
                        <div className="popup__header">
                            <button className="close-button" onClick={handleClose}></button>
                            <h3 className="title popup__title margin-top">Актив удален!</h3>
                        </div>

                        <div className="delete-message">
                            <img src={Trash} alt="Корзина"/>
                        </div>

                        <div className="form-flex-wraper button-delete">
                            <button type="button" className="button orange-button button-l button-no-margin">{"Вернуться на главную"}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default DeleteAsset