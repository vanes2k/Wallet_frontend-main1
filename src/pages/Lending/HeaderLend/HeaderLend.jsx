import {React, useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";

import logoImage from '../../../images/lending/logo-image.svg'

import './HeaderLend.css';

function HeaderLend({setIsLogin}) {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const openBurger = () => {
    setIsBurgerOpen(true);
  }
  const closeBurger = () => {
    setIsBurgerOpen(false);
  }

  const navigate = useNavigate();    

  const goToLogin = () => {
    setIsLogin(true)
    navigate('/auth');
  };
  const goToRegister = () => {
    setIsLogin(false)
    navigate('/auth');
  };
  
  return (
    <header className="lending-header">
      <Link to='/' className="logo">
      <div className="burger" onClick={openBurger}></div>
      <div className={isBurgerOpen ? "burger__menu burger__menu_opened" : "burger__menu"}>
        <div className="close-button landing__close-button" onClick={closeBurger}></div>
        <nav className="lending-menu lending-menu_burger">
          <a className="nav__item nav__item_burger" href="#main">Главная</a>
          <a className="nav__item nav__item_burger" href="#about-project">О проекте</a>
          <a className="nav__item nav__item_burger" href="#advantages">Преимущества</a>
          <a className="nav__item nav__item_burger" href="#rates">Тарифы</a>
          <a className="nav__item nav__item_burger" href="#">Контакты</a>

          <button className="orange-button button burger__button">Попробовать бесплатно 7 дней</button>
          <button className="white-button landing__white-button button burger__button burger__button_white" onClick={goToRegister}>Зарегистрироваться</button>
        </nav> 
       
      </div>

        <img className="logo__image logo__image_header" alt="логотип ИТ и Компания" src={logoImage} />
        <p className="logo__text logo__text_header">Capital Control</p>
      </Link>
      <nav className="lending-menu">
          <a className="nav__item" href="#about-project">О проекте</a>
          <a className="nav__item" href="#advantages">Преимущества</a>
          <a className="nav__item" href="#rates">Тарифы</a>
          <a className="nav__item" href="#">Контакты</a>
        </nav> 
      <div className="lending__header__buttons">
        <button className="button white-button landing__white-button to-register" onClick={goToRegister}>Зарегистрироваться</button>
        <button className="button orange-button to-login" onClick={goToLogin}>Войти</button>
      </div>
    </header>
  )
}

export default HeaderLend;