import "./TransportEdit.css"

import {React, useEffect, useState} from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import {useForm} from "../../../../hooks/useForm";
import ru from "date-fns/locale/ru";

import {
    dropOptionsMark,
    dropOptionsModel,
    dropOptionsMarkYear,
    dropOptionsMotor,
    dropOptionsTransmission,

    calendarErrorMessage,
    emptyFieldErrorMessage,
    negativeErrorMessage,
    choiceErrorMessage,
} from "../../../../utils/constants";


function TransportEdit({
        page,
        setPage,
        handleClose,
        isOpened,
        transportCategory
    }) {

    const {
        values,
        handleChange,
    } = useForm();


    const [isChecked, setIsChecked] = useState(true)
    const [edit, setEdit] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const [isValid, setIsValid] = useState(false)

    const [startDate, setStartDate] = useState(new Date());
    registerLocale('ru', ru)


    const [transportCar, setTransportCar] = useState({
        mark: '',
        model: '',
        mileage: '',
        motor: '',
        motorSize: '',
        yearTransport:'',
        transmission: '',
        date: '',
        startPrice: '',

        endPrice: 12000000,
        income: 5,
        profit: 1000000,
    });

    const [transportCarErrors, setTransportCarErrors] = useState({
        calendar: '',
        mark: null,
        model: null,
        mileage: null,
        motor: null,
        yearTransport: null,
        motorSize: null,
        transmission: null,
        startPrice: null,
    })

////////////////////////////////////////////////////////////////////////////////////////

    const [transportMoto, setTransportMoto] = useState({
        mark: '',
        model: '',
        mileage: '',
        motorSize: '',
        yearTransport: '',
        startPrice: '',

        endPrice: 12000000,
        income: 5,
        profit: 1000000,
    });

    const [transportMotoErrors, setTransportMotoErrors] = useState({
        mark: null,
        model: null,
        mileage: null,
        motorSize: null,
        yearTransport: null,
        startPrice: null,
    });


// Отзычивая валидность формы редактирования транспорта
    useEffect(() => {
        if (transportCategory === 'Автомобиль') {
            setIsValid(!Object.values(transportCarErrors).some(x => x !== ''))
        }
        else if (transportCategory === 'Мотоцикл') {
            setIsValid(!Object.values(transportMotoErrors).some(x => x !== ''))
        }
    }, [transportCarErrors, transportMotoErrors])
////////////////////////////////////////////////////////////////////////////////////////

    // добавляет в объект полей значения специфических инпутов при их изменении
    useEffect(() => {
        setTransportCar({... transportCar,
            date: startDate,
            isStatistic: isChecked,
        })
    }, [startDate,
        isChecked,
    ])
////////////////////////////////////////////////////////////////////////////////////////
// обычный инпут
    function handleChangeInput(e) {
        const {name, value} = e.target;
        if (transportCategory === 'Автомобиль'){
            setTransportCar({
                ...transportCar,
                [name]: value
            })

            value === ''
                ? setTransportCarErrors({...transportCarErrors, [name]: emptyFieldErrorMessage})
                :  e.target.value <= 0
                    ? setTransportCarErrors({...transportCarErrors, [name]: negativeErrorMessage})
                    : setTransportCarErrors({...transportCarErrors, [name]: ''})
        }
        else if (transportCategory === 'Мотоцикл'){
            setTransportMoto({
                ...transportMoto,
                [name]: value
            })

            value === ''
                ? setTransportMotoErrors({...transportMotoErrors, [name]: emptyFieldErrorMessage})
                :  e.target.value <= 0
                    ? setTransportMotoErrors({...transportMotoErrors, [name]: negativeErrorMessage})
                    : setTransportMotoErrors({...transportMotoErrors, [name]: ''})
        }
    }
    // инпут-дроп
    function handleChangeCarDrop(e) {
        const {name, value} = e.target;
        setTransportCar({
            ...transportCar,
            [name]: value
        })

        if (value === '') {
            setTransportCarErrors({...transportCarErrors, [name]: emptyFieldErrorMessage})
        }

        if (name === 'model' && value !== '') {
            if (Object.values(dropOptionsModel).every(x => x !== value)) {
                setTransportCarErrors({...transportCarErrors, 'model': choiceErrorMessage})
            }
        }
        if (name === 'mark' && value !== '') {
            if (Object.values(dropOptionsMark).every(x => x !== value)) {
                setTransportCarErrors({...transportCarErrors, 'mark': choiceErrorMessage})
            }
        }
        if (name === 'yearTransport' && value !== '') {
            if (Object.values(dropOptionsMarkYear).every(x => x !== value)) {
                setTransportCarErrors({...transportCarErrors, 'yearTransport': choiceErrorMessage})
            }
        }
        if (name === 'motor' && value !== '') {
            if (Object.values(dropOptionsMotor).every(x => x !== value)) {
                setTransportCarErrors({...transportCarErrors, 'motor': choiceErrorMessage})
            }
        }
        if (name === 'transmission' && value !== '') {
            if (Object.values(dropOptionsTransmission).every(x => x !== value)) {
                setTransportCarErrors({...transportCarErrors, 'transmission': choiceErrorMessage})
            }
        }
    }

    function handleChangeMotoDrop(e){
        const {name, value} = e.target;
        setTransportMoto({
            ...transportMoto,
            [name]: value
        })

        if (value === '') {
            setTransportMotoErrors({...transportMotoErrors, [name]: emptyFieldErrorMessage})
        }

        if (name === 'model' && value !== '') {
            if (Object.values(dropOptionsModel).every(x => x !== value)) {
                setTransportMotoErrors({...transportMotoErrors, 'model': choiceErrorMessage})
            }
        }
        if (name === 'mark' && value !== '') {
            if (Object.values(dropOptionsMark).every(x => x !== value)) {
                setTransportMotoErrors({...transportMotoErrors, 'mark': choiceErrorMessage})
            }
        }
        if (name === 'yearTransport' && value !== '') {
            if (Object.values(dropOptionsMarkYear).every(x => x !== value)) {
                setTransportMotoErrors({...transportMotoErrors, 'yearTransport': choiceErrorMessage})
            }
        }
    }

    // изменение значения инпутов по дропдауну
    function handleChangeModelDrop(value) {
        if (transportCategory === 'Автомобиль'){
            setTransportCar({...transportCar, 'model': value})
            setTransportCarErrors({...transportCarErrors, 'model': ''})
        }
       else if (transportCategory === 'Мотоцикл'){
            setTransportMoto({...transportMoto, 'model': value})
            setTransportMotoErrors({...transportMotoErrors, 'model': ''})
        }
    }
    function handleChangeMarkDrop(value) {
        if (transportCategory === 'Автомобиль'){
            setTransportCar({...transportCar, 'mark': value})
            setTransportCarErrors({...transportCarErrors, 'mark': ''})
        }
        else if (transportCategory === 'Мотоцикл'){
            setTransportMoto({...transportMoto, 'mark': value})
            setTransportMotoErrors({...transportMotoErrors, 'mark': ''})
        }
    }
    function handleChangeYearDrop(value) {
        if (transportCategory === 'Автомобиль') {
            setTransportCar({...transportCar, 'yearTransport': value})
            setTransportCarErrors({...transportCarErrors, 'yearTransport': ''})
        }
        else if (transportCategory === 'Мотоцикл'){
            setTransportMoto({...transportMoto, 'yearTransport': value})
            setTransportMotoErrors({...transportMotoErrors, 'yearTransport': ''})
        }
    }
    function handleChangeMotorDrop(value) {
        setTransportCar({...transportCar, 'motor': value})
        setTransportCarErrors({...transportCarErrors, 'motor': ''})
    }
    function handleChangeTransmissionDrop(value) {
        setTransportCar({...transportCar, 'transmission': value})
        setTransportCarErrors({...transportCarErrors, 'transmission': ''})
    }


    // изменение и валидация специфического поля календаря
    useEffect(() => {
        if (transportCar.date === null) {
            setTransportCarErrors({...transportCarErrors, 'calendar': calendarErrorMessage})
            setIsValid(false)
        } else {
            setTransportCarErrors({...transportCarErrors, 'calendar': ''})
            setIsValid(true)
        }
    },[transportCar.date])

///////////


    const [isOptionYearDown, setIsOptionYearDown] = useState(false);
    const [isOptionBrandDown, setIsOptionBrandDown] = useState(false);
    const [isOptionModelDown, setIsOptionModelDown] = useState(false);
    const [isOptionMotorDown, setIsOptionMotorDown] = useState(false);
    const [isOptionMotorSizeDown, setIsOptionMotorSizeDown] = useState(false);
    const [isOptionTransmissionDown, setIsOptionTransmissionDown] = useState(false)

    function getModel () {
        setOpenModal(!openModal)
    }

    function handleChangeCheckbox() {
        setIsChecked(!isChecked)
    }

    function handleBackPage() {
        transportCategory('')
        setIsValid(false)
        setPage(page - 1)
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(values)
        setPage(page + 1)
    }

    function updateEdit () {
        setEdit(!edit)
    }

    return (
        <div className="edit edit-transport">
            <div className={isOpened ? "popup popup_opened" : "popup" }>
                <div className="popup__container realty-edit-box">
                    <div className="popup__header">
                        <button className="popup__go-back-button"></button>
                        <h3 className="title popup__title">
                            <span className={"card-icon transport"}></span>
                            Транспорт
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
                            <summary className="paragraph drop-edit-text">Kia Ceed T488HH777</summary>

                            {transportCategory === "Автомобиль" ?

                            <form name="realty-residential" className={edit === true ? "form popup__form bg-grey" :"form popup__form bg-grey-full" } onSubmit={handleSubmit}>
                                <fieldset className="popup-fildset inputs-fildset">

                                    <div className="form-flex-wraper">
                                        <label className="active-form__label flex-label"> Марка
                                            <input type="text" name='mark' className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="Киа" disabled={!edit} value={transportCar.mark} onChange={(e) => {handleChangeCarDrop(e); setIsOptionBrandDown(true)}}></input>
                                            <span className = "form__item-error bg-gray-edit">{transportCarErrors.mark}</span>

                                            <div className={!isOptionBrandDown ? 'dropdown': 'dropdown dropdown_open'} >
                                                {dropOptionsMark.map((item) => {

                                                    if ( transportCar.mark !== undefined && transportCar.mark !== '') {
                                                        const value = transportCar.mark.toLowerCase()

                                                        if (item.name.toLowerCase().includes(value)) {
                                                            return <div className="option" key={item.name} onClick={(e) => {handleChangeMarkDrop(item.name); setIsOptionBrandDown(false)}}>{item.name}</div>
                                                        } else {
                                                            return null
                                                        }
                                                    }
                                                })}
                                            </div>
                                        </label>

                                        <label className="active-form__label flex-label"> Модель
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="Сид" name='model' value={transportCar.model} disabled={!edit} onChange={(e) => {handleChangeCarDrop(e); setIsOptionModelDown(true)}}></input>
                                            <span className = "form__item-error bg-gray-edit">{transportCarErrors.model}</span>

                                            <div className={!isOptionModelDown ? 'dropdown': 'dropdown dropdown_open'} >
                                                {dropOptionsModel.map((item) => {

                                                    if ( transportCar.model !== undefined && transportCar.model !== '') {
                                                        const value = transportCar.model.toLowerCase()

                                                        if (item.name.toLowerCase().includes(value)) {
                                                            return <div className="option" key={item.name} onClick={(e) => {handleChangeModelDrop(item.name); setIsOptionModelDown(false)}}>{item.name}</div>
                                                        } else {
                                                            return null
                                                        }
                                                    }
                                                })}
                                            </div>
                                        </label>
                                    </div>

                                    <label className="active-form__label"> Пробег
                                        <input type="number" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="150 000" name='mileage' value={transportCar.mileage} disabled={!edit} onChange={handleChangeInput}></input>
                                        <span className = "form__item-error bg-gray-edit">{transportCarErrors.mileage}</span>
                                    </label>
                                        <>
                                            <div className="form-flex-wraper">
                                                <label className="active-form__label flex-label">Тип двигателя
                                                    <input name="motor" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="4Rmazg" disabled={!edit} value={transportCar.motor} onChange={(e) => {handleChangeCarDrop(e); setIsOptionMotorDown(true)}}></input>
                                                    <span className = "form__item-error bg-gray-edit">{transportCarErrors.motor}</span>

                                                    <div className={!isOptionMotorDown ? 'dropdown': 'dropdown dropdown_open'} >
                                                        {dropOptionsMotor.map((item) => {

                                                            if ( transportCar.motor !== undefined && transportCar.motor !== '') {
                                                                const value = transportCar.motor.toLowerCase()

                                                                if (item.name.toLowerCase().includes(value)) {
                                                                    return <div className="option" key={item.name} onClick={(e) => {handleChangeMotorDrop(item.name); setIsOptionMotorDown(false)}}>{item.name}</div>
                                                                } else {
                                                                    return null
                                                                }
                                                            }
                                                        })}
                                                    </div>
                                                </label>

                                                <label className="active-form__label flex-label"> Объем двигателя, л
                                                    <input type="number" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="150" name='motorSize' value={transportCar.motorSize} disabled={!edit} onChange={handleChangeInput}></input>
                                                    <span className = "form__item-error bg-gray-edit">{transportCarErrors.motorSize}</span>
                                                </label>
                                            </div>

                                            <div className="form-flex-wraper">
                                                <label className="active-form__label flex-label"> Год
                                                    <input type="text" name='yearTransport' className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="2000" disabled={!edit} value={transportCar.yearTransport} onChange={(e) => {handleChangeCarDrop(e); setIsOptionYearDown(true)}}></input>
                                                    <span className = "form__item-error bg-gray-edit">{transportCarErrors.yearTransport}</span>

                                                    <div className={!isOptionYearDown ? 'dropdown': 'dropdown dropdown_open'} >
                                                        {dropOptionsMarkYear.map((item) => {

                                                            if ( transportCar.yearTransport !== undefined && transportCar.yearTransport !== '') {
                                                                const value = transportCar.yearTransport.toLowerCase()

                                                                if (item.name.toLowerCase().includes(value)) {
                                                                    return <div className="option" key={item.name} onClick={(e) => {handleChangeYearDrop(item.name); setIsOptionYearDown(false)}}>{item.name}</div>
                                                                } else {
                                                                    return null
                                                                }
                                                            }
                                                        })}
                                                    </div>
                                                </label>

                                                <label className="active-form__label flex-label"> Коробка передач
                                                    <input type="text" name='transmission' className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="Автоматическая" disabled={!edit} value={transportCar.transmission} onChange={(e) => {handleChangeCarDrop(e); setIsOptionTransmissionDown(true)}}></input>
                                                    <span className = "form__item-error bg-gray-edit">{transportCarErrors.transmission}</span>

                                                    <div className={!isOptionTransmissionDown ? 'dropdown': 'dropdown dropdown_open'} >
                                                        {dropOptionsTransmission.map((item) => {

                                                            if ( transportCar.transmission !== undefined && transportCar.transmission !== '') {
                                                                const value = transportCar.transmission.toLowerCase()

                                                                if (item.name.toLowerCase().includes(value)) {
                                                                    return <div className="option" key={item.name} onClick={(e) => {handleChangeTransmissionDrop(item.name); setIsOptionTransmissionDown(false)}}>{item.name}</div>
                                                                } else {
                                                                    return null
                                                                }
                                                            }
                                                        })}
                                                    </div>
                                                </label>
                                            </div>

                                            <label className="active-form__label date-label"> Дата покупки *

                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={setStartDate}
                                                    name = 'startName'

                                                    locale='ru'
                                                    dateFormat={'dd.MM.yyyy'}
                                                    calendarStartDay={1}

                                                    showYearDropdown
                                                    showMonthDropdown
                                                    inputType='number'
                                                    disabled={!edit}
                                                />
                                            </label>
                                        </>

                                    <div className="form-flex-wraper">
                                        <label className="active-form__label flex-label"> Начальная цена
                                            <input type="number" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="10 000 000 ₽" name='startPrice' value={transportCar.startPrice} disabled={!edit} onChange={handleChangeInput}></input>
                                            <span className = "form__item-error bg-gray-edit">{transportCarErrors.startPrice}</span>
                                        </label>


                                        <label className="active-form__label flex-label"> Текущая цена
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder="" name='endPrice' value={transportCar.endPrice + ' ' + '₽'} disabled></input>
                                        </label>
                                    </div>
                                    <div className="form-flex-wraper">
                                        <label className="active-form__label flex-label"> Доходность
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder='' name='income' value={'+' + ' ' + transportCar.income + '%'} disabled></input>
                                        </label>

                                        <label className="active-form__label flex-label"> Прибыль
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder="" name='floor' value={transportCar.profit + ' ' + '₽'} disabled></input>
                                        </label>
                                    </div>
                                </fieldset>
                                <div className="button__edit-box">
                                    <label className="checkbox center checkbox-edit" >
                                        <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                                        <span className='checkbox-switch'></span>
                                        <span className='checkbox-text'>Отображать в общей статистике</span>
                                    </label>
                                    <input type='submit' className={edit === true ? "button orange-button button-no-margin button-custom" : "orange-button button-no-margin button-disabled"} onClick={updateEdit} value="Сохранить изменения" disabled={!isValid}></input>
                                </div>
                            </form>

                                : (transportCategory === "Мотоцикл") ?

                            <form name="realty-residential" className={edit === true ? "form popup__form bg-grey" :"form popup__form bg-grey-full" } onSubmit={handleSubmit}>
                                <fieldset className="popup-fildset inputs-fildset">

                                    <div className="form-flex-wraper">
                                        <label className="active-form__label flex-label"> Марка
                                            <input type="text" name='mark' className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="Киа" disabled={!edit} value={transportMoto.mark} onChange={(e) => {handleChangeMotoDrop(e); setIsOptionBrandDown(true)}}></input>
                                            <span className = "form__item-error bg-gray-edit">{transportMotoErrors.mark}</span>

                                            <div className={!isOptionBrandDown ? 'dropdown': 'dropdown dropdown_open'} >
                                                {dropOptionsMark.map((item) => {

                                                    if ( transportMoto.mark !== undefined && transportMoto.mark !== '') {
                                                        const value = transportMoto.mark.toLowerCase()

                                                        if (item.name.toLowerCase().includes(value)) {
                                                            return <div className="option" key={item.name} onClick={(e) => {handleChangeMarkDrop(item.name); setIsOptionBrandDown(false)}}>{item.name}</div>
                                                        } else {
                                                            return null
                                                        }
                                                    }
                                                })}
                                            </div>
                                        </label>

                                        <label className="active-form__label flex-label"> Модель
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="Сид" name='model' value={transportMoto.model} disabled={!edit} onChange={(e) => {handleChangeMotoDrop(e); setIsOptionModelDown(true)}}></input>
                                            <span className = "form__item-error bg-gray-edit">{transportMotoErrors.model}</span>

                                            <div className={!isOptionModelDown ? 'dropdown': 'dropdown dropdown_open'} >
                                                {dropOptionsModel.map((item) => {

                                                    if ( transportMoto.model !== undefined && transportMoto.model !== '') {
                                                        const value = transportMoto.model.toLowerCase()

                                                        if (item.name.toLowerCase().includes(value)) {
                                                            return <div className="option" key={item.name} onClick={(e) => {handleChangeModelDrop(item.name); setIsOptionModelDown(false)}}>{item.name}</div>
                                                        } else {
                                                            return null
                                                        }
                                                    }
                                                })}
                                            </div>
                                        </label>
                                    </div>

                                    <label className="active-form__label"> Пробег
                                        <input type="number" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="150 000" name='mileage' value={transportMoto.mileage} disabled={!edit} onChange={handleChangeInput}></input>
                                        <span className = "form__item-error bg-gray-edit">{transportMotoErrors.mileage}</span>
                                    </label>
                                            <>
                                                <div className="form-flex-wraper">
                                                    <label className="active-form__label"> Объем двигателя, куб.см
                                                        <input type="number" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="150" name='motorSize' value={transportMoto.motorSize} disabled={!edit} onChange={handleChangeInput}></input>
                                                        <span className = "form__item-error bg-gray-edit">{transportMotoErrors.motorSize}</span>
                                                    </label>

                                                    <label className="active-form__label flex-label"> Год
                                                        <input type="text" name='yearTransport' className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="2000" disabled={!edit} value={transportMoto.yearTransport} onChange={(e) => {handleChangeMotoDrop(e); setIsOptionYearDown(true)}}></input>
                                                        <span className = "form__item-error bg-gray-edit">{transportMotoErrors.yearTransport}</span>

                                                        <div className={!isOptionYearDown ? 'dropdown': 'dropdown dropdown_open'} >
                                                            {dropOptionsMarkYear.map((item) => {

                                                                if ( transportMoto.yearTransport !== undefined && transportMoto.yearTransport !== '') {
                                                                    const value = transportMoto.yearTransport.toLowerCase()

                                                                    if (item.name.toLowerCase().includes(value)) {
                                                                        return <div className="option" key={item.name} onClick={(e) => {handleChangeYearDrop(item.name); setIsOptionYearDown(false)}}>{item.name}</div>
                                                                    } else {
                                                                        return null
                                                                    }
                                                                }
                                                            })}
                                                        </div>
                                                    </label>
                                                </div>
                                            </>

                                    <div className="form-flex-wraper">
                                        <label className="active-form__label flex-label"> Начальная цена
                                            <input type="number" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="10 000 000 ₽" name='startPrice' value={transportMoto.startPrice} disabled={!edit} onChange={handleChangeInput}></input>
                                            <span className = "form__item-error bg-gray-edit">{transportMotoErrors.startPrice}</span>
                                        </label>


                                        <label className="active-form__label flex-label"> Текущая цена
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder="" name='endPrice' value={transportMoto.endPrice + ' ' + '₽'} disabled></input>
                                        </label>
                                    </div>
                                    <div className="form-flex-wraper">
                                        <label className="active-form__label flex-label"> Доходность
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder='' name='income' value={'+' + ' ' + transportMoto.income + '%'} disabled></input>
                                        </label>

                                        <label className="active-form__label flex-label"> Прибыль
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder="" name='floor' value={transportMoto.profit + ' ' + '₽'} disabled></input>
                                        </label>
                                    </div>
                                </fieldset>
                                <div className="button__edit-box">
                                    <label className="checkbox center checkbox-edit" >
                                        <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                                        <span className='checkbox-switch'></span>
                                        <span className='checkbox-text'>Отображать в общей статистике</span>
                                    </label>
                                    <input type='submit' className={edit === true ? "button orange-button button-no-margin button-custom" : "orange-button button-no-margin button-disabled"} onClick={updateEdit} value="Сохранить изменения" disabled={!isValid}></input>
                                </div>
                            </form>
                                    : ''
                            }
                        </details>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransportEdit