import {React, useState, useEffect} from "react";

import DatePicker, {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';

import Comfirmation from "../Confirmation/Confirmation";

import {
  dropOptionsBank,
  dropOptionsСurrency,
  dropOptionsMetal,

  greatValue,
  calendarErrorMessage,
  emptyFieldErrorMessage,
  negativeErrorMessage,
  choiceErrorMessage,
  dropOptions,
} from "../../../utils/constants"

import './DepositForm.css';

function DepositForm({
  isOk,
  submitMoney,
  submitMetal,

  page, 
  setPage, 
  handleClose,
  depositCategory, 
  setDepositCategory, 
  setActiveCategory
  }) {

  const [values, setValues] =useState([])

  const [purchaseDate, setPurchaseDate] =useState(new Date());

  const [startDate, setStartDate] =useState(new Date());
  const [endDate, setEndDate] =useState(new Date());


  const [isValidOne, setIsValidOne] = useState(false)
  const [isValidTwo, setIsValidTwo] = useState(false)

  const [statisticCheckboxChecked, setStatisticCheckboxChecked] = useState(true) // состояние чекбокса

// ПЕРЕХОДЫ
// переход на следующую страничку попап-формы
function handleNextPage() {
  setPage(page + 1)
}

// возврат на предыдущую старичку попап-формы
function handleBackPage() {
  if (page===3) {
    setDepositCategory('')
    setPage(page - 3)
  } else {
  if (page===1) {
    setDepositCategory('')
    setIsValidOne(false)
    setIsValidTwo(false)
  }
  if (page===0) {
    setActiveCategory('')
  }
  setPage(page - 1)
  }
}

// отслеживает выбор категории 
  function handleChoice(e) {
    setDepositCategory(e.target.name)
    handleNextPage()
  }
  /////////////////////

  const [metalForm, setMetalForm] = useState({
    initialWeight: '',
    sum: '',
    metal: '',
    bank: ''
  })

  const [metalFormErrorsOne, setMetalFormErrorsOne] = useState({
    calendar: '',
    metal: null,
    bank: null
  })

  const [metalFormErrorsTwo, setMetalFormErrorsTwo] = useState({
    initialWeight: null,
    sum: null
  })

  /////////////////////

  const [moneyForm, setMoneyForm] = useState({
    sum: '',
    rate:'',
    bank: '',
    currency: '',
  })

  const [moneyFormErrors, setMoneyFormErrors] = useState({
    calendarOne: '',
    calendarTwo: '',
    sum: null,
    rate:null,
    bank: null,
    currency: null,
  })

//////////////////////////////

  useEffect(() => {
    if (depositCategory === "metals") {
      setMetalForm({... metalForm,
        date: purchaseDate,
        isStatistic: statisticCheckboxChecked,
      })
    } else {
      setMoneyForm({... moneyForm,
        startDate: startDate,
        endDate: endDate,
        isStatistic: statisticCheckboxChecked,
      })
    }
  },[
    purchaseDate,
    startDate,
    endDate,
    statisticCheckboxChecked,
  ])


// Отзычивая валидность формы жилой недвижимости
  useEffect(() => {
    if (depositCategory === 'metals') {
      page === 1
          ? setIsValidOne(!Object.values(metalFormErrorsOne).some(x => x !== ''))
          :  setIsValidTwo(!Object.values(metalFormErrorsTwo).some(x => x !== '' ))
    } else {
      page === 1
           ? setIsValidOne(!Object.values(moneyFormErrors).some(x => x !== '')) 
           : setIsValidTwo(!Object.values(moneyFormErrors).some(x => x !== ''))
    }
  }, [metalFormErrorsOne,
    metalFormErrorsTwo,
    moneyFormErrors])
///////////////////////////////////////////////////////////////////////////////////////

  // изменение значений стандартных инпутов на первой страничке формы металический вклад
  function handleChangeMetalInput(e) {
    const {name, value} = e.target;
    setMetalForm({
      ...metalForm,
      [name]: value
    })

    if (page === 1) {
      value === ''
          ? setMetalFormErrorsOne({...metalFormErrorsOne, [name]: emptyFieldErrorMessage})
          :  e.target.value <= 0
              ? setMetalFormErrorsOne({...metalFormErrorsOne, [name]: negativeErrorMessage})
              : setMetalFormErrorsOne({...metalFormErrorsOne, [name]: ''})
    } else {
      value === ''
          ? setMetalFormErrorsTwo({...metalFormErrorsTwo, [name]: emptyFieldErrorMessage})
          :  e.target.value <= 0
              ? setMetalFormErrorsTwo({...metalFormErrorsTwo, [name]: negativeErrorMessage})
              : setMetalFormErrorsTwo({...metalFormErrorsTwo, [name]: ''})
    }

    if (name === 'initialWeight' && value > 2147483647) {
      setMetalFormErrorsTwo({...metalFormErrorsTwo, [name]: greatValue})
    }
    if (name === 'sum' && value >= 1000000000000000000) {
      setMetalFormErrorsTwo({...metalFormErrorsTwo, [name]: greatValue})
    }

  }
//////////////////////////////

  // изменение значений стандартных инпутов на первой страничке формы денежный вклад
  function handleChangeMoneyInput(e) {
    const {name, value} = e.target;
    setMoneyForm({
      ...moneyForm,
      [name]: value
    })
    if (page === 1){
      value === ''
          ? setMoneyFormErrors({...moneyFormErrors, [name]: emptyFieldErrorMessage})
          :  e.target.value <= 0
              ? setMoneyFormErrors({...moneyFormErrors, [name]: negativeErrorMessage})
              : setMoneyFormErrors({...moneyFormErrors, [name]: ''})
    }
    if (name === 'sum' && value >= 1000000000000000000) {
      setMoneyFormErrors({...moneyFormErrors, [name]: greatValue})
    }
    if (name === 'rate' && value > 1000) {
      setMoneyFormErrors({...moneyFormErrors, [name]: greatValue})
    }
  }

///////////////////////////////////////////////////////////////////////////////////////

  // function handleChangeInputMetalDrop(e) {
  //   const {name, value} = e.target;
  //   setMetalForm({
  //     ...metalForm,
  //     [name]: value
  //   })

  //   if (value === '') {
  //     setMetalFormErrorsOne({...metalFormErrorsOne, [name]: emptyFieldErrorMessage})
  //   }

  //   if (name === 'metal' && value !== '') {
  //     if (Object.values(dropOptionsMetal).every(x => x !== value)) {
  //       setMetalFormErrorsOne({...metalFormErrorsOne, 'metal': choiceErrorMessage})
  //     }
  //   }

  //   if (name === 'bank' && value !== '') {
  //     if (Object.values(dropOptionsBank).every(x => x !== value)) {
  //       setMetalFormErrorsOne({...metalFormErrorsOne, 'bank': choiceErrorMessage})
  //     }
  //   }
  // }


  function handleChangeMetalDrop(value) {
    setIsOptionMetalDown(false)
    setMetalForm({...metalForm, 'metal': value})
    setMetalFormErrorsOne({...metalFormErrorsOne, 'metal': ''})
  }
  
  function handleChangeBankDrop(value) {
    setIsOptionBankDown(false)
    if (depositCategory === 'metals') {
      setMetalForm({...metalForm, 'bank': value})
      setMetalFormErrorsOne({...metalFormErrorsOne, 'bank': ''})
    }else {
      setMoneyForm({...moneyForm, 'bank': value})
      setMoneyFormErrors({...moneyFormErrors, 'bank': ''})
    }
  }


///////////////////////////////////////////////////////////////////////////////////////

  // function handleChangeInputMoneyDrop(e) {
  //   const {name, value} = e.target;
  //   setMoneyForm({
  //     ...moneyForm,
  //     [name]: value
  //   })

  //   if (value === '') {
  //     setMoneyFormErrors({...moneyFormErrors, [name]: emptyFieldErrorMessage})
  //   }

  //   if (name === 'currency' && value !== '') {
  //     if (Object.values(dropOptionsСurrency).every(x => x !== value)) {
  //       setMoneyFormErrors({...moneyFormErrors, 'currency': choiceErrorMessage})
  //     }
  //   }

  //   if (name === 'bank' && value !== '') {
  //     if (Object.values(dropOptionsBank).every(x => x !== value)) {
  //       setMoneyFormErrors({...moneyFormErrors, 'bank': choiceErrorMessage})
  //     }
  //   }
  // }

  function handleChangeCurrencyDrop(value) {
    setIsOptionСurrencyDown(false)
    setMoneyForm({...moneyForm, 'currency': value})
    setMoneyFormErrors({...moneyFormErrors, 'currency': ''})
  }

  /////////////////////////////

//  КАЛЕНДАРЬ
    // подключаем локализацию для календаря
    registerLocale('ru', ru)
/////////////////////////////

  useEffect(() => {
    if (depositCategory === 'metals') {
      if (purchaseDate === null) {
        setMetalFormErrorsOne({...metalFormErrorsOne, 'calendar': calendarErrorMessage})
        setIsValidOne(false)
      } else {
        setMetalFormErrorsOne({...metalFormErrorsOne, 'calendar': ''})
        setIsValidOne(true)
      }

    } else if (depositCategory === 'money') {
      if (startDate === null) {
        setMoneyFormErrors({...moneyFormErrors, 'startDate': calendarErrorMessage})
        setIsValidOne(false)
      } else {
        setMoneyFormErrors({...moneyFormErrors, 'startDate': ''})
        setIsValidOne(true)
      }

      if (endDate === null) {
        setMoneyFormErrors({...moneyFormErrors, 'endDate': calendarErrorMessage})
        setIsValidOne(false)
      } else {
        setMoneyFormErrors({...moneyFormErrors, 'endDate': ''})
        setIsValidOne(true)
      }

    }
  },[purchaseDate, startDate, endDate])

  useEffect(() => {
    setIsValidOne(false)
  }, [depositCategory])

  ///////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////////////////////////////

// SUBMIT
  function handleMetalSubmit(e) {
    e.preventDefault();
    // console.log(metalForm)
    submitMetal(metalForm)

    handleNextPage()
  }

  function handleMoneySubmit(e) {
    e.preventDefault();
    submitMoney(moneyForm)

    handleNextPage()
  }
///////////////////////////////////////////////////////////////////////////////////////

// ДРОПДАУНЫ

const [isOptionBankDown, setIsOptionBankDown] = useState(false);
const [isOptionСurrencyDown, setIsOptionСurrencyDown] = useState(false);
const [isOptionMetalDown, setIsOptionMetalDown] = useState(false);

    return (
      <>
        <div className="popup__header">
          <button className={(page===2 && depositCategory==="money")|| (page===3 && depositCategory==="metals") ? "popup__go-back-button popup__go-back-button_none" : "popup__go-back-button"} onClick={handleBackPage}></button>
          <h3 className="title popup__title">
            <span className={depositCategory==="money" ? "card-icon money" : depositCategory==="metals"? "card-icon metals" : "card-icon deposit" }></span>
            {depositCategory==="metals"
            ? "Вклад/Металлический"
            : depositCategory==="money" 
            ? "Вклад/Денежный" 
            : "Вклад"
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
            <button className="button category-button" name="metals" onClick={handleChoice}><span className="card-icon metals"></span>Металлический<span className="category__button-icon"></span></button>
            <button className="button category-button" name="money" onClick={handleChoice}><span className="card-icon money"></span>Денежный<span className="category__button-icon"></span></button>
          </div>
        )
    // МЕТАЛЛИЧЕСКИЙ ВКЛАД
    // ПЕРВАЯ ФОРМА
        :  
        (depositCategory==="metals")
        ? (<form name="deposit-metals" onSubmit={handleMetalSubmit} className="form popup__form">
          {page===1
          ? (<>
            <fieldset className="popup-fildset">
              <div className='input-dropdown-box'>
                <label className="active-form__label">Вид металла * 
                  <input name="metal" className="form__input" placeholder="Золото" value={metalForm.metal} onClick={(e) => {setIsOptionMetalDown(!isOptionMetalDown)}}></input>
                  <span className = "form__item-error ">{metalFormErrorsOne.metal}</span>
                </label>    
                  <div className={!isOptionMetalDown ? 'dropdown': 'dropdown dropdown_open'} >
                    {dropOptionsMetal.map((item) => {

                      // if (metalForm.metal !== undefined && metalForm.metal !== '') {
                      //   const value = metalForm.metal.toLowerCase()
      
                      //   if (item.name.toLowerCase().includes(value)) {
                          return <div className="option" key={item.type} onClick={(e) => {handleChangeMetalDrop(item.type)}}>{item.name}, {item.type}</div>
                      //   } else {
                      //     return null
                      //   }
                      // }
                    })}
                  </div>
              </div>      

              <div className='input-dropdown-box'>
                  <label className="active-form__label">Банк * 
                    <input name="bank" className="form__input" placeholder="ВТБ" value={metalForm.bank} onClick={(e) => {setIsOptionBankDown(!isOptionBankDown)}}></input>
                    <span className = "form__item-error ">{metalFormErrorsOne.bank}</span>
                  </label>
                  <div className={!isOptionBankDown ? 'dropdown': 'dropdown dropdown_open'} >
                    {dropOptionsBank.map((item) => {

                      // if ( metalForm.bank !== undefined && metalForm.bank !== '') {
                      //   const value = metalForm.bank.toLowerCase()
      
                      //   if (item.name.toLowerCase().includes(value)) {
                          return <div className="option" key={item.name} onClick={(e) => {handleChangeBankDrop(item.name)}}>{item.name}</div>
                      //   } else {
                      //     return null
                      //   }
                      // }
                    })}
                  </div>
              </div>

              <label className="active-form__label date-label">Дата открытия счета * 
                <DatePicker
                  selected={purchaseDate}
                  onChange={setPurchaseDate}
                  name='date'

                  locale='ru'
                  dateFormat={'dd.MM.yyyy'}
                  calendarStartDay={1}

                  showYearDropdown
                  showMonthDropdown
                />
                <span className = "form__item-error ">{metalFormErrorsOne.calendar}</span>
              </label>
            </fieldset>

            <fieldset className="popup-fildset">
              <div className="form-flex-wraper">
                <button type="button" className="white-button button button-s" onClick={handleBackPage}>{"Назад"}</button>
                <button type="button" className="orange-button button button-s" onClick={handleNextPage} disabled={!isValidOne}>{"Продолжить"}</button>
              </div>
              
              <div className="page-wrapper">
                <div className= "page-point  page-point_active"></div>
                <div className="page-point"></div>
                <div className="page-point"></div>
              </div>
              </fieldset>
          </>
          )

  // ВТОРАЯ ФОРМА
          : (page===2)
          ? (<>
            <fieldset className="popup-fildset">
              <label className="active-form__label">Начальный вес, гр *
                <input type="number" className="form__input" placeholder="400" name="initialWeight" value={metalForm.initialWeight} onChange={handleChangeMetalInput} min={1} max={2147483647}></input>
                <span className = "form__item-error ">{metalFormErrorsTwo.initialWeight}</span>
              </label>

              <label className="active-form__label"> Сумма, &#8381; *
                <input type="number" className="form__input" name="sum" placeholder="10 000" value={metalForm.sum} onChange={handleChangeMetalInput} min={0} max={1000000000000000000}></input>
                <span className = "form__item-error item-error_info">Введите сумму на момент открытия счета</span>
                <span className = "form__item-error ">{metalFormErrorsTwo.sum}</span>
              </label>

              <label className="checkbox" >
                <input type="checkbox" className="checkbox-input" name="isStatistics" checked={statisticCheckboxChecked} onChange={() => setStatisticCheckboxChecked(!statisticCheckboxChecked)}></input>
                <span className='checkbox-switch'></span>
                <span className='checkbox-text'>Отображать в общей статистике</span>
              </label>
            </fieldset> 

                
            <fieldset className="popup-fildset">
              <div className="form-flex-wraper">
                <button type="button" className="white-button button button-s" onClick={handleBackPage}>{"Назад"}</button>
                <input type="submit" className="orange-button button button-s" disabled={!isValidTwo} value='Добавить актив' ></input>
              </div>

              <div className="page-wrapper">
                <div className="page-point"></div>
                <div className="page-point page-point_active"></div>
                <div className="page-point"></div>
              </div>  
            </fieldset>
          
            </>)

            //ПОДТВЕРЖДЕНИЕ
          :  
            <>
              <Comfirmation
                     isOk={isOk}
                  handleClose={handleClose}
                  setActiveCategory={setActiveCategory}
                  setPage={setPage}
              />
              <div className="page-wrapper">
                <div className="page-point"></div>
                <div className="page-point"></div>
                <div className="page-point page-point_active"></div>
              </div>
            </>
          }
          </form>)

    // ДЕНЕЖНЫЙ ВКЛАД
    // ПЕРВАЯ ФОРМА
    :  (depositCategory==="money")
    ? ( <form name="deposit-money" onSubmit={handleMoneySubmit} className="form popup__form popup__form_big">
      {page===1
      ? (<>
        <fieldset className="popup-fildset">
          <div className="important-info">
            <span className="form__important-info"></span>
            <p className="paragraph paragraph_m">По вкладам с капитализацией процентов мы не сможем сделать точный&nbsp;расчет </p>
          </div>
          
          <div className='input-dropdown-box'>
            <label className="active-form__label">Банк * 
              <input name="bank" className="form__input" placeholder="ВТБ" value={moneyForm.bank} onClick={(e) => {setIsOptionBankDown(!isOptionBankDown)}}></input>
              <span className = "form__item-error ">{moneyFormErrors.bank}</span>
            </label>   
            <div className={!isOptionBankDown ? 'dropdown': 'dropdown dropdown_open'} >
              {dropOptionsBank.map((item) => {

                // if ( moneyForm.bank !== undefined && moneyForm.bank !== '') {
                //   const value = moneyForm.bank.toLowerCase()

                //   if (item.name.toLowerCase().includes(value)) {
                    return <div className="option" key={item.name} onClick={(e) => {handleChangeBankDrop(item.name)}}>{item.name}</div>
                //   } else {
                //     return null
                //   }
                // }
              })}
            </div>
          </div>

          <div className="form-flex-wraper">
            <label className="active-form__label date-label  flex-label"> Дата открытия вклада * 
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                name="startDate"

                locale='ru'
                dateFormat={'dd.MM.yyyy'}
                calendarStartDay={1}

                showYearDropdown
                showMonthDropdown
              />
              <span className = "form__item-error ">{moneyFormErrors.calendarOne}</span>
            </label>
                
            <label className="active-form__label date-label flex-label"> Дата окончания вклада * 
              <DatePicker
                selected={endDate}
                onChange={setEndDate}
                name="endDate"

                locale='ru'
                dateFormat={'dd.MM.yyyy'}
                calendarStartDay={1}

                showYearDropdown
                showMonthDropdown
                inputType='number'
              />
              <span className = "form__item-error ">{moneyFormErrors.calendarTwo}</span>
            </label>  
          </div>

          <div className="form-flex-wraper">
            <label className="active-form__label flex-label"> Сумма *
            <input type="number" className="form__input" name="sum" placeholder="50 000" value={moneyForm.sum} onChange={handleChangeMoneyInput} min={1} max={1000000000000000000}></input>
              <span className = "form__item-error ">{moneyFormErrors.sum}</span>
            </label>

            <div className='input-dropdown-box'>
              <label className="active-form__label flex-label">Валюта * 
                <input name="currency" className="form__input" placeholder="RUB (&#8381;)" value={moneyForm.currency} onClick={(e) => {setIsOptionСurrencyDown(!isOptionСurrencyDown)}}></input>
                <span className = "form__item-error ">{moneyFormErrors.currency}</span>
              </label>  
              <div className={!isOptionСurrencyDown ? 'dropdown': 'dropdown dropdown_open'} >
                {dropOptionsСurrency.map((item) => {

                  // if ( moneyForm.currency !== undefined) {
                  //   const value = moneyForm.currency.toLowerCase()

                  //   if (item.name.toLowerCase().includes(value)) {
                      return <div className="option" key={item.name} onClick={(e) => {handleChangeCurrencyDrop(item.name)}}>{item.name}</div>
                  //   } else {
                  //     return null
                  //   }
                  // }
                })}
              </div>
            </div>
          </div>

          <label className="active-form__label"> Годовой процент, % *
            <input type="number" name="rate" className="form__input" placeholder="8" value={moneyForm.rate} onChange={handleChangeMoneyInput} min={1} max={1000}></input>
            <span className = "form__item-error ">{moneyFormErrors.rate}</span>
          </label>

          <label className="checkbox" >
            <input type="checkbox" className="checkbox-input" name="isStatistics" checked={statisticCheckboxChecked} onClick={() => setStatisticCheckboxChecked(!statisticCheckboxChecked)}></input>
            <span className='checkbox-switch'></span>
            <span className='checkbox-text'>Отображать в общей статистике</span>
          </label>
        </fieldset>

        <fieldset className="popup-fildset">
          <div className="form-flex-wraper">
            <button type="button" className="white-button button button-s" onClick={handleBackPage}>{"Назад"}</button>
            <input type="submit" className="orange-button button button-s" disabled={!isValidOne} value="Добавить актив"></input>
          </div>


          <div className="page-wrapper page-wrapper_mini">
            <div className= "page-point  page-point_active"></div>
            <div className="page-point"></div>
          </div>
        </fieldset>
        </>)

  //ПОДТВЕРЖДЕНИЕ
      : 
        (<>
          <Comfirmation
          isOk={isOk}
              handleClose={handleClose}
              setActiveCategory={setActiveCategory}
              // page={page}
              setPage={setPage}
              // setCategory={setActiveCategory}
          />
          <div className="page-wrapper page-wrapper_mini">
            <div className="page-point"></div>
            <div className="page-point page-point_active"></div>
          </div>
        </>)
      }
      </form>)

      :<></>
    }
  </>
  )
}


export default DepositForm;