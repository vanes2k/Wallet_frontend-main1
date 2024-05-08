import "./DepositEdit.css"

import {React, useEffect, useState} from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import {useForm} from "../../../../hooks/useForm";
import ru from "date-fns/locale/ru";

import {
    dropOptionsBank,
    dropOptionsWallet,

    calendarErrorMessage,
    emptyFieldErrorMessage,
    negativeErrorMessage,
    choiceErrorMessage,
    dropOptionsModel,
    dropOptionsMark,
    dropOptionsMarkYear,
    dropOptionsMotor,
    dropOptionsTransmission, dropOptionsСurrency,
} from "../../../../utils/constants";


function DepositEdit({
           page,
           setPage,
           handleClose,
           isOpened,
           depositCategory
       }) {

    const {
        values,
        handleChange,
    } = useForm();


    const [isChecked, setIsChecked] = useState(true)
    const [edit, setEdit] = useState(false)
    const [addOperation, setAddOperation] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [isSection, setSection] = useState("info")


    const [isValidOne, setIsValidOne] = useState(false)
    const [isValidTwo, setIsValidTwo] = useState(false)

    const [radioFirst, setRadioFirst] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [date, setDate] = useState(new Date());
    registerLocale('ru', ru)


    const [depositMetal, setDepositMetal] = useState({
        bank: '',
        startDate: '',
        startWeight: '',
        endWeight: '',
        startPrice: '',

        endPrice: 12000000,
        income: 5,
        profit: 1000000,
    })

    const [depositMetalErrors, setDepositMetalErrors] = useState({
        bank: null,
        startDate: '',
        startWeight: null,
        endWeight: null,
        startPrice: null,
    })
////////////////////////////////////////////////////////////////////////////////////////

    const [depositMoney, setDepositMoney] = useState({
        bank: '',
        startSum: '',
        wallet: '',
        rate: '',
        startDate: '',
        endDate: '',
        endSum: '',
    })

    const [depositMoneyErrors, setDepositMoneyErrors] = useState({
        bank: null,
        startSum: null,
        wallet: null,
        rate: null,
        startDate: '',
        endDate: '',
        endSum: null,
    })
////////////////////////////////////////////////////////////////////////////////////////

    const [historyMetal, setHistoryMetal] = useState({
        coldType: radioFirst,
        hotType: !radioFirst,
        date: '',
        weight: '',
        sum: '',
    })

    const [historyMetalError, setHistoryMetalError] = useState({
        date: '',
        weight: null,
        sum: null,
    })
////////////////////////////////////////////////////////////////////////////////////////

    const [historyMoney, setHistoryMoney] = useState({
        coldType: radioFirst,
        hotType: !radioFirst,
        date: '',
        sum: '',
    })

    const [historyMoneyErrors, setHistoryMoneyErrors] = useState({
        date: '',
        sum: null,
    })
////////////////////////////////////////////////////////////////////////////////////////

    // Отзычивая валидность формы редактирования вклада
    useEffect(() => {
        if (depositCategory === 'metal') {
            setIsValidOne(!Object.values(depositMetalErrors).some(x => x !== ''))
            setIsValidTwo(!Object.values(historyMetalError).some(x => x !== ''))
        }
        else if (depositCategory === 'money') {
            setIsValidOne(!Object.values(depositMoneyErrors).some(x => x !== ''))
            setIsValidTwo(!Object.values(historyMoneyErrors).some(x => x !== ''))
        }
    }, [depositMetalErrors, historyMetalError,depositMoneyErrors,historyMoneyErrors ])
////////////////////////////////////////////////////////////////////////////////////////
    // добавляет в объект полей значения специфических инпутов при их изменении
    useEffect(() => {
        if (depositCategory === 'metal'){
            setDepositMetal({...depositMetal,
                startDate: startDate,
                isStatistic: isChecked,
            });

            setHistoryMetal({...historyMetal,
                date: date,
            });
        }
        else if (depositCategory === 'money'){
            setDepositMoney({...depositMoney,
                startDate: startDate,
                endDate: endDate,
                isStatistic: isChecked,
            });

            setHistoryMoney({...historyMoney,
                date: date,
            });
        }
    }, [startDate, isChecked, date, endDate,
    ])
////////////////////////////////////////////////////////////////////////////////////////
// обычный инпут
    function handleChangeInput(e) {
        const {name, value} = e.target;
        if (depositCategory === 'metal'){
            if (isSection === 'info'){
                setDepositMetal({
                    ...depositMetal,
                    [name]: value
                })

                value === ''
                    ? setDepositMetalErrors({...depositMetalErrors, [name]: emptyFieldErrorMessage})
                    :  e.target.value <= 0
                        ? setDepositMetalErrors({...depositMetalErrors, [name]: negativeErrorMessage})
                        : setDepositMetalErrors({...depositMetalErrors, [name]: ''})
            }
            else if (isSection === 'story'){
                setHistoryMetal({
                    ...historyMetal,
                    [name]: value
                })

                value === ''
                    ? setHistoryMetalError({...historyMetalError, [name]: emptyFieldErrorMessage})
                    :  e.target.value <= 0
                        ? setHistoryMetalError({...historyMetalError, [name]: negativeErrorMessage})
                        : setHistoryMetalError({...historyMetalError, [name]: ''})
            }
        }

        else if (depositCategory === 'money'){
            if (isSection === 'info') {
                setDepositMoney({
                    ...depositMoney,
                    [name]: value
                })

                value === ''
                    ? setDepositMoneyErrors({...depositMoneyErrors, [name]: emptyFieldErrorMessage})
                    :  e.target.value <= 0
                        ? setDepositMoneyErrors({...depositMoneyErrors, [name]: negativeErrorMessage})
                        : setDepositMoneyErrors({...depositMoneyErrors, [name]: ''})
            }
            else if (isSection === 'story'){
                setHistoryMoney({
                    ...historyMoney,
                    [name]: value
                })

                value === ''
                    ? setHistoryMoneyErrors({...historyMoneyErrors, [name]: emptyFieldErrorMessage})
                    :  e.target.value <= 0
                        ? setHistoryMoneyErrors({...historyMoneyErrors, [name]: negativeErrorMessage})
                        : setHistoryMoneyErrors({...historyMoneyErrors, [name]: ''})
            }
        }
    }

    // инпут-дроп
    function handleChangeMetalDrop(e) {
        const {name, value} = e.target;
        setDepositMetal({
            ...depositMetal,
            [name]: value
        })

        if (value === '') {
            setDepositMetalErrors({...depositMetalErrors, [name]: emptyFieldErrorMessage})
        }

        if (name === 'bank' && value !== '') {
            if (Object.values(dropOptionsBank).every(x => x !== value)) {
                setDepositMetalErrors({...depositMetalErrors, 'bank': choiceErrorMessage})
            }
        }
    }

    function handleChangeMoneyDrop(e) {
        console.log(depositMoney)
        const {name, value} = e.target;
        setDepositMoney({
            ...depositMoney,
            [name]: value
        })

        if (value === '') {
            setDepositMoneyErrors({...depositMoneyErrors, [name]: emptyFieldErrorMessage})
        }

        if (name === 'bank' && value !== '') {
            if (Object.values(dropOptionsBank).every(x => x !== value)) {
                setDepositMoneyErrors({...depositMoneyErrors, 'bank': choiceErrorMessage})
            }
        }
        if (name === 'wallet' && value !== '') {
            if (Object.values(dropOptionsBank).every(x => x !== value)) {
                setDepositMoneyErrors({...depositMoneyErrors, 'wallet': choiceErrorMessage})
            }
        }
    }

    function handleChangeBankDrop(value) {
        if (depositCategory === 'metal'){
            setDepositMetal({...depositMetal, 'bank': value})
            setDepositMetalErrors({...depositMetalErrors, 'bank': ''})
        }
        else if (depositCategory === 'money'){
            setDepositMoney({...depositMoney, 'bank': value})
            setDepositMoneyErrors({...depositMoneyErrors, 'bank': ''})
        }
    }
    function handleChangeWalletDrop(value) {
        setDepositMoney({...depositMoney, 'wallet': value})
        setDepositMoneyErrors({...depositMoneyErrors, 'wallet': ''})
    }


    const [isOptionBankDown, setIsOptionBankDown] = useState(false);
    const [isOptionСurrencyDown, setIsOptionСurrencyDown] = useState(false);


    function getModel () {
        setOpenModal(!openModal)
    }

    function handleChangeFirstFloorRadio() {
        setRadioFirst(!radioFirst)
    }


    function createAddOperation () {
        setAddOperation(!addOperation)
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
        <div className="edit edit-deposit">
            <div className={isOpened ? "popup popup_opened" : "popup" }>
                <div className="popup__container realty-edit-box">
                    <div className="popup__header">
                        <button className="popup__go-back-button"></button>
                        { depositCategory === "metal" ?
                            <h3 className="title popup__title">
                                <span className={"card-icon deposit"}></span>
                                Золото
                            </h3>
                            : depositCategory === "money" ?
                            <h3 className="title popup__title">
                                <span className={"card-icon deposit"}></span>
                                Рубли
                            </h3>
                                : ""
                        }
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
                            <summary className="paragraph drop-edit-text">20.01.2020</summary>

                            <div className="deposit__switch">
                                <div className={isSection === "info" ? "deposit__switch-header active-switch" : "deposit__switch-header"} id="info" onClick={() => {setSection("info")}}>
                                    <h3 className={isSection === "info" ? "title title_deposit active-title" : "title title_deposit"}>Информация по вкладу</h3>
                                </div>

                                <div className={isSection === "story" ? "deposit__switch-header active-switch" : "deposit__switch-header"} id="story" onClick={() => {setSection("story")}}>
                                    <h3 className={isSection === "story" ? "title title_deposit active-title" : "title title_deposit"}>История операций</h3>
                                </div>
                            </div>

                            {isSection === "info" && depositCategory === 'metal' ?
                                (<form name="realty-residential" className={edit === true ? "form popup__form bg-grey-deposit" :"form popup__form bg-grey-full-deposit" } onSubmit={handleSubmit}>
                                <fieldset className="popup-fildset inputs-fildset">

                                    <label className="active-form__label"> Банк
                                        <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="ВТБ" name='bank' value={depositMetal.bank} disabled={!edit} onChange={(e) => {handleChangeMetalDrop(e); setIsOptionBankDown(true)}}></input>
                                        <span className = "form__item-error bg-gray-edit">{depositMetalErrors.bank}</span>

                                        <div className={!isOptionBankDown ? 'dropdown': 'dropdown dropdown_open'} >
                                            {dropOptionsBank.map((item) => {

                                                if ( depositMetal.bank !== undefined && depositMetal.bank !== '') {
                                                    const value = depositMetal.bank.toLowerCase()

                                                    if (item.name.toLowerCase().includes(value)) {
                                                        return <div className="option" key={item.name} onClick={(e) => {handleChangeBankDrop(item.name); setIsOptionBankDown(false)}}>{item.name}</div>
                                                    } else {
                                                        return null
                                                    }
                                                }
                                            })}
                                        </div>
                                    </label>
                                        <>
                                            <label className="active-form__label date-label"> Дата покупки *

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

                                            <div className="form-flex-wraper">
                                                <label className="active-form__label flex-label"> Начальный вес, гр
                                                    <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="10" name='startWeight' value={depositMetal.startWeight} disabled={!edit} onChange={handleChangeInput}></input>
                                                    <span className = "form__item-error bg-gray-edit">{depositMetalErrors.startWeight}</span>
                                                </label>

                                                <label className="active-form__label flex-label"> Текущий вес, гр
                                                    <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="10" name='endWeight' value={depositMetal.endWeight} disabled={!edit} onChange={handleChangeInput}></input>
                                                    <span className = "form__item-error bg-gray-edit">{depositMetalErrors.endWeight}</span>
                                                </label>
                                            </div>

                                            <div className="form-flex-wraper">
                                                <label className="active-form__label flex-label"> Начальная цена
                                                    <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="10 000 000 ₽" name='startPrice' value={depositMetal.startPrice} disabled={!edit} onChange={handleChangeInput}></input>
                                                    <span className = "form__item-error bg-gray-edit">{depositMetalErrors.startPrice}</span>
                                                </label>

                                                <label className="active-form__label flex-label"> Текущая цена
                                                    <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder="11 000 000 ₽" name='endPrice' value={depositMetal.endPrice + ' ' + '₽'} disabled></input>
                                                </label>
                                            </div>

                                            <div className="form-flex-wraper">
                                                <label className="active-form__label flex-label"> Доходность
                                                    <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder="+ 5%" name='income' value={'+' + ' ' + depositMetal.income + '%'} disabled></input>
                                                </label>

                                                <label className="active-form__label flex-label"> Прибыль
                                                    <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white"} placeholder="1 000 000 ₽" name='profit' value={depositMetal.profit + ' ' + '₽'} disabled></input>
                                                </label>
                                            </div>
                                        </>
                                </fieldset>
                                    <div className="button__edit-box box-deposit">
                                        <label className="checkbox center checkbox-edit" >
                                            <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                                            <span className='checkbox-switch'></span>
                                            <span className='checkbox-text'>Отображать в общей статистике</span>
                                        </label>
                                        <button className={edit === true ? "button orange-button button-custom" : "orange-button button-disabled"} disabled={!isValidOne} onClick={updateEdit}>Сохранить изменения</button>
                                        <div className={edit === false ? "deposit__footer" : "deposit__footer-none"}>
                                            <span className="paragraph deposit__footer-text">Если вы пополнили вклад или сняли средства, добавьте  эту операцию в разделе «История операций» для более точного расчета</span>
                                        </div>
                                    </div>
                            </form>)

                                : (isSection === "info" && depositCategory === 'money') ?

                                (<form name="realty-residential" className={edit === true ? "form popup__form bg-grey-deposit" :"form popup__form bg-grey-full-deposit" } onSubmit={handleSubmit}>
                                    <fieldset className="popup-fildset inputs-fildset">

                                        <label className="active-form__label"> Банк
                                            <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="ВТБ" name='bank' value={depositMoney.bank} disabled={!edit} onChange={(e) => {handleChangeMoneyDrop(e); setIsOptionBankDown(true)}}></input>
                                            <span className = "form__item-error bg-gray-edit">{depositMoneyErrors.bank}</span>

                                            <div className={!isOptionBankDown ? 'dropdown': 'dropdown dropdown_open'} >
                                                {dropOptionsBank.map((item) => {

                                                    if ( depositMoney.bank !== undefined && depositMoney.bank !== '') {
                                                        const value = depositMoney.bank.toLowerCase()

                                                        if (item.name.toLowerCase().includes(value)) {
                                                            return <div className="option" key={item.name} onClick={(e) => {handleChangeBankDrop(item.name); setIsOptionBankDown(false)}}>{item.name}</div>
                                                        } else {
                                                            return null
                                                        }
                                                    }
                                                })}
                                            </div>
                                        </label>
                                        <div className="form-flex-wraper">
                                            <label className="active-form__label flex-label"> Начальная сумма
                                                <input type="number" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="50 000" name='startSum' disabled={!edit} value={depositMoney.startSum} onChange={handleChangeInput}></input>
                                                <span className = "form__item-error bg-gray-edit">{depositMoneyErrors.startSum}</span>
                                            </label>

                                            <label className="active-form__label flex-label"> Валюта
                                                <input type="text" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="RUB (₽)" name='wallet' disabled={!edit} value={depositMoney.wallet} onChange={(e) => {handleChangeMoneyDrop(e); setIsOptionСurrencyDown(true)}}></input>
                                                <span className = "form__item-error bg-gray-edit">{depositMoneyErrors.wallet}</span>

                                                <div className={!isOptionСurrencyDown ? 'dropdown': 'dropdown dropdown_open'} >
                                                    {dropOptionsСurrency.map((item) => {

                                                        if ( depositMoney.wallet !== undefined && depositMoney.wallet !== '') {
                                                            const value = depositMoney.wallet.toLowerCase()

                                                            if (item.name.toLowerCase().includes(value)) {
                                                                return <div className="option" key={item.name} onClick={(e) => {handleChangeWalletDrop(item.name); setIsOptionСurrencyDown(false)}}>{item.name}</div>
                                                            } else {
                                                                return null
                                                            }
                                                        }
                                                    })}
                                                </div>
                                            </label>
                                        </div>

                                            <label className="active-form__label"> Годовой процент, %
                                                <input type="number" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="8" name='rate' disabled={!edit} value={depositMoney.rate} onChange={handleChangeInput}></input>
                                                <span className = "form__item-error bg-gray-edit">{depositMoneyErrors.rate}</span>
                                            </label>

                                        <div className="form-flex-wraper">
                                            <label className="active-form__label date-label flex-label"> Дата открытия вклада
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
                                            <label className="active-form__label date-label flex-label"> Дата закрытия вклада
                                                <DatePicker
                                                    selected={endDate}
                                                    onChange={setEndDate}

                                                    locale='ru'
                                                    dateFormat={'dd.MM.yyyy'}
                                                    calendarStartDay={1}

                                                    showYearDropdown
                                                    showMonthDropdown
                                                    inputType='number'
                                                    disabled={!edit}
                                                />
                                            </label>
                                        </div>
                                            <label className="active-form__label"> Текущая сумма
                                                <input type="number" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="55 000 ₽" name='endSum' disabled={!edit} value={depositMoney.endSum} onChange={handleChangeInput}></input>
                                                <span className = "form__item-error bg-gray-edit">{depositMoneyErrors.endSum}</span>
                                            </label>
                                    </fieldset>
                                    <div className="button__edit-box box-deposit">
                                        <label className="checkbox center checkbox-edit" >
                                            <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                                            <span className='checkbox-switch'></span>
                                            <span className='checkbox-text'>Отображать в общей статистике</span>
                                        </label>
                                        <button className={edit === true ? "button orange-button button-custom" : "orange-button button-disabled"} disabled={!isValidOne} onClick={updateEdit}>Сохранить изменения</button>
                                        <div className={edit === false ? "deposit__footer" : "deposit__footer-none"}>
                                            <span className="paragraph deposit__footer-text">Если вы пополнили вклад или сняли средства, добавьте  эту операцию в разделе «История операций» для более точного расчета</span>
                                        </div>
                                    </div>
                                </form>)

                                : isSection === "story" && addOperation === false ?

                                    (<div className="deposit__add">
                                        <span className="paragraph title deposit__add-text">Здесь появится ваша история операций, после того, как вы ее добавите</span>
                                        <button className="button white-button add-operation" onClick={createAddOperation}>+ Добавить операцию</button>

                                    </div>)

                                    : isSection === "story" && addOperation === true && depositCategory === 'metal' ?

                                        <form name="realty-residential" className="form popup__form bg-grey-deposit" onSubmit={handleSubmit}>
                                            <fieldset className="popup-fildset inputs-fildset">

                                                <label className="active-form__label date-label margin-no-bottom"> Тип операции
                                                    <div className="radio-wraper radio-checkbox-wrapper margin-top">
                                                        <input
                                                            type="checkbox"
                                                            id="first"
                                                            name="first"
                                                            className="checkbox radio-checkbox"
                                                            checked={radioFirst}
                                                            onChange={handleChangeFirstFloorRadio}
                                                        />
                                                        <label className="active-form__label radio-checkbox-label" htmlFor="first">Пополнение (покупка)</label>
                                                        <input
                                                            type="checkbox"
                                                            id="last"
                                                            name="last"
                                                            className="checkbox radio-checkbox"
                                                            checked={!radioFirst}
                                                            onChange={handleChangeFirstFloorRadio}
                                                        />
                                                        <label className="active-form__label radio-checkbox-label" htmlFor="last">Снятие (продажа)</label>
                                                    </div>
                                                </label>

                                                <label className="active-form__label date-label"> Дата *
                                                    <DatePicker
                                                        selected={date}
                                                        onChange={setDate}

                                                        locale='ru'
                                                        dateFormat={'dd.MM.yyyy'}
                                                        calendarStartDay={1}

                                                        showYearDropdown
                                                        showMonthDropdown
                                                        inputType='number'

                                                    />
                                                </label>

                                                <label className="active-form__label">Вес, гр
                                                    <input type="text" className= "form__input bg-white-light" placeholder="Placeholder" name='weight' value={historyMetal.weight} onChange={handleChangeInput}></input>
                                                    <span className = "form__item-error bg-gray-edit">{historyMetalError.weight}</span>
                                                </label>

                                                <label className="active-form__label">Сумма
                                                    <input type="text" className="form__input bg-white-light" placeholder="Placeholder" name='sum' value={historyMetal.sum} onChange={handleChangeInput}></input>
                                                    <span className = "form__item-error bg-gray-edit">{historyMetalError.sum}</span>
                                                </label>

                                                <div className="form-flex-wraper margin-top">
                                                    <button type="button" className="white-button button button-mx" onClick={createAddOperation}>{"Закрыть"}</button>
                                                    <button type="button" disabled={!isValidTwo} className="orange-button button button-mx" onClick={createAddOperation}>{"Сохранить"}</button>
                                                </div>
                                            </fieldset>
                                            <div className="button__edit-box">
                                                <label className="checkbox center checkbox-edit" >
                                                    <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                                                    <span className='checkbox-switch'></span>
                                                    <span className='checkbox-text'>Отображать в общей статистике</span>
                                                </label>
                                                <button className={edit === true ? "button orange-button button-no-margin" : "orange-button button-no-margin button-disabled"} onClick={updateEdit}>Сохранить изменения</button>
                                                <div className={edit === false ? "deposit__footer" : "deposit__footer-none"}>
                                                    <span className="paragraph deposit__footer-text">Если вы пополнили вклад или сняли средства, добавьте  эту операцию в разделе «История операций» для более точного расчета</span>
                                                </div>
                                            </div>
                                        </form>

                                    : (isSection === "story" && addOperation === true && depositCategory === 'money') ?

                                        <form name="realty-residential" className="form popup__form bg-grey-deposit" onSubmit={handleSubmit}>
                                            <fieldset className="popup-fildset inputs-fildset">

                                                <label className="active-form__label date-label margin-no-bottom"> Тип операции
                                                    <div className="radio-wraper radio-checkbox-wrapper margin-top">
                                                        <input
                                                            type="checkbox"
                                                            id="first"
                                                            name="first"
                                                            className="checkbox radio-checkbox"
                                                            checked={radioFirst}
                                                            onChange={handleChangeFirstFloorRadio}
                                                        />
                                                        <label className="active-form__label radio-checkbox-label" htmlFor="first">Пополнение (покупка)</label>
                                                        <input
                                                            type="checkbox"
                                                            id="last"
                                                            name="last"
                                                            className="checkbox radio-checkbox"
                                                            checked={!radioFirst}
                                                            onChange={handleChangeFirstFloorRadio}
                                                        />
                                                        <label className="active-form__label radio-checkbox-label" htmlFor="last">Снятие (продажа)</label>
                                                    </div>
                                                </label>

                                                <label className="active-form__label date-label"> Дата *
                                                    <DatePicker
                                                        selected={date}
                                                        onChange={setDate}

                                                        locale='ru'
                                                        dateFormat={'dd.MM.yyyy'}
                                                        calendarStartDay={1}

                                                        showYearDropdown
                                                        showMonthDropdown
                                                        inputType='number'

                                                    />
                                                </label>

                                                <label className="active-form__label">Сумма
                                                    <input type="text" className="form__input bg-white-light" placeholder="Placeholder" name='sum' value={historyMoney.sum} onChange={handleChangeInput}></input>
                                                    <span className = "form__item-error bg-grey-edit">{historyMoneyErrors.sum}</span>
                                                </label>

                                                <div className="form-flex-wraper margin-top">
                                                    <button type="button" className="white-button button button-mx" onClick={createAddOperation}>{"Закрыть"}</button>
                                                    <button type="button" disabled={!isValidTwo} className="orange-button button button-mx" onClick={createAddOperation}>{"Сохранить"}</button>
                                                </div>
                                            </fieldset>
                                            <div className="button__edit-box">
                                                <label className="checkbox center checkbox-edit" >
                                                    <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                                                    <span className='checkbox-switch'></span>
                                                    <span className='checkbox-text'>Отображать в общей статистике</span>
                                                </label>
                                                <button className={edit === true ? "button orange-button button-no-margin" : "orange-button button-no-margin button-disabled"} onClick={updateEdit}>Сохранить изменения</button>
                                                <div className={edit === false ? "deposit__footer" : "deposit__footer-none"}>
                                                    <span className="paragraph deposit__footer-text">Если вы пополнили вклад или сняли средства, добавьте  эту операцию в разделе «История операций» для более точного расчета</span>
                                                </div>
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

export default DepositEdit