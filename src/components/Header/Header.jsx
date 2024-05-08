import {React, useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";

import { CurrentThemeContext } from "../../contexts/CurrentThemeContext";

import './Header.css';
import avatar from "../../images/avatar.svg";
import Notification from "../NotificationPopup/NotificationPopup";

function Header({openNotification, switchTheme}) {

  const theme = useContext(CurrentThemeContext); //Подписка на тему)
  const sms =['ляляля'];
  const [bellActive, setBellActive] = useState(false)

  useEffect(() => {
    if (sms.length !== 0) {
      setBellActive(true)
    }
  }, [sms])

  

    return (
        <section className="header">
          {/* <label className="header__search">
            <input type="text" className="header__search-input" placeholder="Поиск..."></input>
            <span className='search-icon' ></span>
          </label> */}
          <div className="header__container">
            <label className="header__checkbox">
            <input type="checkbox" className="header__checkbox-input" onChange={switchTheme} checked={theme}></input>
            <span className="checkbox-switch"></span>
          </label>
         
          <button onClick={openNotification} className= "call-button"><span className={bellActive ? " bell bell_active" : "bell"}>{sms.length}</span></button>
          <div className="header_profile-info">
            <img className="profile-info__avatar" src={avatar} alt="аватар пользователя"></img>
            <Link to="/auth"><p className="link header__paragraph">{"Петров Петр"}</p></Link>
          </div>
          </div>
          
        </section>
    )
}

export default Header;