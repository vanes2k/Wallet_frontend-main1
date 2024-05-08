import {React, useState} from "react";
import { NavLink, Link } from "react-router-dom";

import FeedBackForm from "../Feedback/FeedBackForm";
import axios from "axios";
import { URL } from "../../utils/constants";

import "./Sidebar.css";

function Sidebar({logOut}) {

function postFeedback(form) {
  const token = sessionStorage.getItem('token');
  axios({
    url: `${URL}/support_service/`,
    method: 'POST',
    headers: {
      "Authorization":`Bearer ${token}`
    }, 
    data: {
      name: form.name,
      phone: form.phone,
      email: form.email,
      text: form.message,
      // file: form.file,
    }
  })
  .then((res) => {
    console.log('ok')
  })
  .catch((error) => {
    console.log(error)
  })
}


const [isOpen, setIsOpen] = useState(false)

function handleFeedBackOpen() {
  setIsOpen(true)
}
function handleFeedBackClose() {
  setIsOpen(false)
}


  return (
    <section className="sidebar">
      <nav className="menu">
        <div className="menu__links">
            <NavLink to='/main' id='main' className="link link_menu" ><div className="menu-icon menu-icon_home"></div>Главная</NavLink> 
            <NavLink to='/statistics' className="link link_menu" ><div className="menu-icon menu-icon_statistics"></div>Статистика</NavLink> 
           <NavLink to='/setting' className="link link_menu" ><div className="menu-icon menu-icon_settings"></div>Настройки</NavLink>
           <Link onClick={handleFeedBackOpen} className="link link_menu" ><div className="menu-icon menu-icon_support"></div>Поддержка</Link>
        </div>
        <Link className="link link_menu" onClick={logOut}><div className="menu-icon menu-icon_exit"></div>Выход</Link>
      </nav>

      <FeedBackForm isOpened={isOpen} isClose={handleFeedBackClose} submit={postFeedback}  />
    </section>
  )
}


export default Sidebar;