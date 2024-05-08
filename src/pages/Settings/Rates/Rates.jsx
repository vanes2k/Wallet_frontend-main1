import "./Rates.css"

import {React} from "react";



function Rates () {
    return (
        <div className='rates__settings'>
            <h2 className='all-assets__title small all-no-margin'>Тарифы</h2>
            <p className='paragraph paragraph-bottom margin-top'>Выберите подходящий вам тариф. При покупке любого тарифа, вам будет доступен весь функционал приложения.</p>
            <p className='paragraph'>Сейчас у вас действует бесплатный пробный период до 20.09.2023.</p>

            <div className="rates__setting-tariff">
                <div className="tariff__card one-mouth">
                    <div className="tariff__card-header elem-card">
                        <h3 className="all-assets__title small-no-margin">На месяц</h3>
                    </div>

                    <div className="tariff__card-price elem-card">
                        <h3 className="all-assets__title small-no-margin title_ml">490 ₽</h3>
                        <span className="paragraph">/мес.</span>
                    </div>

                    <div className="tariff__card-button">
                        <button className="button white-button button-width">Оплатить</button>
                    </div>
                </div>

                <div className="tariff__card-dark six-mouth">
                    <div className="tariff__card-header elem-card">
                        <h3 className="all-assets__title-dark small-no-margin">На год</h3>
                    </div>

                    <div className="tariff__card-price-dark elem-card">
                        <h3 className="all-assets__title-dark small-no-margin title_ml">4900 ₽</h3>
                        <span className="paragraph-dark">408 ₽/мес.</span>
                    </div>

                    <div className="tariff__card-description">
                        <span className="paragraph-dark paragraph-m">2 месяца в подарок</span>
                    </div>

                    <div className="tariff__card-button-dark">
                        <button className="button orange-button button-width">Оплатить</button>
                    </div>
                </div>

                <div className="tariff__card one-year">
                    <div className="tariff__card-header elem-card">
                        <h3 className="all-assets__title small-no-margin">На 6 месяцев</h3>
                    </div>

                    <div className="tariff__card-price elem-card">
                        <h3 className="all-assets__title small-no-margin title_ml">2450 ₽</h3>
                        <span className="paragraph">408 ₽/мес.</span>
                    </div>

                    <div className="tariff__card-description">
                        <span className="paragraph paragraph-m">1 месяц в подарок</span>
                    </div>

                    <div className="tariff__card-button">
                        <button className="button white-button button-width">Оплатить</button>
                    </div>
                </div>
            </div>

            <div className="rates-footer">
                <span className="paragraph description">Интернет-платежи защищены сертификатом SSL и протоколом 3D Secure.
АО “Тинькофф Банк” не передает платежные данные, в том числе данные карт. [название] не хранит платёжные данные и данные карт.</span>
            </div>

        </div>
    )
}

export default Rates