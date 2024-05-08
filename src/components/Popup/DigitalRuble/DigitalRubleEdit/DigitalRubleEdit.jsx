import "./DigitalRubleEdit.css"

import {React, useEffect, useState} from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import {useForm} from "../../../../hooks/useForm";
import ru from "date-fns/locale/ru";

import {
    dropOptionsBank,

    calendarErrorMessage,
    emptyFieldErrorMessage,
    negativeErrorMessage,
    choiceErrorMessage,
} from "../../../../utils/constants";


function DigitalRubleEdit({
           page,
           setPage,
           handleClose,
           isOpened
       }) {

    const {
        values,
        handleChange,
    } = useForm();



    const [isChecked, setIsChecked] = useState(true)
    const [edit, setEdit] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const [startDate, setStartDate] = useState(new Date());
    registerLocale('ru', ru)

    const [isValid, setIsValid] = useState(false)

    const [isOptionBankDown, setIsOptionBankDown] = useState(false);


    const [digitalRuble, setDigitalRuble] = useState({
        bank: '',
        date: '',
        sum: '',
    });

    const [digitalRubleErrors, setDigitalRubleErrors] = useState({
        calendar: '',
        bank: null,
        sum: null,
    });


    ////////////////////////////////////////////////////////////////////////////////////////

// Отзычивая валидность формы редактирования цифрового рубля
    useEffect(() => {
        setIsValid(!Object.values(digitalRubleErrors).some(x => x !== ''))
    }, [digitalRubleErrors])
////////////////////////////////////////////////////////////////////////////////////////

    // добавляет в объект полей значения специфических инпутов при их изменении
    useEffect(() => {
        setDigitalRuble({...digitalRuble,
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
        setDigitalRuble({
            ...digitalRuble,
            [name]: value
        })

        value === ''
            ? setDigitalRubleErrors({...digitalRubleErrors, [name]: emptyFieldErrorMessage})
            :  e.target.value <= 0
                ? setDigitalRubleErrors({...digitalRubleErrors, [name]: negativeErrorMessage})
                : setDigitalRubleErrors({...digitalRubleErrors, [name]: ''})

    }

    // инпут-дроп
    function handleChangeInputDrop(e) {
        const {name, value} = e.target;
        setDigitalRuble({
            ...digitalRuble,
            [name]: value
        })

        if (value === '') {
            setDigitalRubleErrors({...digitalRubleErrors, [name]: emptyFieldErrorMessage})
        }

        if (name === 'bank' && value !== '') {
            if (Object.values(dropOptionsBank).every(x => x !== value)) {
                setDigitalRubleErrors({...digitalRubleErrors, 'bank': choiceErrorMessage})
            }
        }
    }

    // изменение значения инпутов по дропдауну
    function handleChangeBankDrop(value) {
        setDigitalRuble({...digitalRuble, 'bank': value})
        setDigitalRubleErrors({...digitalRubleErrors, 'bank': ''})
    }

    // изменение и валидация специфического поля календаря
    useEffect(() => {
        if (digitalRuble.date === null) {
            setDigitalRubleErrors({...digitalRubleErrors, 'calendar': calendarErrorMessage})
            setIsValid(false)
        } else {
            setDigitalRubleErrors({...digitalRubleErrors, 'calendar': ''})
            setIsValid(true)
        }
    },[digitalRuble.date])


///////////


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

    function updateEdit () {
        setEdit(!edit)
    }

    return (
        <div className="edit edit-digital-ruble-edit">
            <div className={isOpened ? "popup popup_opened" : "popup" }>
                <div className="popup__container realty-edit-box">
                    <div className="popup__header">
                        <button className="popup__go-back-button"></button>
                        <h3 className="title popup__title">
                            <span className={"card-icon ruble"}></span>
                            Цифровой рубль
                        </h3>
                        <button className="close-button" onClick={handleClose}></button>
                    </div>

                    <div className="edit-chart">

                    </div>

                    <div className="edit-form form-flex">
                        <div className="edit-form-box">
                            <div className="edit-on" onClick={getModel}>
                                <div className={openModal === false ? "edit-on-button" : "edit-on-button display-block"} onClick={updateEdit}>
                                    <p className="paragraph button-edit button-top">{edit === true ? "Отмена" : "Редактировать"}</p>
                                    <p className="paragraph button-edit button-bottom">Удалить</p>
                                </div>
                            </div>
                            <details className="drop-edit" open>
                                <summary className="paragraph drop-edit-text">20.01.2020</summary>

                                <form name="realty-residential" className={edit === true ? "form popup__form bg-grey" :"form popup__form h-100 bg-grey-full" } onSubmit={handleSubmit}>
                                    <fieldset className="popup-fildset inputs-fildset">

                                        <label className="active-form__label"> Банк
                                            <input type="text" name='bank' className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="ВТБ" disabled={!edit} value={digitalRuble.bank} onChange={(e) => {handleChangeInputDrop(e); setIsOptionBankDown(true)}}></input>
                                            <span className = "form__item-error bg-grey-edit">{digitalRubleErrors.bank}</span>

                                            <div className={!isOptionBankDown ? 'dropdown': 'dropdown dropdown_open'} >
                                                {dropOptionsBank.map((item) => {

                                                    if ( digitalRuble.bank !== undefined && digitalRuble.bank !== '') {
                                                        const value = digitalRuble.bank.toLowerCase()

                                                        if (item.name.toLowerCase().includes(value)) {
                                                            return <div className="option" key={item.name} onClick={(e) => {handleChangeBankDrop(item.name); setIsOptionBankDown(false)}}>{item.name}</div>
                                                        } else {
                                                            return null
                                                        }
                                                    }
                                                })}
                                            </div>
                                        </label>

                                        <label className="active-form__label date-label"> Открытия счета

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
                                        </label>

                                        <label className="active-form__label"> Сумма
                                            <input type="number" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="Placeholder" name='sum' value={digitalRuble.sum} disabled={!edit} onChange={handleChangeInput}></input>
                                            <span className = "form__item-error bg-grey-edit">{digitalRubleErrors.sum}</span>
                                        </label>

                                    </fieldset>
                                    <div className="button__edit-box border-top">
                                        <label className="checkbox center checkbox-edit" >
                                            <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                                            <span className='checkbox-switch'></span>
                                            <span className='checkbox-text'>Отображать в общей статистике</span>
                                        </label>
                                        <input type='submit' className={edit === true ? "button orange-button button-no-margin button-custom" : "orange-button button-no-margin button-disabled"} disabled={!isValid} value='Сохранить изменения' onClick={updateEdit}></input>
                                    </div>
                                </form>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DigitalRubleEdit