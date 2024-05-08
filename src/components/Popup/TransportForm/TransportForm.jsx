import {React, useState, useEffect} from 'react';

import DatePicker, {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';

import Comfirmation from "../Confirmation/Confirmation";

import './TransportForm.css';

import { 
  motorSizeOptions,
  motorTypeOptions,
  transmissionTypeOptions,
  // dropOptions,
  // dropYearOptions,
  greatValue,
  retroTransport,
  calendarErrorMessage,
  emptyFieldErrorMessage,
  negativeErrorMessage,
  // choiceErrorMessage,
} from "../../../utils/constants";

// import { postCar, postBike } from '../../../api/api';

function TransportForm({
  isOk,

  postCar,
  postBike,

  models,
  getModels,
  brands,
  getBrands,
  page, 
  setPage, 
  handleClose, 
  transportCategory, 
  setTransportCategory, 
  setActiveCategory
  }) {

    const worldYear = new Date;
    const [isValidOne, setIsValidOne] = useState(false)
    const [isValidTwo, setIsValidTwo] = useState(false)
    const [isValidThree, setIsValidThree] = useState(false)
///////////////////////////////////////////////////////////////////////////////////////
const [purchaseDate, setPurchaseDate] =useState(new Date());
const [statisticCheckboxChecked, setStatisticCheckboxChecked] = useState(true) // состояние чекбокса

const [car, setCar] = useState({
  brand: {name:'', value: ''},
  model: {name:'', value: ''},
  year:'',
  mileage: 0,

  transmission:'',
  motor: '',
  motorSize: '',
  
  date:'',
  cost:'',
})

const [bike, setBike] = useState({
  brand: '',
  model:'',
  year:'',
  mileage: 0,

  motorSize: '',
  date:'',
  cost:'',
})

const [carErrorsOne, setCarErrorsOne] = useState({
  brand: null,
  model: null,
  year: null,
  mileage: null,
})

const [carErrorsTwo, setCarErrorsTwo] = useState({
  transmission: null,
  motor: null,
  motorSize: null,
})

const [carErrorsThree, setCarErrorsThree] = useState({
  date:'',
  cost: null,
})
///////////////////////////

const [bikeErrorsOne, setBikeErrorsOne] = useState({
  brand: null,
  model: null,
  year: null,
  mileage: null,
})

const [bikeErrorsTwo, setBikeErrorsTwo] = useState({
  motorSize: null,
  date:'',
  cost: null,
})

// ДРОПДАУНЫ
// переменные
// const [isOptionYearDown, setIsOptionYearDown] = useState(false);
const [isOptionBrandDown, setIsOptionBrandDown] = useState(false);
const [isOptionModelDown, setIsOptionModelDown] = useState(false);
const [isOptionMotorDown, setIsOptionMotorDown] = useState(false);
const [isOptionMotorSizeDown, setIsOptionMotorSizeDown] = useState(false);
const [isOptionTransmissionDown, setIsOptionTransmissionDown] = useState(false)
//////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
// Отзычивая валидность формы жилой недвижимости
useEffect(() => {
  if (transportCategory === 'car') {
     if (page === 1) {
      setIsValidOne(!Object.values(carErrorsOne).some(x => x !== ''))
     }
    if (page === 2) {
      setIsValidTwo(!Object.values(carErrorsTwo).some(x => x !== '' )) 
    } else {
      setIsValidThree(!Object.values(carErrorsThree).some(x => x !== '' )) 
    }
  } else {
    if (transportCategory === 'bike') {
      if (page === 1) {
       setIsValidOne(!Object.values(bikeErrorsOne).some(x => x !== ''))
      }
     if (page === 2) {
       setIsValidTwo(!Object.values(bikeErrorsTwo).some(x => x !== '' )) 
     } 
    }
  }
},[carErrorsOne,
  carErrorsTwo,
  carErrorsThree,
  bikeErrorsOne,
  bikeErrorsTwo,
  ])

// useEffect(() => {
//   console.log(carErrorsThree)
// }, [carErrorsThree])
///////////////////////////////////////////////////////////////////////////////////////

// изменение значений стандартных инпутов на первой страничке формы жилой недвижимости
function handleChangeInput(e) {
  const {name, value} = e.target;

  if (transportCategory === 'car') {
  setCar({
    ...car,
    [name]: value
  })
  
  if (page === 1) {
    value === ''
    ? setCarErrorsOne({...carErrorsOne, [name]: emptyFieldErrorMessage})
    :  e.target.value <= 0 
      ? setCarErrorsOne({...carErrorsOne, [name]: negativeErrorMessage})
      : setCarErrorsOne({...carErrorsOne, [name]: ''})
  }  else {
    value === ''
    ? setCarErrorsThree({...carErrorsThree, [name]: emptyFieldErrorMessage})
    :  e.target.value <= 0 
      ? setCarErrorsThree({...carErrorsThree, [name]: negativeErrorMessage})
      : setCarErrorsThree({...carErrorsThree, [name]: ''})
  }
  
  if (name === 'year' ) {
    if (value > worldYear.getFullYear()) { 
     setCarErrorsOne({...carErrorsOne, [name]: greatValue})
    }
    if (value < 1890) {
      setCarErrorsOne({...carErrorsOne, [name]: retroTransport})
    }
  }

  if (name === 'cost' && value > 1000000000000000000) {
    setCarErrorsThree({...carErrorsThree, [name]: greatValue})
  }

} else {
    setBike({
      ...bike,
      [name]: value
    })
    
    if (page === 1) {
      value === ''
      ? setBikeErrorsOne({...bikeErrorsOne, [name]: emptyFieldErrorMessage})
      :  e.target.value <= 0 
        ? setBikeErrorsOne({...bikeErrorsOne, [name]: negativeErrorMessage})
        : setBikeErrorsOne({...bikeErrorsOne, [name]: ''})
    }  else {
      value === ''
      ? setBikeErrorsTwo({...bikeErrorsTwo, [name]: emptyFieldErrorMessage})
      :  e.target.value <= 0 
        ? setBikeErrorsTwo({...bikeErrorsTwo, [name]: negativeErrorMessage})
        : setBikeErrorsTwo({...bikeErrorsTwo, [name]: ''})
    }

    if (name === 'year' ) {
      if (value > worldYear.getFullYear()) { 
       setBikeErrorsOne({...bikeErrorsOne, [name]: greatValue})
      }
      if (value < 1890) {
        setBikeErrorsOne({...bikeErrorsOne, [name]: retroTransport})
      }
    }
    if (name === 'cost' && value > 1000000000000000000) {
      setBikeErrorsTwo({...bikeErrorsTwo, [name]: greatValue})
    }
    if (name === 'motorSize' && value > 2147483647) {
      setBikeErrorsTwo({...bikeErrorsTwo, [name]: greatValue})
    }
}
}

//////////////////////////////

// поля-дропы
// function handleChangeInputDrop(e) {
//   const {name, value} = e.target;
//   setCar({
//     ...car,
//     [name]: value
//   })

//   if (page === 1) {
//     if (value === '') {
//       setCarErrorsOne({...carErrorsOne, [name]: emptyFieldErrorMessage})
//     }   
//   }
//   if (page === 2) {
//     if (value === '') {
//       setCarErrorsTwo({...carErrorsOne, [name]: emptyFieldErrorMessage})
//     }   
//   }
//   if (page === 3) {
//     if (value === '') {
//       setCarErrorsThree({...carErrorsOne, [name]: emptyFieldErrorMessage})
//     }   
//   }
  
// if (transportCategory === 'car') {
//   if (name === 'brand' && value !== '') {
//     if (Object.values(dropOptions).every(x => x !== value)) {
//       setCarErrorsOne({...carErrorsOne, 'brand': choiceErrorMessage})
//     }
//   }

//   if (name === 'model' && value !== '') {
//     if (Object.values(dropOptions).every(x => x !== value)) {
//       setCarErrorsOne({...carErrorsOne, 'model': choiceErrorMessage})
//     }
//   }

//   if (name === 'year' && value !== '') {
//     if (Object.values(dropYearOptions).every(x => x !== value)) {
//       setCarErrorsOne({...carErrorsOne, 'year': choiceErrorMessage})
//     }
//   }
// }

// if (transportCategory === 'bike') {
//   if (name === 'brand' && value !== '') {
//     if (Object.values(dropOptions).every(x => x !== value)) {
//       setBikeErrorsOne({...bikeErrorsOne, 'brand': choiceErrorMessage})
//     }
//   }

//   if (name === 'model' && value !== '') {
//     if (Object.values(dropOptions).every(x => x !== value)) {
//       setBikeErrorsOne({...bikeErrorsOne, 'model': choiceErrorMessage})
//     }
//   }

//   if (name === 'year' && value !== '') {
//     if (Object.values(dropYearOptions).every(x => x !== value)) {
//       setBikeErrorsOne({...bikeErrorsOne, 'year': choiceErrorMessage})
//     }
//   }
// }


// /////////////////////////

//   if (name === 'transmission' && value !== '') {
//     if (Object.values(dropOptions).every(x => x !== value)) {
//       setCarErrorsTwo({...carErrorsTwo, 'transmission': choiceErrorMessage})
//     }
//   }

//   if (name === 'motor' && value !== '') {
//     if (Object.values(dropOptions).every(x => x !== value)) {
//       setCarErrorsTwo({...carErrorsTwo, 'motor': choiceErrorMessage})
//     }
//   }

//   if (name === 'motorSize' && value !== '') {
//     if (Object.values(dropYearOptions).every(x => x !== value)) {
//       setCarErrorsTwo({...carErrorsTwo, 'motorSize': choiceErrorMessage})
//     }
//   }
// }

// изменение значения инпута по дропдауну 
function handleChangeBrandDrop({name, value}) {
  getModels(value)

  setIsOptionBrandDown(false)
  if (transportCategory === 'car') {
    setCar({...car, brand: {value: value, name:name}})
    setCarErrorsOne({...carErrorsOne, 'brand': ''})
  } else {
    setBike({...bike, 'brand': value})
    setBikeErrorsOne({...bikeErrorsOne, 'brand': ''})
  }
}

function handleChangeModelDrop({name, value}) {
  setIsOptionModelDown(false)
  if (transportCategory === 'car') {
    setCar({...car, model: {value: value, name:name}})
    setCarErrorsOne({...carErrorsOne, 'model': ''})
  } else {
    setBike({...bike, 'model': value})
    setBikeErrorsOne({...bikeErrorsOne, 'model': ''})
  }
}
// function handleChangeYearDrop(value) {
//   setIsOptionYearDown(false)
//   if (transportCategory === 'car') {
//     setCar({...car, 'year': value})
//     setCarErrorsOne({...carErrorsOne, 'year': ''})
//   } else {
//     setBike({...bike, 'year': value})
//     setBikeErrorsOne({...bikeErrorsOne, 'year': ''})
//   }
// }

/////////////

function handleChangeTransmissionDrop(value) {
  setIsOptionTransmissionDown(false)
  if (transportCategory === 'car') {
    setCar({...car, 'transmission': value})
    setCarErrorsTwo({...carErrorsTwo, 'transmission': ''})
  } 
}

function handleChangeMotorDrop(value) {
  setIsOptionMotorDown(false)
  if (transportCategory === 'car') {
    setCar({...car, 'motor': value})
    setCarErrorsTwo({...carErrorsTwo, 'motor': ''})
  } 
}

function handleChangeMotorSizeDrop(value) {
  setIsOptionMotorSizeDown(false)
  if (transportCategory === 'car') {
    setCar({...car, 'motorSize': value})
    setCarErrorsTwo({...carErrorsTwo, 'motorSize': ''})
  } 
}

/////////////////////////////////////////////////////////////////////////////////

// изменение и валидация специфического поля календаря
   // подключаем локализацию для календаря
   registerLocale('ru', ru)
useEffect(() => {
  if (transportCategory === 'car') {
    if (purchaseDate === null) {
    setCarErrorsThree({...carErrorsThree, 'date': calendarErrorMessage})
    setIsValidThree(false)
    } else {
        setCarErrorsThree({...carErrorsThree, 'date': ''})
        setIsValidThree(true)
      }
    
  } else {
    if (purchaseDate === null) {
      setBikeErrorsTwo({...bikeErrorsTwo, 'date': calendarErrorMessage})
      setIsValidOne(false)
      } else {
        setBikeErrorsTwo({...bikeErrorsTwo, 'date': ''})
          setIsValidOne(true) 
      }
  }
},[purchaseDate])

useEffect(() => {
setIsValidOne(false)
setIsValidTwo(false)
setIsValidThree(false)
}, [transportCategory])

/////////////////////////////////////////////////////////////////////////////////////////

  // отслеживает выбор категории транспорта
  function handleChoice(e) {
    setTransportCategory(e.target.name)
    handleNextPage()
  }
////////////////////////

  // ПЕРЕХОДЫ
// переход на следующую страничку попап-формы
  function handleNextPage() {
    setPage(page + 1)
  }

// возврат на предыдущую старичку попап-формы
  function handleBackPage() {
    if (page===4 && transportCategory==='car') {
      setTransportCategory('')
      setPage(page - 4) 
    } else if ((page===3 && transportCategory==='bike')) {
      setTransportCategory('')
      setPage(page - 3) 
    } else {
    if (page===1) {
      setTransportCategory("")
    }
    if (page===0) {
      setActiveCategory('')
    }
    setPage(page - 1)
  }
  }
/////////////////////////////// 

// SUBMIT
function handleCarSubmit(e) {
  e.preventDefault();
  postCar(car)
  // .then((res) => {
  //   console.log(res.data)
  // })
  // .catch((error) => {
  //   console.log(error)
  // })
  handleNextPage()
}
function handleBikeSubmit(e) {
  e.preventDefault();
  // console.log(bike)
  postBike(bike)
  // .then((res) => {
  //   console.log(res.data)
  // })
  // .catch((error) => {
  //   console.log(error)
  // })
  handleNextPage()
}

useEffect(() => {
  if (transportCategory === "car") {
    setCar({... car,
      date: purchaseDate,
      isStatistic: statisticCheckboxChecked,
    })
  } else {
    setBike({... bike,
      date: purchaseDate,
      isStatistic: statisticCheckboxChecked,
    })
    }
  },[
      purchaseDate,
      statisticCheckboxChecked,
    ])

    useEffect(() => {
      setCar({...car, 'model': ''})
    }, [car.brand])
    // useEffect(() => {
    //   document.addEventListener('mousedown', function(e) {
    //     if (e.target.className !== 'option') {
    //       setIsOptionBrandDown(false)
    //       setIsOptionModelDown(false)
    //       setIsOptionMotorDown(false)
    //       setIsOptionMotorSizeDown(false)
    //       setIsOptionTransmissionDown(false)
    //       setIsOptionYearDown(false)
    //     }
    //   } )
  
    //   return document.removeEventListener('mousedown', function(e) {
    //     if (e.target.className !== 'option') {
    //       setIsOptionBrandDown(false)
    //       setIsOptionModelDown(false)
    //       setIsOptionMotorDown(false)
    //       setIsOptionMotorSizeDown(false)
    //       setIsOptionTransmissionDown(false)
    //       setIsOptionYearDown(false)
    //     }
    //   } )
    //   }, [])
  return (
    <>
      <div className="popup__header">
        <button className={(page===4 && transportCategory==="car")|| (page===3 && transportCategory==="bike") ? "popup__go-back-button popup__go-back-button_none" : "popup__go-back-button"} onClick={handleBackPage}></button>
        <h3 className="title popup__title">
          <span className={transportCategory==="bike"? "card-icon bike" : "card-icon transport" }></span>
            {transportCategory==="car" 
            ? "Транспорт/Автомобиль"
            : transportCategory==="bike" 
            ? "Транспорт/Мотоцикл" 
            : "Транспорт"
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
            <button className="button category-button" name="car" onClick={handleChoice}><span className="card-icon transport"></span>Автомобиль<span className="category__button-icon"></span></button>
            <button className="button category-button" name="bike" onClick={handleChoice}><span className="card-icon bike"></span>Мотоцикл<span className="category__button-icon"></span></button>
          </div>
          )

        
// ПРЕВАЯ ВЕТКА. АВТО
// ПЕРВАЯ ФОРМА
        : 
        (transportCategory==="car")
        ? (<form name="transport-car" onSubmit={handleCarSubmit} className="form popup__form">
          {page===1
          ? (<>
            <fieldset className="popup-fildset">
              <div className="form-flex-wraper">
                <div className='form-flex-wraper__input-dropdown-box'> 
                  <label className="active-form__label flex-label">Марка * 
                      <input type='button' name="brand" className="form__input" placeholder="Москва" value={car.brand.name} onClick={(e) => {getBrands(); setIsOptionBrandDown(!isOptionBrandDown)}} />
                      <span className = "form__item-error ">{carErrorsOne.brand}</span>
                  </label>    
                  <div className={!isOptionBrandDown ? 'dropdown': 'dropdown dropdown_open'} >
                    {brands.map((item) => {

                      // if ( car.brand !== undefined) {
                      //   const value = car.brand.toLowerCase()
      
                      //   if (item.name.toLowerCase().includes(value)) {
                          return <div className="option" key={`brands_car_${item.id}`} onClick={(e) => {handleChangeBrandDrop({name: item.name, value: item.id})}}>{item.name}</div>
                      //   } else {
                      //     return null
                      //   }
                      // }
                    })}
                  </div>
                </div>
                <div className='form-flex-wraper__input-dropdown-box'> 
                  <label className="active-form__label flex-label">Модель *
                    <input name="model" className="form__input" placeholder="Placeholder" value={car.model.name} onClick={(e) => {setIsOptionModelDown(!isOptionModelDown)}}></input>
                    <span className = "form__item-error ">{carErrorsOne.model}</span>
                  </label>
                  <div className={!isOptionModelDown ? 'dropdown': 'dropdown dropdown_open'} >
                    {models.map((item) => {

                      // if ( car.model !== undefined) {
                      //   const value = car.model.toLowerCase()
      
                      //   if (item.name.toLowerCase().includes(value)) {
                        return <div className="option" key={`models_car_${item.id}`} onClick={(e) => {handleChangeModelDrop({name: item.name, value: item.id})}}>{item.name}</div>
                      //   } else {
                      //     return null
                      //   }
                      // }
                    })}
                  </div>
                </div>
              </div>
                
              <label className="active-form__label">Год * 
                <input type="number" name="year" className="form__input" placeholder="Москва" value={car.year} onChange={handleChangeInput}/*onClick={(e) => {setIsOptionYearDown(!isOptionYearDown)}}*/></input>
                    <span className = "form__item-error ">{carErrorsOne.year}</span>
                  
                  {/* <div className={!isOptionYearDown ? 'dropdown': 'dropdown dropdown_open'} >
                    {dropYearOptions.map((item) => {

                      // if ( car.year !== undefined) {
                      //   if (item.toString().includes(car.year)) {
                          return <div className="option" key={item} onClick={(e) => {handleChangeYearDrop(item)}}>{item}</div>
                      //   } else {
                      //     return null
                      //   }
                      // }
                    })}
                  </div> */}
                </label>

                <label className="active-form__label"> Пробег *
                  <input type="number" name="mileage" className="form__input" placeholder="0" value={car.mileage} onChange={handleChangeInput}></input>
                  <span className = "form__item-error email-input-error">{carErrorsOne.mileage}</span>
                </label>

                <label className="active-form__label slider-value"><span>0 км</span><span>500 000 км</span></label>
                <div className='slider-range'>
                  <div className="slider-range__track"></div>
                  <input 
                    type="range"
                    name="mileage" 
                    className=" slider-input" 
                    min={0}
                    max={500000}
                    value={car.mileage}
                    onChange={handleChangeInput}
                  />
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
                    <div className="page-point"></div>
                  </div>
                </fieldset>
                </>
              )

// ВТОРАЯ ФОРМА
          : 
          ( page===2)
            ? (<>
              <fieldset className="popup-fildset">
                <div className='input-dropdown-box'>
                  <label className="active-form__label">Коробка передач * 
                    <input name="transmission" className="form__input" placeholder="Placeholder" value={car.transmission} onClick={(e) => {setIsOptionTransmissionDown(!isOptionTransmissionDown)}}></input>
                    <span className = "form__item-error ">{carErrorsTwo.transmission}</span>
                  </label>
                  <div className={!isOptionTransmissionDown ? 'dropdown': 'dropdown dropdown_open'} >
                    {transmissionTypeOptions.map((item) => {

                      // if ( car.transmission !== undefined) {
                      //   const value = car.transmission.toLowerCase()
      
                      //   if (item.name.toLowerCase().includes(value)) {
                          return <div className="option" key={item.name} onClick={(e) => {handleChangeTransmissionDrop(item.value)}}>{item.name}</div>
                      //   } else {
                      //     return null
                      //   }
                      // }
                    })}
                  </div>
                </div>  

                <div className='input-dropdown-box'>
                  <label className="active-form__label">Тип двигателя *
                    <input name="motor" className="form__input" placeholder="Placeholder" value={car.motor} onClick={(e) => {setIsOptionMotorDown(!isOptionMotorDown)}}></input>
                    <span className = "form__item-error ">{carErrorsTwo.motor}</span>
                  </label>
                    <div className={!isOptionMotorDown ? 'dropdown': 'dropdown dropdown_open'} >
                      {motorTypeOptions.map((item) => {

                        // if ( car.motor !== undefined) {
                        //   const value = car.motor.toLowerCase()
        
                        //   if (item.name.toLowerCase().includes(value)) {
                            return <div className="option" key={item.name} onClick={(e) => {handleChangeMotorDrop(item.value)}}>{item.name}</div>
                        //   } else {
                        //     return null
                        //   }
                        // }
                      })}
                    </div>
                  
                </div>

                <div className='input-dropdown-box'>
                  <label className="active-form__label">Объем двигателя, л * 
                    <input type="number" name="motorSize" className="form__input" placeholder="0" value={car.motorSize} onClick={(e) => {setIsOptionMotorSizeDown(!isOptionMotorSizeDown)}}></input>
                    <span className = "form__item-error ">{carErrorsTwo.motorSize}</span>
                  </label>
                  <div className={!isOptionMotorSizeDown ? 'dropdown': 'dropdown dropdown_open'} >
                    {motorSizeOptions.map((item) => {

                      // if ( car.motorSize !== undefined) {
                      //   if (item.toString().includes(car.motorSize)) {
                          return <div className="option" key={item} onClick={(e) => {handleChangeMotorSizeDrop(item)}}>{item}</div>
                      //   } else {
                      //     return null
                      //   }
                      // }
                    })}
                  </div>
                </div>
              </fieldset>

              <fieldset className="popup-fildset">
                <div className="form-flex-wraper">
                  <button type="button" className="white-button button button-s" onClick={handleBackPage}>{"Назад"}</button>
                  <button type="button" className="orange-button button button-s" disabled={!isValidTwo} onClick={handleNextPage}>{"Продолжить"}</button>
                </div>

                <div className="page-wrapper">
                  <div className="page-point"></div>
                  <div className="page-point page-point_active"></div>
                  <div className="page-point"></div>
                  <div className="page-point"></div>
                </div>
              </fieldset>
            </>
            )

//ТРЕТЬЯ ФОРМА
          : 
          (page===3)
            ? (<>
                <fieldset className="popup-fildset">
                  <label className="active-form__label date-label" htmlFor="q"> Дата покупки * 
             
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
                    <span className = "form__item-error ">{carErrorsThree.date}</span>
                  </label>
                                  
                  <div>
                  <label className="active-form__label"> Стоимость, руб *
                    <input type="number" className="form__input" placeholder="Placeholder" name='cost' onChange={handleChangeInput} value={car.cost} ></input>
                    <span className = "form__item-error ">{carErrorsThree.cost}</span>
                  </label>

                  <label className="checkbox" >
                    <input type="checkbox" className="checkbox-input" name="isStatistics" checked={statisticCheckboxChecked} onChange={() => setStatisticCheckboxChecked(!statisticCheckboxChecked)}></input>
                    <span className='checkbox-switch'></span>
                    <span className='checkbox-text'>Отображать в общей статистике</span>
                  </label>
                  </div>
                </fieldset>

                <fieldset className="popup-fildset">
                  <div className="form-flex-wraper">
                    <button type="button" className="white-button button button-s" onClick={handleBackPage}>{"Назад"}</button>
                    <input type="submit" className="orange-button button button-s" disabled={!isValidThree} value="Добавить актив"></input>
                  </div>

                  <div className="page-wrapper">
                    <div className="page-point"></div>
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
            page={page}
            setPage={setPage}
            setCategory={setTransportCategory}
          />
            <div className="page-wrapper">
            <div className="page-point"></div>
            <div className="page-point"></div>
            <div className="page-point"></div>
            <div className="page-point page-point_active"></div>
          </div>
          </>
          }
          </form>)
// ВТОРАЯ ВЕТКА. МОТО
// ПЕРВАЯ ФОРМА
          : 
          (transportCategory==="bike")
          ? (<form name="transport-bike" className="form popup__form" onSubmit={handleBikeSubmit}>
            {(page===1)
            ? (<>
                <fieldset className="popup-fildset">
                  <div className="form-flex-wraper">
                  <div className='form-flex-wraper__input-dropdown-box'> 
                    <label className="active-form__label flex-label">Марка * 
                      <input name="brand" className="form__input" placeholder="Москва" value={bike.brand} onChange={(e) =>handleChangeInput(e)/* {(); setIsOptionBrandDown(!isOptionBrandDown)}*/ }></input>
                      <span className = "form__item-error ">{bikeErrorsOne.brand}</span>
                    </label>  
                      {/* <div className={!isOptionBrandDown ? 'dropdown': 'dropdown dropdown_open'} >
                      {brands.map((item) => {

                        // if ( car.brand !== undefined) {
                        //   const value = car.brand.toLowerCase()
        
                        //   if (item.name.toLowerCase().includes(value)) {
                          return <div className="option" key={`brands_bike_${item.id}`} onClick={(e) => {handleChangeBrandDrop(item.name, item.id)}}>{item.name}</div>
                        //   } else {
                        //     return null
                        //   }
                        // }
                      })} */}
                    {/* </div> */}
                  </div>

                  <div className='form-flex-wraper__input-dropdown-box'> 
                    <label className="active-form__label flex-label">Модель *
                      <input name="model" className="form__input" placeholder="Placeholder" value={bike.model} onChange={(e) =>handleChangeInput(e) /*{setIsOptionModelDown(!isOptionModelDown)}*/}></input>
                      <span className = "form__item-error ">{bikeErrorsOne.model}</span>
                    </label>
                      {/* <div className={!isOptionModelDown ? 'dropdown': 'dropdown dropdown_open'} >
                        {models.map((item) => {

                          // if ( bike.model !== undefined) {
                          //   const value = bike.model.toLowerCase()
          
                          //   if (item.name.toLowerCase().includes(value)) {
                            return <div className="option" key={`models_car_${item.id}`} onClick={(e) => {handleChangeModelDrop(item.name)}}>{item.name}</div>
                          //   } else {
                          //     return null
                          //   }
                          // }
                        })}
                      </div> */}
                  </div>
                  </div>
                  <label className="active-form__label"> Пробег *
                    <input type="number" name="mileage" className="form__input" placeholder="0" value={bike.mileage} onChange={handleChangeInput}></input>
                    <span className = "form__item-error email-input-error">{bikeErrorsOne.mileage}</span>
                  </label>

                  <label className="active-form__label slider-value"><span>0 км</span><span>500 000 км</span></label>
                  <div className='slider-range'>
                  <div className="slider-range__track"></div>
                  <input 
                    type="range"
                    name="mileage" 
                    className=" slider-input" 
                    min={0}
                    max={500000}
                    value={bike.mileage}
                    onChange={handleChangeInput}
                  />
                </div>
                
                  <label className="active-form__label">Год * 
                    <input type="number" name="year" className="form__input" placeholder="Москва" value={bike.year} onChange={handleChangeInput}/*onClick={(e) => {setIsOptionYearDown(!isOptionYearDown)}}*/></input>
                    <span className = "form__item-error ">{bikeErrorsOne.year}</span>
                  
                  {/* <div className={!isOptionYearDown ? 'dropdown': 'dropdown dropdown_open'} >
                    {dropYearOptions.map((item) => {

                      // if ( bike.year !== undefined) {
                      //   if (item.toString().includes(bike.year)) {
                          return <div className="option" key={item} onClick={(e) => {handleChangeYearDrop(item)}}>{item}</div>
                      //   } else {
                      //     return null
                      //   }
                      // }
                    })}
                  </div> */}
                  </label>
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
              </>
              )
// ВТОРАЯ ФОРМА
            : 
            (page===2)
              ? (<>
                <fieldset className="popup-fildset">
              
                  <label className="active-form__label"> Объем двигателя, куб *
                    <input type="number" name="motorSize" className="form__input " placeholder="Placeholder" onChange={handleChangeInput} value={bike.motorSize}></input>
                    <span className = "form__item-error">{bikeErrorsTwo.motorSize}</span>
                  </label>

        
                  <label className="active-form__label date-label" htmlFor="q"> Дата покупки * 
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
                    <span className = "form__item-error ">{bikeErrorsTwo.date}</span>
                  </label>

                  <div>
                  <label className="active-form__label"> Стоимость, руб *
                    <input type="number" className="form__input" placeholder="Placeholder" name='cost' onChange={handleChangeInput} value={bike.cost} ></input>
                    <span className = "form__item-error ">{bikeErrorsTwo.cost}</span>
                  </label>
                 
                  <label className="checkbox" >
                    <input type="checkbox" className="checkbox-input" name="isStatistics" checked={statisticCheckboxChecked} onChange={() => setStatisticCheckboxChecked(!statisticCheckboxChecked)}></input>
                    <span className='checkbox-switch'></span>
                    <span className='checkbox-text'>Отображать в общей статистике</span>
                  </label>
                  </div>
                </fieldset>
                                
                <fieldset className="popup-fildset">
                  <div className="form-flex-wraper">
                    <button type="button" className="white-button button button-s" onClick={handleBackPage}>{"Назад"}</button>
                    <input type="submit" className="orange-button button button-s" disabled={!isValidTwo} value="Добавить актив" ></input>
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
                  page={page}
                  setPage={setPage}
                  setCategory={setTransportCategory}
                />
                  <div className="page-wrapper">
                  <div className="page-point"></div>
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

export default TransportForm;