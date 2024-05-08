import './Notification.css'

import {React, useState, useContext} from "react";
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';


function Notification() {

    const currentUser = useContext(CurrentUserContext)
    const [isCheckedEmail, setIsCheckedEmail] = useState(currentUser)
    const [isCheckedPush, setIsCheckedPush] = useState(currentUser)
    function handleChangeCheckboxEmail() {
        setIsCheckedEmail(!isCheckedEmail)
    }
    function handleChangeCheckboxPush() {
        setIsCheckedPush(!isCheckedPush)
    }

    return (
        <div className='notification'>
            <div className="notification-header">
                <h2 className='all-assets__title small'>Уведомления</h2>
                <p className='paragraph notification-paragraph'>Вы можете получать важные уведомления о вашей учетной записи, они будут отображаться справа в верхней панели.</p>
            </div>

            <div className="notification-main">
                <h3 className="divisions">Подписка</h3>

                <div className="notice">
                    <div className="switch-text">
                        <span className="paragraph description">Вам будут приходить уведомления о том, что подписка подходит к концу</span>
                    </div>
                    <div className="switch-button">
                        <label className="checkbox" >
                            <input type="checkbox" className="checkbox-input" checked={isCheckedPush} onChange={handleChangeCheckboxPush}></input>
                            <span className='checkbox-switch'></span>
                            <span className='checkbox-text switch-text'>Push</span>
                        </label>
                        <label className="checkbox" >
                            <input type="checkbox" className="checkbox-input" checked={isCheckedEmail} onChange={handleChangeCheckboxEmail}></input>
                            <span className='checkbox-switch'></span>
                            <span className='checkbox-text switch-text'>Email</span>
                        </label>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Notification