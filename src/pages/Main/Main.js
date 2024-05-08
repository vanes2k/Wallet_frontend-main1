import React from "react";

import "./Main.css"

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import CapittalCard from "../../components/CapitalCard/CapitalCard";

import Popup from "../../components/Popup/Popup";
import Notification from "../../components/NotificationPopup/NotificationPopup";

import { useEffect } from "react";

function Main({logOut, handleOpenNotification, openNotification, switchTheme, handlerOpenPopup, closePopups, newActivePopupOpened, isOk, setIsOk, handleNewDidgitalRuble, postDeposit, postMetals, user, metals}) {

  return (
    <>
        <div className="main">
      <Header 
        openNotification={handleOpenNotification}
        switchTheme={switchTheme}
        />
      <Sidebar logOut ={logOut}/>
      <CapittalCard 
      metals={metals}
        handlerOpenPopup={handlerOpenPopup}
      />
    </div>

    <Popup 

    user={user} 
    isOk={isOk}
    setIsOk={setIsOk}
    postMetals={postMetals}
    postDeposit={postDeposit}
    handleNewDidgitalRuble={handleNewDidgitalRuble}

    isOpened={newActivePopupOpened}
    isClose={closePopups}
    />
  <Notification 
    isOpen={openNotification}
    onClose={closePopups}
  />

    </>

  )
}

export default Main;