import React, {useState} from "react";

import "./Statistics.css"

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import SwingButton from "../../components/SwingButton/SwingButton";
import Notification from "../../components/NotificationPopup/NotificationPopup";

function Statistics({switchTheme, openNotification, closePopups, handleOpenNotification, logOut}) {

    const [activButton, setActivButton] = useState("realty");
    const [activButtonCost, setActivButtonCost] = useState("day")


    function changeActivButtonCost(e) {
        setActivButtonCost(e.target.name)
    }

    function changeActivButton(e) {
        setActivButton(e.target.name)
    }

  return (
    <>
        <div className="main">
      <Header 
      openNotification={handleOpenNotification}
        switchTheme={switchTheme}
        />
      <Sidebar logOut ={logOut}/>
      <section className="statistics" >
          <div className="statistics__bag">

              <div className="statistics__bag-box">
                  <div className="bag__item">
                      <div className="bag__item-text">
                          <span className="paragraph color-header">Общая стоимость портфеля</span>
                      </div>
                      <div className="bag__item-money">
                          <span className="paragraph paragraph_xl color-header">20 000 000 ₽</span>
                          <span className="paragraph paragraph-s text-green margin-left">+3,75 %</span>
                      </div>
                  </div>

                  <div className="bag__item">
                      <div className="bag__item-text">
                          <span className="paragraph color-header">Доходность</span>
                      </div>
                      <div className="bag__item-money">
                          <span className="paragraph paragraph_xl color-header">+10 %</span>
                      </div>
                  </div>
              </div>

              <div className="statistics__bag-box">
                  <div className="bag__item">
                      <div className="bag__item-text">
                          <span className="paragraph color-header">Прибыль</span>
                      </div>
                      <div className="bag__item-money">
                          <span className="paragraph paragraph_xl color-header">2 400 000 ₽</span>
                          <span className="paragraph paragraph-s text-green margin-left">+10 %</span>
                      </div>
                  </div>

                  <div className="bag__item">
                      <div className="bag__item-text">
                          <span className="paragraph color-header">Оборот за все время</span>
                      </div>
                      <div className="bag__item-money">
                          <span className="paragraph paragraph_xl color-header">20 000 000 ₽</span>
                          <span className="paragraph paragraph-s text-green margin-left">+3,75 %</span>
                      </div>
                  </div>
              </div>
          </div>


          <div className="table-active">
              <SwingButton
                  activButton={activButton}
                  changeActivButton={changeActivButton}
                  items={[
                      {name: "realty", description: "Недвижимость"},
                      {name: "transport", description: "Транспорт"},
                      {name: "deposit", description: "Вклады"},
                      {name: "broker-account", description: "Брокерские счета"},
                      {name: "сrypto", description: "Криптовалюта"},
                      {name: "digital-ruble", description: "Цифровой рубль"},
                  ]}
              />

              <div className="table table__statistics">

                  <div className="table__row">
                      <div className="table__header-text w-60">
                          <span className="paragraph paragraph-gray">Актив</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Нач.цена</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Тек.цена</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Прибыль, ₽</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Доход, %</span>
                      </div>
                  </div>

                  <div className="table__row">
                      <div className="table__header-text w-60">
                          <span className="paragraph paragraph-gray">Актив</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Нач.цена</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Тек.цена</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Прибыль, ₽</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Доход, %</span>
                      </div>
                  </div>

                  <div className="table__row">
                      <div className="table__header-text w-60">
                          <span className="paragraph paragraph-gray">Актив</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Нач.цена</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Тек.цена</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Прибыль, ₽</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Доход, %</span>
                      </div>
                  </div>

                  <div className="table__row">
                      <div className="table__header-text w-60">
                          <span className="paragraph paragraph-gray">Актив</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Нач.цена</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Тек.цена</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Прибыль, ₽</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Доход, %</span>
                      </div>
                  </div>

                  <div className="table__row">
                      <div className="table__header-text w-60">
                          <span className="paragraph paragraph-gray">Актив</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Нач.цена</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Тек.цена</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Прибыль, ₽</span>
                      </div>
                      <div className="table__header-text w-10">
                          <span className="paragraph paragraph-gray">Доход, %</span>
                      </div>
                  </div>
              </div>
          </div>

          <div className="cost__active">
              <h2 className='title_m all-assets__title'>Стоимость активов</h2>

              <div className="cost__active-charts">

                  <div className="cost__active-chart">
                      <SwingButton
                          activButton={activButtonCost}
                          changeActivButton={changeActivButtonCost}
                          items={[
                              {name: "day", description: "День"},
                              {name: "week", description: "Неделя"},
                              {name: "mouth", description: "Месяц"},
                              {name: "all", description: "За все время"},
                          ]}
                      />
                  </div>

                  <div className="cost__active-chart">
                      <SwingButton
                          activButton={activButtonCost}
                          changeActivButton={changeActivButtonCost}
                          items={[
                              {name: "day", description: "День"},
                              {name: "week", description: "Неделя"},
                              {name: "mouth", description: "Месяц"},
                              {name: "all", description: "За все время"},
                          ]}
                      />
                  </div>
              </div>

              <div className="cost__active-date">
                  <div className="button__date">
                      <div className="ico calendar"></div>
                      <span className="date-text">Выбрать период</span>
                  </div>
              </div>


          </div>

          <div className="cost__dynamics">
              <h2 className='title_m all-assets__title'>Динамика стоимости</h2>

              <div className="dynamics-chart">

              </div>
          </div>

      </section>
    </div>

    <Notification 
    isOpen={openNotification}
    onClose={closePopups}
  />
    </>

  )
}

export default Statistics;