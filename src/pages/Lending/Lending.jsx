import {React, useEffect, useState} from "react";

import HeaderLend from './HeaderLend/HeaderLend';
import FooterLend from './FooterLend/FooterLend';

import logoImage from '../../images/lending/logo-image.svg';

import LaptopControl from '../../images/lending/LaptopControl.png';
import LaptopInfo from '../../images/lending/LaptopInfo.png';
import LaptopAnalytics from '../../images/lending/LaptopAnalytics.png';
import LaptopScreen from '../../images/lending/LaptopScreen.png';

import './Lending.css';

function Lending({setIsLogin}) {

  const [activButton, setActivButton] = useState("month");
  
  function changeActivButton(e) {
    setActivButton(e.target.name)
  }

  return (
  <div className="lending">
    <HeaderLend setIsLogin={setIsLogin}/>

    <div className="landing-main">
      <div className="promo">
        <h1 className="landing__title promo__title">Отслеживайте свой капитал в одном приложении</h1>
        <p className="landing__paragraph promo__paragraph">Capital Control автоматически отслеживает изменения цены ваших активов и отображает результаты в режиме реального времени.</p>
        <button className="button orange-button promo-button">Попробовать бесплатно 7 дней</button>
      </div>
    </div>

    <div className="about-project" id="about-project">
      <h3 className="landing__title advantages__title">О проекте</h3>
      <div className="scroll-wrapper" >
      <div className="about-project__container about-project__container_cards">
    
        <div className="about-card">
          <img className="about-card__image" alt="изображение раскрытого ноутбука" src={LaptopControl}/>
         
            <div className="about-project__info">
              <p className="about-card__title">Централизованный контроль</p>
              <p className="landing__paragraph about-card__paragraph">Используя наше приложение, вы получаете возможность мониторинга финансовыми активами в общем портфеле, упрощая их контроль.</p>
            </div>
            </div>
            <div className="about-card">
              <img className="about-card__image" alt="изображение раскрытого ноутбука" src={LaptopInfo} />
              <div className="about-project__info">
                
                <p className="about-card__title">Детализированная информация</p>
                <p className="landing__paragraph about-card__paragraph">Вы получаете подробную информацию о каждом активе, включая текущую стоимость, изменения цены и другие необходимые данные.</p>
              </div>
            </div>
            <div className="about-card"> 
              <img className="about-card__image" alt="изображение раскрытого ноутбука" src={LaptopAnalytics} />
              <div className="about-project__info">
                <p className="about-card__title">Аналитика и отчётность</p>
                <p className="landing__paragraph about-card__paragraph">Вы принимаете оптимальные решения по&nbsp;своим активам, получая аналитические данные приложения.</p>
              </div>     
            </div>
         <div>
          
         </div>
        </div>
      </div>
      <div className="about-project__container about-project__container_big">
        <div className="about-project__info about-project__info_big">
          <p className="about-card__title about-card__title_big">Принимайте правильные решения с вашими деньгами</p>
          <p className="landing__paragraph about-card__paragraph">Данные о финансовых активах обычно хранятся в защищённом режиме, что обеспечивает конфиденциальность информации.</p>
          <p className="landing__paragraph about-card__paragraph">Веб-приложение доступно с любого компьютера, в любое&nbsp;время из любой точки мира.</p>
        </div>
        <img className="about-project__image" alt="изображение раскрытого ноутбука" src={LaptopScreen} />
      </div>
    </div>

    <div className="promo-two">
      <div className="logo promo-two__logo">
        <img className="logo__image" alt="логотип ИТ и Компания" src={logoImage} />
        <p className="logo__text">Capital Control</p>
      </div>
      <p className=" landing__paragraph paragraph_big">С Capital Control вам будет доступен безопасный онлайн-сервис, где вы сможете анализировать информацию о всех своих активах, акциях, облигациях, недвижимости, частных инвестициях, криптовалюты и автомобилей.</p>
      <button className="button orange-button promo-button">Попробовать бесплатно 7 дней</button>
    </div>

    <div className="advantages" id="advantages">
      <h3 className="landing__title advantages__title advantages__title_no-margin">Почему люди доверяют Capital Control</h3>
      <div className="scroll-wrapper" >
      <div className="advantages__cards">
        <div className="advantages-card" id="c1">
          <div className="advantages-card-info">
            <p className="advantages-card__title">Динамика</p>
            <p className="landing__paragraph">Постоянный мониторинг активов и изменение цен на них.</p>
          </div>
          <div className="advantages-card__3D-icon"></div>
        </div>
        <div className="advantages-card" id="c2">
        <div className="advantages-card-info">
            <p className="advantages-card__title">Наглядность</p>
            <p className="landing__paragraph">В одной категории собраны все активы в зависимости от их типа.</p>
          </div>
          <div className="advantages-card__3D-icon"></div>
        </div>
        <div className="advantages-card" id="c3">
        <div className="advantages-card-info">
            <p className="advantages-card__title">Безопасность</p>
            <p className="landing__paragraph">Защита обмена данными между пользователями и Capital Control в публичных местах.</p>
          </div>
          <div className="advantages-card__3D-icon"></div>
        </div>
        <div className="advantages-card" id="c4">
        <div className="advantages-card-info">
            <p className="advantages-card__title">Структурированность</p>
            <p className="landing__paragraph">Удобное и централизованное отслеживание всех финансовых активов из любой точки мира.</p>
          </div>
          <div className="advantages-card__3D-icon"></div>
        </div>
      </div>
      </div>
    </div>



    <div className="rates" id="rates">
      <div className="rates-title__container">
        <h3 className="landing__title advantages__title advantages__title_rates">Принимайте взвешенные решения по&nbsp;вашим активам</h3>
        <div className="button swing-button__container landing__swing-button__container rates-swing-button">
                 {/* <SwingButton 
          activButton={activButton}
          changeActivButton={changeActivButton}
          items={[
            {name: "month", description: "На месяц"},
            {name: "sixMonths", description: "Полгода"},
            {name: "year", description: "Год"},
          ]}
          /> */}
          <button name='month' onClick={changeActivButton} className={activButton==='month' ? "button swing-button landing__swing-button swing-button_rates" : "button landing__swing-button_disabled swing-button landing__swing-button swing-button_rates"} >{"На месяц"}</button>
          <button name='sixMonths' onClick={changeActivButton} className={activButton==='sixMonths' ? "button swing-button landing__swing-button swing-button_rates" : "button swing-button landing__swing-button landing__swing-button_disabled swing-button_rates"}  >{"Полгода"}</button>
          <button name='year' onClick={changeActivButton} className={activButton==='year' ? "button swing-button landing__swing-button swing-button_rates" : "button swing-button landing__swing-button landing__swing-button_disabled swing-button_rates"}  >{"Год"}</button>
        </div> 
      </div>
  
    <div className="about-project__container rates__container">
      <div className="rates-card">
        <p className="rates-card__title">Премиум</p>
        <div className="rates-card__paragraph-container">
          <span className="rates-card__icon"></span>
          <p className="landing__paragraph rates-card__paragraph">Все категории активов: недвижимость, вклад, драгоценные металлы, криптовалюта, брокерские счета, транспорт</p>
        </div>
        <div className="rates-card__paragraph-container">
          <span className="rates-card__icon"></span>
          <p className="landing__paragraph rates-card__paragraph">Статистика роста/падения стоимости&nbsp;активов</p>
        </div>
        <div className="rates-card__paragraph-container">
          <span className="rates-card__icon"></span>
          <p className="landing__paragraph rates-card__paragraph">Удобный способ отображения информации</p>
        </div>
        <div className="rates-card__paragraph-container">
          <span className="rates-card__icon"></span>
          <p className="landing__paragraph rates-card__paragraph">Персональные уведомления</p>
        </div>
        <button className="button orange-button rates__button">Подключить подписку за 490р</button>
      </div>

      <div className="rates-card">
        <p className="rates-card__title">Пробный период</p>
        <div className="rates-card__paragraph-container">
          <span className="rates-card__icon"></span>
          <p className="landing__paragraph rates-card__paragraph">Все категории активов: недвижимость, вклад, драгоценные металлы, криптовалюта, брокерские счета, транспорт</p>
        </div>
        <div className="rates-card__paragraph-container">
          <span className="rates-card__icon"></span>
          <p className="landing__paragraph rates-card__paragraph">Статистика роста/падения стоимости&nbsp;активов</p>
        </div>
        <div className="rates-card__paragraph-container">
          <span className="rates-card__icon"></span>
          <p className="landing__paragraph rates-card__paragraph">Удобный способ отображения информации</p>
        </div>
        <div className="rates-card__paragraph-container">
          <span className="rates-card__icon"></span>
          <p className="landing__paragraph rates-card__paragraph">Персональные уведомления</p>
        </div>
        <button className="button white-button landing__white-button rates__button">Попробовать бесплатно</button>
      </div>
    </div>
    </div>

    <FooterLend />
  </div>
  )
}

export default Lending;