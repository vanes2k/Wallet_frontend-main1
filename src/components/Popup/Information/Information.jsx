import './Information.css'
import {React} from "react";

function Information () {
    return (
        <div className="pup__window">
            <div className="pup__window__header">
                <div className="realty-card realty margin-bottom"></div>
                <h3 className="pup__header">Недвижимость</h3>
            </div>
            <div className="pup__window__main">
                <p className="pup__text">Квартира на Покрове</p>
                <p className="pup__text">Тек.цена: <span className="pup__text-black">10 000 000</span></p>
                <p className="pup__text">Доход: <span className="pup__text-green">+5%</span></p>
            </div>
            <div className="pup__window__footer">
            </div>
        </div>
    )
}

export default Information