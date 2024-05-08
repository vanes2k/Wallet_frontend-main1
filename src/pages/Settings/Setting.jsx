import {React, useState} from "react";

import './Setting.css';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import SelectCurrency from "./SelectCurrency/SelectCurrency";
import Project from "./Project/Project";
import Rates from "./Rates/Rates";
import Notification from "./Notification/Notification";
import Profile from "./Profile/Profile";
import SwingButton from "../../components/SwingButton/SwingButton";
import DeleteAccount from "../../components/DeleteConfirmation/DeleteAccount";
import ConnectScore from "./ConnectScore/ConnectScore";
import ChangePassword from "../../components/СhangePassword/СhangePassword";

import NotificationPopup from "../../components/NotificationPopup/NotificationPopup";

function Setting({
  deleteUser,
  patchUser,
  logOut,
  isOk,
  changePassword,

  closePopups, 
  switchTheme, 
  hendlerOpenModal, 
  hendlerOpenChange, 
  openModal, 
  closeModal, 
  openChange, 
  closeChange, 
  handleOpenNotification, 
  openNotification,
}) {

    const [activButton, setActivButton] = useState("select-currency")


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

          <Sidebar logOut={logOut}/>

          <section className='setting'>

            <h2 className='all-assets__title title-margin'>Настройки</h2>

              <SwingButton
                  activButton={activButton}
                  changeActivButton={changeActivButton}
                  items={[
                      {name: "connect-score", description: "Подключение счета"},
                      // {name: "select-currency", description: "Выбор валюты"},
                      {name: "notification", description: "Уведомления"},
                      {name: "rates", description: "Тарифы"},
                      {name: "project", description: "О проекте"},
                      {name: "account", description: "Профиль"},
                  ]}
              />


              {activButton === "connect-score" &&
                  <ConnectScore/>
              }
            {activButton === "select-currency" &&
              <SelectCurrency/>
            }
            {activButton === "project" &&
              <Project/>
            }
            {activButton === "rates" &&
                <Rates/>
            }
            {activButton === "notification" &&
                <Notification/>
            }
            {activButton === "account" &&
                <Profile patchUser={patchUser} hendlerOpenModal = {hendlerOpenModal} hendlerOpenChange={hendlerOpenChange} />
            }
          </section>

            <DeleteAccount submit={deleteUser} isOpened={openModal} isClose={closeModal}/>
            <ChangePassword isOpened={openChange} handleClose={closeChange}  isOk ={isOk} submit={changePassword}/>
        </div>

        <NotificationPopup 
    isOpen={openNotification}
    onClose={closePopups}
  />
      </>
    )
}

export default Setting;