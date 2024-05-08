import {React, useState, useEffect, useContext} from "react";

import RealtyForm from "../Realty/RealtyForm";
import TransportForm from "../TransportForm/TransportForm";
import DepositForm from "../DepositForm/DepositForm";
import DigitalRuble from "../DigitalRuble/DigitalRuble";
import CryptoCurrency from "../СryptoСurrency/CryptoCurrency";
import StocksForm from "../Stocks/StocksForm";

import axios from "axios";
import { URL } from "../../../utils/constants";
import * as api from '../../../api/api'

import './TypeCategory.css';

function TypeCategory({

  handleClose, 
  activeCategory, 
  setActiveCategory, 
  realtyCategory, 
  setRealtyCategory, 
  transportCategory, 
  setTransportCategory, 
  depositCategory, 
  setDepositCategory, 
  cryptoCurrency, 
  setCryptoCurrency,
  
  isOk,
  setIsOk,
  postMetals,
  handleNewDidgitalRuble,
  postDeposit,
}) {

  const [page, setPage] = useState(-1);
  const [cities, setCities] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([])

  function handleSearchCities(search) {
    const token = sessionStorage.getItem('token');
    axios({
      url: `${URL}/cities/`,
      method: 'GET',
      params: {search: search},
      headers: {
        "Authorization":`Bearer ${token}`
      }, 
    })
    .then((res) => {
      setCities(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function getBrands() {
    const token = sessionStorage.getItem('token');
    axios({
      url: `${URL}/car-brands/`,
      method: 'GET',
      headers: {
        "Authorization":`Bearer ${token}`
      },
    })
    .then((res) => {
      setBrands(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function getModels(id) {
    const token = sessionStorage.getItem('token');
    axios({
      url: `${URL}/car-brands/${id}/models/`,
      method: 'GET',
      headers: {
        "Authorization":`Bearer ${token}`
      },
    })
    .then((res) => {
      setModels(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function postCar(active) {
    const token = sessionStorage.getItem('token');
    axios({
    url: `${URL}/car/`,
    method: 'POST',
    headers: {
      "Authorization":`Bearer ${token}`
    }, 
    data: {
      // "currency": "RUB",
      "display_in_general": active.isStatistic,
      "production_year": active.year,
      "purchase_date": active.date,
      "price": active.cost,
      "mileage": active.mileage,
      "engine_type": active.motor,
      "engine_capacity": active.motorSize,
      "gearbox_type": active.transmission,
      "brand": active.brand.value,
      "model": active.model.value,
    }
  })
    .then((res) => {
      // console.log(res.data)
      setIsOk(true)
    })
    .catch((error) => {
      console.log(error)
      setIsOk(false)
    })
  }

  function postBike(active) {
    const token = sessionStorage.getItem('token');
    axios({
    url: `${URL}/motorcycles/`,
    method: 'POST',
    headers: {
      "Authorization":`Bearer ${token}`
    }, 
    data: {
      // "currency": "RUB",
      "display_in_general": active.isStatistic,
      "production_year": active.year,
      "purchase_date": active.date,
      "price": active.cost,
      "mileage": active.mileage,
      "brand": active.brand,
      "model": active.model,
      "engine_capacity": active.motorSize,
    }
  })
    .then((res) => {
      setIsOk(true)
    })
    .catch((error) => {
      console.log(error)
      setIsOk(false)
    })
  }


// запоминаем выбранную категорию и идем на следующую (нулевую) страницу
  function handleChoice(e) {
    setActiveCategory(e.target.name)
    // console.log(activeCategory)
    setPage(page + 1)
  }

// закрытие попапа
  function handlePopupClose() {
    setPage(-1);
    handleClose();
  }

  return (
<>
    { activeCategory === '' || page===-1
    ?  (
      <> <div className="popup__header">
        <button className="popup__go-back-button popup__go-back-button_none"></button>
          <h3 className="title popup__title popup__title_big">
            Выберите категорию актива
          </h3>
          <button className="close-button" onClick={handlePopupClose}></button>
        </div> 

    <div className="category category__all">
      <button className="button category-button" name="realty" onClick={(e) => handleChoice(e)}><span className="card-icon card-icon_categores realty"></span>Недвижимость<span className="category__button-icon"></span></button>
      <button className="button category-button" name="deposit" onClick={(e) => handleChoice(e)}><span className="card-icon deposit"></span>Вклады<span className="category__button-icon"></span></button>
      <button className="button category-button" name="stocks" onClick={(e) => handleChoice(e)}><span className="card-icon stocks"></span>Акции<span className="category__button-icon"></span></button>
      <button className="button category-button" name="transport" onClick={(e) => handleChoice(e)}><span className="card-icon transport"></span>Транспорт<span className="category__button-icon"></span></button>
      <button className="button category-button" name="bitcoin" onClick={(e) => handleChoice(e)}><span className="card-icon bitcoin"></span>Криптовалюта<span className="category__button-icon"></span></button>
      <button className="button category-button" name="digital-ruble" onClick={(e) => handleChoice(e)}><span className="card-icon ruble"></span>Цифровой рубль<span className="category__button-icon"></span></button>
    </div>
      </>

    )
    : activeCategory==='realty'
    ? <RealtyForm  
    cities = {cities}
    handleSearchCities={handleSearchCities}
        page={page}
        setPage={setPage} 
        handleClose={handlePopupClose}
        realtyCategory={realtyCategory}
        setRealtyCategory={setRealtyCategory}
        setActiveCategory={setActiveCategory}
    />
    : activeCategory==='transport'
    ? <TransportForm 
    isOk={isOk}
    postCar={postCar}
    postBike={postBike}

    models={models}
    getModels={getModels}
      brands={brands}
      getBrands={getBrands}
        page={page}
        setPage={setPage} 
        handleClose={handlePopupClose}
        transportCategory={transportCategory}
        setTransportCategory={setTransportCategory}
        setActiveCategory={setActiveCategory}
      />
    : activeCategory==='deposit'
    ? <DepositForm 
    isOk={isOk}
    submitMetal={postMetals}
  submitMoney={postDeposit}
        page={page}
        setPage={setPage} 
        handleClose={handlePopupClose}
        depositCategory={depositCategory}
        setDepositCategory={setDepositCategory}
        setActiveCategory={setActiveCategory}
      />
      : activeCategory==='digital-ruble'
      ? <DigitalRuble 
      isOk={isOk}
      submit={handleNewDidgitalRuble}
          page={page}
          setPage={setPage} 
          handleClose={handlePopupClose}
          setActiveCategory={setActiveCategory}
        />
    : activeCategory==='bitcoin'
    ? <CryptoCurrency
          page={page}
          setPage={setPage}
          handleClose={handlePopupClose}
          cryptoCurrency={cryptoCurrency}
          setCryptoCurrency={setCryptoCurrency}
          setActiveCategory={setActiveCategory}
    /> : activeCategory==='stocks'
    ? <StocksForm
          page={page}
          setPage={setPage}
          handleClose={handlePopupClose}
          setActiveCategory={setActiveCategory}
        /> :
                        <></>
   }
</>
  )
}

export default TypeCategory;