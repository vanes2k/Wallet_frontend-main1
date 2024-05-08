import React from "react";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import Popup from "../../components/Popup/Popup";
import Statistic from "../../components/Statistic/Statistic";

function StatisticPage({
  switchTheme,
  hendlerOpenPopup,
  closePopups,
  newActivePopupOpened,
}) {
  return (
    <>
      <div className="main">
        <Header switchTheme={switchTheme} />
        <Sidebar />
        <Statistic />
      </div>

      <Popup isOpened={newActivePopupOpened} isClose={closePopups} />
    </>
  );
}

export default StatisticPage;
