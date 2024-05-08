import {React, useState, useEffect} from 'react';

import DatePicker, {registerLocale} from "react-datepicker";
// import ru from 'date-fns/locale/ru';

import Comfirmation from "../Confirmation/Confirmation";

import { 
  dropOptions,

  emptyFieldErrorMessage,
  negativeErrorMessage,
  choiceErrorMessage,
} from "../../../utils/constants";

import './CryptoCurrency.css';

// import { isValid } from 'date-fns';

function CryptoCurrency({
      page,
      setPage,
      handleClose,
      cryptoCurrency,
      setCryptoCurrency,
      setActiveCategory
}) {

    const [isValid, setIsValid] =useState(false)
    const [isChecked, setIsChecked] = useState(true)// состояние чекбокса
    const [radio, setRadio] = useState(true)
    const [isOptionStockMarketDown, setIsOptionStockMarketDown] = useState(false)

    const [wallet, setWallet] = useState({
      coldType: radio,
      hotType: !radio,
      nameOfWallet: '',
      sumUsdt: '',
      isStatistic: isChecked,
    })
  
    const [walletErrors, setWalletErrors] = useState({
      nameOfWallet: null,
      sumUsdt: null,
    })

    const [market, setMarket] = useState({
      stockMarket:'',
      apiKey:'',
      secretKey:'',
      isStatistic: isChecked,
    })
 
    const [marketErrors, setMarketErrors] = useState({
      stockMarket: '',
      apiKey: null,
      secretKey: null,
    })

    // Отзычивая валидность формы жилой недвижимости
    useEffect(() => {
      if (cryptoCurrency === 'wallet') {
        setIsValid(!Object.values(walletErrors).some(x => x !== ''))
      } else {
        setIsValid(!Object.values(marketErrors).some(x => x !== ''))
      }
    }, [walletErrors,
        marketErrors])


    // отслеживает выбор категории транспорта
    function handleChoice(e) {
        setCryptoCurrency(e.target.name)
        handleNextPage()
    }
////////////////////////

    // ПЕРЕХОДЫ
// переход на следующую страничку попап-формы
    function handleNextPage() {
        setPage(page + 1)
    }

    function handleChangeCheckbox() {
        setIsChecked(!isChecked)
    }

// возврат на предыдущую старичку попап-формы
    function handleBackPage() {
        if (page===4 && cryptoCurrency==='wallet') {
            setCryptoCurrency('')
            setPage(page - 4)
        } else if ((page===3 && cryptoCurrency==='market')) {
            setCryptoCurrency('')
            setPage(page - 3)
        } else {
            if (page===1) {
                setCryptoCurrency("")
            }
            if (page===0) {
                setActiveCategory('')
            }
            setPage(page - 1)
        }
    }
/////////////////////////////////////////////////////////////////////////////////////

// SUBMIT
// функция отправки формы (вызывается на второй странице)
    function handleWalletSubmit(e) {
      e.preventDefault();
        console.log(wallet)
        setPage(page + 1)
    }

    function handleMarketSubmit(e) {
        e.preventDefault();
          console.log(market)
        setPage(page + 1)
    }

//////////////////////////////////////////////////////////////////////////////////////
    function handleChangetInput(e) {
      const {name, value} = e.target;
      if (cryptoCurrency === 'wallet') {
          setWallet({
            ...wallet,
            [name]: value
          })
        
          value === ''
          ? setWalletErrors({...walletErrors, [name]: emptyFieldErrorMessage})
          :  e.target.value <= 0 
            ? setWalletErrors({...walletErrors, [name]: negativeErrorMessage})
            : setWalletErrors({...walletErrors, [name]: ''})
      } else {
             setMarket({
            ...market,
            [name]: value
          })
        
          value === ''
          ? setMarketErrors({...marketErrors, [name]: emptyFieldErrorMessage})
          :  e.target.value <= 0 
            ? setMarketErrors({...marketErrors, [name]: negativeErrorMessage})
            : setMarketErrors({...marketErrors, [name]: ''})
      }
        
      }

    function handleChangeRadio() {
      setRadio(!radio)
    }



    function handleChangeInputDrop(e) {
      const {name, value} = e.target;
      setMarket({
        ...market,
        [name]: value
      })
    
     if (value === '') {
    setMarketErrors({...marketErrors, [name]: emptyFieldErrorMessage})
     }
  
      if (Object.values(dropOptions).every(x => x !== value)) {
        setMarketErrors({...marketErrors, 'stockMarket': choiceErrorMessage}) 
      } 
    }

// изменение значения инпута КЛАСС ПОМЕЩЕНИЯ по дропдауну
  function handleChangeStockMarketDrop(value) {
    setMarket({...market, 'stockMarket': value})
    setMarketErrors({...marketErrors, 'stockMarket': ''})
  }

    
    return (
        <>
            <div className="popup__header">
                <button className={(page===4 && cryptoCurrency==="wallet")|| (page===3 && cryptoCurrency==="market") ? "popup__go-back-button popup__go-back-button_none" : "popup__go-back-button"} onClick={handleBackPage}></button>
                <h3 className="title popup__title">
                    <span className={cryptoCurrency==="market"? "card-icon bitcoin" : "card-icon bitcoin" }></span>
                    {cryptoCurrency==="market"
                        ? "Криптовалюта/Биржа"
                        : cryptoCurrency==="wallet"
                            ? "Криптовалюта/Кошелек"
                            : "Криптовалюта"
                    }
                </h3>
                <p className="paragraph popup__paragraph">
                    Заполнение всех данных поможет нам точнее рассчитать&nbsp;все показатели
                </p>
                <button className="close-button" onClick={handleClose}></button>
            </div>

            { page===0
                ? (
                    <div className="category">
                        <button className="button category-button" name="wallet" onClick={handleChoice}><span className="card-icon wallet"></span>Кошелек<span className="category__button-icon"></span></button>
                        <button className="button category-button" name="market" onClick={handleChoice}><span className="card-icon market"></span>Биржа<span className="category__button-icon"></span></button>
                    </div>
                )


                // ПРЕВАЯ ВЕТКА. КОШЕЛЕК
                // ПЕРВАЯ ФОРМА
                :
                (cryptoCurrency==="wallet")
                    ? (<form name="transport-car" onSubmit={handleWalletSubmit} className="form popup__form">
                        {page===1
                            ? (<>
                                    <fieldset className="popup-fildset">
                                        <label className="active-form__label date-label margin-no-bottom"> Тип кошелька
                                            <div className="radio-wraper radio-checkbox-wrapper margin-top">
                                                <input
                                                    type="checkbox"
                                                    id="cold"
                                                    name="cold"
                                                    className="checkbox radio-checkbox"
                                                    checked={radio}
                                                    onChange={handleChangeRadio}
                                                />
                                                <label className="active-form__label radio-checkbox-label" htmlFor="cold">Холодный (Оффлайн)</label>
                                                <input
                                                    type="checkbox"
                                                    id="hot"
                                                    name="hot"
                                                    className="checkbox radio-checkbox"
                                                    checked={!radio}
                                                    onChange={handleChangeRadio}
                                                />
                                                <label className="active-form__label radio-checkbox-label" htmlFor="hot">Горячий (Онлайн)</label>
                                            </div>
                                            <span className = "form__item-error ">{walletErrors.change}</span>
                                        </label>

                                        <label className="active-form__label">Название кошелька
                                            <input name="nameOfWallet" type="text" className="form__input" placeholder="Placeholder" value={wallet.nameOfWallet} onChange={handleChangetInput}></input>
                                            <span className = "form__item-error ">{walletErrors.nameOfWallet}</span>
                                        </label>

                                        <label className="active-form__label"> Сумма, USDT *
                                            <input type="number" name="sumUsdt" className="form__input" placeholder="Placeholder" value={wallet.sumUsdt} onChange={handleChangetInput}></input>
                                            <span className = "form__item-error email-input-error">{walletErrors.sumUsdt}</span>
                                        </label>

                                        <label className="checkbox checkbox-edit" >
                                            <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                                            <span className='checkbox-switch'></span>
                                            <span className='checkbox-text'>Отображать в общей статистике</span>
                                        </label>
                                    </fieldset>

                                    <fieldset className="popup-fildset">
                                        <div className="form-flex-wraper">
                                            <button type="button" className="white-button button button-s" onClick={handleBackPage}>{"Назад"}</button>
                                            <input type="submit" className="orange-button button button-s" disabled={!isValid} value="Добавить актив"></input>
                                        </div>

                                        <div className="page-wrapper">
                                            <div className= "page-point  page-point_active"></div>
                                            <div className="page-point"></div>
                                        </div>
                                    </fieldset>
                                </>
                            )

                            // ПОДТВЕРЖДЕНИЕ
                            :
                                    <>
                                        <Comfirmation
                                            handleClose={handleClose}
                                            setActiveCategory={setActiveCategory}
                                            page={page}
                                            setPage={setPage}
                                            setCategory={setCryptoCurrency}
                                        />
                                        <div className="page-wrapper">
                                            <div className="page-point"></div>
                                            <div className="page-point page-point_active"></div>
                                        </div>
                                    </>
                        }
                    </form>)
                    // ВТОРАЯ ВЕТКА. БИРЖА
                    // ПЕРВАЯ ФОРМА
                    :
                    (cryptoCurrency==="market")
                        ? (<form name="market" className="form popup__form" onSubmit={handleMarketSubmit}>
                            {(page===1)
                                ? (<>
                                        <fieldset className="popup-fildset">

                                            <label className="active-form__label">Биржа *
                                                <input name="stockMarket" className="form__input" placeholder="Placeholder" value={market.stockMarket} onChange={(e) => {handleChangeInputDrop(e); setIsOptionStockMarketDown(true)}}></input>
                                                <span className = "form__item-error ">{marketErrors.stockMarket}</span>

                                                <div className={!isOptionStockMarketDown ? 'dropdown': 'dropdown dropdown_open'} >
                                                    {dropOptions.map((item) => {

                                                        if ( market.stockMarket !== undefined &&  market.stockMarket !== '') {
                                                            const value = market.stockMarket.toLowerCase()

                                                            if (item.name.toLowerCase().includes(value)) {
                                                                return <div className="option" key={item.name} onClick={(e) => {handleChangeStockMarketDrop(item.name); setIsOptionStockMarketDown(false)}}>{item.name}</div>
                                                            } else {
                                                                return null
                                                            }
                                                        }
                                                    })}
                                                </div>
                                            </label>

                                            <label className="active-form__label">API Key *
                                                <input name="apiKey" className="form__input" placeholder="Placeholder" value={market.apiKey} onChange={handleChangetInput}></input>
                                                <span className = "form__item-error ">{marketErrors.apiKey}</span>
                                            </label>

                                            <label className="active-form__label">Secret Key *
                                                <input name="secretKey" className="form__input" placeholder="Placeholder" value={market.secretKey} onChange={handleChangetInput}></input>
                                                <span className = "form__item-error ">{marketErrors.secretKey}</span>
                                            </label>

                                            <label className="checkbox checkbox-edit" >
                                                <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                                                <span className='checkbox-switch'></span>
                                                <span className='checkbox-text'>Отображать в общей статистике</span>
                                            </label>

                                        </fieldset>

                                        <fieldset className="popup-fildset">
                                            <div className="form-flex-wraper">
                                                <button type="button" className="white-button button button-s" onClick={handleBackPage}>{"Назад"}</button>
                                                <input type="submit" className="orange-button button button-s" disabled={!isValid} value="Добавить актив"></input>
                                            </div>

                                            <div className="page-wrapper">
                                                <div className= "page-point  page-point_active"></div>
                                                <div className="page-point"></div>
                                            </div>
                                        </fieldset>
                                    </>
                                )
                                // ПОДТВЕРЖДЕНИЕ
                                    :
                                    <>
                                        <Comfirmation
                                            handleClose={handleClose}
                                            setActiveCategory={setActiveCategory}
                                            page={page}
                                            setPage={setPage}
                                            setCategory={setCryptoCurrency}
                                        />
                                        <div className="page-wrapper">
                                            <div className="page-point"></div>
                                            <div className="page-point page-point_active"></div>
                                        </div>
                                    </>
                            }
                        </form>)
                        : <></>
            }
        </>
    )

}

export default CryptoCurrency;