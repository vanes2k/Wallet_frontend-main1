import "./RealtyEdit.css"

import {React, useEffect, useState} from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import {useForm} from "../../../../hooks/useForm";
import ru from "date-fns/locale/ru";

import {
    dropOptions,
    optionsList,
    dropOptionsClassRoom,
    dropOptionsTarget,


    calendarErrorMessage,
    emptyFieldErrorMessage,
    negativeErrorMessage,
    choiceErrorMessage,
    communicationsErrorMessage,
} from "../../../../utils/constants";


    function RealtyEdit({
            page,
            setPage,
            handleClose,
            isOpened,
            realtyCategory
        }) {

        const {
            values,
            handleChange,
        } = useForm();


        const [isDropDown, setIsDropDown] = useState(false);
        const [isDropDownType, setIsDropDownType] = useState(false);
        const [isChecked, setIsChecked] = useState(true)
        const [edit, setEdit] = useState(false)
        const [openModal, setOpenModal] = useState(false)

        const [isRoomClassDown, setIsRoomClassDown] = useState(false)
        const [isPurposeDown, setIsPurposeDown] = useState(false);

        const [startDate, setStartDate] = useState(new Date());
        registerLocale('ru', ru)

        function dropDownType() {
            setIsDropDownType(!isDropDownType)
        }

        function getModel () {
            setOpenModal(!openModal)
        }
        function handleChangeCheckbox() {
            setIsChecked(!isChecked)
        }

        function handleSubmit(e) {
            e.preventDefault();
            console.log(values)
            setPage(page + 1)
        }

        function dropDown() {
            setIsDropDown(!isDropDown)
        }

        function updateEdit () {
            setEdit(!edit)
        }
/////////////////////////////////////////////////////////////////////////
        const [isValid, setIsValid] = useState(false)
        
  const [communications, setСommunications] = useState('');
        const [realty, setRealty] = useState({
          type: 'Жилое',

          year: '',
          square: '',
          floor: '',
          startDate: '',
          communications: '',
          startCost: '',

          endPrice: 12000000,
          income: 5,
          profit: 1000000,
        });

        const [realtyErrors, setRealtyErrors] = useState({
          year: null,
          square: null,
          floor: null,
          startDate: '',
          communications: null,
          startCost: null,
        });

////////////////////////////////////////////////////////////////////////////////////////
        const [realtyCommertial, setRealtyCommertial] = useState({
            type: 'Коммерческое',

            year: '',
            square: '',
            floor: '',
            startDate: '',
            classRoom: '',
            target: '',
            startCost: '',

            endPrice: 12000000,
            income: 5,
            profit: 1000000,
        })

        const [realtyCommertialErrors, setRealtyCommertialErrors] = useState({
            year: null,
            square: null,
            floor: null,
            startDate: '',
            classRoom: null,
            target: null,
            startCost: null,
        })
////////////////////////////////////////////////////////////////////////////////////////


        useEffect(() => {
          if (realty.communications !== '') {
          if (realty.communications.length === 0) {
            setRealtyErrors({...realtyErrors, 'communications': communicationsErrorMessage })
          } else {
            setRealtyErrors({...realtyErrors, 'communications': '' })
          }
        }
        }, [realty.communications])

        useEffect(() => {
          const popup = document.querySelector('.popup');
             popup.addEventListener('mousedown', function(e) {
               if (e.target.className !== 'dropdown-label') {
                 setIsDropDown(false)
               }
             } )
         
             return popup.removeEventListener('mousedown', function(e) {
               if (e.target.className !== 'dropdown-label') {
                 setIsDropDown(false)
               }
             } )
             }, [])

////////////////////////////////////////////////////////////////////////////////////////
  // изменение значения стандартных инпутов
        function handleChangeInput(e) {
          const {name, value} = e.target;
          if (realtyCategory === 'Жилое'){
              setRealty({
                  ...realty,
                  [name]: value
              })
              value === ''
                  ? setRealtyErrors({...realtyErrors, [name]: emptyFieldErrorMessage})
                  :  e.target.value <= 0
                      ? setRealtyErrors({...realtyErrors, [name]: negativeErrorMessage})
                      : setRealtyErrors({...realtyErrors, [name]: ''})
          }
          else if (realtyCategory === 'Коммерческое'){
              setRealtyCommertial({
                  ...realtyCommertial,
                  [name]: value
              })
              value === ''
                  ? setRealtyCommertialErrors({...realtyCommertialErrors, [name]: emptyFieldErrorMessage})
                  :  e.target.value <= 0
                      ? setRealtyCommertialErrors({...realtyCommertialErrors, [name]: negativeErrorMessage})
                      : setRealtyCommertialErrors({...realtyCommertialErrors, [name]: ''})
          }
        }
        
        function handleChangeInputDrop(e) {
          const {name, value} = e.target;
          setRealtyCommertial({
            ...realtyCommertial,
            [name]: value
          })

            if (value === '') {
            setRealtyCommertialErrors({...realtyCommertialErrors, [name]: emptyFieldErrorMessage})
            }

            if (name === 'classRoom' && value !== '') {
                if (Object.values(dropOptionsClassRoom).every(x => x !== value)) {
                    setRealtyCommertialErrors({...realtyCommertialErrors, 'classRoom': choiceErrorMessage})
                }
            }
            if (name === 'target' && value !== '') {
                if (Object.values(dropOptionsTarget).every(x => x !== value)) {
                    setRealtyCommertialErrors({...realtyCommertialErrors, 'target': choiceErrorMessage})
                }
            }
        }

        function handleChangeClassRoomDrop(value) {
            setRealtyCommertial({...realtyCommertial, 'classRoom': value})
            setRealtyCommertialErrors({...realtyCommertialErrors, 'classRoom': ''})
        }
        function handleChangeTargetDrop(value) {
            setRealtyCommertial({...realtyCommertial, 'target': value})
            setRealtyCommertialErrors({...realtyCommertialErrors, 'target': ''})
        }


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
        function handleSubmit(e) {
          e.preventDefault();
          console.log(realty)
        }
// Отзычивая валидность формы жилой недвижимости
useEffect(() => {
    if (realtyCategory === 'Жилое'){
        setIsValid(!Object.values(realtyErrors).some(x => x !== ''))
    }
    else if (realtyCategory === 'Коммерческое'){
        setIsValid(!Object.values(realtyCommertialErrors).some(x => x !== ''))
    }
})

  useEffect(() => {
      if (realtyCategory === 'Жилое'){
          setRealty({...realty,
              isStatistic: isChecked,
              startDate: startDate,
              communications: communications,
          });
      }
      else if (realtyCategory === 'Коммерческое'){
          setRealtyCommertial({...realtyCommertial,
              isStatistic: isChecked,
              startDate: startDate,
          });
      }
  }, [isChecked, startDate, communications])


        // изменение и валидация специфического поля календаря
        useEffect(() => {
            if (realtyCategory === 'Жилое'){
                if (realty.startDate === null) {
                    setRealtyErrors({...realtyErrors, 'startDate': calendarErrorMessage})
                    setIsValid(false)
                } else {
                    setRealtyErrors({...realtyErrors, 'startDate': ''})
                    setIsValid(true)
                }
            }
            else if (realtyCategory === 'Коммерческое'){
                if (realtyCommertial.startDate === null) {
                    setRealtyCommertialErrors({...realtyCommertialErrors, 'startDate': calendarErrorMessage})
                    setIsValid(false)
                } else {
                    setRealtyCommertialErrors({...realtyCommertialErrors, 'startDate': ''})
                    setIsValid(true)
                }
            }
        },[realty.startDate, realtyCommertial.startDate])

        return (
        <div className="edit edit-realty">
            <div className={isOpened ? "popup popup_opened" : "popup" }>
                <div className="popup__container realty-edit-box">
                    <div className="popup__header">
                        <button className="popup__go-back-button"></button>
                        <h3 className="title popup__title">
                            <span className={"card-icon realty"}></span>
                            Недвижимость
                        </h3>
                        <button className="close-button" onClick={handleClose}></button>
                    </div>

                    <div className="edit-chart">

                    </div>

                    <div className="edit-form">
                        <div className="edit-on" onClick={getModel}>
                            <div className={openModal === false ? "edit-on-button" : "edit-on-button display-block"} onClick={updateEdit}>
                                <p className="paragraph button-edit button-top">{edit === true ? "Отмена" : "Редактировать"}</p>
                                <p className="paragraph button-edit button-bottom">Удалить</p>
                            </div>
                        </div>
                        <details className="drop-edit" open>
                            <summary className="paragraph drop-edit-text">г.Москва, ул. Тополинная, д.19, кв. 150
                            </summary>

                            {realtyCategory === 'Жилое' ?

                            <form name="realty-residential" className={edit === true ? "form popup__form bg-grey" :"form popup__form bg-grey-full" } onSubmit={handleSubmit}>
                                <fieldset className="popup-fildset inputs-fildset">

                                    <label className="active-form__label"> Тип помещения
                                        <input type="text" name='type' disabled className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder="Жилое" value={realty.type}></input>
                                    </label>


                                    <div className="form-flex-wraper">
                                        <label className="active-form__label flex-label"> Год постройки *
                                            <input type="text" name='year' className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="2005" disabled={!edit} onChange={handleChangeInput} value={realty.year}></input>
                                            <span className = "form__item-error bg-grey-edit">{realtyErrors.year}</span>
                                        </label>

                                        <label className="active-form__label flex-label"> Общая площадь, м2 *
                                            <input type="number" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="60" name='square'  disabled={!edit} onChange={handleChangeInput} value={realty.square}></input>
                                            <span className = "form__item-error bg-gray-edit">{realtyErrors.square}</span>
                                        </label>
                                    </div>

                                    <div className="form-flex-wraper">
                                        <label className="active-form__label flex-label"> Этаж *
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="15" name='floor'  disabled={!edit} onChange={handleChangeInput} value={realty.floor}></input>
                                            <span className = "form__item-error bg-grey-edit">{realtyErrors.floor}</span>
                                        </label>

                                        <label className="active-form__label date-label flex-label"> Дата покупки *

                                            <DatePicker
                                                selected={startDate}
                                                onChange={setStartDate}

                                                locale='ru'
                                                dateFormat={'dd.MM.yyyy'}
                                                calendarStartDay={1}

                                                showYearDropdown
                                                showMonthDropdown
                                                inputType='number'
                                                disabled={!edit}
                                            />
                                            <span className = "form__item-error bg-grey-edit">{realtyErrors.startDate}</span>
                                        </label>
                                    </div>
                                        <>
                                            <label className="active-form__label"> Коммуникации *
                                                <input type="text" disabled={!edit} className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="Электричество, водопровод, канализация" onClick={dropDown} value={communications.length ? communications.join(', ') : ''}></input>
                                                <ul className={isDropDown ? "dropdown-menu dropdown-menu_droped" : "dropdown-menu"}>
                                                    {optionsList.map((x, i) =>
                                                        <li className="dropdown-input">
                                                            <input
                                                                id={i}
                                                                type="checkbox"
                                                                className="checkbox-dropdown bg-white-light"
                                                                name="options"
                                                                value={x.value}
                                                                onChange={handleCommunicationsChange}
                                                            />
                                                            <label className="dropdown-label" htmlFor={i}>{x.label}</label>
                                                        </li>
                                                    )}
                                                </ul>
                                                <span className = "form__item-error bg-grey-edit">{realtyErrors.communications}</span>
                                            </label>
                                        </>
                                    <div className="form-flex-wraper">
                                        <label className="active-form__label flex-label"> Начальная цена
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="10 000 000 ₽" name='startCost' value={realty.startCost} disabled={!edit} onChange={handleChangeInput}></input>
                                            <span className = "form__item-error bg-grey-edit">{realtyErrors.startCost}</span>
                                        </label>

                                        <label className="active-form__label flex-label"> Текущая цена
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder="11 000 000 ₽" name='nowCost' value={realty.endPrice + ' ' + '₽'} disabled></input>
                                        </label>
                                    </div>

                                    <div className="form-flex-wraper">
                                        <label className="active-form__label flex-label"> Доходность
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder="+ 5%" name='yield' value={'+' + ' ' + realty.income + '%'} disabled></input>
                                        </label>

                                        <label className="active-form__label flex-label"> Прибыль
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder="1 000 000 ₽" name='profit' value={realty.profit + ' ' + '₽'} disabled></input>
                                        </label>
                                    </div>
                                </fieldset>

                                <div className="button__edit-box">
                                    <label className="checkbox center checkbox-edit" >
                                        <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                                        <span className='checkbox-switch'></span>
                                        <span className='checkbox-text'>Отображать в общей статистике</span>
                                    </label>
                                    <button className={edit === true ? "button orange-button button-no-margin button-custom" : "orange-button button-no-margin button-disabled"} onClick={updateEdit} disabled={!isValid}>Сохранить изменения</button>
                                </div>
                            </form>

                                : (realtyCategory === 'Коммерческое') ?

                            <form name="realty-residential" className={edit === true ? "form popup__form bg-grey" :"form popup__form bg-grey-full" } onSubmit={handleSubmit}>
                                <fieldset className="popup-fildset inputs-fildset">

                                    <label className="active-form__label"> Тип помещения
                                        <input type="text" name='type' disabled className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder="Жилое" value={realtyCommertial.type}></input>
                                        <span className = "form__item-error bg-grey-edit"></span>
                                    </label>


                                    <div className="form-flex-wraper">
                                        <label className="active-form__label flex-label"> Год постройки *
                                            <input type="text" name='year' className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="2005" disabled={!edit} onChange={handleChangeInput} value={realtyCommertial.year}></input>
                                            <span className = "form__item-error bg-grey-edit">{realtyCommertialErrors.year}</span>
                                        </label>

                                        <label className="active-form__label flex-label"> Общая площадь, м2 *
                                            <input type="number" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="60" name='square'  disabled={!edit} onChange={handleChangeInput} value={realtyCommertial.square}></input>
                                            <span className = "form__item-error bg-grey-edit">{realtyCommertialErrors.square}</span>
                                        </label>
                                    </div>

                                    <div className="form-flex-wraper">
                                        <label className="active-form__label flex-label"> Этаж *
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="15" name='floor'  disabled={!edit} onChange={handleChangeInput} value={realtyCommertial.floor}></input>
                                            <span className = "form__item-error bg-grey-edit">{realtyCommertialErrors.floor}</span>
                                        </label>

                                        <label className="active-form__label date-label flex-label"> Дата покупки *

                                            <DatePicker
                                                selected={startDate}
                                                onChange={setStartDate}

                                                locale='ru'
                                                dateFormat={'dd.MM.yyyy'}
                                                calendarStartDay={1}

                                                showYearDropdown
                                                showMonthDropdown
                                                inputType='number'
                                                disabled={!edit}
                                            />
                                            <span className = "form__item-error bg-grey-edit">{realtyCommertialErrors.startDate}</span>
                                        </label>
                                    </div>
                                        <>
                                            <div className="form-flex-wraper">
                                            <label className="active-form__label flex-label"> Класс помещения
                                                <input type="text" name='classRoom' className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="A" disabled={!edit} value={realtyCommertial.classRoom} onChange={(e) => {handleChangeInputDrop(e); setIsRoomClassDown(true)}}></input>
                                                <span className = "form__item-error bg-grey-edit">{realtyCommertialErrors.classRoom}</span>

                                                <div className={!isRoomClassDown ? 'dropdown': 'dropdown dropdown_open'} >
                                                    {dropOptionsClassRoom.map((item) => {

                                                        if ( realtyCommertial.classRoom !== undefined && realtyCommertial.classRoom !== '') {
                                                            const value = realtyCommertial.classRoom.toLowerCase()

                                                            if (item.name.toLowerCase().includes(value)) {
                                                                return <div className="option" key={item.name} onClick={(e) => {handleChangeClassRoomDrop(item.name); setIsRoomClassDown(false)}}>{item.name}</div>
                                                            } else {
                                                                return null
                                                            }
                                                        }
                                                    })}
                                                </div>
                                            </label>

                                                <div className="form-flex-wraper">
                                                    <label className="active-form__label flex-label"> Назначение помещения
                                                        <input type="text" name='target' className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="Офис" disabled={!edit} value={realtyCommertial.target} onChange={(e) => {handleChangeInputDrop(e); setIsPurposeDown(true)}}></input>
                                                        <span className = "form__item-error bg-grey-edit">{realtyCommertialErrors.target}</span>

                                                        <div className={!isPurposeDown ? 'dropdown': 'dropdown dropdown_open'} >
                                                            {dropOptionsTarget.map((item) => {

                                                                if ( realtyCommertial.target !== undefined && realtyCommertial.target !== '') {
                                                                    const value = realtyCommertial.target.toLowerCase()

                                                                    if (item.name.toLowerCase().includes(value)) {
                                                                        return <div className="option" key={item.name} onClick={(e) => {handleChangeTargetDrop(item.name); setIsPurposeDown(false)}}>{item.name}</div>
                                                                    } else {
                                                                        return null
                                                                    }
                                                                }
                                                            })}
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    <div className="form-flex-wraper">
                                        <label className="active-form__label flex-label"> Начальная цена
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="10 000 000 ₽" name='startCost' value={realtyCommertial.startCost} disabled={!edit} onChange={handleChangeInput}></input>
                                            <span className = "form__item-error bg-grey-edit">{realtyCommertialErrors.startCost}</span>
                                        </label>

                                        <label className="active-form__label flex-label"> Текущая цена
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder="11 000 000 ₽" name='nowCost' value={realtyCommertial.endPrice + ' ' + '₽'} disabled></input>
                                        </label>
                                    </div>

                                    <div className="form-flex-wraper">
                                        <label className="active-form__label flex-label"> Доходность
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder="+ 5%" name='yield' value={'+' + ' ' + realtyCommertial.income + '%'} disabled></input>
                                        </label>

                                        <label className="active-form__label flex-label"> Прибыль
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder="1 000 000 ₽" name='profit' value={realtyCommertial.profit + ' ' + '₽'} disabled></input>
                                        </label>
                                    </div>
                                </fieldset>

                                <div className="button__edit-box">
                                    <label className="checkbox center checkbox-edit" >
                                        <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                                        <span className='checkbox-switch'></span>
                                        <span className='checkbox-text'>Отображать в общей статистике</span>
                                    </label>
                                    <button className={edit === true ? "button orange-button button-no-margin button-custom" : "orange-button button-no-margin button-disabled"} onClick={updateEdit} disabled={!isValid}>Сохранить изменения</button>
                                </div>
                            </form> : ''
                            }
                        </details>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RealtyEdit