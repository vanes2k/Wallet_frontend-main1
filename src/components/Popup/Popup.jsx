import {React, useState, useEffect, useContext} from "react";

import './Popup.css';

import TypeCategory from "./TypeCategory/TypeCategory";


function Popup({ isOpened, isClose, handleNewDidgitalRuble, postDeposit, postMetals, isOk, setIsOk}) {


  const [activeCategory, setActiveCategory] = useState('');
  const [realtyCategory, setRealtyCategory] = useState('');
  const [transportCategory, setTransportCategory] = useState('');
  const [depositCategory, setDepositCategory] = useState('');
  const [cryptoCurrency, setCryptoCurrency] = useState('');
  const [stocks, setStocks] = useState('')

  function handleClose() {
    setActiveCategory('')
    setRealtyCategory('')
    isClose()
  }


  return (
    <div className={isOpened ? "popup popup_opened" : "popup" }>
      <div className="popup__container">
         <TypeCategory

         isOk={isOk}
         setIsOk={setIsOk}
         postMetals={postMetals}
            postDeposit={postDeposit}
            handleNewDidgitalRuble={handleNewDidgitalRuble}

            handleClose={handleClose}
            
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}

            realtyCategory={realtyCategory}
            setRealtyCategory={setRealtyCategory}

            transportCategory={transportCategory}
            setTransportCategory={setTransportCategory}

            depositCategory={depositCategory}
            setDepositCategory={setDepositCategory}

            cryptoCurrency={cryptoCurrency}
            setCryptoCurrency={setCryptoCurrency}

            stocks={stocks}
            setStocks={setStocks}
         />
      </div>
      
    </div>
  )
}

export default Popup;