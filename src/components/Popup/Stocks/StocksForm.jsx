import {React, useState, useEffect} from 'react';

import { 
  dropOptionsBank,


  emptyFieldErrorMessage,
  negativeErrorMessage,
  choiceErrorMessage,
} from "../../../utils/constants";

import Comfirmation from "../Confirmation/Confirmation";


function StocksForm({page, setPage, handleClose, setActiveCategory}) {

  const [isValid, setIsValid] = useState(false)
  const [statisticCheckboxChecked, setStatisticCheckboxChecked] = useState(true) // состояние чекбокса

  const [isOptionBrokerDown, setIsOptionBrokerDown] = useState(false);

  const [stocks, setStoks] = useState({
    broker: '',
    apiToken: '',
    secretKey: '',
  })

  const [stocksErrors, setStoksErrors] = useState({
    broker: null,
    apiToken: null,
    secretKey: null,
  })

    // Отзычивая валидность формы жилой недвижимости
  useEffect(() => {
    setIsValid(!Object.values(stocksErrors).some(x => x !== ''))
  }, [stocksErrors])

// возврат на предыдущую старичку попап-формы
  function handleBackPage() {
      setActiveCategory('')
      setIsValid(false)
      setPage(page - 1)
  }


// функция отправки формы (вызывается на второй странице)
  function handleSubmit(e) {
      e.preventDefault();
      console.log(stocks)
      setPage(page + 1)
  }
//////////////////////////////////////////////////////////////////////////////////////////
// обычный инпут
  function handleChangeInput(e) {
    const {name, value} = e.target;
    setStoks({
      ...stocks,
      [name]: value
    })

      value === ''
      ?setStoksErrors({...stocksErrors, [name]: emptyFieldErrorMessage})
      :  e.target.value <= 0 
        ? setStoksErrors({...stocksErrors, [name]: negativeErrorMessage})
        : setStoksErrors({...stocksErrors, [name]: ''})
  }

// инпут-дроп
  function handleChangeInputDrop(e) {
    const {name, value} = e.target;
    setStoks({
      ...stocks,
      [name]: value
    })

    if (value === '') {
      setStoksErrors({...stocksErrors, [name]: emptyFieldErrorMessage})
    }

    if (Object.values(dropOptionsBank).every(x => x !== value)) {
      setStoksErrors({...stocksErrors, 'broker': choiceErrorMessage}) 
    } 
  }

// изменение значения инпута КЛАСС ПОМЕЩЕНИЯ по дропдауну
  function handleChangeBanksDrop(value) {
    setIsOptionBrokerDown(false)
    setStoks({...stocks, 'broker': value})
    setStoksErrors({...stocksErrors, 'broker': ''})
  }

  useEffect(() => {
    setStoks({...stocks,
      isStatistic: statisticCheckboxChecked,
    })
  }, [statisticCheckboxChecked])

    return (
        <>
            <div className="popup__header">
                <button className={page===1 ? "popup__go-back-button popup__go-back-button_none" : "popup__go-back-button"} onClick={handleBackPage}></button>
                <h3 className="title popup__title">
                    <span className="card-icon stocks"></span>
                    Брокерский счет
                </h3>
                <p className="paragraph popup__paragraph">
                    Заполнение всех данных поможет нам точнее рассчитать все показатели
                </p>
                <button className="close-button" onClick={handleClose}></button>
            </div>

            { (page===0)
                ? (
                    <form name="stocks" onSubmit={handleSubmit} className="form popup__form">
                        <fieldset className="popup-fildset">
                            <div className="important-info">
                                <span className="form__important-info"></span>
                                <div className="form__important-info-box">
                                    <p className="paragraph paragraph_m">Для настройки интеграции воспользуйтесь токеном «Только для чтения» из личного кабинета брокера.</p>
                                    <p className="paragraph paragraph_m">Инструкцию по подключению вы можете посмотреть <a
                                        href="#" className="link link-s">здесь</a></p>
                                </div>
                            </div>

                            <div className='input-dropdown-box'>
                              <label className="active-form__label">Брокер
                                <input name="broker" className="form__input" placeholder="Freedom Finance" value={stocks.broker} onClick={(e) => {setIsOptionBrokerDown(!isOptionBrokerDown)}}></input>
                                <span className = "form__item-error ">{stocksErrors.broker}</span>
                              </label>
                              <div className={!isOptionBrokerDown ? 'dropdown': 'dropdown dropdown_open'} >
                                  {dropOptionsBank.map((item) => {

                                      // if ( stocks.broker !== undefined) {
                                      //     const value = stocks.broker.toLowerCase()

                                      //     if (item.name.toLowerCase().includes(value)) {
                                              return <div className="option" key={item.name} onClick={(e) => {handleChangeBanksDrop(item.name)}}>{item.name}</div>
                                      //     } else {
                                      //         return null
                                      //     }
                                      // }
                                  })}
                              </div>
                            </div>

                            <div>
                                <label className="active-form__label"> API token *
                                    <input type="text" className="form__input" name="apiToken" placeholder="***********" value={stocks.apiToken} onChange={handleChangeInput}></input>
                                    <span className = "form__item-error item-error_info">Публичный ключ из личного кабинета Freedom Finance</span>
                                    <span className = "form__item-error ">{stocksErrors.apiToken}</span>
                                </label>

                                <label className="active-form__label"> Secret Key *
                                    <input type="text" className="form__input" name="secretKey" placeholder="***********" value={stocks.secretKey} onChange={handleChangeInput}></input>
                                    <span className = "form__item-error item-error_info">Секретный ключ из личного кабинета Freedom Finance</span>
                                    <span className = "form__item-error ">{stocksErrors.secretKey}</span>
                                </label>


                                <label className="checkbox" >
                                    <input type="checkbox" className="checkbox-input" checked={statisticCheckboxChecked} onChange={(e) => setStatisticCheckboxChecked(!statisticCheckboxChecked)}></input>
                                    <span className='checkbox-switch'></span>
                                    <span className='checkbox-text'>Отображать в общей статистике</span>
                                </label>
                            </div>
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
                    </form>
                )

                //ПОДТВЕРЖДЕНИЕ
                : (
                    <>
                        <Comfirmation
                            handleClose={handleClose}
                            setActiveCategory={setActiveCategory}
                            page={page}
                            setPage={setPage}
                            setCategory={setActiveCategory}
                        />

                        <div className="page-wrapper page-wrapper_mini">
                            <div className="page-point"></div>
                            <div className="page-point page-point_active"></div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default StocksForm;