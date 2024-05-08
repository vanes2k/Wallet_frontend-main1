import {React, useState} from "react";


function SelectCurrency () {

    const [first, setFirst] = useState('RUB');

    function handleChangeRadio(event) {
        setFirst(event.target.value)
    }

    return (
        <div className='select-currency'>
            <h2 className='all-assets__title small'>Выбор валюты</h2>

            <span className='paragraph'>Выберите валюту, в которой вы хотите видеть ваши активы, все активы будут пересчитаны в соответствии со ставкой ЦБ РФ.</span>


            <div className="radio-wraper radio-checkbox-wrapper">
                <input type="radio" id="RUB" value='RUB' className="checkbox radio-checkbox" checked={first === 'RUB'} onChange={handleChangeRadio}></input>
                <label className="active-form__label radio-checkbox-label" htmlFor="RUB">RUB (₽)</label>

                <input type="radio" id="EUR" value='EUR' className="checkbox radio-checkbox" checked={first === 'EUR'} onChange={handleChangeRadio}></input>
                <label className="active-form__label radio-checkbox-label" htmlFor="EUR">EUR (€)</label>

                <input type="radio" id="USD" value='USD' className="checkbox radio-checkbox" checked={first === 'USD'} onChange={handleChangeRadio}></input>
                <label className="active-form__label radio-checkbox-label" htmlFor="USD">USD ($)</label>

                <input type="radio" id="CNY" value='CNY' className="checkbox radio-checkbox" checked={first === 'CNY'} onChange={handleChangeRadio}></input>
                <label className="active-form__label radio-checkbox-label" htmlFor="CNY">CNY (¥)</label>
            </div>
        </div>
    )
}

export default SelectCurrency