import {React, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";

import logoImage from '../../../images/lending/logo-image.svg'


function FooterLend() {

  useEffect(() => {
    goTop()
  }, [])

  function goTop() {
    window.scrollTo(0, 0)
  }

  return (
    <footer className="footer">
      <div className="footer__menu">
      <Link to='/' on onClick={goTop} className="logo logo_footer">
        <img className="logo__image" alt="логотип ИТ и Компания" src={logoImage} />
        <p className="logo__text">Capital Control</p>
      </Link>
        <p className="footer__title about-title">О проекте</p>
        <ul className=" footer-menu footer__about">
          <li className="footer-menu__paragraph"><a className="footer-link" href="#about-project">О проекте</a></li>
          <li className="footer-menu__paragraph paragraph"><a className="footer-link" href="#advantages">Преимущества</a></li>
          <li className="footer-menu__paragraph paragraph"><a className="footer-link" href="#rates">Тарифы</a></li>
          <li className="footer-menu__paragraph paragraph"><a className="footer-link" href="#">Помощь</a></li>
        </ul>

        <p className="footer__title docs-title">Документы</p>
        <ul className="footer-menu footer__docs">
          <li className="footer-menu__paragraph paragraph"><Link className="footer-link" to='/license-agreement'>Лицензионное соглашение</Link></li>
          <li className="footer-menu__paragraph paragraph"><Link className="footer-link" to="/privacy-policy">Политика конфиденциальности</Link></li>
          <li className="footer-menu__paragraph paragraph"><a className="footer-link" href="#">ООО ИТ и компания</a></li>
          <li className="footer-menu__paragraph paragraph"><a className="footer-link" href="#">ИНН 5038179405</a></li>
          <li className="footer-menu__paragraph paragraph"><a className="footer-link" href="#">ОГРН 1235000073486</a></li>
        </ul>
      </div>

      <div className="footer__cookie-info">
        <p className="paragraph footer__paragraph">ООО «ИТ и компания» использует файлы «cookie», с целью улучшения качества продукта. «Сookie» это небольшие файлы, содержащие информацию о предыдущих посещениях веб-сайта. <Link to='/' className="link footer__link ">Узнать больше</Link></p>
        <button className="button white-button landing__white-button footer__button">ОК</button>
      </div>
    </footer>
  )
}

export default FooterLend;