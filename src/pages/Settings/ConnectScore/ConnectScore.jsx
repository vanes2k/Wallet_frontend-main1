import "./ConnectScore.css"
import {React, useState} from "react";


function ConnectScore () {

    const [isChecked, setIsChecked] = useState(true)
    function handleChangeCheckbox() {
        setIsChecked(!isChecked)
    }

    return (
        <div className="connect__score">
           <div className="table__score">

               <div className="table__row">
                   <div className="table__header-text w-80">
                       <span className="paragraph paragraph-weight">Подключенные счета</span>
                   </div>
                   <div className="table__header-text w-20">
                       <span className="paragraph paragraph-weight">Состояние</span>
                   </div>
               </div>

               <div className="table__row">
                   <div className="table__header-text w-80">
                       <span className="paragraph paragraph-gray">Binance</span>
                   </div>
                   <div className="table__header-text w-20">
                       <label className="checkbox center checkbox-edit all-no-margin" >
                           <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                           <span className='checkbox-switch'></span>
                       </label>
                   </div>
               </div>
               <div className="table__row">
                   <div className="table__header-text w-80">
                       <span className="paragraph paragraph-gray">Binance</span>
                   </div>
                   <div className="table__header-text w-20">
                       <label className="checkbox center checkbox-edit all-no-margin" >
                           <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                           <span className='checkbox-switch'></span>
                       </label>
                   </div>
               </div>
               <div className="table__row">
                   <div className="table__header-text w-80">
                       <span className="paragraph paragraph-gray">Binance</span>
                   </div>
                   <div className="table__header-text w-20">
                       <label className="checkbox center checkbox-edit all-no-margin" >
                           <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                           <span className='checkbox-switch'></span>
                       </label>
                   </div>
               </div>
               <div className="table__row">
                   <div className="table__header-text w-80">
                       <span className="paragraph paragraph-gray">Binance</span>
                   </div>
                   <div className="table__header-text w-20">
                       <label className="checkbox center checkbox-edit all-no-margin" >
                           <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                           <span className='checkbox-switch'></span>
                       </label>
                   </div>
               </div>
               <div className="table__row">
                   <div className="table__header-text w-80">
                       <span className="paragraph paragraph-gray">Binance</span>
                   </div>
                   <div className="table__header-text w-20">
                       <label className="checkbox center checkbox-edit all-no-margin" >
                           <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                           <span className='checkbox-switch'></span>
                       </label>
                   </div>
               </div>
               <div className="table__row">
                   <div className="table__header-text w-80 table-last">
                       <span className="paragraph paragraph-gray">Binance</span>
                   </div>
                   <div className="table__header-text w-20 table-last">
                       <label className="checkbox center checkbox-edit all-no-margin" >
                           <input type="checkbox" className="checkbox-input" checked={isChecked} onChange={handleChangeCheckbox}></input>
                           <span className='checkbox-switch'></span>
                       </label>
                   </div>
               </div>
           </div>

            <div className="drop__block">
                <details className="drop-connect margin-bottom">
                    <summary className="paragraph drop__paragraph">Как получить API токен Тинькофф?</summary>
                    <p className="paragraph drop__text  margin-top">Перейдите на сайт <a href="#" className="link link-no-line">https://www.tinkoff.ru/invest/settings/api/</a> — в верхнем меню перейдите в раздел «Инвестиции» — прокрутите страницу настроек до Токены Tinkoff Invest API — нажмите «Создать токен», делее выберите «Токен для чтения». Скопируйте личный токен API и вставьте его в поле настройки интеграции.</p>
                </details>
                <details className="drop-connect margin-bottom">
                    <summary className="paragraph drop__paragraph">Как получить API токен Финам?</summary>
                    <p className="paragraph drop__text  margin-top">Для получения токена перейдите в личный кабинет брокера <a href="#" className="link link-no-line">https://lk.finam.ru/user/auth-keys</a></p>
                    <p>
                        На странице «Ключи доступа» вам необходимо:

                        <ul className="drop-ul">
                            <li>указать счет, на который будет создан токен</li>
                            <li>нажать «Создать токен»</li>
                            <li>подтвердить создание токена через смс-код</li>
                        </ul>
                    </p>
                </details>
                <details className="drop-connect margin-bottom">
                    <summary className="paragraph drop__paragraph">Как получить API токен Freedom Finance?</summary>
                    <p className="paragraph drop__text  margin-top">Перейдите по ссылке <a href="#" className="link link-no-line">https://tradernet.ru/tradernet-api/auth-api</a> <br/>Для управления ключами API вы должны быть авторизованы в личном кабинете брокера.<br/> Рекомендуем создать новую пару ключей даже если у вас уже есть доступные ключи. <br/>Настройте интеграцию с помощью публичного и секретного ключа, вставив скопированные ссылки в соответствующие поля настройки интеграции.<br/> Данные ключи используются только для чтения списка сделок.</p>
                </details>
            </div>
        </div>
    )
}

export default ConnectScore