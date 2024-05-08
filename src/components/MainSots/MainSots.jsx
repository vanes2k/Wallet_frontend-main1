import {React, useEffect, useState} from "react";
import { useSelector } from "react-redux";

import "./MainSots.css"

import Demo from '../../components/Demo/Demo';
import CapitalList from "../CapitalList/CapitalList";
import { bank_deposits } from "../../store/reducers/RocetSlice";


function MainSots({ handlerOpenPopup, cars,  digital, metals , getBrands, brands, getModels, models, getCities, cities, getAllCars, getAllMotorcycles, motorcycles, getAllDigital, getAllDeposit, getAllMetals}) {

  const rocketData = useSelector((state) => state.rocketSlice.data);
  const loadData = useSelector((state) => state.rocketSlice.loading);

  const [isCard, setIsCard] = useState(true)

  function listClick() {
    setIsCard(false);
  }
  function cardClick() {
    setIsCard(true);
  }



  
  const allActives = useSelector((state) => state.rocketSlice.allActives)
  const realty = useSelector((state) => state.rocketSlice.realty)
  const deposits = useSelector((state) => state.rocketSlice.deposits)
  const transport = useSelector((state) => state.rocketSlice.transport)
  const digital_rubles = useSelector((state) => state.rocketSlice.digital_rubles)
  const markets = useSelector((state) => state.rocketSlice.markets) 

//Дижитал рубл
  const digitalamount1 = digital_rubles?.objects?.[1]?.statistic?.[0]?.current_price ?? 0;
//bank deposit
  const bankdeposit0 = deposits?.objects?.[0]?.statistic?.[0]?.current_price ?? 0 ;
  const bankdeposit1 = deposits?.objects?.[1]?.statistic?.[0]?.current_price ?? 0 ;
  const bankdeposit2 = deposits?.objects?.[2]?.statistic?.[0]?.current_price ?? 0 ;
  // НЕДВИГА
const villa0 =  realty?.objects?.[0]?.statistic?.[0]?.current_price ?? 0;
const villa1 =  realty?.objects?.[1]?.statistic?.[0]?.current_price ?? 0;
const villa2 =  realty?.objects?.[2]?.statistic?.[0]?.current_price ?? 0;
const villa3 =  realty?.objects?.[3]?.statistic?.[0]?.current_price ?? 0;
//транспорст
const transport0 = transport?.objects?.[0]?.statistic?.[0]?.current_price ?? 0 ;
 const transport1 = transport?.objects?.[1]?.statistic?.[0]?.current_price ?? 0 ;
 const transport2 = transport?.objects?.[2]?.statistic?.[0]?.current_price ?? 0 ;
 //биржи
 const markets0 = markets?.objects?.[0]?.statistic?.[0]?.current_price ?? 0 ;
 const markets1 = markets?.objects?.[1]?.statistic?.[0]?.current_price ?? 0 ;
 const markets2 = markets?.objects?.[2]?.statistic?.[0]?.current_price ?? 0 ;
 const markets3 = markets?.objects?.[3]?.statistic?.[0]?.current_price ?? 0 ;
 //кошельки

    //percent//
//Дижитал
const digitalp1 = digital_rubles?.objects?.[1]?.statistic?.[0]?.profit_percentage ?? 0;
//bank deposit precentage
const bankdepositp0 = deposits?.objects?.[0]?.statistic?.[0]?.profit_percentage ?? 0 ;
const bankdepositp1 = deposits?.objects?.[1]?.statistic?.[0]?.profit_percentage ?? 0 ;
const bankdepositp2 = deposits?.objects?.[2]?.statistic?.[0]?.profit_percentage ?? 0 ;
 // НЕДВИГА
 const villap0 =  realty?.objects?.[0]?.statistic?.[0]?.profit_percentage  ?? 0;
 const villap1 =  realty?.objects?.[1]?.statistic?.[0]?.profit_percentage ?? 0;
 const villap2 =  realty?.objects?.[2]?.statistic?.[0]?.profit_percentage  ?? 0;
 const villap3 =  realty?.objects?.[3]?.statistic?.[0]?.profit_percentage  ?? 0;
//транспорст
 const transportp0 = transport?.objects?.[0]?.statistic?.[0]?.profit_percentage ?? 0 ;
 const transportp1 = transport?.objects?.[1]?.statistic?.[0]?.profit_percentage ?? 0 ;
 const transportp2 = transport?.objects?.[2]?.statistic?.[0]?.profit_percentage ?? 0 ;

//биржи
const marketsp0 = markets?.objects?.[0]?.statistic?.[0]?.profit_percentage ?? 0 ;
const marketsp1 = markets?.objects?.[1]?.statistic?.[0]?.profit_percentage ?? 0 ;
const marketsp2 = markets?.objects?.[2]?.statistic?.[0]?.profit_percentage ?? 0 ;
const marketsp3 = markets?.objects?.[3]?.statistic?.[0]?.profit_percentage ?? 0 ;
 //крипто-биржи
const wallet0 = markets?.objects?.[0]?.statistic?.[0]?.profit_percentage ?? 0 ;
const wallet1 = markets?.objects?.[1]?.statistic?.[0]?.profit_percentage ?? 0 ;
const wallet2 = markets?.objects?.[2]?.statistic?.[0]?.profit_percentage ?? 0 ;

 //кошельки



//константы
  const users = [
    { id: 1, cost: digitalamount1 , percent: digitalp1 },
    { id: 2, cost: villa0 , percent: villap0},
    { id: 3, cost: villa1, percent: villap1 },
    { id: 4, cost: villa2, percent: villap2 },
    { id: 5, cost: villa3, percent: villap3 },
    { id: 6, cost: transport0, percent: transportp0 },
    { id: 7, cost: transport1, percent: transportp1},
    { id: 8, cost: transport2, percent: transportp2},
    { id: 9, cost: 7777777, percent: 5 },
    { id: 10, cost: bankdeposit1 , percent: bankdepositp0 },
    { id: 11, cost: bankdeposit2, percent: bankdepositp2 },
    { id: 12, cost: 2 , percent: 0 },
    { id: 13, cost: bankdeposit0 , percent: bankdepositp1},
    { id: 14, cost: 531001, percent: 5 },
    { id: 15, cost: 531001, percent: 5 },
    { id: 16, cost: 531001, percent: 5 },
    { id: 17, cost: 531001, percent: 5 },
    { id: 18, cost: markets0, percent: marketsp0 },
    { id: 19, cost: markets1, percent: marketsp1 },
    { id: 20, cost: markets2, percent: marketsp2 },
    { id: 21, cost: markets3, percent: marketsp3 },
  ]

  return (
    loadData === true && rocketData !== null 
      ?  (<div className="main-sots">
     <div className="swing-button__container swing-button__container_capital-card swing-button_demo">
        <button className={isCard ? "button  swing-button swing-button_card" : "swing-button swing-button_disabled swing-button_card"} onClick={cardClick} >{"Карта"}</button>
        <button className={!isCard ? "button  swing-button swing-button_list" :"swing-button swing-button_disabled swing-button_list"} onClick={listClick} >{"Список"}</button>
      </div> 
      {isCard
      // подключение
      ? (<Demo 
          users={users} 
          handlerOpenPopup={handlerOpenPopup}
          cars = {cars}
          motorcycles={motorcycles}
          deposits = {deposits}
          digital = {digital}
          metals={metals}

          getCities = {getCities}
          cities = {cities}
          getBrands = {getBrands}
          brands = {brands}
          getModels = {getModels}
          models = {models}

          getAllCars = {getAllCars}
          getAllMotorcycles = {getAllMotorcycles}
          getAllDigital={getAllDigital}
          getAllDeposit={getAllDeposit}
          getAllMetals={getAllMetals}

        />)
      : (<CapitalList
          handlerOpenChange={handlerOpenPopup} 
        />)
      }
   </div>)
  
   : (null)

    

  )
}

export default MainSots;