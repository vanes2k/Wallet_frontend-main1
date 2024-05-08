import React from "react";
import ArrowUp from "../../../images/technically-icons/Arrow.svg";
const StatisticWrapper = ({ backImg, homeIcon, data }) => {
  return (
    <div className="statistic__section-sota_card">
      {data.map((item) => {
        return (
          <div className="statistic__section-sota_card_sota-wrapper">
            <div className="statistic__section-sota_card_sota-wrapper-sota">
              <img
                src={homeIcon}
                alt="homeIcon"
                style={{
                  width: "40px",
                }}
              />
              <p className="statistic__section-sota_card-list_price">
                {new Intl.NumberFormat("ru-RU", {}).format(item.cost)}{" "}
                <span>₽</span>
              </p>
              <span className="statistic__section-sota_card-list_precent">
                <img src={ArrowUp} alt="arrowup" />
                <span
                  style={{
                    margin: "0 0.2rem",
                  }}
                  className="statistic__section-sota_card-list_precent-number"
                >
                  {item.percent}
                </span>
                %
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatisticWrapper;
