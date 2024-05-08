import "./CryptoCurrencyEdit.css"

import {React, useEffect, useState} from "react";
import {useForm} from "../../../../hooks/useForm";

import {
    dropOptionsWallet,

    calendarErrorMessage,
    emptyFieldErrorMessage,
    negativeErrorMessage,
    choiceErrorMessage, dropOptionsBank,
} from "../../../../utils/constants";


function CryptoCurrencyEdit({
          page,
          setPage,
          handleClose,
          isOpened
      }) {

    const {
        values,
        handleChange,
    } = useForm();


    const [isChecked, setIsChecked] = useState(true);
    const [edit, setEdit] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isOptionTypeWalletDown, setIsOptionTypeWalletDown] = useState(false);

    const [isValid, setIsValid] = useState(false)

    const [sumUsdt, setSumUsdt] = useState('');
    const [typeWallet, setTypeWallet] = useState('Холодный')


    const [crypto, setCrypto] = useState({
        typeWallet: '',
        sumUsdt: '',
    });

    const [cryptoErrors, setCryptoErrors] = useState({
        typeWallet: null,
        sumUsdt: null,
    });

    // Отзычивая валидность формы редактирования криптокошелька
    useEffect(() => {
        setIsValid(!Object.values(cryptoErrors).some(x => x !== ''))
    }, [cryptoErrors])
////////////////////////////////////////////////////////////////////////////////////////

    // добавляет в объект полей значения специфических инпутов при их изменении
    useEffect(() => {
        setCrypto({...crypto,
            isStatistic: isChecked,
        })
    }, [isChecked])
////////////////////////////////////////////////////////////////////////////////////////
    // обычный инпут
    function handleChangeInput(e) {
        const {name, value} = e.target;
        setCrypto({
            ...crypto,
            [name]: value
        })

        value === ''
            ? setCryptoErrors({...cryptoErrors, [name]: emptyFieldErrorMessage})
            :  e.target.value <= 0
                ? setCryptoErrors({...cryptoErrors, [name]: negativeErrorMessage})
                : setCryptoErrors({...cryptoErrors, [name]: ''})

    }

    // инпут-дроп
    function handleChangeInputDrop(e) {
        const {name, value} = e.target;
        setCrypto({
            ...crypto,
            [name]: value
        })

        if (value === '') {
            setCryptoErrors({...cryptoErrors, [name]: emptyFieldErrorMessage})
        }

        if (name === 'typeWallet' && value !== '') {
            if (Object.values(dropOptionsWallet).every(x => x !== value)) {
                setCryptoErrors({...cryptoErrors, 'typeWallet': choiceErrorMessage})
            }
        }
    }

    // изменение значения инпутов по дропдауну
    function handleChangeWalletDrop(value) {
        setCrypto({...crypto, 'typeWallet': value})
        setCryptoErrors({...cryptoErrors, 'typeWallet': ''})
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

    function updateEdit () {
        setEdit(!edit)
    }

    return (
        <div className="edit edit-crypto-currency-edit">
            <div className={isOpened ? "popup popup_opened" : "popup" }>
                <div className="popup__container realty-edit-box">
                    <div className="popup__header">
                        <button className="popup__go-back-button"></button>
                        <h3 className="title popup__title">
                            <span className={"card-icon bitcoin"}></span>
                            Криптокошелек
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
                            <div className="drop-edit-box">
                                <details className="drop-edit" open>
                                    <summary className="paragraph drop-edit-text">Ledger</summary>

                                    <form name="realty-residential" className={edit === true ? "form popup__form h-100 bg-grey" :"form popup__form h-100 bg-grey-full" } onSubmit={handleSubmit}>
                                        <fieldset className="popup-fildset inputs-fildset">

                                            <label className="active-form__label"> Тип кошелька
                                                <input type="text" name='typeWallet' className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} placeholder="Холодный" disabled={!edit} value={crypto.typeWallet} onChange={(e) => {handleChangeInputDrop(e); setIsOptionTypeWalletDown(true)}}></input>
                                                <span className = "form__item-error bg-grey-edit">{cryptoErrors.typeWallet}</span>

                                                <div className={!isOptionTypeWalletDown ? 'dropdown': 'dropdown dropdown_open'} >
                                                    {dropOptionsWallet.map((item) => {

                                                        if ( crypto.typeWallet !== undefined && crypto.typeWallet !== '') {
                                                            const value = crypto.typeWallet.toLowerCase()

                                                            if (item.name.toLowerCase().includes(value)) {
                                                                return <div className="option" key={item.name} onClick={(e) => {handleChangeWalletDrop(item.name); setIsOptionTypeWalletDown(false)}}>{item.name}</div>
                                                            } else {
                                                                return null
                                                            }
                                                        }
                                                    })}
                                                </div>
                                            </label>
                                            <label className="active-form__label"> Сумма, USDT
                                                <input type="number" name="sumUsdt" className={edit === false ? "form__input input-disabled" : "form__input bg-white-light"} disabled={!edit} placeholder="50 000" value={crypto.sumUsdt} onChange={handleChangeInput}></input>
                                                <span className = "form__item-error bg-grey-edit">{cryptoErrors.sumUsdt}</span>
                                            </label>

                                        </fieldset>
                                        <div className="button__edit-box border-top">
                                            <label className="checkbox center checkbox-edit" >
                                                <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                                                <span className='checkbox-switch'></span>
                                                <span className='checkbox-text'>Отображать в общей статистике</span>
                                            </label>
                                            <input type='submit' className={edit === true ? "button orange-button button-no-margin button-custom" : "orange-button button-no-margin button-disabled"} value='Сохранить изменения' disabled={!isValid} onClick={updateEdit}></input>
                                        </div>
                                    </form>
                                </details>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CryptoCurrencyEdit