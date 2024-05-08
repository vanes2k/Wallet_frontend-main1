import {React, useState, useEffect} from "react";
import axios from "axios";
import { URL } from "../../../utils/constants";

import DatePicker, {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';

import Comfirmation from "../Confirmation/Confirmation";

import { 
  dropOptionsBank,

  greatValue,
  calendarErrorMessage,
  emptyFieldErrorMessage,
  negativeErrorMessage,
  choiceErrorMessage,
} from "../../../utils/constants";

function DigitalRuble({page, setPage, handleClose, setActiveCategory, submit, isOk}) {

const [isValid, setIsValid] = useState(false)

const [statisticCheckboxChecked, setStatisticCheckboxChecked] = useState(true) // состояние чекбокса
const [purchaseDate, setPurchaseDate] = useState(new Date());

const [isOptionBankDown, setIsOptionBankDown] = useState(false);

const [ruble, setRuble] = useState({
  bank: '',
  date:'',
  sum:'',
})

const [rubleErrors, setRubleErrors] = useState({
    calendar: '',
    bank: null,
    sum: null,
})

// возврат на предыдущую старичку попап-формы
function handleBackPage() {
  setActiveCategory('')
  setIsValid(false)
  setPage(page - 1)
}

////////////////////////////////////////////////////////////////////////////////////////

// Отзычивая валидность формы жилой недвижимости
useEffect(() => {
  setIsValid(!Object.values(rubleErrors).some(x => x !== ''))
}, [rubleErrors])
////////////////////////////////////////////////////////////////////////////////////////

function handleCheckbox() {
  setStatisticCheckboxChecked(!statisticCheckboxChecked)
}
// добавляет в объект полей значения специфических инпутов при их изменении
useEffect(() => {
  setRuble({... ruble,
    date: purchaseDate,
    isStatistic: statisticCheckboxChecked,
  })
  }, [purchaseDate,
      statisticCheckboxChecked,
     ])
////////////////////////////////////////////////////////////////////////////////////////
// обычный инпут
  function handleChangeInput(e) {
    const {name, value} = e.target;
    setRuble({
      ...ruble,
      [name]: value
    })

      value === ''
      ? setRubleErrors({...rubleErrors, [name]: emptyFieldErrorMessage})
      :  e.target.value <= 0 
        ? setRubleErrors({...rubleErrors, [name]: negativeErrorMessage})
        : setRubleErrors({...rubleErrors, [name]: ''})

      if (name === 'sum' && value >= 1000000000000000000) {
        setRubleErrors({...rubleErrors, [name]: greatValue})
      }
  }

// инпут-дроп
// function handleChangeInputDrop(e) {
//   const {name, value} = e.target;
//   setRuble({
//     ...ruble,
//     [name]: value
//   })

//   if (value === '') {
//     setRubleErrors({...rubleErrors, [name]: emptyFieldErrorMessage})
//   }

//   if (Object.values(dropOptionsBank).every(x => x !== value)) {
//     setRubleErrors({...rubleErrors, 'bank': choiceErrorMessage}) 
//   } 
// }

// изменение значения инпута КЛАСС ПОМЕЩЕНИЯ по дропдауну
function handleChangeBanksDrop(value) {
  setIsOptionBankDown(false)
  setRuble({...ruble, 'bank': value})
  setRubleErrors({...rubleErrors, 'bank': ''})
}

// календарь
// подключаем локализацию для календаря
registerLocale('ru', ru)
// изменение и валидация специфического поля календаря
useEffect(() => {
  if (ruble.date === null) {
    setRubleErrors({...rubleErrors, 'calendar': calendarErrorMessage})
    setIsValid(false)
  } else {
    setRubleErrors({...rubleErrors, 'calendar': ''})
    setIsValid(true)
  }  
},[ruble.date])


  // функция отправки формы (вызывается на второй странице)
  async function handleSubmit(e) {
    e.preventDefault();
    submit(ruble)
    setPage(page + 1)
  }

///////////

    return (
      <>
      <div className="popup__header">
        <button className={page===1 ? "popup__go-back-button popup__go-back-button_none" : "popup__go-back-button"} onClick={handleBackPage}></button>
        <h3 className="title popup__title">
          <span className="card-icon ruble"></span>
            Цифровой рубль
        </h3>
        <p className="paragraph popup__paragraph">
        Заполнение всех данных поможет нам точнее рассчитать все показатели
        </p>
        <button className="close-button" onClick={handleClose}></button>
      </div> 

      { (page===0)
      ? (
        <form name="digital-ruble" onSubmit={handleSubmit} className="form popup__form">
          <fieldset className="popup-fildset">
          <div className='input-dropdown-box'>
            <label className="active-form__label">Банк * 
              <input name="bank" className="form__input" placeholder="ВТБ" value={ruble.bank} onClick={(e) => {setIsOptionBankDown(!isOptionBankDown)}}></input>
              <span className = "form__item-error ">{rubleErrors.bank}</span>
            </label> 
              <div className={!isOptionBankDown ? 'dropdown': 'dropdown dropdown_open'} >
                {dropOptionsBank.map((item) => {

                  // if ( ruble.bank !== undefined && ruble.bank !== '') {
                  //   const value = ruble.bank.toLowerCase()
  
                  //   if (item.name.toLowerCase().includes(value)) {
                      return <div className="option" key={item.name} onClick={(e) => {handleChangeBanksDrop(item.name)}}>{item.name}</div>
                  //   } else {
                  //     return null
                  //   }
                  // }
                })}
              </div>
            </div>
            
            <label className="active-form__label date-label"> Дата покупки * 
                <DatePicker
                  selected={purchaseDate} 
                  onChange={setPurchaseDate}

                  locale='ru'
                  dateFormat={'dd.MM.yyyy'}
                  calendarStartDay={1}

                  showYearDropdown
                  showMonthDropdown
                  inputType='number'
                />
                <span className = "form__item-error ">{rubleErrors.calendar}</span>  
            </label>

            <div>
              <label className="active-form__label"> Сумма, &#8381; *
              <input type="number" className="form__input" name="sum" placeholder="10 000" onChange={handleChangeInput} value={ruble.sum}></input>
                <span className = "form__item-error">{rubleErrors.sum}</span>  
              </label>

              <label className="checkbox" >
                <input type="checkbox" className="checkbox-input" checked={statisticCheckboxChecked} onChange={handleCheckbox}></input>
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


            <div className="page-wrapper page-wrapper_mini">
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
          isOk={isOk}
            handleClose={handleClose}
            setActiveCategory={setActiveCategory}

            page={page}
            setPage={setPage}
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


export default DigitalRuble;