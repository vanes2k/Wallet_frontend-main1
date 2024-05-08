import React from "react";
import "./Between.css";
import ArrowUpBetween from "../../../images/technically-icons/ArrowUpBetween.svg";
import ArrowUp from "../../../images/technically-icons/Arrow.svg";
const StatisticBetweenWrapper = ({ homeIcon }) => {
  return (
    <div className="statisticBetweenWrapper_card-wrapper">
      <div className="statisticBetweenWrapper_card-wrapper_card">
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
              {new Intl.NumberFormat().format(4730550)} <span>₽</span>
            </p>
            <span className="statistic__section-sota_card-list_precent">
              <img src={ArrowUp} alt="ArrowUpBetween" />
              <span
                style={{
                  margin: "0 0.2rem",
                }}
                className="statistic__section-sota_card-list_precent-number"
              >
                5
              </span>
              %
            </span>
          </div>
        </div>
      </div>

      <div className="statisticBetweenWrapper_card-wrapper_card">
        <div className="statisticBetweenWrapper_card-wrapper_card">
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
                {new Intl.NumberFormat().format(4730550)} <span>₽</span>
              </p>
              <span className="statistic__section-sota_card-list_precent">
                <img src={ArrowUp} alt="ArrowUpBetween" />
                <span
                  style={{
                    margin: "0 0.2rem",
                  }}
                  className="statistic__section-sota_card-list_precent-number"
                >
                  5
                </span>
                %
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="statisticBetweenWrapper_card-wrapper_card">
        <div className="sota-wrapperBeetwen">
          <div className="sotaBeetwen">
            <p className="sota-wrapperBeetwenPortfile">Общий портфель</p>
            <p className="sota-wrapperBeetwenPrice">
              {new Intl.NumberFormat("ru-RU", {}).format(1103150)}
              <span>₽</span>
            </p>
            <span className="statistic__section-sota_Betweencard-list_precent">
              <img src={ArrowUpBetween} alt="ArrowUpBetween" />
              <span
                style={{
                  margin: "0 0.2rem",
                }}
                className="statistic__section-sota_card-list_precent-number"
              >
                32
              </span>
              %
            </span>
            <p className="statistic__section-sota_Betweencard-list_number">
              +{new Intl.NumberFormat().format(300000)}
              <span>₽</span>
            </p>
          </div>
        </div>
      </div>

      <div className="statisticBetweenWrapper_card-wrapper_card">
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
              {new Intl.NumberFormat().format(4730550)}
              <span>₽</span>
            </p>
            <span className="statistic__section-sota_card-list_precent">
              <img src={ArrowUpBetween} alt="ArrowUpBetween" />
              <span
                style={{
                  margin: "0 0.2rem",
                }}
                className="statistic__section-sota_card-list_precent-number"
              >
                5
              </span>
              %
            </span>
          </div>
        </div>
      </div>
      <div className="statisticBetweenWrapper_card-wrapper_card">
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
              {new Intl.NumberFormat().format(4730550)}
              <span>₽</span>
            </p>
            <span className="statistic__section-sota_card-list_precent">
              <img src={ArrowUpBetween} alt="ArrowUpBetween" />
              <span
                style={{
                  margin: "0 0.2rem",
                }}
                className="statistic__section-sota_card-list_precent-number"
              >
                5
              </span>
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticBetweenWrapper;
