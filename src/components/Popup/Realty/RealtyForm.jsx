import {React, useState, useEffect} from "react";

import DatePicker, {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';

import Comfirmation from "../Confirmation/Confirmation";

import { 
  dropOptions,
  optionsList,

  greatValue,
  calendarErrorMessage,
  emptyFieldErrorMessage,
  negativeErrorMessage,
  choiceErrorMessage,
  communicationsErrorMessage,
} from "../../../utils/constants";

import './RealtyForm.css';

function RealtyForm({
  cities,
  handleSearchCities,
  page, 
  setPage, 
  handleClose,
  realtyCategory, 
  setRealtyCategory, 
  setActiveCategory
  }) {
  
  const [isValidOne, setIsValidOne] = useState(false)
  const [isValidTwo, setIsValidTwo] = useState(false)

  const [communications, setСommunications] = useState('');

  const [purchaseDate, setPurchaseDate] =useState(new Date());
  const [radioFirst, setRadioFirst] = useState(false); //состояние радиокнопки для 1этажа
  const [radioLast, setRadioLast] = useState(false); //состояние радиокнопки для последнего этажа
  const [statisticCheckboxChecked, setStatisticCheckboxChecked] = useState(true) // состояние чекбокса

  const worldYear = new Date;
///////////////////////////////////////////////////////////////////////////////////////

// отслеживает выбор категории недвижимости
function handleChoice(e) {
  setRealtyCategory(e.target.name)
  handleNextPage()
}

// переход на следующую страничку попап-формы
function handleNextPage() {
  setPage(page + 1) 
}

// возврат на предыдущую старичку попап-формы
function handleBackPage() {
if (page===3) {
  setRealtyCategory('')
  setPage(page - 3)
} else {
if (page===1) {
  setRealtyCategory('')
  setIsValidOne(false)
  setIsValidTwo(false)
}
if (page===0) {
  setActiveCategory('')
}
setPage(page - 1)
}
}
///////////////////////////////////////////////////////////////////////////////////////

const [residential, setResidental] = useState({
  year: '',
  square:'',
  cost:'',
  floor:'',
  street:'',
  house: '',
  
  city:'',
  communications:'',
})

const [residentialErrorsOne, setResidentalErrorsOne] = useState({
    calendar: '',
    year: null,
    square: null,
    cost: null,
    floor:null,
})

const [residentalErrorsTwo, setResidentalErrorsTwo] = useState({
  street: null,
  house: null,
  city: null,
  communications: [],
})
///////////////////////////

const [commercial, setCommercial] = useState({
  year: '',
  square:'',
  cost:'',
  floor:'',
  roomClass: '',

  city: '',
  street:'',
  house: '',
  purpose: '',
})
const [commercialErrorsOne, setCommercialErrorsOne] = useState({
  calendar: '',
  year: null,
  square: null,
  cost: null,
  floor:null,
  roomClass: null,
})

const [commercialErrorsTwo, setCommercialErrorsTwo] = useState({
  city: null,
  street: null,
  house: null,
  purpose: null,
})
///////////////////////////////////////////////////////////////////////////////////////

// добавляет в объект полей значения специфических инпутов при их изменении
useEffect(() => {
  if (realtyCategory === "residential") {
    setResidental({... residential,
      date: purchaseDate,
      communications:communications,
      radioFirst: radioFirst,
      radioLast: radioLast,
      isStatistic: statisticCheckboxChecked,
    })
  } else {
    setCommercial({... commercial,
      date: purchaseDate,
      radioFirst: radioFirst,
      radioLast: radioLast,
      isStatistic: statisticCheckboxChecked,
    })
  }
  },[radioFirst,
      radioLast,
      purchaseDate,
      communications,
      statisticCheckboxChecked,
    ])


// Отзычивая валидность формы жилой недвижимости
useEffect(() => {
  if (realtyCategory === 'residential') {
    page === 1
      ? setIsValidOne(!Object.values(residentialErrorsOne).some(x => x !== ''))
      :  setIsValidTwo(!Object.values(residentalErrorsTwo).some(x => x !== '' )) 
  } else {
    page === 1
      ? setIsValidOne(!Object.values(commercialErrorsOne).some(x => x !== ''))
      :  setIsValidTwo(!Object.values(commercialErrorsTwo).some(x => x !== '' ))
    }
}, [residentialErrorsOne,
    residentalErrorsTwo,
    commercialErrorsOne,
    commercialErrorsTwo])
///////////////////////////////////////////////////////////////////////////////////////

// изменение значений стандартных инпутов на первой страничке формы жилой недвижимости
function handleChangeInput(e) {
  const {name, value} = e.target;
  setResidental({
    ...residential,
    [name]: value
  })
  
  if (page === 1) {
    value === ''
    ? setResidentalErrorsOne({...residentialErrorsOne, [name]: emptyFieldErrorMessage})
    :  e.target.value <= 0 
      ? setResidentalErrorsOne({...residentialErrorsOne, [name]: negativeErrorMessage})
      : setResidentalErrorsOne({...residentialErrorsOne, [name]: ''})
  } else {
    value === ''
    ? setResidentalErrorsTwo({...residentalErrorsTwo, [name]: emptyFieldErrorMessage})
    :  e.target.value <= 0 
      ? setResidentalErrorsTwo({...residentalErrorsTwo, [name]: negativeErrorMessage})
      : setResidentalErrorsTwo({...residentalErrorsTwo, [name]: ''})
  }
 

  if (name === 'year' ) {
    if (value > worldYear.getFullYear()) { 
      setResidentalErrorsTwo({...residentalErrorsTwo, [name]: greatValue})
    }
    // if (value < 1890) {
    //   setResidentalErrorsTwo({...residentalErrorsTwo, [name]: retroTransport})
    // }
  }
}
//////////////////////////////

// изменение значений стандартных инпутов на первой страничке формы жилой недвижимости
function handleChangeCommercialInput(e) {
  const {name, value} = e.target;
  setCommercial({
    ...commercial,
    [name]: value
  })
  if (page === 1){
    value === ''
        ? setCommercialErrorsOne({...commercialErrorsOne, [name]: emptyFieldErrorMessage})
        :  e.target.value <= 0
            ? setCommercialErrorsOne({...commercialErrorsOne, [name]: negativeErrorMessage})
            : setCommercialErrorsOne({...commercialErrorsOne, [name]: ''}) 
  } else {
    value === ''
        ? setCommercialErrorsTwo({...commercialErrorsTwo, [name]: emptyFieldErrorMessage})
        :  e.target.value <= 0
            ? setCommercialErrorsTwo({...commercialErrorsTwo, [name]: negativeErrorMessage})
            : setCommercialErrorsTwo({...commercialErrorsTwo, [name]: ''})
  }
}

///////////////////////////////////////////////////////////////////////////////////////


function handleChangeInputDrop(e) {
  const {name, value} = e.target;
  setResidental({
    ...residential,
    [name]: value
  })
  // if (value === '') {
  //   setCities([])
  // } else {
     handleSearchCities(value)
  // }
 
 if (value === '') {
setResidentalErrorsTwo({...residentalErrorsTwo, [name]: emptyFieldErrorMessage})
 }

 if (name === 'city' && value !== '') {
  if (Object.values(dropOptions).every(x => x !== value)) {
    setResidentalErrorsTwo({...residentalErrorsTwo, 'city': choiceErrorMessage}) 
  } 
} 
}

function handleChangeCommercialInputDrop(e) {
  const {name, value} = e.target;
  setCommercial({
    ...commercial,
    [name]: value
  })
  handleSearchCities(value)

 if (value === '') {
setCommercialErrorsTwo({...commercialErrorsTwo, [name]: emptyFieldErrorMessage})
 }
 if (name === 'roomClass' && value !== '') {
  if (Object.values(dropOptions).every(x => x !== value)) {
    setCommercialErrorsOne({...commercialErrorsOne, 'roomClass': choiceErrorMessage}) 
  } 
} 
if (name === 'city' && value !== '') {
  if (Object.values(dropOptions).every(x => x !== value)) {
    setCommercialErrorsTwo({...commercialErrorsTwo, 'city': choiceErrorMessage}) 
  } 
} 
if (name === 'purpose' && value !== '') {
  if (Object.values(dropOptions).every(x => x !== value)) {
    setCommercialErrorsTwo({...commercialErrorsTwo, 'purpose': choiceErrorMessage}) 
  } 
} 
}


// изменение значения инпута ГОРОД по дропдауну 
// поле встречается в ОБЕИХ формах
function handleChangeCityDrop(value) {
  if (realtyCategory === 'residential') {
    setResidental({...residential, 'city': value})
    setResidentalErrorsTwo({...residentalErrorsTwo, 'city': ''})
  } else {
    setCommercial({...commercial, 'city': value})
    setCommercialErrorsTwo({...commercialErrorsTwo, 'city': ''})
  }
  
}
// изменение значения инпута КЛАСС ПОМЕЩЕНИЯ по дропдауну
function handleChangeRoomClassDrop(value) {
  setCommercial({...commercial, 'roomClass': value})
  setCommercialErrorsOne({...commercialErrorsOne, 'roomClass': ''})
  setIsRoomClassDown(!isRoomClassDown)
}
// изменение значения инпута КЛАСС ПОМЕЩЕНИЯ по дропдауну
function handleChangePurposeDrop(value) {
  setIsPurposeDown(!isPurposeDown)
  setCommercial({...commercial, 'purpose': value})
  setCommercialErrorsTwo({...commercialErrorsTwo, 'purpose': ''})
}
///////////////////////////////////////////////////////////////////////////////////////


// КАЛЕНДАРЬ
// подключаем локализацию для календаря
registerLocale('ru', ru)
// изменение и валидация специфического поля календаря

useEffect(() => {
  if (realtyCategory === 'residential') {
    if (purchaseDate === null) {
    setResidentalErrorsOne({...residentialErrorsOne, 'calendar': calendarErrorMessage})
    setIsValidOne(false)
    } else {
        setResidentalErrorsOne({...residentialErrorsOne, 'calendar': ''})
        setIsValidOne(true)
      }
    
  } else {
    if (purchaseDate === null) {
      setCommercialErrorsOne({...commercialErrorsOne, 'calendar': calendarErrorMessage})
      setIsValidOne(false)
      } else {
          setCommercialErrorsOne({...commercialErrorsOne, 'calendar': ''})
          setIsValidOne(true) 
      }
  }
},[purchaseDate])

useEffect(() => {
setIsValidOne(false)
}, [realtyCategory])
///////////////////////////////////////////////////////////////////////////////////////

// ЭТАЖ И РАДИОКНОПКИ ЭТАЖЕЙ

useEffect(() => {
  if (realtyCategory === 'residential') {
    residential.floor === '1'
      ? setRadioFirst(true)
      :  setRadioFirst(false)
  } else {
    commercial.floor === '1'
      ? setRadioFirst(true)
      : setRadioFirst(false)
  }
}, [residential.floor,
    commercial.floor])


// когда мы подсвечиваем радиокнопку, должно поменяться значение инпута на 1
function handleChangeFirstFloorRadio() {

  if (realtyCategory === 'residential') {
    if (!radioFirst) {
        setResidental({...residential, floor: '1'})
      }
      setRadioFirst(!radioFirst)
      setRadioLast(false)
  } else {
    if (!radioFirst) {
      setCommercial({...commercial, floor: '1'})
    }
    setRadioFirst(!radioFirst)
    setRadioLast(false)
  }
}


// последний этаж ( последний этаж может быть любым)
function handleChangeLastFloorRadio() {
  setRadioLast(!radioLast)
  setRadioFirst(false)
}
///////////////////////////////////////////////////////////////////////////////////////

// SUBMIT
  function handleResidentialSubmit(e) {
    e.preventDefault();
    console.log(residential)
    handleNextPage()
  }

  function handleCommercialSubmit(e) {
    e.preventDefault();
    console.log(commercial)
    handleNextPage()
  }
///////////////////////////////////////////////////////////////////////////////////////

// ДРОПДАУНЫ
// переменные
const [isDropDown, setIsDropDown] = useState(false);
const [isOptionCityDown, setIsOptionCityDown] = useState(false);
const [isPurposeDown, setIsPurposeDown] = useState(false);
const [isRoomClassDown, setIsRoomClassDown] = useState(false)

// обработчик дропа с чекбоксами
  const handleCommunicationsChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      // push selected value in list
      setСommunications(prev => [...prev, value]);
    } else {
      // remove unchecked value from the list
      setСommunications(prev => prev.filter(x => x !== value));
    } 
  }


