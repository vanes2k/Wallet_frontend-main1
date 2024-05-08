import {React, useState} from "react";

import SwingButton from "../SwingButton/SwingButton";

import './CapitalList.css';

function CapitalList({handlerOpenChange}) {

  const [activButton, setActivButton] = useState("all-assets");
  
  function changeActivButton(e) {
    setActivButton(e.target.name)
    // console.log(e.target.name)
  }

    return (
      // <section className="capital-list">
      <>
          <div className="all-assets__info">
            <h3 className="all-assets__title">Общий&nbsp;портфель</h3>
            <p className="paragraph paragraph_all-assets">Когда вы добавите свои активы, здесь будет расположен график,&nbsp;отражающий соотношение ваших активов</p>
          </div>
          <div className="card-list">
            <div className="card" id='card1'> 
              <p className="card-title"><span className="card-icon realty"></span>Недвижимость&nbsp;&#91;0&#93;</p>
              <p className="card-sum">4 000 000 р</p>
            </div>

            <div className="card" id='card2'>
              <p className="card-title"><span className="card-icon bitcoin"></span>Криптовалюта&nbsp;&#91;0&#93;</p>
              <p className="card-sum">4 000 000 р</p>
            </div>
            
            <div className="card" id='card3'>
              <p className="card-title"><span className="card-icon deposit"></span>Вклады&nbsp;&#91;0&#93;</p>
              <p className="card-sum">4 000 000 р</p>
            </div>

            <div className="card" id='card4'>
              <p className="card-title"><span className="card-icon transport"></span>Транспорт&nbsp;&#91;0&#93;</p>
              <p className="card-sum">4 000 000 р</p>
            </div>

            <div className="card" id='card5'>
              <p className="card-title"><span className="card-icon digital-ruble"></span>Цифровой рубль&nbsp;&#91;0&#93;</p>
              <p className="card-sum">4 000 000 р</p>
            </div>

            <div className="card" id='card6'>
              <p className="card-title"><span className="card-icon broker-account"></span>Брокерские&nbsp;счета&nbsp;&#91;0&#93;</p>
              <p className="card-sum">4 000 000 р</p>
            </div>
          </div>

<SwingButton 
activButton={activButton}
changeActivButton={changeActivButton}
items={[
  {name: "all-assets", description: "Весь портфель"},
  {name: "realty", description: "Недвижимость"},
  {name: "transport", description: "Транспорт"},
  {name: "deposit", description: "Вклады"},
  {name: "broker-account", description: "Брокерские счета"},
  {name: "bitcoin", description: "Криптовалюта"},
  {name: "digital-ruble", description: "Цифровой рубль"},
]}
/>

          <div className="swing-button__container swing-button__container_capital">
            <button className={activButton==="all-assets" 
              ? "button  swing-button swing-button_capital" 
              : "button  swing-button swing-button_capital swing-button_disabled" }
              name='all-assets' 
              onClick={(e) => changeActivButton(e)}>{"Весь портфель"}
              </button>
            <button className={activButton==="realty" 
              ? "button  swing-button swing-button_capital" 
              : "button  swing-button swing-button_capital swing-button_disabled" } 
              name='realty' 
              onClick={(e) => changeActivButton(e)}>{"Недвижимость"}
              </button>
            <button className={activButton==="transport" 
              ? "button swing-button swing-button_capital" 
              : "button swing-button swing-button_capital swing-button_disabled" }
              name='transport' 
              onClick={(e) => changeActivButton(e)}>{"Транспорт"}
              </button>
            <button className={activButton==="deposit" 
              ? "button swing-button swing-button_capital" 
              : "button swing-button swing-button_capital swing-button_disabled" }
              name='deposit' 
              onClick={(e) => changeActivButton(e)}>{"Вклады"}
              </button>
            <button className={activButton==="broker-account" 
              ? "button swing-button swing-button_capital" 
              : "button swing-button swing-button_capital swing-button_disabled" }
              name='broker-account' 
              onClick={(e) => changeActivButton(e)}>{"Брокерские счета"}
              </button>
            <button className={activButton==="bitcoin" 
              ? "button swing-button swing-button_capital" 
              : "button swing-button swing-button_capital swing-button_disabled" }
              name='bitcoin' 
              onClick={(e) => changeActivButton(e)}>{"Криптовалюта"}
              </button>
            <button className={activButton==="digital-ruble" 
              ? "button swing-button swing-button_capital" 
              : "button swing-button swing-button_capital swing-button_disabled" }
              name='digital-ruble' 
              onClick={(e) => changeActivButton(e)}>{"Цифровой рубль"}
              </button>
          </div>    

          <div className="capital__nav">
            <button className="button nav__button" id='activ'>Актив</button>
  
            <div className="nav-wrapper">
              <button className="button nav__button">Нач.цена</button>
              <button className="button nav__button">Тек.цена</button>
              <button className="button nav__button">Прибыль, &#8381;</button>
              <button className="button nav__button">Доход, %</button>
            </div>

          </div>
          <div className="capital__items">
            <p className="paragraph paragraph_items">Здесь пока пусто, добавьте свой первый актив</p>
            <button className="sota-button sota-button_capital" onClick={handlerOpenChange}></button>
          </div>
       {/* </section> */}
      </>
    )
}

export default CapitalList;