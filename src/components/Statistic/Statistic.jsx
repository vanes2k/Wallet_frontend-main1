import React, { useState } from "react";
import { dataList, dataListSecond } from "./data";
// import home from "../../images/home.svg";
import home from "../../images/active-icon/icon-realty.svg";
import "./Statistic.css";
import StatisticWrapper from "./Components/StatisticWrapper";
import StatisticBetweenWrapper from "./Components/StatisticBetweenWrapper";
const Statistic = () => {
  const [data, setData] = useState(dataList);
  return (
    <section className="statistic__section">
      <div className="statistic__section-sota_wrapper">
        <StatisticWrapper
          // backImg={sotaContainer}
          data={dataListSecond}
          homeIcon={home}
        />
        <StatisticWrapper
          // backImg={sotaContainer}
          data={dataList}
          homeIcon={home}
        />
        <StatisticBetweenWrapper  homeIcon={home} />
        <StatisticWrapper
          // backImg={sotaContainer}
          data={dataList}
          homeIcon={home}
        />
        <StatisticWrapper
          // backImg={sotaContainer}
          data={dataListSecond}
          homeIcon={home}
        />
      </div>
    </section>
  );
};

export default Statistic;