useEffect(() => {
  if (residential.communications !== '') {
  if (residential.communications.length === 0) {
    setResidentalErrorsTwo({...residentalErrorsTwo, 'communications': communicationsErrorMessage })
  } else {
    setResidentalErrorsTwo({...residentalErrorsTwo, 'communications': '' })
  }
}
}, [residential.communications])


  useEffect(() => {
       document.addEventListener('mousedown', function(e) {
         if (e.target.className !== 'dropdown-label') {
           setIsDropDown(false)
         }
       } )
   
       return document.removeEventListener('mousedown', function(e) {
         if (e.target.className !== 'dropdown-label') {
           setIsDropDown(false)
         }
       } )
       }, [])
          
///////////////////////////////////////////////////////////////////////////////////////


  return (
    <>
      <div className="popup__header">
        <button className={page===3 ? "popup__go-back-button popup__go-back-button_none" : "popup__go-back-button"} onClick={handleBackPage}></button>
        <h3 className="title popup__title">
          <span className={realtyCategory==="commercial"? "card-icon commercial" : "card-icon realty" }></span>
          {realtyCategory==="residential" 
            ? "Недвижимость/Жилая"
            : realtyCategory==="commercial" 
            ? "Недвижимость/Коммерческая" 
            : "Недвижимость"
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
          <button className="button category-button" name="residential" onClick={handleChoice}><span className="card-icon realty"></span>Жилая<span className="category__button-icon"></span></button>
          <button className="button category-button" name="commercial" onClick={handleChoice}><span className="card-icon commercial"></span>Коммерческая<span className="category__button-icon"></span></button>
        </div>
        )

// ПРЕВАЯ ВЕТКА. ЖИЛАЯ НЕДВИЖИМОСТЬ
// ПЕРВАЯ ФОРМА
        : 
        (realtyCategory==="residential")
        ? ( <form name="realty-residential" className="form popup__form" onSubmit={handleResidentialSubmit} autoComplete="off">
            {page===1 
            ? ( <>
              <fieldset className="popup-fildset inputs-fildset">
                <label className="active-form__label date-label"> Дата покупки * 

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
                  <span className = "form__item-error ">{residentialErrorsOne.calendar}</span>  
                </label>
    
                <div className="form-flex-wraper">
                  <label className="active-form__label flex-label"> Год постройки *
                    <input type="number" className="form__input" placeholder="Placeholder" name='year' onChange={handleChangeInput} value={residential.year}></input>
                    <span className = "form__item-error ">{residentialErrorsOne.year}</span>  
                  </label>
                
                  <label className="active-form__label flex-label"> Общая площадь, м2 *
                    <input type="number" className="form__input" placeholder="Placeholder" name='square' onChange={handleChangeInput} value={residential.square} ></input>
                    <span className = "form__item-error ">{residentialErrorsOne.square}</span> 
                  </label>  
                </div>
        
                <label className="active-form__label"> Стоимость, руб *
                  <input type="number" className="form__input" placeholder="Placeholder" name='cost' onChange={handleChangeInput} value={residential.cost} ></input>
                  <span className = "form__item-error ">{residentialErrorsOne.cost}</span>
                </label>

                <label className="active-form__label"> Этаж *
                  <input type="number" className="form__input " placeholder="Placeholder" name='floor' onChange={handleChangeInput} value={residential.floor} ></input>
                  <span className = "form__item-error ">{residentialErrorsOne.floor}</span>
                </label>
        
                <div className="radio-wraper radio-checkbox-wrapper">
                  <input    
                    type="checkbox"
                    id="first"
                    name="first"
                    className="checkbox radio-checkbox"
                    checked={radioFirst}
                    onChange={handleChangeFirstFloorRadio}
                  /> 
                  <label className="active-form__label radio-checkbox-label" htmlFor="first">Первый</label>
                  <input    
                    type="checkbox"
                    id="last"
                    name="last"
                    className="checkbox radio-checkbox"
                    checked={radioLast}
                    onChange={handleChangeLastFloorRadio}
                  /> 
                  <label className="active-form__label radio-checkbox-label" htmlFor="last">Последний</label>
                </div>
              </fieldset>

            
              <fieldset className="popup-fildset">
                <div className="form-flex-wraper">
                  <button type="button" className="white-button button  button-s"  onClick={handleBackPage}>{"Назад"}</button>
                  <button type="button" className="orange-button button  button-s" disabled={!isValidOne} onClick={handleNextPage}>{"Продолжить"}</button>
                </div>
              
                <div className="page-wrapper">
                  <div className= "page-point  page-point_active"></div>
                  <div className="page-point"></div>
                  <div className="page-point"></div>
                </div>
              </fieldset>
              </>)
  // ВТОРАЯ ФОРМА      
              : (page===2) 
              ? (<>
                <fieldset className="popup-fildset">

                 <label className="active-form__label">Город * 
                    <input name="city" className="form__input" placeholder="Москва" value={residential.city} onChange={(e) => {handleChangeInputDrop(e); setIsOptionCityDown(true)}}></input>
                    <span className = "form__item-error ">{residentalErrorsTwo.city}</span>
                  
                  <div className={!isOptionCityDown ? 'dropdown': 'dropdown dropdown_open'} >
                    {cities.map((item) => {
                      return <div className="option" key={`city_residental_${item.id}`} onClick={(e) => {handleChangeCityDrop(item.city); setIsOptionCityDown(false)}}>{item.city}, {item.region}</div>
                    })}
                  </div>
                  </label>

                  <label className="active-form__label"> Улица *
                    <input type="text" className="form__input" placeholder="пр. Мира" name="street" onChange={handleChangeInput} value={residential.street} ></input>
                    <span className = "form__item-error ">{residentalErrorsTwo.street}</span>  
                  </label>
                  
                  <label className="active-form__label"> Дом * 
                    <input type="text" className="form__input" placeholder="пр. Мира" name="house" onChange={handleChangeInput} value={residential.house}></input>
                    <span className = "form__item-error ">{residentalErrorsTwo.house}</span> 
                  </label>  
                  
      {/* ..... тут дропдаун ...... */}
                   <label className="active-form__label"> Коммуникации *
                    <input type="text" className="form__input" onClick={() => setIsDropDown(!isDropDown)} placeholder='Placeholder' value={communications.length ? communications.join(', ') : ''} ></input>
                    <ul className={isDropDown ? "dropdown-menu dropdown-menu_droped" : "dropdown-menu"}>  
                       {optionsList.map((x, i) => 
                        <li className="dropdown-input">
                          <input
                            id={i}
                            type="checkbox"
                            className="checkbox-dropdown"
                            name="options"
                            value={x.value}
                            onChange={handleCommunicationsChange}
                          /> 
                          <label className="dropdown-label" htmlFor={i}>{x.label}</label>
                        </li>
                      )}
                    </ul>
                   <span className = "form__item-error ">{residentalErrorsTwo.communications}</span>
                  </label>
      {/* ....................... */}

                  <label className="checkbox" >
                    <input type="checkbox" className="checkbox-input" name="isStatistics" checked={statisticCheckboxChecked} onChange={() => setStatisticCheckboxChecked(!statisticCheckboxChecked)}></input>
                    <span className='checkbox-switch'></span>
                    <span className='checkbox-text'>Отображать в общей статистике</span>
                  </label>
                </fieldset>     

                <fieldset className="popup-fildset">
                  <div className="form-flex-wraper">
                    <button type="button" className="white-button button button-s" onClick={handleBackPage}>{"Назад"}</button>
                    <input type="submit" className="orange-button button button-s" disabled={!isValidTwo} value="Добавить актив"></input>
                  </div>     


                  <div className="page-wrapper">
                    <div className="page-point"></div>
                    <div className="page-point page-point_active"></div>
                    <div className="page-point"></div>
                  </div>  
                </fieldset>
              </>)

              :  
//ПОДТВЕРЖДЕНИЕ
              <>
                <Comfirmation 
                  handleClose={handleClose}
                  setActiveCategory={setActiveCategory}
                  page={page}
                  setPage={setPage}
                  setCategory={setRealtyCategory}
                />
                <div className="page-wrapper">
                  <div className="page-point"></div>
                  <div className="page-point"></div>
                  <div className="page-point page-point_active"></div>
                </div>
              </>

            }

          </form>)


// ВТОРАЯ ВЕТКА. КОММЕРЧЕСКАЯ НЕДВИЖИМОСТЬ
        : 
        (realtyCategory==="commercial")
        ? (<form name="realty-residential" className="form popup__form" onSubmit={handleCommercialSubmit}>
            {page===1 
            ? (<>
                <fieldset className="popup-fildset">
                  <label className="active-form__label date-label"> Дата покупки * 
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
                      <span className = "form__item-error ">{commercialErrorsOne.calendar}</span>  
                  </label>

                  <div className="form-flex-wraper">
                    <label className="active-form__label flex-label"> Год постройки *
                      <input type="number" className="form__input" placeholder="Placeholder" name='year' onChange={handleChangeCommercialInput} value={commercial.year} ></input>
                      <span className = "form__item-error email-input-error">{commercialErrorsOne.year}</span>  
                    </label>
                    <label className="active-form__label flex-label"> Общая площадь, м2 *
                      <input type="number" className="form__input" placeholder="Placeholder" name='square' onChange={handleChangeCommercialInput} value={commercial.square}></input>
                      <span className = "form__item-error email-input-error">{commercialErrorsOne.square}</span> 
                    </label>  
                  </div>
    
                  <label className="active-form__label"> Стоимость, руб *
                    <input type="number" className="form__input" placeholder="Placeholder" name='cost' onChange={handleChangeCommercialInput} value={commercial.cost}></input>
                    <span className = "form__item-error email-input-error">{commercialErrorsOne.cost}</span>
                  </label>

                  <div className="form-flex-wraper">
                    <label className="active-form__label flex-label"> Этаж *
                      <input type="number" className="form__input " placeholder="Placeholder" name='floor' onChange={handleChangeCommercialInput} value={commercial.floor}></input>
                      <span className = "form__item-error email-input-error">{commercialErrorsOne.floor}</span>
                    </label>  
                    
                  <label className="active-form__label flex-label">Класс помещения * 
                    <input name="roomClass" type="text" className="form__input" placeholder="Placeholder" value={commercial.roomClass} onClick={(e) => {setIsRoomClassDown(!isRoomClassDown)}}></input>
                    <span className = "form__item-error ">{commercialErrorsOne.roomClass}</span>
       
                  <div className={!isRoomClassDown ? 'dropdown': 'dropdown dropdown_open'} >
                    {dropOptions.map((item) => {

                      // if ( commercial.roomClass !== undefined && commercial.roomClass !== '') {
                      //   const value = commercial.roomClass.toLowerCase()
      
                      //   if (item.name.toLowerCase().includes(value)) {
                          return <div className="option" key={item.name} onClick={(e) => {handleChangeRoomClassDrop(item.name)}}>{item.name}</div>
                      //   } else {
                      //     return null
                      //   }
                      // }
                    })}
                  </div>
                  </label>
                 </div>

                 <div className="radio-wraper radio-checkbox-wrapper">
                    <input    
                      type="checkbox"
                      id="first"
                      name="first"
                      className="checkbox radio-checkbox"
                      checked={radioFirst}
                      onChange={handleChangeFirstFloorRadio}
                    /> 
                    <label className="active-form__label radio-checkbox-label" htmlFor="first">Первый</label>
                    <input    
                      type="checkbox"
                      id="last"
                      name="last"
                      className="checkbox radio-checkbox"
                      checked={radioLast}
                      onChange={handleChangeLastFloorRadio}
                    /> 
                    <label className="active-form__label radio-checkbox-label" htmlFor="last">Последний</label>
                 </div>
                </fieldset>

                <fieldset className="popup-fildset">
                  <div className="form-flex-wraper">
                    <button type="button" className="white-button button button-s" onClick={handleBackPage}>{"Назад"}</button>
                    <button type="button" className="orange-button button button-s" disabled={!isValidOne} onClick={handleNextPage}>{"Продолжить"}</button>
                  </div>
                  
                  <div className="page-wrapper">
                    <div className= "page-point  page-point_active"></div>
                    <div className="page-point"></div>
                    <div className="page-point"></div>
                  </div>
                </fieldset>
              </>)

            : (page===2)
            ? (<>
              <fieldset className="popup-fildset">
              <label className="active-form__label">Город * 
                    <input name="city" type="text" className="form__input" placeholder="Москва" value={commercial.city} onChange={(e) => {handleChangeCommercialInputDrop(e); setIsOptionCityDown(true)}}></input>
                    <span className = "form__item-error ">{commercialErrorsTwo.city}</span>
                  
                  <div className={!isOptionCityDown ? 'dropdown': 'dropdown dropdown_open'} >
                    {cities.map((item) => {
                      return <div className="option" key={`city_residental_${item.id}`} onClick={(e) => {handleChangeCityDrop(item.city); setIsOptionCityDown(false)}}>{item.city}, {item.region}</div>
                    })}
                  </div>
                  </label>

                <label className="active-form__label"> Улица *
                  <input type="text" className="form__input" placeholder="пр. Мира" name="street" onChange={handleChangeCommercialInput} value={commercial.street}></input>
                  <span className = "form__item-error">{commercialErrorsTwo.street}</span>  
                </label>
            
                <label className="active-form__label"> Дом м2 *
                  <input type="text" className="form__input" placeholder="пр. Мира" name="house"onChange={handleChangeCommercialInput} value={commercial.house}></input>
                  <span className = "form__item-error">{commercialErrorsTwo.house}</span> 
                </label>  

                <label className="active-form__label">Назначение * 
                    <input name="purpose" type="text" className="form__input" placeholder="Placeholder" value={commercial.purpose} onChange={(e) => {setIsPurposeDown(!isPurposeDown)}}></input>
                    <span className = "form__item-error ">{commercialErrorsTwo.purpose}</span>
                  
                  <div className={!isPurposeDown ? 'dropdown': 'dropdown dropdown_open'} >
                    {dropOptions.map((item) => {

                      // if ( commercial.purpose !== undefined && commercial.purpose !== '') {
                      //   const value = commercial.purpose.toLowerCase()
      
                      //   if (item.name.toLowerCase().includes(value)) {
                          return <div className="option" key={item.name} onClick={(e) => {handleChangePurposeDrop(item.name)}}>{item.name}</div>
                      //   } else {
                      //     return null
                      //   }
                      // }
                    })}
                  </div>
                  </label>

                  <label className="checkbox" >
                    <input type="checkbox" className="checkbox-input" name="isStatistics" checked={statisticCheckboxChecked} onChange={() => setStatisticCheckboxChecked(!statisticCheckboxChecked)}></input>
                    <span className='checkbox-switch'></span>
                    <span className='checkbox-text'>Отображать в общей статистике</span>
                  </label>
              </fieldset>

              <fieldset className="popup-fildset">
                <div className="form-flex-wraper">
                  
                  <button type="button" className="white-button button button-s" onClick={handleBackPage}>Назад</button>
                  <input type="submit" className="orange-button button button-s" disabled={!isValidTwo}  value="Добавить актив"></input>
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
            (<>
              <Comfirmation 
                handleClose={handleClose}
                setActiveCategory={setActiveCategory}
                page={page}
                setPage={setPage}
                setCategory={setRealtyCategory}
              />
              <div className="page-wrapper">
                <div className="page-point"></div>
                <div className="page-point"></div>
                <div className="page-point page-point_active"></div>
              </div>
            </>)
          }
        </form>)
      : <></>  
      }
    </>
  )
}

export default RealtyForm;