import {React, useState} from "react";

import './NotificationPopup.css'

function Notification ({isOpen, onClose}) {



        return (
            <div className="notification-popup">
                <div className={isOpen ? "popup popup_opened" : "popup"}>
                    <div className="popup__container popup__notification">
                        {/* <div className="popup__header"> */}
                            <button className="close-button notification__close-button" onClick={onClose}></button>
                            {/* </div> */}
                            <p className="notification-time">Сегодня, 17:00</p>
                            <h3 className="notification-title">Ваша подписка заканчивается через 7 дней</h3>
                            <p className="paragraph">Подпишитесь на наши уведомления в разделе “Настройки”, и получайте уведомления на электронную почту</p>
                            <button type="button" className="button orange-button button_notification" onClick={onClose}>Продлить подписку</button>
                  
                    </div>
                </div>

            </div>
        )
  }

  export default Notification;