import {React, useState,  } from "react";
import { 
  TransformWrapper, 
  TransformComponent 
} from "react-zoom-pan-pinch";

import './CapitalCard.css'

import CapitalList from "../CapitalList/CapitalList";

function CapitalCard({ handlerOpenPopup, metals}){

const [isCard, setIsCard] = useState(true)

function listClick() {
  setIsCard(false);
}
function cardClick() {
  setIsCard(true);
}



  return (
    <section className="capital" >
       <div className="swing-button__container swing-button__container_capital-card">
        <button className={isCard ? "button  swing-button swing-button_card" : "swing-button swing-button_disabled swing-button_card"} onClick={cardClick} >{"Карта"}</button>
        <button className={!isCard ? "button  swing-button swing-button_list" :"swing-button swing-button_disabled swing-button_list"} onClick={listClick} >{"Список"}</button>
      </div> 
      {isCard ? (
         <section className="capital-card">
          <div className="capital-card__info">
            <h3 className="info__title">Отслеживайте свой текущий капитал</h3>
            <p className="paragraph">Добавляйте свои активы и следите за динамикой в разделе Статистика</p>
          </div>
<TransformWrapper 
  initialScale={1}
  
  maxScale={2.73}
  minScale={0.37}

>
  {({ zoomIn, zoomOut, ...rest }) => (
    <>
      <div className="zoom-button">
            <button className="size size_plus" onClick={() => zoomIn()} ></button>
            <button className="size size_minus" onClick={() => zoomOut()}></button>
          </div>
<TransformComponent>
<div className="container__sota">
  <div className="sota-wrapper">


{/* 
  {metals.map((item) => {
    <div>{item.id}</div>
  }
)} */}



            <div className="sota">
              <p className="sota-paragraph">{"Добавить актив"}</p>
              <button className="sota-button" onClick={handlerOpenPopup}></button>
            </div>
            {/* <div className="sota">
              <p className="sota-paragraph">{"Добавить актив"}</p>
              <button className="sota-button" onClick={handlerOpenPopup}></button>
            </div> */}
        </div>

</div>
    
</TransformComponent>
        
    </>
   
   )} 
 </TransformWrapper> 
         
         </section> 
       ) 
      :  
        <CapitalList handlerOpenChange={handlerOpenPopup}/>
   } 
    </section>

  )
}

export default CapitalCard;